import { createListenerMiddleware, addListener } from "@reduxjs/toolkit"
import type { RootState, RootDispatch } from "./rootStore"

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  RootDispatch
>()

export type AppStartListening = typeof startAppListening
export const addAppListener = addListener.withTypes<RootState, RootDispatch>()
export type AppAddListener = typeof addAppListener
