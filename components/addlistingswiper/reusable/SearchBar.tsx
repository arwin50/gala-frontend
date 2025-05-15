import LocPin from "@/assets/addlisting/locPin.svg";
import React from "react";
import { TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View className="border border-line  rounded-xl relative">
      <TextInput
        className="text-center p-6 font-medium text-black"
        placeholder="Enter your address"
        placeholderTextColor={"#B0B0B0"}
      ></TextInput>
      <View className="absolute left-4 top-0 mt-5">
        <LocPin width={18} height={18} />
      </View>
    </View>
  );
}
