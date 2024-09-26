import { Request as ExpressRequest, Response as ExpressRespons } from 'express'
import { API_VERSION } from 'star-cloud-printing-shared'
import { TAddCustomRoute } from '../modules/jsonServer'

export const addPrinterRoutesV1: TAddCustomRoute = (server, router) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRouter = router as unknown as {
    render: (request: ExpressRequest, response: ExpressRespons) => void
  }
  const printers = router.db.get('printers').value()

  // ref: https://star-m.jp/products/s_print/sdk/StarCloudPRNT/manual/en/protocol-reference/http-method-reference/server-polling-post/json-request.html#post
  server.use(async (req, res, next) => {
    if (
      req.method === 'POST' &&
      req.url.includes(`${API_VERSION.V1}/printers`)
    ) {
      const { body, headers, query } = req
      const [serverVersion, printerVersion] = headers['user-agent']?.split(
        ' '
      ) || [undefined, undefined]

      body.serverVersion = serverVersion
      body.printerVersion = printerVersion
      body.lastConnected = query.t

      const existingPrinter = printers.find(
        (printers) => printers.printerMAC === body.printerMAC
      )

      if (existingPrinter) {
        req.method = 'PUT'
        req.url = `/printers/${existingPrinter.id}`
      }
    }

    next()
  })

  customRouter.render = (req, res) => {
    const { method, originalUrl } = req

    if (
      (method === 'PUT' || method === 'POST') &&
      originalUrl.includes(`${API_VERSION.V1}/printers`)
    ) {
      res.jsonp({
        jobReady: false,
        // clientAction: [
        //   { request: 'SetID', options: '' },
        //   { request: 'ClientVersion', options: '' },
        // ],
      })
    }
  }
}

// other references
// https://star-m.jp/products/s_print/sdk/StarCloudPRNT/manual/en/protocol-reference/http-method-reference/server-info-get/get-request.html#endpoint
// https://star-m.jp/products/s_print/sdk/StarCloudPRNT/manual/en/protocol-reference/http-method-reference/server-polling-post/json-response.html
// https://star-m.jp/products/s_print/sdk/StarCloudPRNT/manual/en/protocol-reference/common-spec-reference/printer-status-code/index.html#printer-status-code
