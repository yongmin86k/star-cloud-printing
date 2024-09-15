import { Application } from 'express'
import jsonServer from 'json-server'

export type TAddCustomRoute = (
  server: Application,
  router: ReturnType<typeof jsonServer.router>
) => void
