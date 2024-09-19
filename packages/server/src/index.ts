import jsonServer from 'json-server'
import { addAuthRoutesV1 } from './controllers/authControllerV1'
import { API_VERSION } from 'star-cloud-printing-shared'
import { schema } from './schema'

const server = jsonServer.create()
const router = jsonServer.router<schema>('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

const customRoutes = [addAuthRoutesV1]
customRoutes.forEach((addCustomRoute) => {
  addCustomRoute(server, router)
})

server.use(
  jsonServer.rewriter({
    [`${API_VERSION.V1}/:resource/*`]: '/$1',
  })
)

server.use(router)
server.listen(4001, () => {
  console.log('JSON Server is running')
})
