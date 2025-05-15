// components/steps/PhotoUploadStep.tsx
import { useState } from "react";
import { Text, View } from "react-native";

export default function BasicInformation() {
  const [guests, setGuests] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  return (
    <View className="flex-1  m-8 mt-0">
      <Text className="text-3xl font-extrabold">Set basic information</Text>
      <Text className="mt-2 text-description">
        Let us know how many guests you can host, and how many bedrooms, beds,
        and bathrooms are available. Accurate details build trust and set the
        right expectations.
      </Text>
      <View className="flex">
        <View>
          <Text>A</Text>
          <View className="w-full py-3 border border-line"></View>
        </View>
        <View>
          <Text>A</Text>
          <View></View>
        </View>
        <View>
          <Text>A</Text>
          <View></View>
        </View>
      </View>
    </View>
  );
}
