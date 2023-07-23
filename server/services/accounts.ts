
async function getAccount(accessToken) {
    const response = await client.accountsGet({accessToken});
    return response;
}

async function getTransactions(accessToken, startDate:string, endDate:string) {
    const response = await client.transactionsGet({
        accessToken,
        start_date: startDate,
        end_date: endDate,
    });
    return response;
}

async function getBalances(accessToken, accountIds:Array<string>) {
    const response = await client.getBalance(
        accessToken,
        {account_ids: accountIds}
    );
    return response;
}