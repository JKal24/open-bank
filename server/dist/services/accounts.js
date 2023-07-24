import { client } from './client.js';
async function getAccount(access_token) {
    const response = await client.accountsGet({ access_token });
    return response;
}
async function getTransactions(access_token, startDate, endDate) {
    const response = await client.transactionsGet({ access_token, start_date: startDate, end_date: endDate, });
    return response;
}
async function getBalances(access_token) {
    const response = await client.accountsBalanceGet({ access_token });
    return response;
}
//# sourceMappingURL=accounts.js.map