import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View, ActivityIndicator } from "react-native";

type ListingCardProps = {
  imageUri: string;
  title: string;
  location: string;
  category: string;
  bookings: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onShowBookings?: () => void;
  isDeleting?: boolean;
};

export default function ListingCard({
  imageUri,
  title,
  location,
  category,
  bookings,
  onEdit,
  onDelete,
  onShowBookings,
  isDeleting = false,
}: ListingCardProps) {
  return (
    <View className="flex-row bg-white rounded-xl shadow-lg  overflow-hidden  h-[120px] mb-4">
      {/* Image Container */}
      <View className="w-2/5">
        <Image
          source={{ uri: imageUri }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Text Content Container */}
      <View className="flex-1 p-4 justify-between">
        <View>
          <Text className="text-xl font-bold">{title}</Text>
          <Text className="text-sm text-gray-600 mt-1">
            <Text className="font-semibold">Location:</Text> {location}
          </Text>
          <Text className="text-sm text-gray-600">
            <Text className="font-semibold">Category:</Text> {category}
          </Text>
        </View>

        {/* Bottom Section */}
        <View className="flex-row justify-between items-center ">
          <Pressable onPress={onShowBookings}>
            <Text className="text-blue-600 underline text-sm font-semibold">
              {bookings} bookings
            </Text>
          </Pressable>

          {/* Icons */}
          <View className="flex-row items-center">
            <Pressable onPress={onEdit} className="p-1 ml-2">
              <Ionicons name="create-outline" size={20} color="green" />
            </Pressable>
            <Pressable
              onPress={onDelete}
              className="p-1 ml-2"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color="red" />
              ) : (
                <Ionicons name="trash-outline" size={20} color="red" />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
