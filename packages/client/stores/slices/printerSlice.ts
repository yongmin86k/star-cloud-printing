import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../rootStore"

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
  printers: Map<string, CloudPrinter>
}

const initialState: PrinterStore = {
  printers: new Map<string, CloudPrinter>(),
}

export const printerSlice = createSlice({
  name: "printer",
  initialState,
  reducers: {
    setPrinter: (state, action: PayloadAction<CloudPrinter | undefined>) => {
      if (!action.payload) {
        return
      }

      state.printers.set(action.payload.mac, action.payload)
    },
  },
})

export const { setPrinter } = printerSlice.actions

export const printerSelectors = {
  printers: (state: RootState) => [...state.printerStore.printers.values()],
}

export default printerSlice.reducer
