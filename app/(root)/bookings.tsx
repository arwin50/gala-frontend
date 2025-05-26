import { SafeAreaView, ScrollView, Text } from "react-native";

export default function Bookings() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 10,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-black font-bold text-xl">Bookings</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
