import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/libs/store'

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

interface Accounts {
    UserAccounts: UserAccountInfo[]
}

const initialState: Accounts = {
    UserAccounts: [] as UserAccountInfo[]
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<UserAccountInfo>) => {
            state.UserAccounts.push(action.payload);
        }
    }
})

export const { addAccount } = accountSlice.actions

export const selectAccounts = (state: RootState) => state.accounts.UserAccounts

export default accountSlice.reducer