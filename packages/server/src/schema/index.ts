import { Models_V1 } from 'star-cloud-printing-shared'

export interface schema {
  users: Models_V1.IUserResponse[]
  printers: Models_V1.IBasePrinter[]
  tokens: Models_V1.ILoginResponse[]
}
