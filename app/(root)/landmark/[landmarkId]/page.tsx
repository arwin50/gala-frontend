import ViewAmenities from "@/components/locations/ViewAmenities";
import ViewDisplayText from "@/components/locations/ViewDisplayText";
import ViewMainDetails from "@/components/locations/ViewMainDetails";
import ViewNearbyLocations from "@/components/locations/ViewNearbyLandmarks";
import ViewRatingsReviewsSummary from "@/components/locations/ViewRatingsReviewsSummary";
import ViewReviews from "@/components/locations/ViewReviews";
import { SafeAreaView, ScrollView, View } from "react-native";

import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
const sampleLandmark = {
  id: "landmark-001",
  name: "Gynkui Killa Dormitory",
  address: "Alaminos, Pangasinan, Tallano Gold, 4 Bedroom",
  description:
    "This dormitory offers a breathtaking view of the golden rice terraces, with modern amenities and a peaceful atmosphere for long stays or quick getaways.",
  price_per_night: 3454.5,
  max_guests: 4,
  created_at: "2024-11-01T10:32:00Z",
  updated_at: "2025-05-20T15:47:00Z",
  images: [
    bgMetroManila,
    bgMetroManila,
    bgMetroManila,
    bgMetroManila,
    bgMetroManila,
    bgMetroManila,
  ],
  host: {
    name: "BINI Aiah",
    image: bgMetroManila,
    duration: "2 years hosting",
  },
  rating: 4.5,
  totalReviews: 6969,
  amenities: [
    { icon: "wifi", label: "Internet" },
    { icon: "bath", label: "Shower" },
    { icon: "coffee", label: "Café" },
  ],
  nearbyLocations: [
    { name: "Hundred Islands", distance: "1.5KM" },
    { name: "St. Vicente Ferrer Shrine", distance: "1.5KM" },
    { name: "Lucap Wharf", distance: "2.0KM" },
  ],
  otherNearbyLandmarks: [
    { name: "Alaminos Cathedral", distance: "3.0KM" },
    { name: "Enchanted Cave", distance: "3.5KM" },
    { name: "Tondol Beach", distance: "5.0KM" },
  ],
  reviews: [
    {
      user: {
        name: "BINI Mikha",
        avatar: bgMetroManila,
      },
      rating: 4,
      text: "I saw a racoon! LOL! I was scared but the stay was good",
      timeAgo: "1 month ago",
    },
    {
      user: {
        name: "BINI Gwen-dolyn Garcia",
        avatar: bgMetroManila,
      },
      rating: 4,
      text: "My members saw a racoon! LOL! I wanna go back but my bebe is just too busy",
      timeAgo: "12 months ago",
    },
  ],
  cancellationPolicy:
    "Free cancellation within 48 hours of booking. Cancel up to 5 days before check-in for a full refund. After that, the first night is non-refundable, and 50% is refunded for remaining nights.",
  houseRules:
    "No people allowed to just jump around everywhere because our neighbors will complain. Fines in place for noise complaints. No smoking inside the house. No pets allowed. No parties or events. No ugly people because, damn, you need to be hot to stay here.",
};

export default function LandmarkView() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <ViewMainDetails
          images={sampleLandmark.images}
          title={sampleLandmark.name}
          address={sampleLandmark.address}
          description={sampleLandmark.description}
          host={sampleLandmark.host}
          created_at={sampleLandmark.created_at}
        />

        <ViewRatingsReviewsSummary
          rating={sampleLandmark.rating}
          totalReviews={sampleLandmark.totalReviews}
        />

        <ViewAmenities
          amenities={sampleLandmark.amenities.map(({ icon, label }) => ({
            icon,
            label,
          }))}
          onShowAllPress={() => console.log("See all amenities")}
        />

        <ViewNearbyLocations
          sectionTitle="Nearby Accommodations"
          landmarks={sampleLandmark.nearbyLocations}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />

        <ViewReviews
          overallRating={sampleLandmark.rating}
          totalReviews={sampleLandmark.totalReviews}
          reviews={sampleLandmark.reviews}
        />

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="House Rules"
            sectionContent={sampleLandmark.houseRules}
          />
        </View>

        <ViewNearbyLocations
          sectionTitle="Other Nearby Landmarks"
          landmarks={sampleLandmark.otherNearbyLandmarks}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
