import { client } from './client.js';
import { getDate } from '../utils/date.js';
import { Item, Account, UserBankData, Transaction, Bank } from '@openbank/types';
import { addItemToDB, addAccountToDB, addTransactionToDB } from './db/bank.js';
import { getUserIdDb } from './db/user.js';

export async function getAccount(access_token: string) {
    return await client.accountsGet({access_token})
}

export async function getTransactions(access_token: string, startDate: string, endDate: string) {
    return await client.transactionsGet({access_token, start_date: startDate, end_date: endDate});
}

export async function getBalances(access_token: string) {
    return await client.accountsBalanceGet({access_token})
}

export async function addBank(userBankData: UserBankData): Promise<Bank> {
    const endDate = getDate(0);
    const startDate = getDate(30);
    const transactionInfo = await getTransactions(userBankData.accessToken, startDate, endDate);
    const transactionItem = transactionInfo.data.item;

    const userId = await getUserIdDb(userBankData.email);
    console.log(userId);

    const item: Item = {
        user_id: userId,
        item_id: transactionItem.item_id,
        institution_id: transactionItem.institution_id,
        institution_name: userBankData.institutionName,
    }
    console.log(item);

    addItemToDB(item, userBankData.accessToken);

    const accounts: Account[] = transactionInfo.data.accounts.map(accountData => {
        const account: Account = {
            item_id: transactionItem.item_id,
            account_id: accountData.account_id,
            account_type: accountData.type,
            account_subtype: accountData.subtype,
            account_mask: accountData.mask,
            balance: accountData.balances.available
        }
        addAccountToDB(account);
        return account;
    })
    console.log(accounts);

    const transactions: Transaction[] = transactionInfo.data.transactions.map(transactionInfo => {
        const transaction: Transaction = {
            transaction_id: transactionInfo.transaction_id,
            account_id: transactionInfo.account_id,
            authorized_date: transactionInfo.authorized_date,
            payment_date: transactionInfo.date,
            amount: transactionInfo.amount,
            merchant_name: transactionInfo.merchant_name,
            payment_channel: transactionInfo.payment_channel,
            currency_code: transactionInfo.iso_currency_code,
            transaction_type: transactionInfo.category ? transactionInfo.category.reduce((prevType, currType) => prevType + "," + currType) : ""
        }
        addTransactionToDB(transaction);
        return transaction;
    })
    console.log(transactions);

    return {
        item,
        accounts,
        transactions,
        access_token: userBankData.accessToken
    }
}