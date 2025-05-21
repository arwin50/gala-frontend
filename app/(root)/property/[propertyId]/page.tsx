import AccommodationViewReserveOverlay from "@/components/locations/AccommodationViewReserveOverlay";
import ViewAmenities from "@/components/locations/ViewAmenities";
import ViewAvailability from "@/components/locations/ViewAvailability";
import ViewDisplayText from "@/components/locations/ViewDisplayText";
import ViewMainDetails from "@/components/locations/ViewMainDetails";
import ViewNearbyLocations from "@/components/locations/ViewNearbyLandmarks";
import ViewRatingsReviewsSummary from "@/components/locations/ViewRatingsReviewsSummary";
import ViewReviews from "@/components/locations/ViewReviews";
import { SafeAreaView, ScrollView, View } from "react-native";

import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
const sampleProperty = {
  id: "landmark-001",
  title: "Gynkui Killa Dormitory",
  address: "Alaminos, Pangasinan, Tallano Gold, 4 Bedroom",
  description:
    "This dormitory offers a breathtaking view of the golden rice terraces, with modern amenities and a peaceful atmosphere for long stays or quick getaways.",
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
  nearbyLandmarks: [
    { name: "Hundred Islands", distance: "1.5KM" },
    { name: "St. Vicente Ferrer Shrine", distance: "1.5KM" },
    { name: "Lucap Wharf", distance: "2.0KM" },
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

export default function PropertyView() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 104 }}
      >
        <ViewMainDetails
          images={sampleProperty.images}
          title={sampleProperty.title}
          address={sampleProperty.address}
          description={sampleProperty.description}
          host={sampleProperty.host}
        />

        <ViewRatingsReviewsSummary
          rating={sampleProperty.rating}
          totalReviews={sampleProperty.totalReviews}
        />

        <ViewAmenities
          amenities={sampleProperty.amenities.map(({ icon, label }) => ({
            icon,
            label,
          }))}
          onShowAllPress={() => console.log("See all amenities")}
        />

        <ViewNearbyLocations
          sectionTitle="Nearby Locations"
          landmarks={sampleProperty.nearbyLandmarks}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />

        <ViewAvailability />

        <ViewReviews
          overallRating={sampleProperty.rating}
          totalReviews={sampleProperty.totalReviews}
          reviews={sampleProperty.reviews}
        />

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="Cancellation Policy"
            sectionContent={sampleProperty.cancellationPolicy}
          />
        </View>

        <View className="mt-4">
          <ViewDisplayText
            sectionTitle="House Rules"
            sectionContent={sampleProperty.houseRules}
          />
        </View>
      </ScrollView>
      <AccommodationViewReserveOverlay />
    </SafeAreaView>
  );
}
