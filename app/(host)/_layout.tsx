import Feather from "@expo/vector-icons/Feather";
import { Tabs, usePathname } from "expo-router";
import { Image } from "react-native";

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: pathname.startsWith("/edit/") ? "none" : "flex",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "listings",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/host/listings.png")}
              style={{ width: 24, height: 31 }}
              className="scale-75"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/host/bookings.png")}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/host/calendar.png")}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={"#3898f1"} />
          ),
        }}
      />
      <Tabs.Screen
        name="edit/[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
