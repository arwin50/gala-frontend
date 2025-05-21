import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function LocationCard({ property }: { property: any }) {
  return (
    <TouchableOpacity className="bg-white rounded-2xl shadow shadow-black overflow-hidden mb-4 w-[48%]">
      <Image
        source={property.image}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text
          className="text-base font-semibold text-gray-800"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {property.name}
        </Text>

        <View className="flex-row items-center gap-1">
          <Feather name="map-pin" size={14} color="#555" />
          <Text
            className="text-sm text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {property.location}
          </Text>
        </View>
        <View className="flex-row justify-between w-full">
          <View className="flex-row items-center gap-1">
            <FontAwesome name="star" size={14} color="#facc15" />
            <Text className="text-sm text-yellow-500 font-medium">
              {property.rating}
            </Text>
          </View>
          <Text className="text-md text-gray-500 font-medium">
            {property.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
