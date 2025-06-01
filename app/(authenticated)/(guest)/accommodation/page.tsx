import CategorySelector from "@/components/common/CategorySelector";
import SearchBarWithModal from "@/components/common/SearchBar";
import LocationList from "@/components/locations/LocationList";
import sampleProperties from "@/constants/accommodationsData";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View } from "react-native";

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
