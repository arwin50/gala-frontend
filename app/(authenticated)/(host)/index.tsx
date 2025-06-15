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
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  // Fetch listings with React Query
  const { data: listings = [], refetch: refetchListings } = useQuery<any>({
    queryKey: ["hostListings"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/accomodation/host/");
      return response.data.objects;
    },
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  // Delete listing mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosPrivate.delete(`/accomodation/${id}/`);
    },
    onSuccess: () => {
      // Invalidate and refetch listings after successful deletion
      queryClient.invalidateQueries({ queryKey: ["hostListings"] });
    },
    onError: (error) => {
      console.error("Failed to delete listing:", error);
    },
  });

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const renderItem = ({ item }: { item: HostListing }) => (
    <ListingCard
      key={item.id}
      imageUri={item.media[0].url}
      title={item.name}
      location={item.location}
      category={item.category.name}
      bookings={83}
      onEdit={() => router.replace(`/(authenticated)/(host)/edit/${item.id}`)}
      onDelete={() => deleteMutation.mutate(item.id)}
      onShowBookings={() => console.log("Show Bookings", item.id)}
      isDeleting={deleteMutation.isPending}
    />
  );

  const keyExtractor = (item: HostListing) => item.id;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 relative mx-4 gap-4">
        <Text className="text-3xl font-bold mt-4">Listings</Text>
        <SearchBarWithoutModal
          query={query}
          setQuery={setQuery}
          placeholder="Search listings..."
        />
        <FlatList
          data={listings}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />

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
          onSuccess={refetchListings}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
