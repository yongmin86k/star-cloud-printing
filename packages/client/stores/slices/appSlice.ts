import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootStore'
import Logger from '../../modules/logger/Logger'
import { Models_V1 } from 'star-cloud-printing-shared'

export interface AppStore {
  credential?: Models_V1.ILoginResponse
  refreshToken?: string
  isAppLoading: boolean
  loadingMessage?: string
}

const initialState: AppStore = {
  refreshToken: undefined,
  isAppLoading: false,
  loadingMessage: undefined,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCredential: (
      state,
      action: PayloadAction<Models_V1.ILoginResponse | undefined>
    ) => {
      state.credential = action.payload
    },

    setIsAppLoading: (
      state,
      action: PayloadAction<{ isLoading: boolean; message?: string }>
    ) => {
      Logger.write('info', 'setIsAppLoading', action.payload)

      state.isAppLoading = action.payload.isLoading
      state.loadingMessage = action.payload.message
    },
  },
})

export const { setCredential, setIsAppLoading } = appSlice.actions

export const appSelectors = {
  isAppLoading: (state: RootState) => state.appStore.isAppLoading,
  isSignedIn: (state: RootState) => Boolean(state.appStore.credential?.token),
  loadingMessage: (state: RootState) => state.appStore.loadingMessage,
  credential: (state: RootState) => state.appStore.credential,
}

export default appSlice.reducer
