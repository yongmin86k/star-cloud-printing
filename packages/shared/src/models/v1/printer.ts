// ref: https://star-m.jp/products/s_print/sdk/StarCloudPRNT/manual/en/protocol-reference/http-method-reference/server-polling-post/json-request.html#post

interface IBaseDisplay {
  name: string
  status: {
    connected: boolean
  }
}

interface IBaseBarcodeReader {
  name: string
  status: {
    connected: boolean
    claimed: boolean
  }
}

export interface IBasePrinter {
  id: number
  status: string
  // apiId: string
  printerMAC: string
  uniqueID?: string
  jobToken?: string
  statusCode: string
  printingInProgress: boolean
  clientAction?: null // ref: https://star-m.jp/products/s_print/sdk/StarCloudPRNT/manual/en/protocol-reference/http-method-reference/server-polling-post/client-action.html#server-polling-client-action
  display: IBaseDisplay[]
  barcodeReader: IBaseBarcodeReader[]
  lastConnected: string
}
