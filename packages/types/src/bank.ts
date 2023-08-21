import { AbstractedItem, Account, Item, Transaction } from "."

export interface Bank {
    item: Item,
    accounts: Account[],
    transactions: Transaction[],
    access_token: string
}

export interface AbstractedBank {
    items: AbstractedItem[]
}