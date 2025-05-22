import { Tabs } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ headerShown: false, title: "Home" }}
      />
      <Tabs.Screen
        name="property/[propertyId]/page"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="landmark/[landmarkId]/page"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="property/page"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="landmark/page"
        options={{ headerShown: false, href: null }}
      />
    </Tabs>
  );
}
