import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface DiscountOption {
  type: string;
  defaultPercentage: number; 
  title: string;
  description: string;
}

const discountOptions: DiscountOption[] = [
  {
    type: "new_listing",
    defaultPercentage: 20,
    title: "New listing promotion",
    description: "Offer 20% off your first 3 bookings",
  },
  {
    type: "early_bird",
    defaultPercentage: 0,
    title: "Early bird discount",
    description: "For stays booked a month or longer before arrival",
  },
  {
    type: "weekly",
    defaultPercentage: 10,
    title: "Weekly discount",
    description: "For stays of 7 nights or more",
  },
  {
    type: "monthly",
    defaultPercentage: 16,
    title: "Monthly discount",
    description: "For stays of 28 nights or more",
  },
];

interface PlaceDiscountsSlideProps {
  selectedDiscounts: { type: string; percentage: number }[];
  setSelectedDiscounts: (
    discounts: { type: string; percentage: number }[]
  ) => void;
}

const PlaceDiscountsSlide: React.FC<PlaceDiscountsSlideProps> = ({
  selectedDiscounts,
  setSelectedDiscounts,
}) => {
 
  const [percentages, setPercentages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initialPercentages: { [key: string]: number } = {};
    discountOptions.forEach((option) => {
      initialPercentages[option.type] = option.defaultPercentage;
    });
    setPercentages(initialPercentages);
  }, [discountOptions]); 

  const toggleDiscount = (discountType: string) => {
    const isSelected = selectedDiscounts.some((d) => d.type === discountType);
    let updatedDiscounts;

    if (isSelected) {
      updatedDiscounts = selectedDiscounts.filter(
        (d) => d.type !== discountType
      );
    } else {
      
      updatedDiscounts = [
        ...selectedDiscounts,
        { type: discountType, percentage: percentages[discountType] || 0 }, 
      ];
    }
    setSelectedDiscounts(updatedDiscounts);
  };

  const handlePercentageChange = (discountType: string, value: string) => {
    const percentage = parseInt(value, 10);
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
   
      setPercentages({
        ...percentages,
        [discountType]: percentage,
      });

  
      if (selectedDiscounts.some((d) => d.type === discountType)) {
        const updatedSelectedDiscounts = selectedDiscounts.map((d) =>
          d.type === discountType ? { ...d, percentage: percentage } : d
        );
        setSelectedDiscounts(updatedSelectedDiscounts);
      }
    } else if (value === "") {
   
      setPercentages({
        ...percentages,
        [discountType]: 0,
      });
      if (selectedDiscounts.some((d) => d.type === discountType)) {
        const updatedSelectedDiscounts = selectedDiscounts.map((d) =>
          d.type === discountType ? { ...d, percentage: 0 } : d
        );
        setSelectedDiscounts(updatedSelectedDiscounts);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 m-8 mt-0 ">
          <Text className="text-3xl font-bold mb-2.5">Add discounts</Text>
          <Text className="mt-2 text-description">
            Help your place stand out to get booked faster and earn your first
            reviews.
          </Text>

          <View className="mt-8">
            {discountOptions.map((discount) => (
              <TouchableOpacity
                key={discount.type}
                className="bg-gray-100 rounded-xl p-4 mb-3.5 border border-gray-200"
                onPress={() => toggleDiscount(discount.type)}
              >
                <View className="flex-row items-center">
                  <View className="flex-row p-4 rounded-xl bg-gray-200 justify-center items-center mr-4 space-x-1">
                    <TextInput
                      className="font-bold text-gray-700 w-12 text-center scale-110"
                      keyboardType="number-pad"
                      value={percentages[discount.type]?.toString() || ""}
                      onChangeText={(value) =>
                        handlePercentageChange(discount.type, value)
                      }
                    />
                    <Text className="font-bold text-gray-700 scale-125">%</Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-base font-bold mb-1.5">
                      {discount.title}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {discount.description}
                    </Text>
                  </View>
                  {/* Simple Checkbox Placeholder */}
                  <View className="w-6 h-6 border-2 border-gray-400 rounded-md justify-center items-center ml-4">
                    {selectedDiscounts.some(
                      (d) => d.type === discount.type
                    ) && <View className="w-4 h-4 bg-blue-500 rounded-sm" />}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PlaceDiscountsSlide;
