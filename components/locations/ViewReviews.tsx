import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

type User = {
  name: string;
  avatar?: any;
};

type Review = {
  user: User;
  rating: number;
  text: string;
  timeAgo: string;
};

type ViewReviewsProps = {
  title?: string;
  reviews: Review[];
  overallRating: number;
  totalReviews: number;
};

const ViewReviews = ({
  title = "Reviews",
  reviews,
  overallRating,
  totalReviews,
}: ViewReviewsProps) => {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-2">
        <Text className="text-lg font-bold">{title}</Text>

        <TouchableOpacity>
          <Text className="text-blue-500 font-medium">SHOW ALL</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center px-4 mb-2">
        <Text className="text-[30px] font-semibold mr-2">
          {overallRating.toFixed(1)}
        </Text>
        <View>
          <Text className="text-blue-500 text-sm">stellar</Text>
          <Text className="text-gray-500 text-sm">{totalReviews} reviews</Text>
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
            style={{ width: 260 }}
          >
            <View className="flex-row items-center mb-2">
              <Image
                source={review.user.avatar}
                className="w-12 h-12 rounded-full mr-2"
              />
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text
                    className="font-semibold text-base flex-1"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {review.user.name}
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

export default ViewReviews;
