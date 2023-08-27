import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/libs/redux/store'

export interface SignupState { signup: boolean }

const initialState = { signup: false } as SignupState

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        switchDefaultSignup: (state, action: PayloadAction<boolean>) => {
            state.signup = action.payload
        }
    }
})

export const { switchDefaultSignup } = signupSlice.actions

export const selectSignup = (state: RootState) => state.signup.signup

export default signupSlice.reducer