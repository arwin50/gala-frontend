import CategorySelector from "@/components/common/CategorySelector";
import SearchBarWithModal from "@/components/common/SearchBar";
import LocationList from "@/components/locations/LocationList";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

const API_URL = Constants.expoConfig?.extra?.backendUrl;

export default function Properties() {
  const searchParams = useLocalSearchParams();
  const initialCategoryId =
    typeof searchParams.categoryId === "string"
      ? parseInt(searchParams.categoryId)
      : undefined;

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(initialCategoryId);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/accomodation/simple/?category=${selectedCategoryId}`
        );
        const data = await response.json();
        console.log("DATABASE:", data.objects);
        const results = Array.isArray(data.objects) ? data.objects : [];
        setProperties(results);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  }, [selectedCategoryId]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pt-4 bg-white z-10 shadow shadow-black">
        <View className="mx-4">
          <SearchBarWithModal />
        </View>

        <CategorySelector
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />
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
        <LocationList properties={properties} />
      </ScrollView>
    </SafeAreaView>
  );
}
