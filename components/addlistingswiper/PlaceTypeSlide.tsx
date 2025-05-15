// components/steps/PhotoUploadStep.tsx
import { ScrollView, Text, View } from "react-native";
export default function PlaceTypeSlide() {
  return (
    <View className="flex-1  m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        What type of property is your place?
      </Text>
      <ScrollView
        className="mt-8 mb-5 p-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] h-[160px] mb-8 shadow-md bg-white rounded-lg p-4">
            <Text>Category 1</Text>
          </View>
          <View className="w-[48%] h-[160px] mb-8 shadow-md bg-white rounded-lg p-4">
            <Text>Category 2</Text>
          </View>
          <View className="w-[48%] h-[160px] mb-8 shadow-md bg-white rounded-lg p-4">
            <Text>Category 3</Text>
          </View>
          <View className="w-[48%] h-[160px] mb-8 shadow-md bg-white rounded-lg p-4">
            <Text>Category 4</Text>
          </View>
          <View className="w-[48%] h-[160px] mb-8 shadow-md bg-white rounded-lg p-4">
            <Text>Category 5</Text>
          </View>
          <View className="w-[48%] h-[160px] mb-8 shadow-md bg-white rounded-lg p-4">
            <Text>Category 6</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
