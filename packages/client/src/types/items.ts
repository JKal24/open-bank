import { AbstractedAccount } from "./accounts";

export interface AbstractedItem {
    institution_id: string,
    institution_name: string,
    accounts: AbstractedAccount[]
}