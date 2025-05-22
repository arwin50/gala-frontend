import { Property } from "@/interfaces/property";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function LocationCard({ property }: { property: Property }) {
  const router = useRouter();
  const handlePress = () => {
    router.push({
      pathname: "/(root)/property/[propertyId]/page",
      params: { propertyId: property.id },
    });
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl shadow shadow-black overflow-hidden mb-4 w-[48%]"
      onPress={handlePress}
    >
      {property?.images?.[0] && (
        <Image
          source={property.images[0]}
          className="w-full h-40"
          resizeMode="cover"
        />
      )}

      <View className="p-3">
        <Text
          className="text-base font-semibold text-gray-800"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {property.title}
        </Text>

        <View className="flex-row items-center gap-1">
          <Feather name="map-pin" size={14} color="#555" />
          <Text
            className="text-sm text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {property.address}
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
            ₱{property.price_per_night}/night
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
