import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import "./global.css";

SplashScreen.preventAutoHideAsync(); // Only if this layout manages loading

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      // Load fonts or do setup
      await new Promise((res) => setTimeout(res, 500));
      setReady(true);
      await SplashScreen.hideAsync();
    };
    load();
  }, []);

  if (!ready) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(unauthenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
}
