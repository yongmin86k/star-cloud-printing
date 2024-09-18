import { useFocusEffect, useRouter } from 'expo-router'
import { Alert, Appearance, ColorSchemeName } from 'react-native'
import { useCallback, useEffect } from 'react'
import { THEME_MODE } from '../modules/themes/ThemeModels'
import { useAppDispatch } from '../stores/hooks/rootHooks'
import { setTheme } from '../stores/slices/themeSlice'
import { setIsAppLoading, setToken } from '../stores/slices/appSlice'
import Logger from '../modules/logger/Logger'
import SecureStore, { SECURE_STORE_KEYS } from '../stores/secureStore'
// import { useYToken } from "../hooks/generalHooks"

const convertSchemeToTheme = (scheme: ColorSchemeName) => {
  switch (scheme) {
    case 'dark':
      return THEME_MODE.DARK
    case 'light':
    default:
      return THEME_MODE.LIGHT
  }
}

export default function Root() {
  // const token = useYToken()
  const router = useRouter()
  const colorScheme = Appearance.getColorScheme()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const theme = convertSchemeToTheme(colorScheme)

    dispatch(setTheme(theme))

    Appearance.addChangeListener((action) => {
      const newTheme = convertSchemeToTheme(action.colorScheme)

      dispatch(setTheme(newTheme))
    })
  }, [colorScheme])

  const getToken = useCallback(async () => {
    try {
      dispatch(setIsAppLoading({ isLoading: true }))

      const token = await SecureStore.getValueFor(SECURE_STORE_KEYS.TOKEN)
      Logger.write('info', 'Root:getToken:', { token })

      dispatch(setToken(token || undefined))

      return token
    } catch (error) {
      Logger.write('error', error)

      Alert.alert('Loading error', 'An error occurred while loading the app')
    } finally {
      dispatch(setIsAppLoading({ isLoading: false }))
    }
  }, [])

  const init = useCallback(async () => {
    // Do something when this route is focused
    const token = await getToken()

    router.replace(token ? '/(app)/(tabs)' : '/login')

    return () => {
      // Do something when this route is unfocused
    }
  }, [])

  useFocusEffect(() => {
    init()
  })

  return null
}
