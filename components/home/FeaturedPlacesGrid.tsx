import { places } from "@/constants/placesData";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FeaturedPlacesGrid() {
  const router = useRouter();
  const vividColors = [
    "#E85A4F", // Muted coral red
    "#C9A96E", // Soft golden yellow
    "#4A9B8E", // Muted teal
    "#6B9AC4", // Soft blue
    "#B48EAD", // Dusty rose
  ];

  const getRandomColor = () => {
    return vividColors[Math.floor(Math.random() * vividColors.length)];
  };

  const getTransparentColor = (color: string) => {
    return color + "30";
  };

  const getRandomPicsumUrl = () => {
    const randomId = Math.floor(Math.random() * 999) + 1;
    return { uri: `https://picsum.photos/seed/${randomId}/200` };
  };

  const handlePress = (landmarkId: string) => {
    router.replace({
      pathname: "/(guest)/landmark/[landmarkId]/page",
      params: { landmarkId: landmarkId },
    });
  };

  return (
    <View className="mt-8 gap-14">
      {places.map((place, index) => {
        const randomColor = getRandomColor();
        return (
          <View
            key={index}
            className="bg-gray-200"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            }}
          >
            <ImageBackground
              source={place.background}
              resizeMode="cover"
              className="flex flex-row justify-start items-center py-2 px-3 gap-9 overflow-hidden w-full ml-10 -mt-8"
            >
              <View
                className="absolute inset-0 opacity-[0.85]"
                style={{ backgroundColor: randomColor }}
              />
              <View className="absolute bg-[#1b33be] rounded-full h-32 w-32 opacity-75 left-[-50]" />
              <Image source={place.icon} style={{ width: 36, height: 36 }} />
              <Text className="text-lg font-semibold text-white">
                {place.name}
              </Text>
            </ImageBackground>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pl-4 pt-4 pb-7"
              contentContainerStyle={{ gap: 16 }}
            >
              {place.landmarks.map((landmark, landmarkIndex) => {
                const randomImageUrl = getRandomPicsumUrl(); // Generate once per landmark
                return (
                  <TouchableOpacity
                    key={landmarkIndex}
                    className="w-40 h-40 rounded-lg overflow-hidden"
                    onPress={() => handlePress(landmark.id)}
                  >
                    <ImageBackground
                      source={randomImageUrl}
                      resizeMode="cover"
                      className="w-full h-full justify-end pl-3 py-3"
                    >
                      <View className="bg-black/[0.68] rounded p-2">
                        <Text
                          className="text-sm font-semibold text-white"
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {landmark.name}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
}
