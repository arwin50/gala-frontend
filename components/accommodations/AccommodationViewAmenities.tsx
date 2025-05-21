import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const amenities = [
  { icon: "wifi", label: "Internet" },
  { icon: "utensils", label: "Kitchen" },
  { icon: "bath", label: "Bath" },
  { icon: "swimming-pool", label: "Pool" },
  { icon: "snowflake", label: "Aircon and Brunch" },
  { icon: "coffee", label: "Café" },
];

const colors = [
  "bg-blue-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-pink-100",
  "bg-purple-100",
  "bg-orange-100",
];

const AccommodationViewAmenities = () => {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-2 px-4">
        <Text className="text-lg font-semibold">Amenities</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium">SHOW ALL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        {amenities.map((item, index) => (
          <View
            key={index}
            className={`items-center justify-center mr-4 w-16 h-16 px-3 rounded-full ${
              colors[index % colors.length]
            }`}
          >
            <FontAwesome5 name={item.icon} size={16} />
            <Text
              className="text-xs mt-1 text-center"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.label}
            </Text>
          </View>
        ))}
        <View className="w-4" />
      </ScrollView>
    </View>
  );
};

export default AccommodationViewAmenities;
