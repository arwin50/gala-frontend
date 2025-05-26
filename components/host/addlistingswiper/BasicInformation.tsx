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
import { BasicInformationProps } from "../../../interfaces";

export default function BasicInformation({
  setGuests,
  setBedrooms,
  setBathrooms,
  initialGuests = 0,
  initialBedrooms = 0,
  initialBathrooms = 0,
}: BasicInformationProps) {
  const [currentGuests, setCurrentGuests] = useState(initialGuests);
  const [currentBedrooms, setCurrentBedrooms] = useState(initialBedrooms);
  const [currentBathrooms, setCurrentBathrooms] = useState(initialBathrooms);

  // Helper to sanitize number inputs
  const sanitizeNumber = (value: string) => {
    const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? 0 : num;
  };

  const handleGuestsChange = (value: number) => {
    setCurrentGuests(value);
    setGuests(value);
  };

  const handleBedroomsChange = (value: number) => {
    setCurrentBedrooms(value);
    setBedrooms(value);
  };

  const handleBathroomsChange = (value: number) => {
    setCurrentBathrooms(value);
    setBathrooms(value);
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

        <View className="gap-y-8 mt-16">
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
                value={currentGuests.toString()}
                onChangeText={(text) =>
                  handleGuestsChange(sanitizeNumber(text))
                }
                className="w-full text-center px-16  font-medium"
                placeholder="0"
                placeholderTextColor="#000000"
              />
              <TouchableOpacity
                onPress={() =>
                  handleGuestsChange(Math.max(0, currentGuests - 1))
                }
                className="absolute right-0"
                style={{ bottom: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="down" size={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleGuestsChange(Math.max(0, currentGuests + 1))
                }
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
                value={currentBedrooms.toString()}
                onChangeText={(text) =>
                  handleBedroomsChange(sanitizeNumber(text))
                }
                className="w-full text-center px-16 font-medium"
                placeholder="0"
                placeholderTextColor="#000000"
              />
              <TouchableOpacity
                onPress={() =>
                  handleBedroomsChange(Math.max(0, currentBedrooms - 1))
                }
                className="absolute right-0"
                style={{ bottom: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="down" size={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleBedroomsChange(Math.max(0, currentBedrooms + 1))
                }
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
                value={currentBathrooms.toString()}
                onChangeText={(text) =>
                  handleBathroomsChange(sanitizeNumber(text))
                }
                className="w-full text-center px-16 font-medium"
                placeholder="0"
                placeholderTextColor="#000000"
              />
              <TouchableOpacity
                onPress={() =>
                  handleBathroomsChange(Math.max(0, currentBathrooms - 1))
                }
                className="absolute right-0"
                style={{ bottom: "30%", transform: [{ translateX: -13 }] }}
              >
                <AntDesign name="down" size={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleBathroomsChange(Math.max(0, currentBathrooms + 1))
                }
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
