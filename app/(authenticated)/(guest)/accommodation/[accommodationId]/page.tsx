import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import sampleAccommodations from "@/constants/accommodationsData";

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
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function AccommodationView() {
  const { accommodationId } = useLocalSearchParams();
  const accommodation: Accommodation | undefined = sampleAccommodations.find(
    (accommodation) => accommodation.id === accommodationId
  );

  if (!accommodation) {
    return <Text>{accommodationId} not found</Text>; // Handle the case when the accommodation is not found
  }

  const marker = [
    {
      coordinate: {
        latitude: accommodation.latitude,
        longitude: accommodation.longitude,
      },
      title: accommodation.title,
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
          images={accommodation.images}
          title={accommodation.title}
          location={accommodation.location}
          description={accommodation.description}
          host={accommodation.host}
          category_id={accommodation.category_id}
          created_at={accommodation.created_at}
        />

        <ViewRatingsReviewsSummary
          rating={accommodation.rating}
          totalReviews={accommodation.totalReviews}
        />

        <ViewAmenities
          amenities={accommodation.amenities.map(({ icon, label }) => ({
            icon,
            label,
          }))}
          onShowAllPress={() => console.log("See all amenities")}
        />

        <ViewNearbyLocations
          sectionTitle="Nearby Landmarks"
          locationType="landmark"
          locations={accommodation.nearbyLandmarks}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />

        <ViewAvailability />

        <ViewReviews
          overallRating={accommodation.rating}
          totalReviews={accommodation.totalReviews}
          reviews={accommodation.reviews}
        />

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="Cancellation Policy"
            sectionContent={accommodation.cancellationPolicy}
          />
        </View>

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="House Rules"
            sectionContent={accommodation.houseRules}
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
