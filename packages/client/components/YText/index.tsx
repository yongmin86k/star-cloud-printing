import { ComponentProps, PropsWithChildren } from "react"
import { Text } from "react-native"
import { TColorVariables } from "../../modules/themes/ThemeModels"
import { useYColors } from "../../hooks/generalHooks"

type TextProps = ComponentProps<typeof Text>

interface Props extends PropsWithChildren, TextProps {
  color?: TColorVariables
  size?: number | "caption1" | "caption2" | "body" | "subTitle" | "title"
}

/**
 * @props
 * - color?: TColorVariables
 * - size?: number
 */
export default function YText(props: Props) {
  const colors = useYColors()

  const { color, size, style, children, ...rest } = props

  const fontColor = color || colors.body
  const fontSize = getFontSize(size) || 16

  return (
    <Text
      {...rest}
      style={[style, { color: fontColor, fontSize }]}
    >
      {children}
    </Text>
  )
}

const getFontSize = (size: Props["size"]) => {
  switch (size) {
    case "caption1":
      return 10
    case "caption2":
      return 12
    case "body":
      return 16
    case "subTitle":
      return 24
    case "title":
      return 40
    default:
      return size
  }
}
