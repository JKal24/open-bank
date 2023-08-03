import { client } from './client.js';
import { UserAccountInfo } from '../types/account.js';
import { getDate } from '../utils/date.js';
import { AccountBase } from 'plaid';
import { Account, Item } from '../types/db.js';

export async function getAccount(access_token: string) {
    return await client.accountsGet({access_token})
}

export async function getTransactions(access_token: string, startDate: string, endDate: string) {
    return await client.transactionsGet({access_token, start_date: startDate, end_date: endDate});
}

export async function getBalances(access_token: string) {
    return await client.accountsBalanceGet({access_token})
}

export async function addNewUserAccount(userAccountInfo: UserAccountInfo) {
    const endDate = getDate(0);
    const startDate = getDate(30);
    const transactionInfo = await getTransactions(userAccountInfo.accessToken, startDate, endDate);

    console.log(transactionInfo.data);
    console.log(transactionInfo.data.accounts[0].balances);
    
}

export function addUserAccount() {

}

// function convertAccountInfo(accountBase: AccountBase, item: Item, user_id: string): Account {
    // return {
    //     account_id: accountBase.account_id,
    //     user_id,
    //     institution_id: item.institution_id,
    //     institution_name: string,
    //     account_type: string,
    //     accountSubtype: string,
    //     accountMask: string,
    //     balance: number
    // }
// }