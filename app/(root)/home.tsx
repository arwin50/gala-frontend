import SearchBarWithModal from "@/components/common/SearchBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedPlacesGrid from "@/components/home/FeaturedPlacesGrid";
import LocationList from "@/components/locations/LocationList";
import sampleProperties from "@/constants/accommodationsData";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

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
