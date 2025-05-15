import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";

// Import step components
import BasicInformation from "@/components/addlistingswiper/BasicInformation";
import DetailsIntro from "@/components/addlistingswiper/DetailsIntro";
import PlaceLocationSlide from "@/components/addlistingswiper/PlaceLocationSlide";
import PlaceTypeSlide from "@/components/addlistingswiper/PlaceTypeSlide";

export default function HostHomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleNext = () => {
    if (swiperRef.current && currentIndex < 3) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrevious = () => {
    if (swiperRef.current && currentIndex > 0) {
      console.log(currentIndex, "sadd");
      swiperRef.current.scrollBy(-1);
    }
  };

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  return (
    <SafeAreaView className="flex-1">
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        className="m-5 p-4 rounded-lg bg-gray-200 items-center"
      >
        <Text className="text-base font-semibold">Add Listing</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="slide">
        <View className="flex-1 bg-black/30 justify-end ">
          <View className="bg-white rounded-t-2xl h-[90%] ">
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                setCurrentIndex(-1);
              }}
              className="m-8 self-end"
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>

            {/* Swiper Section */}
            <View className="flex-1 ">
              {currentIndex === -1 ? (
                <DetailsIntro onGetStarted={() => setCurrentIndex(0)} />
              ) : (
                <Swiper
                  ref={swiperRef}
                  index={currentIndex}
                  loop={false}
                  showsPagination
                  onIndexChanged={(index) => setCurrentIndex(index)}
                  dotStyle={{ backgroundColor: "#ccc" }}
                  activeDotStyle={{ backgroundColor: "#000" }}
                >
                  <PlaceTypeSlide />
                  <PlaceLocationSlide />
                  <BasicInformation />
                </Swiper>
              )}
            </View>

            {/* Navigation Buttons */}
            {currentIndex >= 0 && (
              <View className="flex-row justify-evenly px-6 py-4 w-full mb-10">
                <TouchableOpacity
                  onPress={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`w-[40%] py-3  rounded-full ${
                    currentIndex === 0 ? "bg-gray-300" : "bg-line"
                  }`}
                >
                  <Text className="text-xl text-white font-semibold text-center">
                    Back
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNext}
                  disabled={currentIndex === 2}
                  className="w-[40%]"
                >
                  <LinearGradient
                    colors={["#166EF3", "#2665BE"]}
                    locations={[0.32, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      borderRadius: 25,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 5,
                    }}
                    className={` rounded-full ${
                      currentIndex === 2 ? "bg-gray-300" : "bg-gray-800"
                    }`}
                  >
                    <Text className="  py-3  text-xl text-white font-semibold text-center">
                      {currentIndex === 2 ? "Done" : "Next"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
