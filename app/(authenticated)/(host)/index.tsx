import SearchBarWithoutModal from "@/components/host/SearchBarWithoutModal";
import AddListingSwiper from "@/components/host/addlistingswiper/AddListingSwiper";
import ListingCard from "@/components/host/listings/ListingCard";
import { axiosPrivate } from "@/lib/axios/private";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

type HostListing = {
  id: string;
  name: string;
  category: { id: string; name: string; icon: string };
  location: string;
  media: {
    url: string;
    type: string;
  }[];
};

export default function HostHomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState<HostListing[]>([]);

  const fetchListings = async () => {
    try {
      const response = await axiosPrivate.get("/accomodation/host/");
      setListings(response.data.objects);
    } catch (err) {
      console.error("Failed to fetch listings", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const deleteListing = async (id: string) => {
    try {
      await axiosPrivate.delete(`/accomodation/${id}/`);
      // Refresh listings after successful deletion
      await fetchListings();
    } catch (err) {
      console.error("Failed to delete listing", err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 relative mx-4 gap-4">
        <Text className="text-3xl font-bold mt-4">Listings</Text>
        <SearchBarWithoutModal
          query={query}
          setQuery={setQuery}
          placeholder="Search listings..."
        />
        <ScrollView className="flex-1 ">
          {listings?.map((listing) => (
            <ListingCard
              key={listing.id}
              imageUri={listing.media[0].url}
              title={listing.name}
              location={listing.location}
              category={listing.category.name}
              bookings={83}
              onEdit={() => router.replace("/(authenticated)/(host)/edit/[id]")}
              onDelete={() => deleteListing(listing.id)}
              onShowBookings={() => console.log("Show Bookings", listing.id)}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          className="absolute bottom-7 right-0 ps-4 pe-5 py-3 rounded-full bg-buttonBlue flex-row items-center gap-x-2"
        >
          <AntDesign name="plus" size={20} color="white" />
          <Text className="text-base font-semibold text-white">
            Add Listing
          </Text>
        </TouchableOpacity>

        <AddListingSwiper
          isVisible={isVisible}
          onClose={handleCloseModal}
          onSuccess={fetchListings}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
