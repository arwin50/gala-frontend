import { Stack } from "expo-router";
import { useEffect } from "react";
import { initApiWithAuth } from "../lib/api-client";
import "./global.css";

// Your API base URL - replace with your actual API URL
const API_BASE_URL = "http://172.20.2.207:8000/api";

export default function RootLayout() {
  useEffect(() => {
    // Initialize API client when the app starts
    initApiWithAuth(API_BASE_URL);
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(host)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false, title: "" }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
