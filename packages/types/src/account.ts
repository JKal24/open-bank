export interface UserAccountInfo {
    accessToken: string,
    institution: string,
    institution_id: string,
    accounts: AccountInfo[]
}

export interface AccountInfo {
    accountId: string,
    accountName: string,
    accountType: string,
    accountSubtype: string,
    accountMask: string
}

export interface Account {
    account_id: string,
    item_id: string,
    account_type: string,
    account_subtype: string,
    account_mask: string,
    balance: number
}