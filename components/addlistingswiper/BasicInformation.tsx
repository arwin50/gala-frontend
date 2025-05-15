// components/steps/PhotoUploadStep.tsx
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BasicInformation() {
  const [guests, setGuests] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  // Helper to sanitize number inputs
  const sanitizeNumber = (value: string) => {
    const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? 0 : num;
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      className="flex-1 mb-80"
      style={{ backgroundColor: "#fff" }}
    >
      <View className="flex-1 m-8 mt-0">
        <Text className="text-3xl font-extrabold">Set basic information</Text>
        <Text className="mt-2 text-description">
          Let us know how many guests you can host, and how many bedrooms, beds,
          and bathrooms are available. Accurate details build trust and set the
          right expectations.
        </Text>

        <View className="flex-1 items-center justify-center gap-y-8 mb-10">
          {/* Guests */}
          <View className="w-full flex-col items-center justify-between">
            <Text className="text-lg self-start">
              How many guests can stay here?
            </Text>
            <View className="w-full py-4 border rounded-xl text-center relative">
              <Ionicons
                name="people-outline"
                size={24}
                color="black"
                className="absolute left-4 top-1/2 "
              />
              <TextInput
                keyboardType="numeric"
                value={guests.toString()}
                onChangeText={(text) => setGuests(sanitizeNumber(text))}
                className="w-full text-center px-16  font-medium"
                placeholder="0"
                placeholderTextColor="#000000"
              />
              <TouchableOpacity
                onPress={() => setGuests((prev) => Math.max(0, prev - 1))}
                className="absolute right-0"
                style={{ bottom: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="down" size={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGuests((prev) => Math.max(0, prev + 1))}
                className="absolute right-0"
                style={{ top: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="up" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bedrooms */}
          <View className="w-full flex-col items-center justify-between">
            <Text className="text-lg self-start">
              How many bedrooms does your place have?
            </Text>
            <View className="w-full py-4 border rounded-xl text-center relative">
              <Ionicons
                name="bed-outline"
                size={24}
                color="black"
                className="absolute left-4 top-1/2 "
              />
              <TextInput
                keyboardType="numeric"
                value={bedrooms.toString()}
                onChangeText={(text) => setBedrooms(sanitizeNumber(text))}
                className="w-full text-center px-16 font-medium"
                placeholder="0"
                placeholderTextColor="#000000"
              />
              <TouchableOpacity
                onPress={() => setBedrooms((prev) => Math.max(0, prev - 1))}
                className="absolute right-0"
                style={{ bottom: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="down" size={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setBedrooms((prev) => Math.max(0, prev + 1))}
                className="absolute right-0"
                style={{ top: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="up" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bathrooms */}
          <View className="w-full flex-col items-center justify-between">
            <Text className="text-lg self-start">
              How many bathrooms does your place have?
            </Text>
            <View className="w-full py-4 border rounded-xl text-center relative">
              <MaterialCommunityIcons
                name="bathtub-outline"
                size={24}
                color="black"
                className="absolute left-4 top-1/2 "
              />
              <TextInput
                keyboardType="numeric"
                value={bathrooms.toString()}
                onChangeText={(text) => setBathrooms(sanitizeNumber(text))}
                className="w-full text-center px-16 font-medium"
                placeholder="0"
                placeholderTextColor="#000000"
              />
              <TouchableOpacity
                onPress={() => setBathrooms((prev) => Math.max(0, prev - 1))}
                className="absolute right-0"
                style={{ bottom: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="down" size={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setBathrooms((prev) => Math.max(0, prev + 1))}
                className="absolute right-0"
                style={{ top: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="up" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
