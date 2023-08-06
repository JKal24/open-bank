import db from '../../data/database.js';
import { Account, Item, Transaction } from '../../types/db.js'

export function addItemToDB(item: Item) {
    db.query("INSERT INTO items (item_id, access_token, email, institution_id, institution_name) VALUES (?, ?, ?, ?, ?)" [item.item_id, item.access_token, item.email, item.institution_id, item.institution_name]);
}

export function addAccountToDB(account: Account) {
    db.query("INSERT INTO accounts (account_id, item_id, account_type, account_subtype, account_mask, balance) VALUES (?, ?, ?, ?, ?) ",
    [account.account_id, account.item_id, account.account_type, account.account_subtype, account.account_mask, account.balance]);
}

export function addTransactionToDB(transaction: Transaction) {
    db.query("INSERT INTO transactions (transaction_id, account_id, authorized_date, payment_date, amount, merchant_name, payment_channel, currency_code, transaction_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ", 
    [transaction.transaction_id, transaction.account_id, transaction.authorized_date, transaction.payment_channel, transaction.merchant_name, transaction.payment_channel, transaction.currency_code, transaction.transaction_type]);
}