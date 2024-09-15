import { axios } from '../../modules/axios'
import {
  IBaseUser,
  IConfirmCodeRequest,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IUserResponse,
} from '../../models/v1/user'
import { API_VERSION } from '../../modules/constants'

export const register = async (payload: IRegisterRequest) => {
  const res = await axios.post<IUserResponse>(
    `${API_VERSION.V1}/register`,
    payload
  )

  return res.data
}

export const confirmCode = async (payload: IConfirmCodeRequest) =>
  axios.patch<void>(`${API_VERSION.V1}/confirm-code`, payload)

export const login = async (payload: ILoginRequest) => {
  const res = await axios.post<ILoginResponse>(
    `${API_VERSION.V1}/login`,
    payload
  )

  return res.data
}

export const logout = async (payload: IBaseUser) =>
  axios.post<void>(`${API_VERSION.V1}/logout`, payload)

// TODO: forgotPassword, resetPassword
