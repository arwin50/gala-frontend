import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Amenity, PlaceAmenitiesSlideProps } from "../../../interfaces";

const amenities: Amenity[] = [
  { name: "WiFi", icon: "wifi" },
  { name: "Pool", icon: "pool" },
  { name: "Kitchen", icon: "stove" },
  { name: "Parking", icon: "car" },
  { name: "Air Conditioning", icon: "snowflake" },
  { name: "TV", icon: "television" },
  { name: "Washer", icon: "washing-machine" },
  { name: "Gym", icon: "dumbbell" },
  { name: "Elevator", icon: "elevator" },
  { name: "Security", icon: "shield-check" },
];

export default function PlaceAmenitiesSlide({
  setSelectedAmenities,
  initialAmenities = [],
}: PlaceAmenitiesSlideProps) {
  const [selectedAmenities, setSelectedAmenitiesLocal] =
    useState<string[]>(initialAmenities);

  const toggleAmenity = (amenityName: string) => {
    const newSelectedAmenities = selectedAmenities.includes(amenityName)
      ? selectedAmenities.filter((name) => name !== amenityName)
      : [...selectedAmenities, amenityName];

    setSelectedAmenitiesLocal(newSelectedAmenities);
    setSelectedAmenities(newSelectedAmenities);
  };

  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        What amenities does your place have?
      </Text>
      <Text className="mt-2 text-description">
        Amenities can be changed after publishing your listing later.
      </Text>
      <ScrollView
        className="mt-8 mb-5 p-6 border border-line rounded-xl drop-shadow-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between">
          {amenities.map((amenity, i) => (
            <Pressable
              key={i}
              onPress={() => toggleAmenity(amenity.name)}
              className={`w-[30%] h-[100px] mb-4 shadow rounded-lg p-2 ${
                selectedAmenities.includes(amenity.name)
                  ? "bg-blue-50 border-2 border-blue-500"
                  : "bg-white"
              }`}
            >
              <View className="items-center justify-center h-full">
                <MaterialCommunityIcons
                  name={amenity.icon}
                  size={24}
                  color={
                    selectedAmenities.includes(amenity.name)
                      ? "#0066CC"
                      : "#666666"
                  }
                />
                <Text
                  className={`mt-1 text-center font-medium text-xs ${
                    selectedAmenities.includes(amenity.name)
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {amenity.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
