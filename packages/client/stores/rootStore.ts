import { configureStore } from "@reduxjs/toolkit"
import appSliceReducer from "./slices/appSlice"
import themeSliceReducer from "./slices/themeSlice"
import printerSliceReducer from "./slices/printerSlice"
import { listenerMiddleware, startAppListening } from "./listenerMiddleware"
import SecureStore, { SECURE_STORE_KEYS } from "./secureStore"
import Logger from "../modules/logger/Logger"
import { router } from "expo-router"

startAppListening({
  predicate: (_, currentState, originalState) => {
    return currentState.appStore.token !== originalState.appStore.token
  },
  effect: async (_, { getState }) => {
    const token = getState().appStore.token

    Logger.write("info", "Token updated:", { token })

    await SecureStore.updateValueFor(SECURE_STORE_KEYS.TOKEN, token)

    if (!token) {
      router.replace("/login")
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
