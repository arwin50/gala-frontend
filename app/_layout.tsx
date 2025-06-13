import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(unauthenticated)"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
