import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type PropertyType = {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const propertyTypes: PropertyType[] = [
  { name: "Hotel", icon: "bed" },
  { name: "Homestay", icon: "home" },
  { name: "Event Place", icon: "party-popper" },
  { name: "Resort", icon: "umbrella-beach" },
  { name: "Villa", icon: "home-group" },
  { name: "Condo", icon: "office-building-cog" },
];

export default function PlaceTypeSlide() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <View className="flex-1  m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        What type of property is your place?
      </Text>
      <ScrollView
        className="mt-8 mb-5 p-6 border border-line rounded-xl drop-shadow-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between relative">
          {propertyTypes.map((type, i) => (
            <Pressable
              key={i}
              onPress={() => setSelectedType(type.name)}
              className={`w-[48%] h-[140px] mb-8 shadow rounded-lg p-4 ${
                selectedType === type.name
                  ? "bg-blue-50 border-2 border-blue-500"
                  : "bg-white"
              }`}
            >
              <View className="items-center justify-center h-full">
                <MaterialCommunityIcons
                  name={type.icon}
                  size={32}
                  color={selectedType === type.name ? "#0066CC" : "#666666"}
                />
                <Text
                  className={`mt-2 text-center font-medium ${
                    selectedType === type.name
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {type.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
