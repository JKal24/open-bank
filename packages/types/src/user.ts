export interface User {
    user_id: string,
    email: string,
    pass: string
}

export interface UserBankData {
    email: string,
    accessToken: string,
    institutionName: string
}