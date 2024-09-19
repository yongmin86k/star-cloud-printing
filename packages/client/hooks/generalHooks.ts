import { Routes, useLocalSearchParams } from 'expo-router'
import { YRouteParams } from '../modules/routes/YRouteParams'
import { useAppSelector } from '../stores/hooks/rootHooks'
import { selectColorScheme } from '../stores/slices/themeSlice'
import { appSelectors } from '../stores/slices/appSlice'

export const useYParams = <T extends Routes>() =>
  useLocalSearchParams<YRouteParams<T>>()

export const useYColors = () => useAppSelector(selectColorScheme)
export const useYLoader = () => useAppSelector(appSelectors.isAppLoading)
export const useYLoadingMessage = () =>
  useAppSelector(appSelectors.loadingMessage)
export const useYCredential = () => useAppSelector(appSelectors.credential)
export const useIsSignedIn = () => useAppSelector(appSelectors.isSignedIn)
