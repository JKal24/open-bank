import { Account } from "./accounts.js";
import { AbstractedItem, Item } from "./items.js";
import { Transaction } from "./transactions.js";

export interface Bank {
    item: Item,
    accounts: Account[],
    transactions: Transaction[],
    access_token: string
}

export interface AbstractedBank {
    items: AbstractedItem[]
}