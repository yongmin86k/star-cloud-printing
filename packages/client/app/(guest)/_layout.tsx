import { Stack } from "expo-router"

export default function layout() {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="confirm-email" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  )
}
