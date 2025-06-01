import Octicons from "@expo/vector-icons/Octicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function HostMenuPage() {
  return (
    <SafeAreaView className="flex-1 justify-between items-center">
      <Text>Menu</Text>

      <TouchableOpacity
        onPress={() => router.replace("/(authenticated)/(guest)/home")}
        className="m-4"
      >
        <LinearGradient
          colors={["#166EF3", "#2665BE"]}
          locations={[0.32, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 25,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            gap: 6,
          }}
        >
          <Octicons name="arrow-switch" size={20} color="white" />
          <Text className="text-white font-semibold text-lg ml-4">
            Switch to Guest
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
