import {
  forwardRef,
  ComponentProps,
  ForwardedRef,
  MutableRefObject,
  useEffect,
  useState,
  useCallback,
} from "react"
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
} from "react-native"
import SVG from "../SVG"
import { useYColors } from "../../hooks/generalHooks"

interface Props {
  placeholder?: string
  iconName?: ComponentProps<typeof SVG>["name"]
  inputProps?: ComponentProps<typeof TextInput>
  touchableProps?: ComponentProps<typeof TouchableOpacity>
}

/**
 * @props
 * - placeholder?: string
 * - iconName?: ComponentProps<typeof SVG>["name"]
 * - inputProps?: ComponentProps<typeof TextInput>
 * - touchableProps?: ComponentProps<typeof TouchableOpacity>
 */
const YKTextInput = forwardRef<TextInput, Props>(function YTextInput(
  { placeholder, iconName, inputProps, touchableProps }: Props,
  ref: ForwardedRef<TextInput>,
) {
  const [isFocused, setIsFocused] = useState(false)

  const {
    style: touchableStyle,
    onPress: touchablePress,
    activeOpacity,
    ...otherTouchableProps
  } = touchableProps || {}
  const {
    style: inputStyle,
    onPress: inputPress,
    ...otherInputProps
  } = inputProps || {}

  const colors = useYColors()
  const inputRef = ref as MutableRefObject<TextInput>

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus()
    } else {
      inputRef.current?.blur()
    }
  }, [isFocused])

  const onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true)
    },
    [],
  )

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false)
    },
    [],
  )

  return (
    <TouchableOpacity
      key={`YKTextInput-${placeholder}`}
      {...otherTouchableProps}
      activeOpacity={activeOpacity || 0.6}
      style={[
        {
          flexDirection: "row",
          width: "100%",
          backgroundColor: isFocused ? colors.systemGray6 : colors.systemGray3,
          borderColor: isFocused ? colors.blue : colors.systemGray3,
          borderWidth: isFocused ? 1 : 1,
          borderRadius: 20,
          minHeight: 48,
          alignItems: "center",
          paddingVertical: 12,
          paddingLeft: 14,
          paddingRight: 16,
          overflow: "hidden",
        },
        touchableStyle,
      ]}
      onPress={(e) => {
        setIsFocused(true)

        if (touchablePress) {
          touchablePress(e)
        }
      }}
      onBlur={() => {
        setIsFocused(false)
      }}
    >
      {iconName && (
        <SVG
          name={iconName}
          fill={colors.systemGray}
          width={32}
          height={32}
          style={{ marginRight: 12 }}
        />
      )}

      <TextInput
        {...otherInputProps}
        ref={ref}
        style={[
          {
            flex: 1,
            fontSize: 16,
            color: colors.body,
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        onPress={(e) => {
          setIsFocused(true)

          if (inputPress) {
            inputPress(e)
          }
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </TouchableOpacity>
  )
})

export default YKTextInput
