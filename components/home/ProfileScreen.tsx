import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";

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

export default function ProfileScreen() {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative bg-blue-600 h-48">
        <Text className="text-white font-bold text-xl mt-10 ml-8">Profile</Text>
        <View className="w-full h-full">
          <Svg
            width="100%"
            height="100%"
            viewBox="0 0 100 20"
            className="absolute bottom-0 left-0 right-0"
          >
            <Ellipse cx="50" cy="23" rx="55" ry="20" fill="white" />
          </Svg>
        </View>
      </View>

      <View className="items-center -mt-24">
        <Image
          source={{
            uri: "https://billboardphilippines.com/wp-content/uploads/2024/12/bini-digital-in-article-2.jpg",
          }} // Replace with your actual image
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <Text className="text-2xl font-bold mt-2">BINI Jhoanna</Text>
        <Text className="text-gray-500">Guest/Host</Text>
      </View>

      <View className="mt-8">
        <View className="flex-row justify-between items-center px-8">
          <Text className="text-xl text-black">Push Notifications</Text>
          <Switch
            trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
            thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#D1D5DB"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <Text className="text-xl font-semibold mt-4 px-8">Hosting</Text>
        <RippleItem
          label="List Your Space"
          onPress={() => router.push("/(host)")}
        />
        <RippleItem
          label="Personal Information"
          onPress={() => console.log("Go to personal info")}
        />
        <RippleItem label="Payments" />
        <RippleItem label="Login & security" />
        <RippleItem label="Notifications" />
        <RippleItem label="Privacy and sharing" />
      </View>
    </ScrollView>
  );
}
