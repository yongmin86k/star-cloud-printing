import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { setAPIUrl } from 'star-cloud-printing-shared'
import { Slot } from 'expo-router'
// import { Slot, useGlobalSearchParams, usePathname } from 'expo-router'
import { rootStore } from '../stores/rootStore'
import Loader from '../components/Loader'
import Logger from '../modules/logger/Logger'
import { LogBox } from 'react-native'

export default function RootLayout() {
  // const pathname = usePathname()
  // const params = useGlobalSearchParams()

  useEffect(() => {
    const url = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4001/api'

    setAPIUrl(url)

    Logger.write('info', `enviroment: ${Logger.ENV}`)
    Logger.write('info', `API url: ${url}`)

    LogBox.ignoreAllLogs()
  }, [])

  // useEffect(() => {
  //   const { params: otherParams, ...others } = params
  //   Logger.write('info', `Navigate to: ${pathname}`, others)
  //   // TODO: before navigating check token and logout if needed
  // }, [pathname, params])

  return (
    <Provider store={rootStore}>
      <KeyboardProvider>
        <Slot />

        <Loader />
      </KeyboardProvider>
    </Provider>
  )
}
