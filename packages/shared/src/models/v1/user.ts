export interface IBaseUser {
  userName: string
}

export interface ILoginRequest extends IBaseUser {
  password: string
}

export interface ILoginResponse extends IBaseUser {
  token: string
}

export interface IRegisterRequest extends ILoginRequest {
  email: string
}

export interface IConfirmCodeRequest extends IBaseUser {
  confirmCode: number
}

export interface IUserResponse extends ILoginRequest {
  id: number
  isVerified: boolean
}
