import { client } from './client.js';
import { getDate } from '../utils/date.js';
import { addItemToDB, addAccountToDB, addTransactionToDB, getItemsFromDb, getAccountsFromDb, getTransactionsFromDb, getAccessTokenFromDb, removeItemFromDb } from './db/bank.js';
export async function addBank(userBankData) {
    const endDate = getDate(0);
    const startDate = getDate(30);
    const transactionInfo = await getTransactions(userBankData.accessToken, startDate, endDate);
    const transactionItem = transactionInfo.item;
    const item = {
        user_id: userBankData.user_id,
        item_id: transactionItem.item_id,
        access_token: userBankData.accessToken,
        institution_id: transactionItem.institution_id,
        institution_name: userBankData.institutionName,
    };
    await addItemToDB(item, userBankData.accessToken);
    const accounts = await addAccounts(transactionInfo, transactionItem.item_id);
    const transactions = await addTransactions(transactionInfo);
    return createAbstractedItem(item, accounts, transactions);
}
export async function removeBank(institution_name, user_id) {
    const accessToken = await getAccessTokenFromDb(institution_name, user_id.toString());
    await client.itemRemove({ access_token: accessToken });
    await removeItemFromDb(accessToken);
}
function createAbstractedItem(item, accounts, transactions) {
    const abstractedItem = {
        institution_id: item.institution_id,
        institution_name: item.institution_name,
        accounts: []
    };
    accounts.forEach(account => {
        const abstractedAccount = {
            account_type: account.account_type,
            account_subtype: account.account_subtype,
            account_mask: account.account_mask,
            balance: account.balance,
            currency_code: account.currency_code,
            transactions: []
        };
        transactions.forEach(transaction => {
            if (transaction.account_id === account.account_id) {
                abstractedAccount.transactions.push({
                    authorized_date: transaction.authorized_date,
                    payment_date: transaction.payment_date,
                    amount: transaction.amount,
                    merchant_name: transaction.merchant_name,
                    payment_channel: transaction.payment_channel,
                    currency_code: transaction.currency_code,
                    transaction_type: transaction.transaction_type
                });
            }
        });
        abstractedItem.accounts.push(abstractedAccount);
    });
    return abstractedItem;
}
async function addAccounts(transactionInfo, item_id) {
    return await Promise.all(transactionInfo.accounts.map(async (accountData) => {
        const account = {
            account_id: accountData.account_id,
            item_id,
            account_type: accountData.type,
            account_subtype: accountData.subtype,
            account_mask: accountData.mask,
            balance: accountData.balances.available,
            currency_code: accountData.balances.iso_currency_code
        };
        await addAccountToDB(account);
        return account;
    }));
}
async function addTransactions(transactionInfo) {
    return await Promise.all(transactionInfo.transactions.map(async (transactionInfo) => {
        const transaction = {
            transaction_id: transactionInfo.transaction_id,
            account_id: transactionInfo.account_id,
            authorized_date: transactionInfo.authorized_date,
            payment_date: transactionInfo.date,
            amount: transactionInfo.amount,
            merchant_name: transactionInfo.merchant_name,
            payment_channel: transactionInfo.payment_channel,
            currency_code: transactionInfo.iso_currency_code,
            transaction_type: transactionInfo.category ? transactionInfo.category.reduce((prevType, currType) => prevType + "," + currType) : ""
        };
        await addTransactionToDB(transaction);
        return transaction;
    }));
}
export async function getBank(user_id) {
    const items = (await getItemsFromDb(user_id));
    const abstractedItems = await Promise.all(items.map(async (item) => {
        const accounts = (await getAccountsFromDb(item.item_id));
        const abstractedAccounts = await Promise.all(accounts.map(async (account) => {
            const transactions = (await getTransactionsFromDb(account.account_id));
            const abstractedTransactions = transactions.map(transaction => {
                return {
                    authorized_date: transaction.authorized_date,
                    payment_date: transaction.payment_date,
                    amount: transaction.amount,
                    merchant_name: transaction.merchant_name,
                    payment_channel: transaction.payment_channel,
                    currency_code: transaction.currency_code,
                    transaction_type: transaction.transaction_type
                };
            });
            return {
                account_type: account.account_type,
                account_subtype: account.account_subtype,
                account_mask: account.account_mask,
                balance: account.balance,
                currency_code: account.currency_code,
                transactions: abstractedTransactions
            };
        }));
        const abstractedItem = {
            institution_id: item.institution_id,
            institution_name: item.institution_name,
            accounts: abstractedAccounts
        };
        return abstractedItem;
    }));
    return {
        items: abstractedItems
    };
}
export async function getAccount(access_token) {
    return await client.accountsGet({ access_token });
}
export async function getTransactions(access_token, startDate, endDate) {
    return (await client.transactionsGet({ access_token, start_date: startDate, end_date: endDate })).data;
}
export async function getBalances(access_token) {
    return await client.accountsBalanceGet({ access_token });
}
//# sourceMappingURL=bank.js.map