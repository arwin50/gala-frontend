import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  CancellationPolicy,
  PlaceCancellationSlideProps,
} from "../../interfaces";

const policies: CancellationPolicy[] = [
  {
    name: "Flexible",
    description:
      "Full refund for cancellations made up to 24 hours before check-in. Cancellations made less than 24 hours in advance: no refund for the first night or first service, remainder refunded.",
  },
  {
    name: "Moderate",
    description:
      "Full refund for cancellations made up to 5 days before check-in. Cancellations made less than 5 days in advance: 50% refund of the nightly rate for all nights.",
  },
  {
    name: "Strict",
    description:
      "Full refund for cancellations made within 48 hours of booking if the cancellation is at least 14 days before check-in. No refund if the cancellation is less than 14 days before check-in.",
  },
];

export default function PlaceCancellationSlide({
  selectedPolicy,
  setSelectedPolicy,
}: PlaceCancellationSlideProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectPolicy = (policy: CancellationPolicy) => {
    setSelectedPolicy(policy);
    setIsDropdownOpen(false);
  };

  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">Cancellation Policy</Text>
      <Text className="mt-2 text-description">
        Give your place a name, you can change it after posting later.
      </Text>
      {/* Policy Section */}
      <View className="mt-20 relative">
        <Text className="text-lg font-semibold mb-2">Your Policy</Text>

        {/* Dropdown-like element */}
        <View>
          <Pressable
            onPress={toggleDropdown}
            className="border border-line rounded-xl p-4 flex-row justify-between items-center"
          >
            <Text className="text-base">{selectedPolicy.name}</Text>
            <MaterialCommunityIcons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={24}
              color="black"
            />
          </Pressable>

          {/* Dropdown Options */}
          {isDropdownOpen && (
            <View className="border border-line rounded-xl mt-2 bg-white absolute top-full left-0 right-0 z-10 max-h-[150px] overflow-hidden">
              {policies.map((policy) => (
                <Pressable
                  key={policy.name}
                  onPress={() => selectPolicy(policy)}
                  className="p-4 border-b border-line last:border-b-0"
                >
                  <Text className="text-base">{policy.name}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Link to policies */}
        <Pressable className="self-end mt-2">
          <Text className="text-blue-600 text-sm underline">
            check cancellation policies here.
          </Text>
        </Pressable>

        {/* Policy Details Card */}
        <View className="mt-6 p-4 bg-gray-100 rounded-xl">
          <Text className="text-base font-semibold mb-2">
            {selectedPolicy.name}
          </Text>
          <Text className="text-description text-sm">
            {selectedPolicy.description}
          </Text>
        </View>
      </View>
    </View>
  );
}
