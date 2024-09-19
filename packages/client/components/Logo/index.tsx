import { View } from "react-native"
import { TColorVariables } from "../../modules/themes/ThemeModels"
import Svg, { Circle } from "react-native-svg"
import SVG from "../SVG"

interface Props {
  diameter: number
  iconSize: number
  backgroundColor: TColorVariables
  iconColor: TColorVariables
}

export default function Logo({
  diameter,
  iconSize,
  backgroundColor,
  iconColor,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: diameter,
        height: diameter,
      }}
    >
      <View
        style={{
          position: "absolute",
        }}
      >
        <Svg
          width={diameter}
          height={diameter}
        >
          <Circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={diameter / 2}
            fill={backgroundColor}
          />
        </Svg>
      </View>

      <SVG
        name="printer"
        width={iconSize}
        height={iconSize}
        fill={iconColor}
      />
    </View>
  )
}
