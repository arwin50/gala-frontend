import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { PlacePriceSlideProps } from "../../../interfaces";

export default function PlacePriceSlide({
  basePrice,
  setBasePrice,
}: PlacePriceSlideProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Mock calculations based on the image
  const galaCharge = 150;
  const totalBeforeTax = basePrice + galaCharge;
  const mockTax = 30; // Example mock tax
  const youEarn = totalBeforeTax - galaCharge - mockTax;

  // Function to handle edit price (placeholder)
  const handleEditPrice = () => {
    Alert.prompt(
      "Edit Base Price",
      "Enter the new base price:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: (price) => {
            const newPrice = parseInt(price || "0", 10);
            if (!isNaN(newPrice) && newPrice >= 0) {
              setBasePrice(newPrice);
            } else {
              Alert.alert(
                "Invalid Input",
                "Please enter a valid number for the price."
              );
            }
          },
        },
      ],
      "plain-text",
      basePrice.toString() // Pre-fill with current price
    );
  };

  // Function to toggle the visibility of details
  const toggleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">Now set your price</Text>
      <Text className="mt-2 text-description">
        Do not worry, you can always change it anytime.
      </Text>
      <View className="flex-1 justify-center items-center">
        {/* Large Price Display */}
        <View className="flex-row items-center self-center">
          <Text className="text-5xl font-extrabold">₱ {basePrice}</Text>
          <Pressable
            onPress={handleEditPrice}
            className="ml-2 p-1 border border-gray-300 rounded-full"
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color="black"
            />
          </Pressable>
        </View>
        <Text className="text-center text-description">Base Price</Text>

        {/* Price Breakdown Card (Conditionally Rendered) */}
        {showDetails && (
          <View className="mt-8 p-6 bg-gray-100 rounded-xl w-full">
            <View className="flex-row justify-between mb-2">
              <Text className="text-base">Base price</Text>
              <Text className="text-base">₱ {basePrice}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-base">Gala charge</Text>
              <Text className="text-base">₱ {galaCharge}</Text>
            </View>
            <View className="border-b border-gray-300 mb-4"></View>
            {/* Separator Line */}
            <View className="flex-row justify-between">
              <Text className="text-base font-semibold">Total before tax</Text>
              <Text className="text-base font-semibold">
                ₱ {totalBeforeTax}
              </Text>
            </View>
          </View>
        )}

        {/* You Earn Card */}
        <View className="mt-4 p-6 bg-gray-100 rounded-xl w-full">
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold">
              You Earn
              <Text className="text-description font-normal"> after tax</Text>
            </Text>
            <Text className="text-base font-semibold">₱ {youEarn}</Text>
          </View>
        </View>

        {/* Show More/Less Button */}
        <Pressable onPress={toggleShowDetails} className="self-center mt-4">
          <Text className="text-blue-600 text-sm">
            {showDetails ? "show less" : "show more"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
