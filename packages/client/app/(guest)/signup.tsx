import { useCallback, useMemo, useRef, useState } from 'react'
import {
  Alert,
  GestureResponderEvent,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import { Link, useFocusEffect } from 'expo-router'
// import { Link, useFocusEffect, useRouter } from "expo-router"
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
  useReanimatedFocusedInput,
} from 'react-native-keyboard-controller'
import YText from '../../components/YText'
import YTextInput from '../../components/YTextInput'
import YButton from '../../components/YButton'
import { useYColors, useYParams } from '../../hooks/generalHooks'
import {
  PASSWORD_MIN_LENGTH,
  USER_NAME_MIN_LENGTH,
} from '../../modules/constants'
import { useAppDispatch } from '../../stores/hooks/rootHooks'
import { setIsAppLoading } from '../../stores/slices/appSlice'
import Logger from '../../modules/logger/Logger'

export default function Signup() {
  const dispatch = useAppDispatch()
  const colors = useYColors()
  // const router = useRouter()
  const params = useYParams<'/signup'>()
  const { input } = useReanimatedFocusedInput()

  const [email, setEmail] = useState(params.email)
  const [userName, setUserName] = useState(params.userName)
  const [password, setPassword] = useState<string>()

  const isDisabled = useMemo(() => {
    if (
      !email ||
      !userName ||
      !password ||
      !RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$').test(
        email
      ) ||
      userName.length < USER_NAME_MIN_LENGTH ||
      password.length < PASSWORD_MIN_LENGTH
    ) {
      return true
    }
  }, [email, userName, password])

  const emailNameInputRef = useRef<TextInput>(null)
  const userNameInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const scrollViewRef = useRef<ScrollView>(null)

  const unfocusAllInputs = useCallback(() => {
    emailNameInputRef.current?.blur()
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

  const handleSignup = useCallback(async () => {
    unfocusAllInputs()

    try {
      dispatch(setIsAppLoading({ isLoading: true, message: 'Please wait...' }))

      if (!email || !userName || !password) {
        throw new Error('Please fill in all fields.')
      }

      // const res = await IoTPrintingApiV1.signUp({
      //   email,
      //   password,
      //   userName,
      // })

      // if (res.status < 400) {
      //   return router.push({
      //     pathname: "/confirm-email",
      //     params: {
      //       email,
      //       userName,
      //     },
      //   })
      // }

      // Logger.write("error", res)

      throw new Error('Something went wrong.\nPlease try again later.')
    } catch (error) {
      Logger.write('error', error)

      Alert.alert('Sign up Error', 'Please try again later.')
    } finally {
      dispatch(setIsAppLoading({ isLoading: false }))
    }
  }, [userName, password, email])

  useFocusEffect(
    useCallback(() => {
      return () => {
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
            paddingHorizontal: 24,
            paddingVertical: 52,
          }}
        >
          <YText
            size="title"
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: 32,
              marginBottom: 4,
              fontWeight: 'bold',
              letterSpacing: -0.2,
            }}
          >
            Get started
          </YText>

          <YText style={{ marginBottom: 32 }}>Please create an account</YText>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <YTextInput
              ref={emailNameInputRef}
              iconName="email"
              placeholder="Email address"
              touchableProps={{ style: { marginBottom: 16 } }}
              inputProps={{
                clearButtonMode: 'while-editing',
                keyboardType: 'email-address',
                onChangeText(text) {
                  setEmail(text)
                },
                value: email,
              }}
            />

            <YTextInput
              ref={userNameInputRef}
              iconName="user"
              placeholder="User name"
              touchableProps={{ style: { marginBottom: 16 } }}
              inputProps={{
                clearButtonMode: 'while-editing',
                onChangeText(text) {
                  setUserName(text)
                },
                value: userName,
              }}
            />

            <YTextInput
              ref={passwordInputRef}
              iconName="password"
              placeholder="Password"
              inputProps={{
                clearButtonMode: 'while-editing',
                keyboardType: 'visible-password',
                secureTextEntry: true,
                onChangeText(text) {
                  setPassword(text)
                },
                value: password,
              }}
            />

            <YButton
              title="SIGN UP"
              disabled={isDisabled}
              touchableProps={{
                style: { marginVertical: 32 },
                onPress: handleSignup,
              }}
            />

            <YText style={{ marginTop: 32 }}>
              Go back to{' '}
              <YText
                color={colors.blue}
                style={{ textDecorationLine: 'underline' }}
              >
                <Link href="/login">Log in</Link>
              </YText>
            </YText>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <KeyboardToolbar
        onPrevCallback={scrollToFocusedInput}
        onNextCallback={scrollToFocusedInput}
      />
    </>
  )
}
