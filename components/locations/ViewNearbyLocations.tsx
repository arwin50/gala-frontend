import { Accommodation } from "@/interfaces/accommodation";
import { Landmark } from "@/interfaces/landmark";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

type ViewNearbyLocationsBaseProps = {
  sectionTitle: string;
  onShowAll?: () => void;
  defaultImage?: any;
};

type AccommodationProps = ViewNearbyLocationsBaseProps & {
  locationType: "accommodation";
  locations: Accommodation[];
};

type LandmarkProps = ViewNearbyLocationsBaseProps & {
  locationType: "landmark";
  locations: Landmark[];
};

type ViewNearbyLocationsProps = AccommodationProps | LandmarkProps;

const ViewNearbyLocations = (props: ViewNearbyLocationsProps) => {
  const { sectionTitle, locations, onShowAll, defaultImage } = props;
  const router = useRouter();

  if (
    props.locationType !== "accommodation" &&
    props.locationType !== "landmark"
  ) {
    return null;
  }

  const handlePress = (id: string | number) => {
    router.push(`/${props.locationType}/${id}/page`);
  };

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
      {locations.length === 0 ? (
        <View className="w-full rounded-xl justify-center items-center p-4">
          <Text className="text-gray-500 text-center text-lg">
            No nearby {props.locationType}s
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {locations.map((location, index) => {
            const displayName =
              props.locationType === "accommodation"
                ? (location as Accommodation).title
                : (location as Landmark).name;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(location.id)}
                className="relative mr-4 rounded-xl overflow-hidden"
                style={{ width: 140, height: 190 }}
              >
                <Image
                  source={location.images[0] || defaultImage}
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
                    {displayName}
                  </Text>
                  <Text
                    className="text-white text-xs"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {location.location}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <View className="w-4" />
    </View>
  );
};

export default ViewNearbyLocations;
