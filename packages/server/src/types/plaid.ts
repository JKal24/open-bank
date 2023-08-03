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