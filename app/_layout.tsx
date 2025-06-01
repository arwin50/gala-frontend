import { Stack } from "expo-router";
import "./global.css";

// Your API base URL - replace with your actual API URL
const API_BASE_URL = "http://172.16.5.11:8000/api";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(unauthenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
}
