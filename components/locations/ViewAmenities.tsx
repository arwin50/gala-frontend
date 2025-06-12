import { Amenity } from "@/interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const colors = [
  "bg-blue-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-pink-100",
  "bg-purple-100",
  "bg-orange-100",
];

type ViewAmenitiesProps = {
  amenities: Amenity[];
  onShowAllPress?: () => void;
};

const ViewAmenities = ({ amenities, onShowAllPress }: ViewAmenitiesProps) => {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-2 px-4">
        <Text className="text-lg font-semibold">Amenities</Text>
        {onShowAllPress && (
          <TouchableOpacity onPress={onShowAllPress}>
            <Text className="text-blue-500 font-medium">SHOW ALL</Text>
          </TouchableOpacity>
        )}
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
            <FontAwesome5
              name={FontAwesome5.glyphMap[item.icon] ? item.icon : "question"} // fallback
              size={16}
            />
            <Text
              className="text-xs mt-1 text-center"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </View>
        ))}
        <View className="w-4" />
      </ScrollView>
    </View>
  );
};

export default ViewAmenities;
