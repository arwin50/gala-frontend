import React from "react";
import { View, Text, Pressable, ImageBackground, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { places } from "@/constants/placesData";

export default function FeaturedPlacesGrid() {
  return (
    <View className="gap-4">
      {places[0].isFeatured && (
        <Pressable
          onPress={() => console.log("Feature Card pressed")}
          className="rounded-xl overflow-hidden shadow-xl"
        >
          <ImageBackground
            source={places[0].background}
            resizeMode="cover"
            className="h-64 justify-end"
          >
            <View className="bg-white bg-opacity-90 flex-row items-center gap-2 px-3">
              <Image source={places[0].icon} className="w-16 h-16" />
              <View className="gap-0">
                <Text className="text-2xl font-bold text-blue-900 leading-none">
                  {places[0].name}
                </Text>
                <Text className="text-sm text-gray-600 leading-none">
                  {places[0].subtitle}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Pressable>
      )}

      <View className="flex-row flex-wrap justify-between">
        {places.slice(1).map((place, index) => (
          <Pressable
            key={index}
            onPress={() => console.log("This card pressed: ", place.name)}
            className="w-[48%] h-36 rounded-xl overflow-hidden shadow mb-3"
          >
            <ImageBackground
              source={place.background}
              resizeMode="cover"
              className="flex-1 justify-end"
            >
              <LinearGradient
                colors={["transparent", "#187CB1", "#43B3EF"]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 4,
                  gap: 6,
                }}
              >
                <Image source={place.icon} style={{ width: 36, height: 36 }} />
                <Text className="text-white font-semibold text-lg">
                  {place.name}
                </Text>
              </LinearGradient>
            </ImageBackground>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
