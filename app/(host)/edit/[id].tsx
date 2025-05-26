import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LatLng } from "react-native-maps";
import GenericModal from "../../../components/common/GenericModal";
import BasicInformation from "../../../components/host/addlistingswiper/BasicInformation";
import PlaceAmenitiesSlide from "../../../components/host/addlistingswiper/PlaceAmenitiesSlide";
import PlaceCancellationSlide from "../../../components/host/addlistingswiper/PlaceCancellationSlide";
import PlaceDescriptionSlide from "../../../components/host/addlistingswiper/PlaceDescriptionSlide";
import PlaceDiscountsSlide from "../../../components/host/addlistingswiper/PlaceDiscountsSlide";
import PlaceLocationSlide from "../../../components/host/addlistingswiper/PlaceLocationSlide";
import PlaceMediaSlide from "../../../components/host/addlistingswiper/PlaceMediaSlide";
import PlaceNameSlide from "../../../components/host/addlistingswiper/PlaceNameSlide";
import PlacePriceSlide from "../../../components/host/addlistingswiper/PlacePriceSlide";
import PlaceRulesSlide from "../../../components/host/addlistingswiper/PlaceRulesSlide";
import PlaceTypeSlide from "../../../components/host/addlistingswiper/PlaceTypeSlide";
import PlaceVerificationSlide from "../../../components/host/addlistingswiper/PlaceVerificationSlide";
import {
  CancellationPolicy,
  MediaItem,
  PlaceProperty,
  SetRulesState,
  ToggleRulesState,
} from "../../../interfaces";

