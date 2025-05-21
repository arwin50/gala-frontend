import AccommodationViewAmenities from "@/components/accommodations/AccommodationViewAmenities";
import AccommodationViewAvailability from "@/components/accommodations/AccommodationViewAvailability";
import AccommodationViewDisplayText from "@/components/accommodations/AccommodationViewDisplayText";
import AccommodationViewMain from "@/components/accommodations/AccommodationViewMain";
import AccommodationViewNearbyLandmarks from "@/components/accommodations/AccommodationViewNearbyLandmarks";
import AccommodationViewReserveOverlay from "@/components/accommodations/AccommodationViewReserveOverlay";
import AccommodationViewReviews from "@/components/accommodations/AccommodationViewReviews";
import RatingsReviewsSummary from "@/components/accommodations/RatingsReviewsSummary";
import { SafeAreaView, ScrollView } from "react-native";

export default function AccommodationView() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 104 }}
      >
        <AccommodationViewMain />
        <RatingsReviewsSummary />
        <AccommodationViewAmenities />
        <AccommodationViewNearbyLandmarks />
        <AccommodationViewReviews />
        <AccommodationViewAvailability />
        <AccommodationViewDisplayText
          sectionTitle="Cancellation Policy"
          sectionContent="Free cancellation within 48 hours of booking. Cancel up to 5 days before check-in for a full refund. After that, the first night is non-refundable, and 50% is refunded for remaining nights."
        />

        <AccommodationViewDisplayText
          sectionTitle="House Rules"
          sectionContent="No people allowed to just jump around everywhere because our neighbors will complain. Fines in place for noise complaints. No smoking inside the house. No pets allowed. No parties or events. No ugly people because, damn, you need to be hot to stay here."
        />
      </ScrollView>
      <AccommodationViewReserveOverlay />
    </SafeAreaView>
  );
}
