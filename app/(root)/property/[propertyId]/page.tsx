import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import sampleProperties from "@/constants/propertyData";

import AccommodationViewReserveOverlay from "@/components/locations/AccommodationViewReserveOverlay";
import ViewAmenities from "@/components/locations/ViewAmenities";
import ViewAvailability from "@/components/locations/ViewAvailability";
import ViewDisplayText from "@/components/locations/ViewDisplayText";
import ViewMainDetails from "@/components/locations/ViewMainDetails";
import ViewNearbyLocations from "@/components/locations/ViewNearbyLandmarks";
import ViewRatingsReviewsSummary from "@/components/locations/ViewRatingsReviewsSummary";
import ViewReviews from "@/components/locations/ViewReviews";
import { Property } from "@/interfaces/property";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function PropertyView() {
  const { propertyId } = useLocalSearchParams();
  const property: Property | undefined = sampleProperties.find(
    (property) => property.id === propertyId
  );

  if (!property) {
    return <Text>{propertyId} not found</Text>; // Handle the case when the property is not found
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 104 }}
      >
        <ViewMainDetails
          images={property.images}
          title={property.title}
          address={property.address}
          description={property.description}
          host={property.host}
          category_id={property.category_id}
          created_at={property.created_at}
        />

        <ViewRatingsReviewsSummary
          rating={property.rating}
          totalReviews={property.totalReviews}
        />

        <ViewAmenities
          amenities={property.amenities.map(({ icon, label }) => ({
            icon,
            label,
          }))}
          onShowAllPress={() => console.log("See all amenities")}
        />

        <ViewNearbyLocations
          sectionTitle="Nearby Locations"
          landmarks={property.nearbyLandmarks}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />

        <ViewAvailability />

        <ViewReviews
          overallRating={property.rating}
          totalReviews={property.totalReviews}
          reviews={property.reviews}
        />

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="Cancellation Policy"
            sectionContent={property.cancellationPolicy}
          />
        </View>

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="House Rules"
            sectionContent={property.houseRules}
          />
        </View>
      </ScrollView>
      <AccommodationViewReserveOverlay />
    </SafeAreaView>
  );
}
