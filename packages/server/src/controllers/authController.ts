import jsonServer from 'json-server'
import { API_VERSION, Models_V1 } from 'star-cloud-printing-shared'
import { TAddCustomRoute } from '../modules/jsonServer'

const CONFIRM_CODE = 123456
const TOKEN = 'MOCKED_TOKEN'

export const addAuthRoutesV1: TAddCustomRoute = (server, router) => {
  const users = router.db.get('users').value()

  server.use(
    jsonServer.rewriter({
      [`${API_VERSION.V1}/register`]: '/users',
    })
  )

  server.use((req, res, next) => {
    if (req.method === 'POST' && req.url === '/users') {
      const { body } = req

      if (!body || !body.userName || !body.password || !body.email) {
        return res.status(400).send('Missing required fields')
      }

      // Mocking the confirmation
      req.body.isVerified = false
      req.body.confirmCode = CONFIRM_CODE
    }

    next()
  })

  server.patch(`${API_VERSION.V1}/confirm-code`, async (req, res) => {
    const matchedUser = users.find(
      (user) => user.userName === req.body.userName
    )

    if (!matchedUser) {
      return res.status(404).send('User not found')
    }

    if (matchedUser.isVerified) {
      return res.status(400).send('User is already verified')
    }

    if (!req.body.confirmCode) {
      return res.status(400).send('Confirm code is required')
    }

    if (req.body.confirmCode !== CONFIRM_CODE) {
      return res.status(400).send('Invalid confirm code')
    }

    const newDB = await router.db.update('users', (users) =>
      users.map((user: Models_V1.IUserResponse) => {
        if (user.userName === req.body.userName) {
          user.isVerified = true
        }

        return user
      })
    )

    await newDB.write()

    return res.send()
  })

  server.post(`${API_VERSION.V1}/login`, async (req, res) => {
    const { body } = req

    if (!body || !body.userName || !body.password) {
      return res.status(400).send('Missing required fields')
    }

    const matchedUser = users.find((user) => user.userName === body.userName)

    if (!matchedUser || matchedUser.password !== body.password) {
      return res.status(404).send('Credentials not found')
    }

    // Mocking the user token
    const updateObject: Models_V1.ILoginResponse = {
      userName: matchedUser.userName,
      token: TOKEN,
    }

    const newDB = await router.db.update('tokens', (tokens) => [
      ...tokens,
      updateObject,
    ])

    await newDB.write()

    return res.send(updateObject)
  })

  server.post(`${API_VERSION.V1}/logout`, async (req, res) => {
    const { body } = req

    if (!body || !body.userName) {
      return res.status(400).send('Missing required fields')
    }

    const newDB = await router.db.update('tokens', (tokens) =>
      tokens.filter(
        (token: Models_V1.ILoginResponse) => token.userName !== body.userName
      )
    )

    await newDB.write()

    return res.send()
  })
}
