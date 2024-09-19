export enum ENV {
  DEBUG = "debug",
  RELEASE = "release",
}

export type TLogType = "info" | "warn" | "error"

export default class Logger {
  static ENV = process.env.EXPO_PUBLIC_ENV as ENV

  private static debugger = (type: TLogType, log: any, ...options: any[]) => {
    if (Logger.ENV === ENV.DEBUG) {
      switch (type) {
        case "warn":
          console.warn("=>", log, ...options)
          break
        case "error":
          console.error("=>", log, ...options)
          break
        case "info":
        default:
          console.log("=>", log, ...options)
      }
    }
  }

  static overrideEnv = (ENV: ENV) => {
    Logger.ENV = ENV
  }

  static write = (type: TLogType, log: any, ...options: any[]) => {
    Logger.debugger(type, log, ...options)

    switch (type) {
      case "warn":
        // Do something with the warning
        break
      case "error":
        // Do something with the error
        break
      case "info":
      default:
      // Do something with the log
    }
  }
}
