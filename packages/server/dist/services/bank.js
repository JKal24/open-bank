import { client } from './client.js';
import { getDate } from '../utils/date.js';
import { addItemToDB, addAccountToDB, addTransactionToDB } from './db/bank.js';
import { getUserIdDb } from './db/user.js';
export async function getAccount(access_token) {
    return await client.accountsGet({ access_token });
}
export async function getTransactions(access_token, startDate, endDate) {
    return (await client.transactionsGet({ access_token, start_date: startDate, end_date: endDate })).data;
}
export async function getBalances(access_token) {
    return await client.accountsBalanceGet({ access_token });
}
export async function addBank(userBankData) {
    const endDate = getDate(0);
    const startDate = getDate(30);
    const transactionInfo = await getTransactions(userBankData.accessToken, startDate, endDate);
    const transactionItem = transactionInfo.item;
    const user = await getUserIdDb(userBankData.email);
    const item = {
        user_id: user.user_id,
        item_id: transactionItem.item_id,
        institution_id: transactionItem.institution_id,
        institution_name: userBankData.institutionName,
    };
    await addItemToDB(item, userBankData.accessToken);
    const accounts = await addAccounts(transactionInfo, transactionItem.item_id);
    const transactions = await addTransactions(transactionInfo);
    return {
        item,
        accounts,
        transactions,
        access_token: userBankData.accessToken
    };
}
async function addAccounts(transactionInfo, item_id) {
    return await Promise.all(transactionInfo.accounts.map(async (accountData) => {
        const account = {
            account_id: accountData.account_id,
            item_id,
            account_type: accountData.type,
            account_subtype: accountData.subtype,
            account_mask: accountData.mask,
            balance: accountData.balances.available
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
//# sourceMappingURL=bank.js.map