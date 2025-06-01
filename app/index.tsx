import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // Simulate loading or do actual setup here
      await new Promise((resolve) => setTimeout(resolve, 500)); // optional delay
      await SplashScreen.hideAsync();
      setAppReady(true);
    };
    prepare();
  }, []);

  if (!appReady) return null; // Or return a loading indicator

  return <Redirect href="/(unauthenticated)/login" />;
}
