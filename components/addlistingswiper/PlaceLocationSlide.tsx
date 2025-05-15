// components/steps/PricingStep.tsx
import { ImageBackground, Text, View } from "react-native";
import SearchBar from "./reusable/SearchBar";

export default function PlaceLocationSlide() {
  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        Where is your place {"       "}located?
      </Text>

      <View className="mt-12 gap-y-8 ">
        <SearchBar />
        <View className="w-full h-[300px] border rounded-xl border-line bg-[url(@/img/tempMap.png] drop-shadow-lg ">
          <ImageBackground
            source={require("@/public/addlisting/tempMap.jpg")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            imageStyle={{ borderRadius: 10 }}
          />
        </View>
      </View>
    </View>
  );
}
