import { configureStore } from '@reduxjs/toolkit'
import appSliceReducer from './slices/appSlice'
import themeSliceReducer from './slices/themeSlice'
import printerSliceReducer from './slices/printerSlice'
import { listenerMiddleware, startAppListening } from './listenerMiddleware'
import SecureStore, { SECURE_STORE_KEYS } from './secureStore'
import Logger from '../modules/logger/Logger'
import { router } from 'expo-router'

startAppListening({
  predicate: (_, currentState, originalState) => {
    return (
      currentState.appStore.credential?.token !==
      originalState.appStore.credential?.token
    )
  },
  effect: async (_, { getState }) => {
    const credential = getState().appStore.credential

    Logger.write('info', 'Token updated:', { token: credential?.token })

    await SecureStore.updateValueFor(SECURE_STORE_KEYS.TOKEN, credential?.token)

    if (!credential?.token) {
      router.replace('/login')
    }
  },
})

export const rootStore = configureStore({
  reducer: {
    appStore: appSliceReducer,
    themeStore: themeSliceReducer,
    printerStore: printerSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof rootStore.getState>
export type RootDispatch = typeof rootStore.dispatch
export type RootStore = typeof rootStore
