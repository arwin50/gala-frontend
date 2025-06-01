import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(guest)" options={{ headerShown: false }} />
      <Stack.Screen name="(host)" options={{ headerShown: false }} />
    </Stack>
  );
}
