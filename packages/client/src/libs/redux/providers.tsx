'use client'

import { Provider } from 'react-redux'
import { store, persistor, purge } from '@/libs/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from 'react'
import { purgeStoredState } from 'redux-persist'

export const Providers = (props: React.PropsWithChildren) => {

    useEffect(() => {
        return () => {
            purge()
        }
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {props.children}
            </PersistGate>
        </Provider>
    )
}