import React from "react";
import { TextInput, TextInputProps } from "react-native";

export default function AuthInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#888"
      className="w-full h-12 bg-white rounded-xl px-4 mb-4 text-sm"
    />
  );
}
