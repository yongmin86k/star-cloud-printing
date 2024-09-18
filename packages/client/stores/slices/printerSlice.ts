import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootStore'

export interface CloudPrinter {
  mac: string
  status: string
  queueId: number
  dotWidth: number
  queueName: string
  printing: string
  clientType: string
  clientVersion: string
  lastPolledTime: string
}

export interface PrinterStore {
  printers: Record<string, CloudPrinter>
}

const initialState: PrinterStore = {
  printers: {},
}

export const printerSlice = createSlice({
  name: 'printer',
  initialState,
  reducers: {
    setPrinter: (state, action: PayloadAction<CloudPrinter | undefined>) => {
      if (!action.payload) {
        return
      }

      state.printers[action.payload.mac] = action.payload
    },
  },
})

export const { setPrinter } = printerSlice.actions

export const printerSelectors = {
  printers: (state: RootState) => [
    ...Object.values(state.printerStore.printers),
  ],
}

export default printerSlice.reducer
