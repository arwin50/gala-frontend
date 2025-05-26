import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1D4ED8",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
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
              source={require("@/assets/tabs/home.png")}
              className="w-8 h-8"
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          headerShown: false,
          title: "Bookings",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/tabs/bookings.png")}
              className="w-8 h-8"
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown: false,
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/tabs/favorites.png")}
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
