import AddListingSwiper from "@/components/addlistingswiper/AddListingSwiper";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function HostHomePage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        className="m-5 p-4 rounded-lg bg-gray-200 items-center"
      >
        <Text className="text-base font-semibold">Add Listing</Text>
      </TouchableOpacity>

      <AddListingSwiper isVisible={isVisible} onClose={handleCloseModal} />
    </SafeAreaView>
  );
}
