import SearchBarWithModal from "@/components/common/SearchBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedPlacesGrid from "@/components/home/FeaturedPlacesGrid";
import LocationList from "@/components/locations/LocationList";
import { axiosPublic } from "@/lib/axios/public";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axiosPublic.get("/api/accomodation/simple/");
        const data = await response.data;
        setProperties(data.objects);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 bg-white z-10 shadow-xl">
        <SearchBarWithModal />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 10,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <CategoryGrid />

        <Text className="px-4 text-black font-bold text-xl">Places to See</Text>
        <FeaturedPlacesGrid />
        <Text className="px-4 text-black font-bold text-xl">
          Explore Accommodations
        </Text>
        <LocationList properties={properties} />
      </ScrollView>
    </SafeAreaView>
  );
}
