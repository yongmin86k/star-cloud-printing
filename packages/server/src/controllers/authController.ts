import { Models_V1 } from 'star-cloud-printing-shared'
import { API_VERSION } from '../modules/constants'
import { TAddCustomRoute } from '../modules/jsonServer'

export const addAuthRoutesV1: TAddCustomRoute = (server, router) => {
  server.post(`${API_VERSION.V1}/users/confirm-code`, (req, res) => {
    const users = router.db.get(['users']).value() as Models_V1.IRegisterUser[]

    const matchedUser = users.find((user) => user.id === req.body.id)

    if (!matchedUser) {
      return res.status(404).send('User not found')
    }

    // Mocking the confirmation
    return res.send('123456')
  })
}
