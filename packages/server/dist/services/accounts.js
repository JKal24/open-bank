import { client } from './client.js';
import { getDate } from '../utils/date.js';
export async function getAccount(access_token) {
    return await client.accountsGet({ access_token });
}
export async function getTransactions(access_token, startDate, endDate) {
    return await client.transactionsGet({ access_token, start_date: startDate, end_date: endDate });
}
export async function getBalances(access_token) {
    return await client.accountsBalanceGet({ access_token });
}
export async function addNewUserAccount(userAccountInfo) {
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
//# sourceMappingURL=accounts.js.map