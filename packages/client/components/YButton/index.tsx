import { ComponentProps } from "react"
import { Text, TouchableOpacity } from "react-native"
import { useYColors } from "../../hooks/generalHooks"

interface Props {
  title: string
  disabled?: boolean
  touchableProps?: ComponentProps<typeof TouchableOpacity>
  textProps?: ComponentProps<typeof Text>
}

/**
 *
 * @props
 * - title: string
 * - disabled?: boolean
 * - touchableProps?: ComponentProps<typeof TouchableOpacity>
 * - textProps?: ComponentProps<typeof Text>
 */
export default function YButton({
  title,
  disabled,
  touchableProps,
  textProps,
}: Props) {
  const isDisabled = Boolean(disabled)
  const colors = useYColors()
  const {
    activeOpacity,
    style: touchableStyle,
    ...otherTouchableProps
  } = touchableProps || {}
  const { style: textStyle, ...otherTextProps } = textProps || {}

  return (
    <TouchableOpacity
      {...otherTouchableProps}
      activeOpacity={activeOpacity || 0.6}
      disabled={isDisabled}
      style={[
        {
          width: "100%",
          backgroundColor: colors.button(isDisabled).background,
          borderColor: colors.button(isDisabled).border,
          borderWidth: 1,
          paddingVertical: 12,
          borderRadius: 20,
          minHeight: 60,
          justifyContent: "center",
        },
        touchableStyle,
      ]}
    >
      <Text
        {...otherTextProps}
        style={[
          {
            color: colors.button(isDisabled).text,
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