export default function HostMenuPage() {
  // Modal visibility states
  const [isPropertyTypeModalVisible, setIsPropertyTypeModalVisible] =
    useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] =
    useState(false);
  const [isAmenitiesModalVisible, setIsAmenitiesModalVisible] = useState(false);
  const [isCancellationModalVisible, setIsCancellationModalVisible] =
    useState(false);
  const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isBasicInfoModalVisible, setIsBasicInfoModalVisible] = useState(false);
  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    useState(false);
  const [isDiscountsModalVisible, setIsDiscountsModalVisible] = useState(false);

  // Property state
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [markerCoords, setMarkerCoords] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [guests, setGuests] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [coverPhotoId, setCoverPhotoId] = useState<string | null>(null);
  const [placeName, setPlaceName] = useState<string>("");
  const [placeDescription, setPlaceDescription] = useState<string>("");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [selectedPolicy, setSelectedPolicy] = useState<CancellationPolicy>({
    name: "Flexible",
    description:
      "Full refund for cancellations made up to 24 hours before check-in. Cancellations made less than 24 hours in advance: no refund for the first night or first service, remainder refunded.",
  });

  // Rules state
  const [toggleRules, setToggleRules] = useState<ToggleRulesState>({
    "Pets allowed": false,
    "Events allowed": false,
    "Smoking allowed": false,
  });
  const [setRuleValues, setSetRuleValues] = useState<SetRulesState>({});
  const [additionalRules, setAdditionalRules] = useState<string[]>([]);

  // Contact state
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [verificationImage, setVerificationImage] = useState<string | null>(
    null
  );

  // Discount state
  const [selectedDiscounts, setSelectedDiscounts] = useState<
    { type: string; percentage: number }[]
  >([]);

  const handleSave = () => {
    const property: PlaceProperty = {
      placeName,
      type: selectedType,
      location: {
        name: locationName,
        coordinates: markerCoords,
      },
      capacity: {
        guests,
        bedrooms,
        bathrooms,
      },
      amenities: selectedAmenities,
      media: {
        items: media,
        coverPhotoId,
      },
      description: {
        name: placeName,
        text: placeDescription,
      },
      pricing: {
        basePrice,
      },
      policies: {
        cancellation: selectedPolicy,
      },
      rules: {
        toggle: toggleRules,
        set: setRuleValues,
        additional: additionalRules,
      },
      contact: {
        phone: contactNumber,
        email: emailAddress,
      },
      verification: {
        image: verificationImage,
      },
      discounts: selectedDiscounts,
    };

    console.log("=== UPDATED PROPERTY DETAILS ===");
    console.log(JSON.stringify(property, null, 2));
    // TODO: Add API call to update property
  };

  return (
    <SafeAreaView className="flex-1 justify-between items-center">
      <View className="flex-row w-full px-4 items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="self-start">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-2xl font-bold mr-8">
          Accommodation Editor
        </Text>
      </View>
      <ScrollView className="flex-1 p-4 w-full mt-4">
        <TouchableOpacity onPress={() => setIsNameModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Title</Text>
            <Text className="p-2">{placeName || "Enter property name"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPropertyTypeModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Property Type</Text>
            <Text className="p-2">
              {selectedType || "Select property type"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLocationModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Location</Text>
            <Text className="p-2">{locationName || "Set location"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsBasicInfoModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">
              Basic Information
            </Text>
            <Text className="p-2">
              {guests > 0 || bedrooms > 0 || bathrooms > 0
                ? `${guests} guests, ${bedrooms} bedrooms, ${bathrooms} bathrooms`
                : "Set basic information"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsMediaModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Media</Text>
            <Text className="p-2">
              {media.length ? `${media.length} items` : "Add photos or videos"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPriceModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Price</Text>
            <Text className="p-2">
              {basePrice ? `₱${basePrice}` : "Set price"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDescriptionModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Description</Text>
            <Text className="p-2">
              {placeDescription || "Enter description"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsAmenitiesModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Amenities</Text>
            <Text className="p-2">
              {selectedAmenities.length
                ? `${selectedAmenities.length} selected`
                : "Select amenities"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsCancellationModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">
              Cancellation Policy
            </Text>
            <Text className="p-2">{selectedPolicy.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRulesModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Rules</Text>
            <Text className="p-2">
              {Object.keys(toggleRules).length ? "Rules set" : "Set rules"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVerificationModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">
              Verification & Contact
            </Text>
            <Text className="p-2">
              {verificationImage
                ? "ID verified"
                : "Verify ID and contact details"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDiscountsModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">Discounts</Text>
            <Text className="p-2">
              {selectedDiscounts.length
                ? `${selectedDiscounts.length} discount${
                    selectedDiscounts.length > 1 ? "s" : ""
                  } set`
                : "Set discounts"}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        onPress={handleSave}
        className="w-full p-4 bg-blue-600 mb-4"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Save Changes
        </Text>
      </TouchableOpacity>

      <GenericModal
        isVisible={isNameModalVisible}
        onClose={() => setIsNameModalVisible(false)}
      >
        <PlaceNameSlide placeName={placeName} setPlaceName={setPlaceName} />
      </GenericModal>

      <GenericModal
        isVisible={isPropertyTypeModalVisible}
        onClose={() => setIsPropertyTypeModalVisible(false)}
      >
        <PlaceTypeSlide
          setSelectedType={setSelectedType}
          initialType={selectedType}
        />
      </GenericModal>

      <GenericModal
        isVisible={isLocationModalVisible}
        onClose={() => setIsLocationModalVisible(false)}
      >
        <PlaceLocationSlide
          setMarkerCoords={setMarkerCoords}
          setLocationName={setLocationName}
          initialMarkerCoords={markerCoords}
          initialLocationName={locationName}
        />
      </GenericModal>

      <GenericModal
        isVisible={isMediaModalVisible}
        onClose={() => setIsMediaModalVisible(false)}
      >
        <PlaceMediaSlide
          media={media}
          setMedia={setMedia}
          coverPhotoId={coverPhotoId}
          setCoverPhotoId={setCoverPhotoId}
        />
      </GenericModal>

      <GenericModal
        isVisible={isPriceModalVisible}
        onClose={() => setIsPriceModalVisible(false)}
      >
        <PlacePriceSlide basePrice={basePrice} setBasePrice={setBasePrice} />
      </GenericModal>

      <GenericModal
        isVisible={isDescriptionModalVisible}
        onClose={() => setIsDescriptionModalVisible(false)}
      >
        <PlaceDescriptionSlide
          placeDescription={placeDescription}
          setPlaceDescription={setPlaceDescription}
        />
      </GenericModal>

      <GenericModal
        isVisible={isAmenitiesModalVisible}
        onClose={() => setIsAmenitiesModalVisible(false)}
      >
        <PlaceAmenitiesSlide
          setSelectedAmenities={setSelectedAmenities}
          initialAmenities={selectedAmenities}
        />
      </GenericModal>

      <GenericModal
        isVisible={isCancellationModalVisible}
        onClose={() => setIsCancellationModalVisible(false)}
      >
        <PlaceCancellationSlide
          selectedPolicy={selectedPolicy}
          setSelectedPolicy={setSelectedPolicy}
        />
      </GenericModal>

      <GenericModal
        isVisible={isRulesModalVisible}
        onClose={() => setIsRulesModalVisible(false)}
      >
        <PlaceRulesSlide
          toggleRules={toggleRules}
          setToggleRules={setToggleRules}
          setRuleValues={setRuleValues}
          setSetRuleValues={setSetRuleValues}
          additionalRules={additionalRules}
          setAdditionalRules={setAdditionalRules}
        />
      </GenericModal>

      <GenericModal
        isVisible={isBasicInfoModalVisible}
        onClose={() => setIsBasicInfoModalVisible(false)}
      >
        <BasicInformation
          setGuests={setGuests}
          setBedrooms={setBedrooms}
          setBathrooms={setBathrooms}
          initialGuests={guests}
          initialBedrooms={bedrooms}
          initialBathrooms={bathrooms}
        />
      </GenericModal>

      <GenericModal
        isVisible={isDiscountsModalVisible}
        onClose={() => setIsDiscountsModalVisible(false)}
      >
        <PlaceDiscountsSlide
          selectedDiscounts={selectedDiscounts}
          setSelectedDiscounts={setSelectedDiscounts}
        />
      </GenericModal>
      <GenericModal
        isVisible={isVerificationModalVisible}
        onClose={() => setIsVerificationModalVisible(false)}
      >
        <PlaceVerificationSlide
          contactNumber={contactNumber}
          setContactNumber={setContactNumber}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          verificationImage={verificationImage}
          setVerificationImage={setVerificationImage}
        />
      </GenericModal>
    </SafeAreaView>
  );
}
