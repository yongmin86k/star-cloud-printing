import { API_VERSION } from 'star-cloud-printing-shared'
import { TAddCustomRoute } from '../modules/jsonServer'

export const addPrinterRoutesV1: TAddCustomRoute = (server, router) => {
  const printers = router.db.get('printers').value()

  server.use(async (req, res, next) => {
    if (
      req.method === 'POST' &&
      req.url.includes(`${API_VERSION.V1}/printers`)
    ) {
      const { body, query } = req

      body.lastConnected = query.t

      const hasPrinter = printers.find(
        (printers) => printers.printerMAC === body.printerMAC
      )

      if (hasPrinter) {
        req.url = `/printers/${hasPrinter.id}`
        req.method = 'PATCH'
      }
    }

    next()
  })
}
