import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarWithoutModalProps {
  query: string;
  setQuery: (query: string) => void;
  placeholder?: string;
}

export default function SearchBarWithoutModal({
  query,
  setQuery,
  placeholder = "Search bookings...",
}: SearchBarWithoutModalProps) {
  return (
    <View className="fixed bg-white rounded-xl px-4 py-5 flex-row items-center justify-between border shadow shadow-black/10">
      <Feather name="search" size={20} color="black" />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#666"
        className="flex-1 text-center font-medium text-black mr-8"
        style={{ textAlign: "center" }}
      />
    </View>
  );
}
