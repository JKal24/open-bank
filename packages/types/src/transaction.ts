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

export interface AbstractedTransaction {
    authorized_date: string,
    payment_date: string,
    amount: number,
    merchant_name: string,
    payment_channel: string,
    currency_code: string,
    transaction_type: string
}