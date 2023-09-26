import { query } from '../../data/database.js';
export async function addItemToDB(item, access_token) {
    await query("INSERT INTO items (item_id, access_token, user_id, institution_id, institution_name) VALUES (?, ?, ?, ?, ?)", [item.item_id, access_token, item.user_id, item.institution_id, item.institution_name]);
}
export async function addAccountToDB(account) {
    await query("INSERT INTO accounts (account_id, item_id, account_type, account_subtype, account_mask, balance, currency_code) VALUES (?, ?, ?, ?, ?, ?, ?) ", [account.account_id, account.item_id, account.account_type, account.account_subtype, account.account_mask, account.balance, account.currency_code]);
}
export async function addTransactionToDB(transaction) {
    await query("INSERT INTO transactions (transaction_id, account_id, authorized_date, payment_date, amount, merchant_name, payment_channel, currency_code, transaction_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ", [transaction.transaction_id, transaction.account_id, transaction.authorized_date, transaction.payment_date, transaction.amount, transaction.merchant_name, transaction.payment_channel, transaction.currency_code, transaction.transaction_type]);
}
export async function getAccessTokenFromDb(institution_name, user_id) {
    return (await query("SELECT access_token from items WHERE institution_name = ? AND user_id = ?", [institution_name, user_id]))[0].access_token;
}
export async function getItemsFromDb(user_id) {
    const items = (await query("SELECT * FROM items WHERE user_id = ?", [user_id]));
    return items;
}
export async function getAccountsFromDb(item_id) {
    const accounts = (await query("SELECT * FROM accounts WHERE item_id = ?", [item_id]));
    return accounts;
}
export async function getTransactionsFromDb(account_id) {
    const transactions = (await query("SELECT * FROM transactions WHERE account_id = ?", [account_id]));
    return transactions;
}
export async function removeItemFromDb(access_token) {
    await query("DELETE FROM items WHERE access_token = ?", [access_token]);
}
//# sourceMappingURL=bank.js.map