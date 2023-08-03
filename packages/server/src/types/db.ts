export interface User {
    user_id: string,
    email: string,
    pass: string
}

export interface Item {
    item_id: string,
    access_token: string,
    user_id: string,
    institution_id: string
}

export interface Account {
    account_id: string,
    user_id: string,
    institution_id: string,
    institution_name: string,
    account_type: string,
    accountSubtype: string,
    accountMask: string,
    balance: number
}

export interface Transaction {
    transaction_id: string,
    account_id: string,
    authorized_date: string,
    payment_date: string,
    amount: number,
    merchant_name: string,
    payment_channel: string,
    currency_code: string,
    transaction_type: string
}

export interface TransactionCategory {
    category: string,
    transaction_id: string,
}