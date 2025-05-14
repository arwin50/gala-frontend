import { SafeAreaView, Text } from "react-native";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedPlacesGrid from "@/components/home/FeaturedPlacesGrid";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white p-4 gap-4">
      <CategoryGrid />
      <Text className="text-black font-bold text-xl">Explore Places</Text>
      <FeaturedPlacesGrid />
    </SafeAreaView>
  );
}
