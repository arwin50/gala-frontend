import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

interface PlacePriceSlideProps {
  basePrice: number;
  setBasePrice: (price: number) => void;
  cleaningFee: number;
  setCleaningFee: (fee: number) => void;
  serviceFee: number;
  setServiceFee: (fee: number) => void;
  taxes: number;
  setTaxes: (tax: number) => void;
}

export default function PlacePriceSlide({
  basePrice,
  setBasePrice,
  cleaningFee,
  setCleaningFee,
  serviceFee,
  setServiceFee,
  taxes,
  setTaxes,
}: PlacePriceSlideProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Price calculations
  const totalPrice = basePrice + cleaningFee + serviceFee + taxes;

  // Function to handle edit price
  const handleEditPrice = () => {
    Alert.prompt(
      "Edit Base Rate",
      "Enter the new base rate:",
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
      basePrice.toString()
    );
  };

  const handleEditCleaningFee = () => {
    Alert.prompt(
      "Edit Cleaning Fee",
      "Enter the new cleaning fee:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: (price) => {
            const newPrice = parseFloat(price || "0");
            if (!isNaN(newPrice) && newPrice >= 0) {
              setCleaningFee(newPrice);
            } else {
              Alert.alert(
                "Invalid Input",
                "Please enter a valid number for the cleaning fee."
              );
            }
          },
        },
      ],
      "plain-text",
      cleaningFee.toString()
    );
  };

  const handleEditServiceFee = () => {
    Alert.prompt(
      "Edit Service Fee",
      "Enter the new service fee:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: (price) => {
            const newPrice = parseFloat(price || "0");
            if (!isNaN(newPrice) && newPrice >= 0) {
              setServiceFee(newPrice);
            } else {
              Alert.alert(
                "Invalid Input",
                "Please enter a valid number for the service fee."
              );
            }
          },
        },
      ],
      "plain-text",
      serviceFee.toString()
    );
  };

  const handleEditTaxes = () => {
    Alert.prompt(
      "Edit Taxes",
      "Enter the new tax amount:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: (price) => {
            const newPrice = parseFloat(price || "0");
            if (!isNaN(newPrice) && newPrice >= 0) {
              setTaxes(newPrice);
            } else {
              Alert.alert(
                "Invalid Input",
                "Please enter a valid number for the taxes."
              );
            }
          },
        },
      ],
      "plain-text",
      taxes.toString()
    );
  };

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
        <Text className="text-center text-description">Base Rate</Text>

        {/* Price Breakdown Card */}
        {showDetails && (
          <View className="mt-8 p-6 bg-gray-100 rounded-xl w-full">
            <View className="flex-row justify-between mb-2">
              <Text className="text-base">Base Rate</Text>
              <View className="flex-row items-center">
                <Text className="text-base">₱ {basePrice.toFixed(2)}</Text>
                <Pressable
                  onPress={handleEditPrice}
                  className="ml-2 p-1 border border-gray-300 rounded-full"
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={16}
                    color="black"
                  />
                </Pressable>
              </View>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-base">Cleaning Fee</Text>
              <View className="flex-row items-center">
                <Text className="text-base">₱ {cleaningFee.toFixed(2)}</Text>
                <Pressable
                  onPress={handleEditCleaningFee}
                  className="ml-2 p-1 border border-gray-300 rounded-full"
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={16}
                    color="black"
                  />
                </Pressable>
              </View>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-base">Service Fee</Text>
              <View className="flex-row items-center">
                <Text className="text-base">₱ {serviceFee.toFixed(2)}</Text>
                <Pressable
                  onPress={handleEditServiceFee}
                  className="ml-2 p-1 border border-gray-300 rounded-full"
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={16}
                    color="black"
                  />
                </Pressable>
              </View>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-base">Taxes</Text>
              <View className="flex-row items-center">
                <Text className="text-base">₱ {taxes.toFixed(2)}</Text>
                <Pressable
                  onPress={handleEditTaxes}
                  className="ml-2 p-1 border border-gray-300 rounded-full"
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={16}
                    color="black"
                  />
                </Pressable>
              </View>
            </View>
            <View className="border-b border-gray-300 mb-4"></View>
            <View className="flex-row justify-between">
              <Text className="text-base font-semibold">Total</Text>
              <Text className="text-base font-semibold">
                ₱ {totalPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        )}

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
