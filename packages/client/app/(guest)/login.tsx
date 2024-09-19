import { useCallback, useMemo, useRef, useState } from 'react'
import {
  Alert,
  GestureResponderEvent,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
  useReanimatedFocusedInput,
} from 'react-native-keyboard-controller'
import { API_V1 } from 'star-cloud-printing-shared'
import Logo from '../../components/Logo'
import YText from '../../components/YText'
import YTextInput from '../../components/YTextInput'
import YButton from '../../components/YButton'
import { useYColors, useYParams } from '../../hooks/generalHooks'
import { useAppDispatch } from '../../stores/hooks/rootHooks'
import { setIsAppLoading, setCredential } from '../../stores/slices/appSlice'
import Logger from '../../modules/logger/Logger'
import {
  PASSWORD_MIN_LENGTH,
  USER_NAME_MIN_LENGTH,
} from '../../modules/constants'

export default function Login() {
  const diameter = 148
  const params = useYParams<'/login'>()
  const colors = useYColors()
  const router = useRouter()
  const { input } = useReanimatedFocusedInput()

  const [userName, setUserName] = useState(params.userName)
  const [password, setPassword] = useState<string>()

  const userNameInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const scrollViewRef = useRef<ScrollView>(null)

  const dispatch = useAppDispatch()

  const isDisabled = useMemo(() => {
    if (
      !userName ||
      !password ||
      userName.length < USER_NAME_MIN_LENGTH ||
      password.length < PASSWORD_MIN_LENGTH
    ) {
      return true
    }

    return false
  }, [userName, password])

  const resetAllInputs = useCallback(() => {
    setUserName(undefined)
    setPassword(undefined)
  }, [userName, password])

  const unfocusAllInputs = useCallback(() => {
    userNameInputRef.current?.blur()
    passwordInputRef.current?.blur()
  }, [])

  const scrollToFocusedInput = useCallback((e: GestureResponderEvent) => {
    const position = input.value?.layout

    scrollViewRef.current?.scrollTo({
      x: position?.absoluteX || 0,
      y: position?.absoluteY || 0,
    })
  }, [])

  const handleLogin = useCallback(async () => {
    unfocusAllInputs()

    try {
      dispatch(setIsAppLoading({ isLoading: true, message: 'Please wait...' }))

      if (!userName || !password) {
        throw new Error('User name and password are required')
      }

      const credential = await API_V1.login({
        userName,
        password,
      })

      dispatch(setCredential(credential))

      if (credential.token) {
        router.replace('/')
      }
    } catch (error) {
      Logger.write('error', error)

      Alert.alert('Login Error', 'Please check your user name and password')
    } finally {
      dispatch(setIsAppLoading({ isLoading: false }))
    }
  }, [userName, password])

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetAllInputs()
        unfocusAllInputs()
      }
    }, [])
  )

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: 76,
          }}
        >
          <YText
            style={{
              marginBottom: 24,
            }}
          >
            iOT Printing example app
          </YText>

          <View
            style={{
              width: diameter,
              height: diameter,
            }}
          >
            <Logo
              diameter={diameter}
              iconSize={80}
              backgroundColor={colors.systemGray3}
              iconColor={colors.systemGray6}
            />
          </View>

          <YText
            size="title"
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: 32,
              marginBottom: 16,
              fontWeight: 'bold',
              letterSpacing: -0.2,
            }}
          >
            Welcome
          </YText>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 24,
            }}
          >
            <YTextInput
              ref={userNameInputRef}
              iconName="user"
              placeholder="User name"
              touchableProps={{ style: { marginBottom: 16 } }}
              inputProps={{
                value: userName,
                clearButtonMode: 'while-editing',
                onChangeText(text) {
                  setUserName(text)
                },
                onSubmitEditing: handleLogin,
              }}
            />

            <YTextInput
              ref={passwordInputRef}
              iconName="password"
              placeholder="Password"
              inputProps={{
                value: password,
                clearButtonMode: 'while-editing',
                keyboardType: 'visible-password',
                secureTextEntry: true,
                onChangeText(text) {
                  setPassword(text)
                },
                onSubmitEditing: handleLogin,
              }}
            />

            <YButton
              title="LOGIN"
              disabled={isDisabled}
              touchableProps={{
                style: {
                  marginVertical: 32,
                },
                onPress: handleLogin,
              }}
            />
          </View>

          <YText
            size="caption1"
            style={{ marginBottom: 12 }}
          >
            Please create an account if you don't have one.
          </YText>

          <YText
            color={colors.blue}
            style={{ textDecorationLine: 'underline' }}
          >
            <Link
              href={{
                pathname: '/signup',
                params: {
                  userName,
                },
              }}
            >
              Sign up
            </Link>
          </YText>
        </KeyboardAwareScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <YText size="caption1">
          © {new Date().getFullYear()} Yongmin Kim, all rights reserved.
        </YText>
      </View>

      <KeyboardToolbar
        onPrevCallback={scrollToFocusedInput}
        onNextCallback={scrollToFocusedInput}
      />
    </>
  )
}
