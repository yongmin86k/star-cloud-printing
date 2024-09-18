import { Tabs } from "expo-router"
import SVG from "../../../components/SVG"
import { useYColors } from "../../../hooks/generalHooks"
import { View } from "react-native"

export default function layout() {
  const colors = useYColors()
  const iconSize = 24

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarInactiveTintColor: colors.tabBar.inactive,
        tabBarActiveTintColor: colors.tabBar.active,
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: colors.systemGray6,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Printers",
          tabBarIcon: ({ color }) => (
            <SVG
              name="printer"
              width={iconSize}
              height={iconSize}
              fill={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SVG
              name="user"
              width={iconSize}
              height={iconSize}
              fill={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
