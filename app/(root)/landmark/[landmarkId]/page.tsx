import LocationMap from "@/components/common/LocationMap";
import ViewAmenities from "@/components/locations/ViewAmenities";
import ViewDisplayText from "@/components/locations/ViewDisplayText";
import ViewMainDetails from "@/components/locations/ViewMainDetails";
import ViewNearbyLocations from "@/components/locations/ViewNearbyLandmarks";
import ViewRatingsReviewsSummary from "@/components/locations/ViewRatingsReviewsSummary";
import ViewReviews from "@/components/locations/ViewReviews";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import { sampleLandmarks } from "@/constants/landmark";
import { Landmark } from "@/interfaces/landmark";
import { useLocalSearchParams } from "expo-router";

export default function LandmarkView() {
  const { landmarkId } = useLocalSearchParams();
  const landmark: Landmark | undefined = sampleLandmarks.find(
    (landmark) => landmark.id === landmarkId
  );

  if (!landmark) {
    return <Text>{landmarkId} not found</Text>; // Handle the case when the landmark is not found
  }

  const marker = [
    {
      coordinate: {
        latitude: landmark.latitude,
        longitude: landmark.longitude,
      },
      title: landmark.name,
      description: landmark.location,
    },
  ];

  const region = {
    latitude: landmark.latitude,
    longitude: landmark.longitude,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <ViewMainDetails
          images={landmark.images}
          title={landmark.name}
          location={landmark.location}
          description={landmark.description}
          host={landmark.poster}
          created_at={landmark.created_at}
        />

        <ViewRatingsReviewsSummary
          rating={landmark.rating}
          totalReviews={landmark.totalReviews}
        />

        <ViewAmenities
          amenities={landmark.amenities.map(({ icon, label }) => ({
            icon,
            label,
          }))}
          onShowAllPress={() => console.log("See all amenities")}
        />

        <ViewNearbyLocations
          sectionTitle="Nearby Accommodations"
          landmarks={landmark.nearbyLocations}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />

        <ViewReviews
          overallRating={landmark.rating}
          totalReviews={landmark.totalReviews}
          reviews={landmark.reviews}
        />

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="House Rules"
            sectionContent={landmark.houseRules}
          />
        </View>

        <View className="mt-4 px-4">
          <Text className="text-lg font-bold">Location</Text>
          <LocationMap region={region} markers={marker} readOnly={false} />
        </View>

        <ViewNearbyLocations
          sectionTitle="Other Nearby Landmarks"
          landmarks={landmark.otherNearbyLandmarks}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
