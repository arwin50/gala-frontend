// components/steps/PricingStep.tsx
import { ImageBackground, Text, View } from "react-native";
import SearchBarWithModal from "../common/SearchBar";

export default function PlaceLocationSlide() {
  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        Where is your place {"       "}located?
      </Text>

      <View className="mt-12 gap-y-8 ">
        <SearchBarWithModal />
        <View className="w-full  border rounded-xl drop-shadow-lg ">
          <ImageBackground
            source={require("@/assets/addlisting/tempMap.jpg")}
            resizeMode="cover"
            style={{ width: "100%", height: 300 }}
            imageStyle={{ borderRadius: 10 }}
          />
        </View>
      </View>
    </View>
  );
}
