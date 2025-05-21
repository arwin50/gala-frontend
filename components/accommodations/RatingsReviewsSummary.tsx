import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const RatingsReviewsSummary = () => {
  return (
    <View className="flex-row items-center justify-between px-4 mt-6">
      <View className="flex-row items-center border-2 border-gray-300 rounded-full px-4 py-2 bg-white">
        <View className="absolute flex bg-blue-500 rounded-full h-16 w-16 px-2 py-1 items-center justify-center -left-1">
          <Text className="text-white font-bold text-2xl">4.5</Text>
        </View>
        <View className="flex-row ml-12 gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <FontAwesome
              key={i}
              name={i <= 4 ? "star" : "star-o"}
              size={24}
              color="#FFC107"
            />
          ))}
        </View>
      </View>
      <View className="flex flex-row items-center justify-center gap-2">
        <Text className="text-blank text-3xl font-bold">6969</Text>
        <Text className="text-gray-700 font-semibold">Reviews</Text>
      </View>
    </View>
  );
};

export default RatingsReviewsSummary;
