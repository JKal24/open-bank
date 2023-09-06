import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/libs/redux/store'
import { AbstractedBank } from '@/types/banks'
import { AbstractedItem } from '@/types/items'

const initialState: AbstractedBank = {
    items: []
};

export const bankSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<AbstractedItem>) => {
            if (state.items.filter(item => item.institution_id == action.payload.institution_id).length == 0) {
                state.items.push(action.payload);
            }
        }
    }
})

export const { addItem } = bankSlice.actions

export const selectItems = (state: RootState) => state.bank.items

export default bankSlice.reducer