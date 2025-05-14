import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function SearchBarWithModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      {/* Compact Search Bar */}
      <Pressable
        onPress={() => setModalVisible(true)}
        className="fixed bg-white rounded-xl px-4 py-5 flex-row items-center justify-between border shadow shadow-black/10"
      >
        <Feather name="search" size={20} color="black" />
        <Text className="flex-1 text-center font-medium text-black">
          Gala, where to?
        </Text>
        <Ionicons name="options-outline" size={20} color="black" />
      </Pressable>

      {/* Expanding Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{ margin: 0 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-white pt-16 px-5">
            {/* Header with search bar */}
            <View className="flex-row items-center space-x-3 border-b border-gray-200 pb-2">
              <TextInput
                autoFocus
                value={query}
                onChangeText={setQuery}
                placeholder="Search places, events, or destinations..."
                className="flex-1 text-base"
              />
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>

            {/* Optional: Add recent searches, suggestions, etc. here */}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
