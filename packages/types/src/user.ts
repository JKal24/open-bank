export interface User {
    user_id: string,
    email: string,
    pass: string
}

export interface AbstractedUser {
    user_id: string,
    access_token: string
}

export interface UserBankData {
    user_id: string,
    accessToken: string,
    institutionName: string
}