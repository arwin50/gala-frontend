import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const landmarks = [
  { name: "Hundred Islands", distance: "1.5KM" },
  { name: "St. Vicente Ferrer Shrine", distance: "1.5KM" },
  { name: "Lucap Wharf", distance: "2.0KM" },
];

const AccommodationViewNearbyLandmarks = () => {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-2 px-4">
        <Text className="text-lg font-semibold">Nearby Landmarks</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium">SHOW ALL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        {landmarks.map((landmark, index) => (
          <View
            key={index}
            className="relative mr-4 rounded-xl overflow-hidden"
            style={{ width: 140, height: 190 }}
          >
            <Image
              source={bgMetroManila}
              className="w-full h-full absolute"
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.7)"]}
              style={{
                position: "absolute",
                bottom: 0,
                height: 70,
                width: "100%",
                justifyContent: "flex-end",
                padding: 8,
              }}
            >
              <Text
                className="text-white text-sm font-semibold leading-tight"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {landmark.name}
              </Text>
              <Text className="text-white text-xs">{landmark.distance}</Text>
            </LinearGradient>
          </View>
        ))}
        <View className="w-4" />
      </ScrollView>
    </View>
  );
};

export default AccommodationViewNearbyLandmarks;
