
export interface AbstractedTransaction {
    authorized_date: string|null,
    payment_date: string,
    amount: number,
    merchant_name: string,
    payment_channel: string,
    currency_code: string,
    transaction_type: string
}