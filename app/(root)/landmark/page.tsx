import SearchBarWithModal from "@/components/common/SearchBar";
import LocationList from "@/components/locations/LocationList";
import sampleProperties from "@/constants/propertyData";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Landmarks() {
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
        <Text className="text-black font-bold text-xl">
          Explore Accommodations
        </Text>
        <LocationList properties={sampleProperties} />
      </ScrollView>
    </SafeAreaView>
  );
}
