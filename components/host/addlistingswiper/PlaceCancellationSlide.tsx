import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { axiosPublic } from "@/lib/axios/public";

export default function PlaceCancellationSlide({
  selectedCancellationPolicy,
  setSelectedCancellationPolicy,
}: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [policies, setPolicies] = useState<any>(null);

  useEffect(() => {
    const fetchAccomodationPolicies = async () => {
      try {
        const response = await axiosPublic.get(
          "/accomodation/cancellation-policy"
        );
        setPolicies(response.data.objects);
        // Only set initial policy if none is selected
        if (!selectedCancellationPolicy && response.data.objects?.length > 0) {
          setSelectedCancellationPolicy(response.data.objects[0]);
        }
      } catch (error) {
        console.error("Error fetching cancellation policies:", error);
      }
    };
    fetchAccomodationPolicies();
  }, [setSelectedCancellationPolicy, selectedCancellationPolicy]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectPolicy = (policy: any) => {
    setSelectedCancellationPolicy(policy);
    setIsDropdownOpen(false);
  };

  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">Cancellation Policy</Text>
      <Text className="mt-2 text-description">
        Cancellation policies help set clear expectations with guests and
        protect your income. By choosing the right policy whether flexible or
        strict, you can balance attracting more bookings with reducing the risk
        of last-minute cancellations. It also builds trust, as guests appreciate
        knowing what to expect if plans change.
      </Text>
      {/* Policy Section */}
      <View className="mt-16 relative">
        <Text className="text-lg font-semibold mb-2">Your Policy</Text>

        {/* Dropdown-like element */}
        <View>
          <Pressable
            onPress={toggleDropdown}
            className="border border-line rounded-xl p-4 flex-row justify-between items-center"
          >
            <Text className="text-base">
              {selectedCancellationPolicy?.title || "Select a policy"}
            </Text>
            <MaterialCommunityIcons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={24}
              color="black"
            />
          </Pressable>

          {/* Dropdown Options */}
          {isDropdownOpen && (
            <View className="border border-line rounded-xl mt-2 bg-white absolute top-full left-0 right-0 z-10 max-h-[150px] overflow-hidden">
              {policies?.map((policy: any) => (
                <Pressable
                  key={policy.title + policy.id + policy.description}
                  onPress={() => selectPolicy(policy)}
                  className="p-4 border-b border-line last:border-b-0"
                >
                  <Text className="text-base">{policy.title}</Text>
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
        {selectedCancellationPolicy && (
          <View className="mt-6 p-4 bg-gray-100 rounded-xl">
            <Text className="text-base font-semibold mb-2">
              {selectedCancellationPolicy.title}
            </Text>
            <Text className="text-description text-sm">
              {selectedCancellationPolicy.description}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
