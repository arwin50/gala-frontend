import CategorySelector from "@/components/common/CategorySelector";
import SearchBarWithModal from "@/components/common/SearchBar";
import LocationList from "@/components/locations/LocationList";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View } from "react-native";

const sampleProperties = [
  {
    name: "Harolds Evotel",
    location: "Las Piñas, Metro Manila",
    rating: 4.5,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
  },
  {
    name: "Midas Hotel and Casino",
    location: "Pasay, Metro Manila",
    rating: 5.0,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
  },
  {
    name: "Park Hotels Group",
    location: "Pasay, Metro Manila",
    rating: 4.5,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
  },
  {
    name: "Dumaguete Hotel and Suite",
    location: "Dumaguete, Negros Oriental",
    rating: 5.0,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
  },
  {
    name: "The Manila Hotel",
    location: "Ermita, Manila",
    rating: 5.0,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
  },
  {
    name: "The Cebu Hotel",
    location: "Cebu City, Cebu",
    rating: 5.0,
    image: require("@/assets/images/places_pic/places_metroManila.jpg"),
  },
];

export default function Properties() {
  const { categoryId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pt-4 bg-white z-10 shadow shadow-black">
        <View className="mx-4">
          <SearchBarWithModal />
        </View>

        <CategorySelector selectedCategoryId={categoryId as string | null} />
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
        <View className="my-0" />
        <LocationList properties={sampleProperties} />
      </ScrollView>
    </SafeAreaView>
  );
}
