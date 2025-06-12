import { Accommodation } from "@/interfaces/accommodation";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function LocationCard({
  accommodation,
}: {
  accommodation: Accommodation;
}) {
  const router = useRouter();
  const handlePress = () => {
    router.replace({
      pathname: "/(guest)/accommodation/[accommodationId]/page",
      params: { accommodationId: accommodation.id },
    });
  };
  const firstImageMedia = accommodation.media.find((m) => m.type === "image");

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl shadow shadow-black overflow-hidden mb-4 w-[48%]"
      onPress={handlePress}
    >
      {firstImageMedia && (
        <Image
          source={{ uri: firstImageMedia.url }}
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
          {accommodation.name}
        </Text>

        <View className="flex-row items-center gap-1">
          <Feather name="map-pin" size={14} color="#555" />
          <Text
            className="text-sm text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {accommodation.location}
          </Text>
        </View>
        <View className="flex-row justify-between w-full">
          <View className="flex-row items-center gap-1">
            <FontAwesome name="star" size={14} color="#facc15" />
            <Text className="text-sm text-yellow-500 font-medium">
              {accommodation.overall_rating}
            </Text>
          </View>
          <Text className="text-md text-gray-500 font-medium">
            ₱{accommodation.total_price}
            <Text className="text-xs text-gray-400">/night</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
