import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/libs/redux/store'
import { AbstractedUser } from '@openbank/types';

const initialState: AbstractedUser = { user_id: "" };

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

export const selectUserId = (state: RootState) => state.users

export default userSlice.reducer