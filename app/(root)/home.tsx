import SearchBarWithModal from "@/components/common/SearchBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedPlacesGrid from "@/components/home/FeaturedPlacesGrid";
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
          paddingBottom: 24,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <CategoryGrid />
        <Text className="text-black font-bold text-xl">Explore Places</Text>
        <FeaturedPlacesGrid />
      </ScrollView>
    </SafeAreaView>
  );
}
