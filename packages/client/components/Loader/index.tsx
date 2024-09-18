import { BlurView } from "expo-blur"
import { ActivityIndicator, View } from "react-native"
import {
  useYColors,
  useYLoader,
  useYLoadingMessage,
} from "../../hooks/generalHooks"
import YText from "../YText"

export default function Loader() {
  const colors = useYColors()
  const isAppLoading = useYLoader()
  const loadingMessage = useYLoadingMessage()

  if (!isAppLoading) return null

  return (
    <BlurView
      intensity={10}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.body,
          opacity: 0.8,
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.systemGray6}
        />

        {loadingMessage && (
          <YText
            color={colors.systemGray6}
            style={{
              marginTop: 16,
            }}
          >
            {loadingMessage}
          </YText>
        )}
      </View>
    </BlurView>
  )
}
