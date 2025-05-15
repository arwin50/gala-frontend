import { ScrollView, Text, View } from "react-native";
export default function PlaceTypeSlide() {
  return (
    <View className="flex-1  m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        What type of property is your place?
      </Text>
      <ScrollView
        className="mt-8 mb-5 p-6 border border-line rounded-xl drop-shadow-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between relative">
          {[...Array(6)].map((_, i) => (
            <View
              key={i}
              className="w-[48%] h-[140px] mb-8 shadow bg-white rounded-lg p-4"
            >
              <Text>Category {i + 1}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
