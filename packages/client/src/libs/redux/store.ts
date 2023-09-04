import { configureStore } from "@reduxjs/toolkit";
import bankReducer from '@/libs/redux/bank/bankSlice';
import usersReducer from '@/libs/redux/user/userSlice'
import signupReducer from "./signup/signupSlice";
import { persistStore, persistReducer, purgeStoredState } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedUsersReducer = persistReducer(persistConfig, usersReducer);
const persistedBankReducer = persistReducer(persistConfig, bankReducer);

export const store = configureStore({
    reducer: {
        bank: persistedBankReducer,
        users: persistedUsersReducer,
        signup: signupReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);
export const purge = () => {
    purgeStoredState(persistConfig);
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch