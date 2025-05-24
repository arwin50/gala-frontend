import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AccommodationViewReserveOverlay = () => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200 shadow-md shadow-black">
      <View className="flex-row justify-between items-center">
        <View className="flex-1 mr-3">
          <Text className="text-sm font-semibold text-black">
            Book for 2 nights - April 7 - 9
          </Text>
          <Text className="text-green-600 font-bold text-lg">₱6,909</Text>
          <Text className="text-red-500 text-xs">-26% off today</Text>
          <Text className="text-gray-500 text-xs">
            Booking can be cancelled
          </Text>
        </View>

        <TouchableOpacity className="bg-blue-600 px-5 py-3 rounded-xl">
          <Text className="text-white font-semibold">Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccommodationViewReserveOverlay;
