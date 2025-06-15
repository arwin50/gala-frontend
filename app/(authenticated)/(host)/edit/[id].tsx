import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LatLng } from "react-native-maps";
import GenericModal from "../../../../components/common/GenericModal";
import BasicInformation from "../../../../components/host/addlistingswiper/BasicInformation";
import PlaceAmenitiesSlide from "../../../../components/host/addlistingswiper/PlaceAmenitiesSlide";
import PlaceCancellationSlide from "../../../../components/host/addlistingswiper/PlaceCancellationSlide";
import PlaceDescriptionSlide from "../../../../components/host/addlistingswiper/PlaceDescriptionSlide";
import PlaceDiscountsSlide from "../../../../components/host/addlistingswiper/PlaceDiscountsSlide";
import PlaceLocationSlide from "../../../../components/host/addlistingswiper/PlaceLocationSlide";
import PlaceMediaSlide from "../../../../components/host/addlistingswiper/PlaceMediaSlide";
import PlaceNameSlide from "../../../../components/host/addlistingswiper/PlaceNameSlide";
import PlacePriceSlide from "../../../../components/host/addlistingswiper/PlacePriceSlide";
import PlaceRulesSlide from "../../../../components/host/addlistingswiper/PlaceRulesSlide";
import PlaceTypeSlide from "../../../../components/host/addlistingswiper/PlaceTypeSlide";
import { MediaItem } from "../../../../interfaces";
import { axiosPrivate } from "@/lib/axios/private";

type Category = {
  id: number;
  name: string;
  icon?: string;
};

type CRUDListing = {
  id: string;
  name: string;
  category: number;
  location: string;
  media: {
    url: string;
    type: string;
  }[];
  price: {
    name: string;
    price: string;
  }[];
  cancellation_policy: {
    id: number;
  };
  policy: {
    id: number;
  };
};

type User = {
  email: string;
};

export default function HostMenuPage() {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
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
  const [isDiscountsModalVisible, setIsDiscountsModalVisible] = useState(false);

  // Property state
  const [selectedType, setSelectedType] = useState<Category | null>(null);
  const [markerCoords, setMarkerCoords] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [guests, setGuests] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<{ id: number }[]>(
    []
  );
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [coverPhotoId, setCoverPhotoId] = useState<string | null>(null);
  const [placeName, setPlaceName] = useState<string>("");
  const [placeDescription, setPlaceDescription] = useState<string>("");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [cleaningFee, setCleaningFee] = useState<number>(0);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);
  const [selectedCancellationPolicy, setSelectedCancellationPolicy] =
    useState<any>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [selectedDiscounts, setSelectedDiscounts] = useState<
    { type: string; percentage: number }[]
  >([]);

  // Fetch user data using React Query
  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/user/user");
      return response.data;
    },
  });

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        if (!id) {
          console.error("No ID provided");
          return;
        }

        const response = await axiosPrivate.get(`/accomodation/${id}/`);
        const data = response.data;
        console.log(data.category);

        // Set all the state values from the response
        setPlaceName(data.name);
        setSelectedType(data.category);
        setLocationName(data.location);
        setMarkerCoords({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        });
        setGuests(data.max_guests);
        setSelectedAmenities(data.amenity);
        setMedia(
          data.media.map((item: any) => ({
            id: item.id,
            uri: item.url,
            type: item.type,
          }))
        );
        setCoverPhotoId(data.media[0]?.url || null);
        setPlaceDescription(data.description);

        // Set prices
        const prices = data.price;
        setBasePrice(
          parseFloat(
            prices.find((p: any) => p.name === "Base Rate")?.price || "0"
          )
        );
        setCleaningFee(
          parseFloat(
            prices.find((p: any) => p.name === "Cleaning Fee")?.price || "0"
          )
        );
        setServiceFee(
          parseFloat(
            prices.find((p: any) => p.name === "Service Fee")?.price || "0"
          )
        );
        setTaxes(
          parseFloat(prices.find((p: any) => p.name === "Taxes")?.price || "0")
        );

        // Set policies
        setSelectedCancellationPolicy(
          data.cancellation_policy.cancellation_policy
        );

        setSelectedPolicy(data.policy.policy);
      } catch (err) {
        console.error("Failed to fetch accommodation:", err);
      }
    };

    if (id) {
      fetchAccommodation();
    }
  }, [id]);

  const handleSave = async () => {
    if (!user?.email) {
      console.error("User email not available");
      return;
    }

    const submissionData = {
      host: user.email,
      category_id: selectedType?.id,
      name: placeName,
      description: placeDescription,
      location: locationName,
      latitude: markerCoords?.latitude.toFixed(6),
      longitude: markerCoords?.longitude.toFixed(6),
      max_guests: guests,
      media: media
        .sort((a, b) => {
          // Put cover photo first
          if (a.uri === coverPhotoId) return -1;
          if (b.uri === coverPhotoId) return 1;
          return 0;
        })
        .map((item: MediaItem) => ({
          url: item.uri,
          type: item.type,
        })),
      amenity: selectedAmenities.map((amenity) => ({ id: amenity.id })),
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
      cancellation_policy: selectedCancellationPolicy.id,
      policy: selectedPolicy.id,
    };
    console.log(selectedType?.id);
    console.log("Submission Data:", JSON.stringify(submissionData, null, 2));

    try {
      await axiosPrivate.put(`/accomodation/${id}/`, submissionData);
      // Invalidate the listings cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["hostListings"] });

      router.replace("/(authenticated)/(host)");
    } catch (err) {
      console.error("Failed to update accommodation:", err);
    }
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
              {selectedType?.name || "Select property type"}
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
            <Text className="p-2">
              {selectedCancellationPolicy?.title ||
                "Select a cancellation policy"}
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

        <TouchableOpacity onPress={() => setIsRulesModalVisible(true)}>
          <View className="bg-white rounded-lg p-4 shadow mb-4 w-full">
            <Text className="text-lg font-semibold mb-2">House Rules</Text>
            <Text className="p-2">
              {selectedPolicy?.title || "Select a policy"}
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
          initialType={selectedType?.name || null}
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
          selectedCancellationPolicy={selectedCancellationPolicy}
          setSelectedCancellationPolicy={setSelectedCancellationPolicy}
        />
      </GenericModal>

      <GenericModal
        isVisible={isRulesModalVisible}
        onClose={() => setIsRulesModalVisible(false)}
      >
        <PlaceRulesSlide
          selectedPolicy={selectedPolicy}
          setSelectedPolicy={setSelectedPolicy}
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
    </SafeAreaView>
  );
}
