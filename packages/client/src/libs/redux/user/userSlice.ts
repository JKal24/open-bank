import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/libs/redux/store'
import { AbstractedUser } from '@/types/users';

const initialState: AbstractedUser = { user_id: "", access_token: "" };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserId: (state, action: PayloadAction<string>) => {
            state.user_id = action.payload
        }
    }
})

export const { addUserId } = userSlice.actions

export const selectUserId = (state: RootState) => state.users.user_id

export default userSlice.reducer