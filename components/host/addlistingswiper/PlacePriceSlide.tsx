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

  // Function to handle edit all prices
  const handleEditPrices = () => {
    Alert.prompt(
      "Edit Base Rate",
      "Enter the new base rate:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Next",
          onPress: (price) => {
            const newBasePrice = parseInt(price || "0", 10);
            if (!isNaN(newBasePrice) && newBasePrice >= 0) {
              setBasePrice(newBasePrice);
              // After setting base price, prompt for cleaning fee
              Alert.prompt(
                "Edit Cleaning Fee",
                "Enter the new cleaning fee:",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Next",
                    onPress: (fee) => {
                      const newCleaningFee = parseFloat(fee || "0");
                      if (!isNaN(newCleaningFee) && newCleaningFee >= 0) {
                        setCleaningFee(newCleaningFee);
                        // After setting cleaning fee, prompt for service fee
                        Alert.prompt(
                          "Edit Service Fee",
                          "Enter the new service fee:",
                          [
                            { text: "Cancel", style: "cancel" },
                            {
                              text: "Next",
                              onPress: (fee) => {
                                const newServiceFee = parseFloat(fee || "0");
                                if (
                                  !isNaN(newServiceFee) &&
                                  newServiceFee >= 0
                                ) {
                                  setServiceFee(newServiceFee);
                                  // Finally, prompt for taxes
                                  Alert.prompt(
                                    "Edit Taxes",
                                    "Enter the new tax amount:",
                                    [
                                      { text: "Cancel", style: "cancel" },
                                      {
                                        text: "Done",
                                        onPress: (tax) => {
                                          const newTaxes = parseFloat(
                                            tax || "0"
                                          );
                                          if (
                                            !isNaN(newTaxes) &&
                                            newTaxes >= 0
                                          ) {
                                            setTaxes(newTaxes);
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
            onPress={handleEditPrices}
            className="ml-2 p-1 border border-gray-300 rounded-full"
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color="black"
            />
          </Pressable>
        </View>
        <Text className="text-center text-description">Price per night</Text>

        {/* Price Breakdown Card */}
        {showDetails && (
          <View className="mt-8 p-6 bg-gray-100 rounded-xl w-full">
            <View className="flex-row justify-between mb-2">
              <Text className="text-base">Base Rate</Text>
              <Text className="text-base">₱ {basePrice.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-base">Cleaning Fee</Text>
              <Text className="text-base">₱ {cleaningFee.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-base">Service Fee</Text>
              <Text className="text-base">₱ {serviceFee.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-base">Taxes</Text>
              <Text className="text-base">₱ {taxes.toFixed(2)}</Text>
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
