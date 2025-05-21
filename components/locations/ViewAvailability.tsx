import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ViewAvailability = () => {
  return (
    <View className="mt-6 px-4">
      <Text className="text-lg font-bold mb-1">Availability</Text>
      <Text className="text-base font-medium mb-3">
        <Text className="text-gray-700">Target Dates:</Text> April 7 - 9
      </Text>

      <TouchableOpacity className="rounded-xl overflow-hidden">
        <LinearGradient
          colors={["#3B82F6", "#1D4ED8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="py-4 flex-row items-center justify-center rounded-xl"
        >
          <FontAwesome name="calendar" size={16} color="#fff" />
          <Text className="text-white font-semibold ml-2">
            Set dates for exact pricing
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ViewAvailability;
