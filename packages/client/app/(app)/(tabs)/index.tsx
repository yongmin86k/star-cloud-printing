import { useNavigation } from "expo-router"
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native"
import { useEffect } from "react"
import YText from "../../../components/YText"
import { useYColors } from "../../../hooks/generalHooks"
import SVG from "../../../components/SVG"

const dummyPrinters = Array.from({ length: 0 }, (_, i) => `Printer ${i + 1}`)

export default function Home() {
  const navigation = useNavigation()
  const colors = useYColors()

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView>
        <View style={{ paddingHorizontal: 24 }}>
          <FlatList
            numColumns={2}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <YText
                  size="subTitle"
                  style={{
                    marginTop: 32,
                    marginBottom: 16,
                    fontWeight: "bold",
                  }}
                >
                  Registered printers
                </YText>

                <TouchableOpacity
                  onPress={() => {
                    console.log("hi")
                  }}
                >
                  <SVG
                    name="add"
                    fill={colors.blue}
                    width={32}
                    height={32}
                  />
                </TouchableOpacity>
              </View>
            }
            ListHeaderComponentStyle={{ backgroundColor: colors.background }}
            ListFooterComponent={<View style={{ height: 24 }} />}
            data={dummyPrinters}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <YText style={{ marginVertical: 4 }}>{item}</YText>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
