import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const reviews = [
  {
    name: "BINI Mikha",
    rating: 4,
    text: "I saw a racoon! LOL! I was scared but the stay was good",
    timeAgo: "1 month ago",
  },
  {
    name: "BINI Gwen-dolyn Garcia",
    rating: 4,
    text: "My members saw a racoon! LOL! I wanna go back but my bebe is just too busy",
    timeAgo: "12 months ago",
  },
];

const AccommodationViewReviews = () => {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-2">
        <Text className="text-lg font-bold">Reviews</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium">SHOW ALL</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center px-4 mb-2">
        <Text className="text-[30px] font-semibold mr-2">4.5</Text>
        <View className="flex-col text-sm">
          <Text className="text-blue-500 text-sm">stellar</Text>
          <Text className="text-gray-500 text-sm">6969 reviews</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        {reviews.map((review, index) => (
          <View
            key={index}
            className="bg-gray-200 rounded-2xl p-3 mr-3"
            style={{ width: 260 }} // wider card
          >
            <View className="flex-row items-center mb-2">
              <Image
                source={bgMetroManila}
                className="w-12 h-12 rounded-full mr-2"
              />
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text
                    className="font-semibold text-base flex-1"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {review.name}
                  </Text>
                  <Text className="text-gray-500 text-xs ml-2 whitespace-nowrap">
                    {review.timeAgo}
                  </Text>
                </View>

                <View className="flex-row mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesome
                      key={i}
                      name="star"
                      size={12}
                      color={i < review.rating ? "#facc15" : "#A29E9E"}
                    />
                  ))}
                </View>
              </View>
            </View>

            <Text
              className="text-sm text-black text-justify"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {review.text}
            </Text>
          </View>
        ))}
        <View className="w-4" />
      </ScrollView>
    </View>
  );
};

export default AccommodationViewReviews;
