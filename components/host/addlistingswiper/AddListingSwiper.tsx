import BasicInformation from "./BasicInformation";
import DetailsIntro from "./DetailsIntro";
import PlaceAmenitiesSlide from "./PlaceAmenitiesSlide";
import PlaceCancellationSlide from "./PlaceCancellationSlide";
import PlaceDescriptionSlide from "./PlaceDescriptionSlide";
import PlaceDiscountsSlide from "./PlaceDiscountsSlide";
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
import { LatLng } from "react-native-maps";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Swiper from "react-native-swiper";
import { MediaItem } from "../../../interfaces";
import { axiosPrivate } from "@/lib/axios/private";

interface AddListingSwiperProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AddListingSwiper({
  isVisible,
  onClose,
}: AddListingSwiperProps) {
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwiper, setShowSwiper] = useState(false);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [markerCoords, setMarkerCoords] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [guests, setGuests] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<{ id: number }[]>(
    []
  );
  const [selectedCancellationPolicy, setSelectedCancellationPolicy] =
    useState<any>();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [coverPhotoId, setCoverPhotoId] = useState<string | null>(null);
  const [placeName, setPlaceName] = useState<string>("");
  const [placeDescription, setPlaceDescription] = useState<string>("");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [cleaningFee, setCleaningFee] = useState<number>(75.0);
  const [serviceFee, setServiceFee] = useState<number>(32.5);
  const [taxes, setTaxes] = useState<number>(42.25);
  const [selectedPolicy, setSelectedPolicy] = useState<any>();
  // Verification state
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedDiscounts, setSelectedDiscounts] = useState<
    { type: string; percentage: number }[]
  >([]);
  const [verificationImage, setVerificationImage] = useState<string | null>(
    null
  );
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosPrivate.get("/user/user");
      setUser(response.data);
    };
    getUser();
  }, []);

  const swiperSlideCount = 13; // Total number of slides in the Swiper

  const handleNext = () => {
    if (swiperRef.current && currentIndex < swiperSlideCount - 1) {
      swiperRef.current.scrollBy(1);
    } else if (swiperRef.current && currentIndex === swiperSlideCount - 1) {
      createAccomodation();
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
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (isVisible) {
      setShowSwiper(false);
      setCurrentIndex(0);
      setSelectedType(null);
      setMarkerCoords(null);
      setLocationName("");
      setGuests(0);
      setBedrooms(0);
      setBathrooms(0);
      setSelectedAmenities([]);
      setMedia([]);
      setCoverPhotoId(null);
      setPlaceName("");
      setPlaceDescription("");
      setBasePrice(0);
      setCleaningFee(75.0);
      setServiceFee(32.5);
      setTaxes(42.25);
      setSelectedPolicy(null);
      setContactNumber("");
      setEmailAddress("");
      setVerificationImage(null);
      setSelectedDiscounts([]);
    }
  }, [isVisible]);

  const progressWidth = ((currentIndex + 1) / swiperSlideCount) * 100;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progressWidth}%`, { duration: 300 }),
    };
  });

  const createAccomodation = async () => {
    const submissionData = {
      host: user.email,
      category: selectedType?.id,
      name: placeName,
      description: placeDescription,
      location: locationName,
      latitude: markerCoords?.latitude.toFixed(6),
      longitude: markerCoords?.longitude.toFixed(6),
      max_guests: guests,
      media: [],
      blocked_event: [],
      maintenance_event: [],
      amenity: selectedAmenities,
      price: [
        {
          name: "Base Rate",
          price: basePrice.toFixed(2),
        },
        {
          name: "Cleaning Fee",
          price: cleaningFee.toFixed(2),
        },
        {
          name: "Service Fee",
          price: serviceFee.toFixed(2),
        },
        {
          name: "Taxes",
          price: taxes.toFixed(2),
        },
      ],
      cancellation_policy: {
        id: selectedCancellationPolicy.id,
      },
      policy: {
        id: selectedPolicy.id,
      },
    };

    console.log(
      "Submitting accommodation data:",
      JSON.stringify(submissionData, null, 2)
    );

    try {
      await axiosPrivate.post("/accomodation/", submissionData);
    } catch (err) {
      console.error("failed to create accomodation", err);
    }
  };

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
                <PlaceTypeSlide setSelectedType={setSelectedType} />
                <PlaceLocationSlide
                  setMarkerCoords={setMarkerCoords}
                  setLocationName={setLocationName}
                />

                <BasicInformation
                  setGuests={setGuests}
                  setBedrooms={setBedrooms}
                  setBathrooms={setBathrooms}
                />

                <PlaceAmenitiesSlide
                  setSelectedAmenities={setSelectedAmenities}
                />
                <PlaceMediaSlide
                  media={media}
                  setMedia={setMedia}
                  coverPhotoId={coverPhotoId}
                  setCoverPhotoId={setCoverPhotoId}
                />
                <PlaceNameSlide
                  placeName={placeName}
                  setPlaceName={setPlaceName}
                />
                <PlaceDescriptionSlide
                  placeDescription={placeDescription}
                  setPlaceDescription={setPlaceDescription}
                />
                <PlacePriceSlide
                  basePrice={basePrice}
                  setBasePrice={setBasePrice}
                  cleaningFee={cleaningFee}
                  setCleaningFee={setCleaningFee}
                  serviceFee={serviceFee}
                  setServiceFee={setServiceFee}
                  taxes={taxes}
                  setTaxes={setTaxes}
                />
                <PlaceDiscountsSlide
                  selectedDiscounts={selectedDiscounts}
                  setSelectedDiscounts={setSelectedDiscounts}
                />
                <PlaceCancellationSlide
                  selectedCancellationPolicy={selectedCancellationPolicy}
                  setSelectedCancellationPolicy={setSelectedCancellationPolicy}
                />
                <PlaceRulesSlide
                  selectedPolicy={selectedPolicy}
                  setSelectedPolicy={setSelectedPolicy}
                />
                <PlaceVerificationSlide
                  contactNumber={contactNumber}
                  setContactNumber={setContactNumber}
                  emailAddress={emailAddress}
                  setEmailAddress={setEmailAddress}
                  verificationImage={verificationImage}
                  setVerificationImage={setVerificationImage}
                />
                <SubmitPlace />
              </Swiper>
            )}
          </View>

          {showSwiper && (
            <>
              {/* Progress Bar */}
              <View className="px-6 py-2">
                <View className="h-1 bg-gray-200 rounded-full">
                  <Animated.View
                    className="h-1 bg-blue-600 rounded-full"
                    style={animatedStyle}
                  />
                </View>
                <Text className="text-gray-500 text-sm mt-1 text-right">
                  {currentIndex + 1} of {swiperSlideCount}
                </Text>
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
