import { Alert, TextInput, TouchableOpacity, View } from 'react-native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  KeyboardAwareScrollView,
  KeyboardEvents,
} from 'react-native-keyboard-controller'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import YText from '../../components/YText'
import YButton from '../../components/YButton'
import { useFocusEffect, useRouter } from 'expo-router'
import { API_V1 } from 'star-cloud-printing-shared'
import { useYColors, useYParams } from '../../hooks/generalHooks'
import { CODE_LENGTH } from '../../modules/constants'
import Logger from '../../modules/logger/Logger'
import { useAppDispatch } from '../../stores/hooks/rootHooks'
import { setIsAppLoading } from '../../stores/slices/appSlice'

export default function ConfirmEmail() {
  const [confirmCode, setConfirmCode] = useState<string>()

  const { email, userName } = useYParams<'/confirm-email'>()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const inputRef = useRef<TextInput>(null)
  const colors = useYColors()
  const [showKeyboard, setShowKeyboard] = useState(false)
  const isDisabled = useMemo(
    () => confirmCode?.length !== CODE_LENGTH,
    [confirmCode]
  )

  const handleConfirm = useCallback(async () => {
    if (isDisabled) {
      return
    }

    try {
      dispatch(setIsAppLoading({ isLoading: true, message: 'Please wait...' }))

      if (!confirmCode) {
        throw new Error('Please enter the code')
      }

      if (!userName || !email) {
        throw new Error('Invalid user.\nPlease restart the app and try again.')
      }

      await API_V1.confirmCode({
        userName,
        confirmCode,
      })

      return router.replace({
        pathname: '/login',
        params: {
          userName,
        },
      })
    } catch (error) {
      Logger.write('error', error)

      Alert.alert('Sign up Error', 'Please try again later.')
    } finally {
      dispatch(setIsAppLoading({ isLoading: false }))
    }
  }, [confirmCode])

  useFocusEffect(() => {
    const show = KeyboardEvents.addListener('keyboardWillShow', () => {
      setShowKeyboard(true)
    })

    const hide = KeyboardEvents.addListener('keyboardWillHide', () => {
      setShowKeyboard(false)
    })

    return () => {
      show.remove()
      hide.remove()
    }
  })

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingVertical: 52,
          paddingHorizontal: 24,
        }}
      >
        <KeyboardAwareScrollView>
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
            Confirm code
          </YText>

          <YText
            size="caption2"
            style={{
              textAlign: 'center',
            }}
          >
            Please enter the code sent to your email
          </YText>

          <View
            style={{
              marginVertical: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              columnGap: 12,
            }}
          >
            {new Array(CODE_LENGTH).fill(undefined).map((_, index) => {
              const indicatorIndex = confirmCode?.length || 0

              return (
                <Code
                  key={index}
                  code={confirmCode}
                  index={index}
                  indicatorIndex={indicatorIndex}
                  showKeyboard={showKeyboard}
                  onPress={() => inputRef.current?.focus()}
                />
              )
            })}
          </View>

          <TextInput
            autoFocus
            ref={inputRef}
            keyboardType="number-pad"
            returnKeyType="done"
            textContentType="oneTimeCode"
            maxLength={6}
            style={{
              display: 'none',
            }}
            value={confirmCode}
            onChangeText={(text) => {
              const codes = text.replace(/[^0-9]/g, '')

              setConfirmCode(codes)
            }}
            onEndEditing={handleConfirm}
          />

          <YButton
            title="CONFIRM"
            disabled={isDisabled}
            touchableProps={{
              style: {
                marginVertical: 32,
              },
              onPress: handleConfirm,
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  )
}

const Code = ({
  code,
  index,
  indicatorIndex,
  showKeyboard,
  onPress,
}: {
  code?: string
  index: number
  indicatorIndex: number
  showKeyboard: boolean
  onPress: () => void
}) => {
  const colors = useYColors()
  const digit = code?.[index] || ''

  const hasCode = useMemo(() => Boolean(digit), [digit])
  const showIndicator = useMemo(
    () => index === indicatorIndex,
    [index, indicatorIndex]
  )

  const defaultOpacity = useSharedValue(1)

  const animatedDefault = useAnimatedStyle(() => ({
    opacity: defaultOpacity.value,
  }))

  useEffect(() => {
    defaultOpacity.value = withRepeat(
      withTiming(0, { duration: 600 }),
      -1,
      true
    )
  }, [])

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: hasCode ? colors.blue : colors.systemGray3,
        backgroundColor: colors.systemGray6,
      }}
      onPress={onPress}
    >
      {showKeyboard && showIndicator ? (
        <Animated.View
          style={[
            {
              width: 1,
              height: '50%',
              backgroundColor: colors.blue,
            },
            animatedDefault,
          ]}
        />
      ) : (
        <YText size="subTitle">{digit}</YText>
      )}
    </TouchableOpacity>
  )
}
