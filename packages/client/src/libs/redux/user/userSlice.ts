import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/libs/redux/store'
import { AbstractedUser } from '@/types/users';

const initialState: AbstractedUser = { user_id: "", access_token: "" };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<AbstractedUser>) => {
            state.user_id = action.payload.user_id
            state.access_token = action.payload.access_token
        }
    }
})

export const { addUser } = userSlice.actions

export const selectUserId = (state: RootState) => state.users.user_id

export const selectUserToken = (state: RootState) => state.users.access_token

export default userSlice.reducer