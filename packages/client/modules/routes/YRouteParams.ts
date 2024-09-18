import { Routes } from "expo-router"

type loginParam = {
  userName?: string
}

type signupParam = loginParam & {
  email?: string
}

export type YRouteParams<T extends Routes> = T extends "/login"
  ? loginParam
  : T extends "/signup" | "/confirm-email"
    ? signupParam
    : {}
