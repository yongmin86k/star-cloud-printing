import { SafeAreaView, View } from 'react-native'
import YButton from '../../../components/YButton'
import { useAppDispatch } from '../../../stores/hooks/rootHooks'
import { setCredential } from '../../../stores/slices/appSlice'
import { useYColors, useYCredential } from '../../../hooks/generalHooks'
import { API_V1 } from 'star-cloud-printing-shared'

export default function Settings() {
  const colors = useYColors()
  const credential = useYCredential()
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
            onPress: async () => {
              if (!credential?.userName) {
                return
              }

              await API_V1.logout({ userName: credential.userName })
              dispatch(setCredential())
            },
          }}
        />
      </SafeAreaView>
    </View>
  )
}
