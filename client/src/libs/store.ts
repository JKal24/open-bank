import { configureStore } from "@reduxjs/toolkit";
import accountReducer from '@/libs/account/accountSlice'

export const store = configureStore({
    reducer: {
        accounts: accountReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch