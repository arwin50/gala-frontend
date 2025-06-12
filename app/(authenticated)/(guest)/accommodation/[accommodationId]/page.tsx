import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";

import LocationMap from "@/components/common/LocationMap";
import AccommodationViewReserveOverlay from "@/components/locations/AccommodationViewReserveOverlay";
import ViewAmenities from "@/components/locations/ViewAmenities";
import ViewAvailability from "@/components/locations/ViewAvailability";
import ViewDisplayText from "@/components/locations/ViewDisplayText";
import ViewMainDetails from "@/components/locations/ViewMainDetails";
import ViewNearbyLocations from "@/components/locations/ViewNearbyLocations";
import ViewRatingsReviewsSummary from "@/components/locations/ViewRatingsReviewsSummary";
import ViewReviews from "@/components/locations/ViewReviews";
import { Accommodation } from "@/interfaces/accommodation";
import { axiosPublic } from "@/lib/axios/public";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function AccommodationView() {
  const { accommodationId } = useLocalSearchParams();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axiosPublic.get(
          `/api/accommodation/${accommodationId}/`
        );
        setAccommodation(response.data.objects);
      } catch (error) {
        console.error("Error fetching accommodation:", error);
        setAccommodation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, [accommodationId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4">Loading accommodation details...</Text>
      </SafeAreaView>
    );
  }

  if (!accommodation) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">
          Accommodation with ID {accommodationId} not found.
        </Text>
      </SafeAreaView>
    );
  }

  const marker = [
    {
      coordinate: {
        latitude: accommodation.latitude,
        longitude: accommodation.longitude,
      },
      title: accommodation.name,
      description: accommodation.location,
    },
  ];

  const region = {
    latitude: accommodation.latitude,
    longitude: accommodation.longitude,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 104 }}
      >
        <ViewMainDetails
          images={accommodation.media}
          title={accommodation.name}
          location={accommodation.location}
          description={accommodation.description}
          host={accommodation.host}
          category_id={accommodation.category?.id}
          created_at={accommodation.created_at}
        />

        <ViewRatingsReviewsSummary
          rating={accommodation.overall_rating}
          totalReviews={accommodation.total_review_count}
        />

        <ViewAmenities
          amenities={accommodation.amenities}
          onShowAllPress={() => console.log("See all amenities")}
        />

        <ViewNearbyLocations
          sectionTitle="Nearby Landmarks"
          locationType="landmark"
          locations={accommodation.nearby_landmarks}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />

        <ViewAvailability />

        <ViewReviews
          overallRating={accommodation.overall_rating}
          totalReviews={accommodation.total_review_count}
          reviews={accommodation.reviews}
        />

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="Cancellation Policy"
            sectionContent={
              accommodation.cancellation_policy?.[0]?.description ??
              "No cancellation policy provided."
            }
          />
        </View>

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="House Rules"
            sectionContent={
              accommodation.house_rules ?? "No house rules specified."
            }
          />
        </View>

        <View className="mt-4 px-4">
          <Text className="text-lg font-bold">Location</Text>
          <LocationMap region={region} markers={marker} />
        </View>
      </ScrollView>

      <AccommodationViewReserveOverlay />
    </SafeAreaView>
  );
}
