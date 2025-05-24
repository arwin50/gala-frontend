import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AccommodationViewDisplayTextProps {
  sectionTitle: string;
  sectionContent: string;
}

const ViewDisplayText: React.FC<AccommodationViewDisplayTextProps> = ({
  sectionTitle,
  sectionContent,
}) => {
  return (
    <View className="px-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold">{sectionTitle}</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium">REVIEW FULL</Text>
        </TouchableOpacity>
      </View>

      <Text
        className="text-sm text-gray-700 leading-relaxed text-justify"
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {sectionContent}
      </Text>
    </View>
  );
};

export default ViewDisplayText;
