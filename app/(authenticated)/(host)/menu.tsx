import Octicons from "@expo/vector-icons/Octicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function RippleItem({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  const [animation] = useState(new Animated.Value(0));

  const animate = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  const handlePressIn = () => {
    animate();
  };

  const handlePress = () => {
    if (onPress) onPress();
  };

  const bgTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["-100%", "100%"],
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPress={handlePress}
      className="relative overflow-hidden py-4 px-8"
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "150%",
          backgroundColor: "#e5e7eb",
          transform: [{ translateX: bgTranslate }],
          opacity: 0.3,
        }}
      />
      <Text className="text-xl text-black z-10">{label}</Text>
    </Pressable>
  );
}

export default function HostMenuPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="relative bg-blue-600 h-48">
          <Text className="text-white font-bold text-xl mt-10 ml-8">
            Host Menu
          </Text>
        </View>

        <View className="mt-8">
          <RippleItem
            label="Personal Information"
            onPress={() => console.log("Go to personal info")}
          />
          <RippleItem
            label="Payments"
            onPress={() => console.log("Go to payments")}
          />
          <RippleItem
            label="Login & security"
            onPress={() => console.log("Go to security")}
          />
          <RippleItem
            label="Notifications"
            onPress={() => console.log("Go to notifications")}
          />
          <RippleItem
            label="Privacy and sharing"
            onPress={() => console.log("Go to privacy")}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.replace("/(authenticated)/(guest)/home")}
        className="m-4 self-center absolute bottom-0"
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
          <Text className="text-white font-semibold text-lg px-4">
            Switch to Guest
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
