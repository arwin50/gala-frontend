import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const images = [
  bgMetroManila,
  bgMetroManila,
  bgMetroManila,
  bgMetroManila,
  bgMetroManila,
];

const AccommodationViewMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  return (
    <View className="h-[450px] bg-transparent">
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

      <View className="p-4 bg-white rounded-b-2xl shadow-md shadow-black mt-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-semibold flex-1">
            Gynkui Killa Dormitory
          </Text>
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

        <Text className="text-gray-600 mt-1">Alaminos, Pangasinan</Text>
        <Text className="text-gray-500 mb-3">Tallano Gold, 4 Bedroom</Text>

        <View className="flex-row items-center mt-3">
          <Image
            source={bgMetroManila}
            className="w-16 h-16 rounded-full mr-3"
          />
          <View>
            <Text className="font-medium">Hosted by BINI Aiah</Text>
            <Text className="text-xs text-gray-500">2 years hosting</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccommodationViewMain;
