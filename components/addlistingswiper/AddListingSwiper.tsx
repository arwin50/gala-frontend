import BasicInformation from "./BasicInformation";
import DetailsIntro from "./DetailsIntro";
import PlaceAmenitiesSlide from "./PlaceAmenitiesSlide";
import PlaceCancellationSlide from "./PlaceCancellationSlide";
import PlaceDescriptionSlide from "./PlaceDescriptionSlide";
import PlaceLocationSlide from "./PlaceLocationSlide";
import PlaceMediaSlide from "./PlaceMediaSlide";
import PlaceNameSlide from "./PlaceNameSlide";
import PlacePriceSlide from "./PlacePriceSlide";
import PlaceRulesSlide from "./PlaceRulesSlide";
import PlaceTypeSlide from "./PlaceTypeSlide";
import PlaceVerificationSlide from "./PlaceVerificationSlide";
import SubmitPlace from "./SubmitPlace";

import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

interface AddListingSwiperProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AddListingSwiper({
  isVisible,
  onClose,
}: AddListingSwiperProps) {
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwiper, setShowSwiper] = useState(false); // State to control showing Swiper or DetailsIntro

  const swiperSlideCount = 12; // Total number of slides in the Swiper

  const handleNext = () => {
    if (swiperRef.current && currentIndex < swiperSlideCount - 1) {
      swiperRef.current.scrollBy(1);
    } else if (swiperRef.current && currentIndex === swiperSlideCount - 1) {
      onClose(); // Close modal when done
    }
  };

  const handlePrevious = () => {
    if (swiperRef.current && currentIndex > 0) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const handleGetStarted = () => {
    setShowSwiper(true);
    setCurrentIndex(0); // Start from the first slide when swiper is shown
  };

  // Logic for visible dots pagination
  const totalDots = swiperSlideCount;
  const dotsToShow = 5;

  let firstVisibleDotIndex = Math.max(
    0,
    currentIndex - Math.floor(dotsToShow / 2)
  );
  let lastVisibleDotIndex = Math.min(
    totalDots - 1,
    firstVisibleDotIndex + dotsToShow - 1
  );

  if (lastVisibleDotIndex - firstVisibleDotIndex + 1 < dotsToShow) {
    firstVisibleDotIndex = Math.max(0, lastVisibleDotIndex - dotsToShow + 1);
  }

  const visibleDots = Array.from({
    length: lastVisibleDotIndex - firstVisibleDotIndex + 1,
  }).map((_, i) => firstVisibleDotIndex + i);

  // Reset index and showSwiper when modal becomes visible
  useEffect(() => {
    if (isVisible) {
      setShowSwiper(false); // Start with DetailsIntro
      setCurrentIndex(0); // Reset index
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 bg-black/30 justify-end ">
        <View className="bg-white rounded-t-2xl h-[90%] ">
          <TouchableOpacity onPress={onClose} className="m-8 self-end">
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>

          <View className="flex-1 ">
            {!showSwiper ? (
              <DetailsIntro onGetStarted={handleGetStarted} />
            ) : (
              <Swiper
                ref={swiperRef}
                index={currentIndex}
                loop={false}
                showsPagination={false}
                onIndexChanged={(index) => setCurrentIndex(index)}
              >
                <PlaceTypeSlide />
                <PlaceLocationSlide />
                <BasicInformation />
                <PlaceAmenitiesSlide />
                <PlaceMediaSlide />
                <PlaceNameSlide />
                <PlaceDescriptionSlide />
                <PlacePriceSlide />
                <PlaceCancellationSlide />
                <PlaceRulesSlide />
                <PlaceVerificationSlide />
                <SubmitPlace />
              </Swiper>
            )}
          </View>

          {showSwiper && ( // Only show pagination and navigation if swiper is visible
            <>
              {/* Pagination Dots */}
              <View className="flex-row justify-center py-2">
                {visibleDots.map((dotIndex) => (
                  <View
                    key={dotIndex}
                    className={`w-2 h-2 mx-1 rounded-full ${
                      dotIndex === currentIndex ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                ))}
              </View>

              {/* Navigation Buttons */}
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
                <TouchableOpacity onPress={handleNext} className="w-[40%]">
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
                      currentIndex === swiperSlideCount - 1
                        ? "opacity-50"
                        : "bg-gray-800"
                    }`}
                  >
                    <Text className="  py-3  text-xl text-white font-semibold text-center">
                      {currentIndex === swiperSlideCount - 1 ? "Done" : "Next"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
