import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1D4ED8", // Tailwind blue-700
        tabBarInactiveTintColor: "#6B7280", // Tailwind gray-500
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB", // Tailwind gray-200
          height: 100,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "800",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/addlisting/homeWithGirl.png")}
              className="w-8 h-8"
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="accommodation/[accommodationId]/page"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="landmark/[landmarkId]/page"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="accommodation/page"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="landmark/page"
        options={{ headerShown: false, href: null }}
      />
    </Tabs>
  );
}
