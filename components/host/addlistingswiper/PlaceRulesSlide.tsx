import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { axiosPublic } from "@/lib/axios/public";

export default function PlaceRulesSlide({
  selectedPolicy,
  setSelectedPolicy,
}: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [policies, setPolicies] = useState<any>(null);

  useEffect(() => {
    const fetchAccomodationPolicies = async () => {
      try {
        const response = await axiosPublic.get("/accomodation/policy");
        setPolicies(response.data.objects);
        // Set initial policy if none selected
        if (!selectedPolicy && response.data.objects.length > 0) {
          setSelectedPolicy(response.data.objects[0]);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchAccomodationPolicies();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    setIsDropdownOpen(false);
  };

  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">Place Rules</Text>
      <Text className="mt-2 text-description">
        Set clear boundaries for your space, helping prevent issues and ensure a
        smooth stay. Whether it&apos;s about noise, check-in times, smoking, or
        pet restrictions, setting rules upfront helps guests respect your
        property and reduces misunderstandings.
      </Text>
      {/* Policy Section */}
      <View className="mt-20 relative">
        <Text className="text-lg font-semibold mb-2">Your Rules</Text>

        {/* Dropdown-like element */}
        <View>
          <Pressable
            onPress={toggleDropdown}
            className="border border-line rounded-xl p-4 flex-row justify-between items-center"
          >
            <Text className="text-base">
              {selectedPolicy?.title || "Select a policy"}
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
            check house rules here.
          </Text>
        </Pressable>

        {/* Policy Details Card */}
        {selectedPolicy && (
          <View className="mt-6 p-4 bg-gray-100 rounded-xl ">
            <Text className="text-base font-semibold mb-2">
              {selectedPolicy.title}
            </Text>
            <Text className="text-description text-sm ">
              {selectedPolicy.description}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
