import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

type GenericModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const GenericModal: React.FC<GenericModalProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-2xl h-[90%] w-full">
          <TouchableOpacity onPress={onClose} className="m-4 self-end">
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-1">{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;
