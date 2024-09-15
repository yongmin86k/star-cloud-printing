import { Application } from 'express'
import jsonServer from 'json-server'
import { schema } from '../schema'

export type TAddCustomRoute = (
  server: Application,
  router: jsonServer.JsonServerRouter<schema>
) => void
