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
  const vividColors = ["#005ac5", "#7bcb52", "#ee4d7c", "#ce6491", "#f4c200"];

  const getRandomColor = () => {
    return vividColors[Math.floor(Math.random() * vividColors.length)];
  };

  const getRandomPicsumUrl = () => {
    const randomId = Math.floor(Math.random() * 999) + 1;
    return { uri: `https://picsum.photos/seed/${randomId}/200` };
  };

  const handlePress = (landmarkId: number) => {
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
              className="flex flex-row justify-start items-center px-3 gap-8 overflow-hidden w-full h-14 ml-10 -mt-8 overflow-hidden"
            >
              <View
                className="absolute inset-0 opacity-[0.60]"
                style={{ backgroundColor: randomColor }}
              />
              <View
                className="absolute bg-[#2b43be] rounded-full h-32 w-32 left-[-50] border-[0.1px] border-gray-900"
                style={{
                  backgroundColor: randomColor,
                  shadowColor: "#000",
                  shadowOffset: { width: 1, height: 6 },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  elevation: 8,
                }}
              ></View>
              <Image source={place.icon} style={{ width: 36, height: 36 }} />
              <Text className="text-[47px] font-bold text-white">
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
                          numberOfLines={1}
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
