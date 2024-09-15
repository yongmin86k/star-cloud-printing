export interface IBaseUser {
  id: number
  userName: string
}

export interface ILoginUser extends IBaseUser {
  password: string
}

export interface IRegisterUser extends ILoginUser {
  email: string
}
