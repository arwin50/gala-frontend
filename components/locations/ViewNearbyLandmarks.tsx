import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

type Location = {
  name: string;
  distance: string;
  image?: any;
};

type ViewNearbyLocationsProps = {
  sectionTitle: string;
  landmarks: Location[];
  onShowAll?: () => void;
  defaultImage?: any;
};

const ViewNearbyLocations = ({
  sectionTitle,
  landmarks,
  onShowAll,
  defaultImage,
}: ViewNearbyLocationsProps) => {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-2 px-4">
        <Text className="text-lg font-semibold">{sectionTitle}</Text>
        {onShowAll && (
          <TouchableOpacity onPress={onShowAll}>
            <Text className="text-blue-500 font-medium">SHOW ALL</Text>
          </TouchableOpacity>
        )}
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
              source={landmark.image || defaultImage}
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

export default ViewNearbyLocations;
