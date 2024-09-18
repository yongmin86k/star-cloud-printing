import { SafeAreaView, View } from "react-native"
import YButton from "../../../components/YButton"
import { useAppDispatch } from "../../../stores/hooks/rootHooks"
import { setToken } from "../../../stores/slices/appSlice"
import { useYColors } from "../../../hooks/generalHooks"

export default function Settings() {
  const colors = useYColors()
  const dispatch = useAppDispatch()

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView>
        <YButton
          title="remove token"
          touchableProps={{
            style: {
              marginVertical: 32,
            },
            onPress: () => {
              dispatch(setToken())
            },
          }}
        />
      </SafeAreaView>
    </View>
  )
}
