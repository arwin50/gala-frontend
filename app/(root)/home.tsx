import SearchBarWithModal from "@/components/common/SearchBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedPlacesGrid from "@/components/home/FeaturedPlacesGrid";
import LocationList from "@/components/locations/LocationList";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const sampleProperties = [
  {
    name: "Harolds Evotel",
    location: "Las Piñas, Metro Manila",
    rating: 4.5,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
    price: "₱2,500",
  },
  {
    name: "Midas Hotel and Casino",
    location: "Pasay, Metro Manila",
    rating: 5.0,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
    price: "₱3,000",
  },
  {
    name: "Park Hotels Group",
    location: "Pasay, Metro Manila",
    rating: 4.5,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
    price: "₱1,000,000",
  },
  {
    name: "Dumaguete Hotel and Suite",
    location: "Dumaguete, Negros Oriental",
    rating: 5.0,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
    price: "₱1,000,000",
  },
  {
    name: "The Manila Hotel",
    location: "Ermita, Manila",
    rating: 5.0,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
    price: "₱1,000,000",
  },
  {
    name: "The Cebu Hotel",
    location: "Cebu City, Cebu",
    rating: 5.0,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
    price: "₱1,000,000",
  },
];

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 bg-white z-10 shadow-xl">
        <SearchBarWithModal />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 10,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <CategoryGrid />
        <Text className="text-black font-bold text-xl">Places to See</Text>
        <FeaturedPlacesGrid />
        <Text className="text-black font-bold text-xl">
          Explore Accommodations
        </Text>
        <LocationList properties={sampleProperties} />
      </ScrollView>
    </SafeAreaView>
  );
}
