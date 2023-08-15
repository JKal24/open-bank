import { query } from '../../data/database.js';
import { Account, Item, Transaction } from '@openbank/types'

export async function addItemToDB(item: Item, access_token: string) {
    await query("INSERT INTO items (item_id, access_token, user_id, institution_id, institution_name) VALUES (?, ?, ?, ?, ?)", [item.item_id, access_token, item.user_id, item.institution_id, item.institution_name]);
}

export async function addAccountToDB(account: Account) {
    await query("INSERT INTO accounts (account_id, item_id, account_type, account_subtype, account_mask, balance) VALUES (?, ?, ?, ?, ?, ?) ", [account.account_id, account.item_id, account.account_type, account.account_subtype, account.account_mask, account.balance]);
}

export async function addTransactionToDB(transaction: Transaction) {
    await query("INSERT INTO transactions (transaction_id, account_id, authorized_date, payment_date, amount, merchant_name, payment_channel, currency_code, transaction_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ", [transaction.transaction_id, transaction.account_id, transaction.authorized_date, transaction.payment_date, transaction.amount, transaction.merchant_name, transaction.payment_channel, transaction.currency_code, transaction.transaction_type]);
}