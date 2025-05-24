import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

type BookingCardProps = {
  imageUri: string;
  userName: string;
  checkInDate: string;
  checkOutDate: string;
  initialStatus?: "Pending" | "Approved" | "Rejected";
  onStatusChange?: (status: "Pending" | "Approved" | "Rejected") => void;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
};

export default function BookingCard({
  imageUri,
  userName,
  checkInDate,
  checkOutDate,
  initialStatus = "Pending",
  onStatusChange,
  isDropdownOpen,
  onToggleDropdown,
}: BookingCardProps) {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = (
    newStatus: "Pending" | "Approved" | "Rejected"
  ) => {
    setStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "Pending":
      default:
        return "bg-yellow-500"; // Using yellow for pending based on common UI patterns
    }
  };

  return (
    <View
      className={`flex-row bg-white rounded-xl  mb-4 h-[120px]  ${
        isDropdownOpen ? "z-30" : "z-10"
      }`}
    >
      {/* Image Container */}
      <View className="w-[100px] items-center justify-center p-2">
        <Image
          source={{ uri: imageUri }}
          className="w-20 h-20 rounded-full"
          resizeMode="cover"
        />
      </View>

      {/* Text Content Container */}
      <View className="flex-1 p-4 justify-center">
        <Text className="text-lg font-bold">{userName}</Text>
        <Text className="text-sm text-gray-700 mt-1">
          <Text className="font-semibold">Check In:</Text> {checkInDate}
        </Text>
        <Text className="text-sm text-gray-700">
          <Text className="font-semibold">Check Out:</Text> {checkOutDate}
        </Text>

        {/* Booking Status Dropdown */}
        <View className="relative mt-3">
          <Pressable
            onPress={onToggleDropdown}
            className={`flex-row items-center justify-between px-4 py-2 rounded-xl ${getStatusColor()}`}
          >
            <Text className="text-white font-semibold">
              Booking Status: {status}
            </Text>
            <Ionicons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={18}
              color="white"
            />
          </Pressable>

          {isDropdownOpen && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-20">
              {["Pending", "Approved", "Rejected"].map((option) => (
                <Pressable
                  key={option}
                  onPress={() =>
                    handleStatusChange(
                      option as "Pending" | "Approved" | "Rejected"
                    )
                  }
                  className="p-3 border-b border-gray-200 last:border-b-0"
                >
                  <Text className="text-gray-800">{option}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
