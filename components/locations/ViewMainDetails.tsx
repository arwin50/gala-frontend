import { categories } from "@/constants/categoryData";
import { AntDesign, Feather } from "@expo/vector-icons";
import { differenceInMonths, parseISO } from "date-fns";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AccommodationViewDisplayText from "./ViewDisplayText";

const { width } = Dimensions.get("window");

type ViewMainDetailsProps = {
  images: any[];
  title: string;
  address: string;
  description: string;
  category_id?: string;
  created_at: string;
  host: {
    name: string;
    image: any;
  };
};

const ViewMainDetails = ({
  images,
  title,
  address,
  description,
  host,
  category_id,
  created_at,
}: ViewMainDetailsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  const selectedCategory = categories.find((cat) => cat.id === category_id);
  const totalMonths = differenceInMonths(new Date(), parseISO(created_at));
  const durationDisplay =
    totalMonths >= 12
      ? `Posted ${Math.floor(totalMonths / 12)} year${
          Math.floor(totalMonths / 12) > 1 ? "s" : ""
        } ago`
      : `Posted ${totalMonths} month${totalMonths !== 1 ? "s" : ""} ago`;

  return (
    <View className="h-[600px] bg-transparent">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            className="h-full"
            style={{ width }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View className="flex-row justify-center -mt-5">
        {images.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              activeIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      <View className="py-4 bg-white rounded-b-2xl shadow-md shadow-black mt-2">
        <View className="mx-4 flex-row justify-between items-center">
          <Text className="text-2xl font-semibold flex-1">{title}</Text>
          <View className="flex-row ml-2">
            <TouchableOpacity className="ml-3">
              <Feather name="flag" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-3">
              <Feather name="share" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-3">
              <AntDesign name="hearto" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {selectedCategory && (
          <View className="mx-4 mt-2 mb-1 flex-row items-center">
            <Image
              source={selectedCategory.image}
              className="w-8 h-8 mr-2 rounded-sm"
              resizeMode="contain"
            />
            <Text className="font-bold text-lg text-gray-700">
              {selectedCategory.title}
            </Text>
          </View>
        )}

        <Text className="text-gray-600 mt-1 mx-4 w-[40%]">{address}</Text>

        <View className="bg-gray-200 my-3 py-5">
          <AccommodationViewDisplayText
            sectionTitle="Description"
            sectionContent={description}
          />
        </View>

        <View className="flex-row items-center mx-4">
          <Image source={host.image} className="w-16 h-16 rounded-full mr-3" />
          <View>
            <Text className="font-medium">Hosted by {host.name}</Text>
            <Text className="text-sm text-gray-500">{durationDisplay}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewMainDetails;
