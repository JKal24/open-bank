import { AbstractedAccount } from "./accounts.js"

export interface Item {
    item_id: string,
    user_id: string,
    institution_id: string,
    institution_name: string,
    access_token: string
}

export interface AbstractedItem {
    institution_id: string,
    institution_name: string,
    accounts: AbstractedAccount[]
}