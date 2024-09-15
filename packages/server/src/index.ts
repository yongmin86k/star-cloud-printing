import jsonServer from 'json-server'
import { addAuthRoutesV1 } from './controllers/authController'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

const customRoutes = [addAuthRoutesV1]
customRoutes.forEach((addCustomRoute) => {
  addCustomRoute(server, router)
})

server.use(
  jsonServer.rewriter({
    '/api/v1/:resource/*': '/$1',
  })
)

server.use(router)
server.listen(4001, () => {
  console.log('JSON Server is running')
})
