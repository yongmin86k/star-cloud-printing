import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../rootStore"
import Logger from "../../modules/logger/Logger"

export interface AppStore {
  token?: string
  refreshToken?: string
  isAppLoading: boolean
  loadingMessage?: string
}

const initialState: AppStore = {
  token: undefined,
  refreshToken: undefined,
  isAppLoading: false,
  loadingMessage: undefined,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload
    },
    setRefreshToken: (state, action: PayloadAction<string | undefined>) => {
      state.refreshToken = action.payload
    },
    setIsAppLoading: (
      state,
      action: PayloadAction<{ isLoading: boolean; message?: string }>,
    ) => {
      Logger.write("info", "setIsAppLoading", action.payload)

      state.isAppLoading = action.payload.isLoading
      state.loadingMessage = action.payload.message
    },
  },
})

export const { setToken, setRefreshToken, setIsAppLoading } = appSlice.actions

export const appSelectors = {
  isAppLoading: (state: RootState) => state.appStore.isAppLoading,
  isSignedIn: (state: RootState) => Boolean(state.appStore.token),
  loadingMessage: (state: RootState) => state.appStore.loadingMessage,
  token: (state: RootState) => state.appStore.token,
  refreshToken: (state: RootState) => state.appStore.refreshToken,
}

export default appSlice.reducer
