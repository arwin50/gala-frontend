import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PlaceDescriptionSlideProps } from "../../../interfaces";

export default function PlaceDescriptionSlide({
  placeDescription,
  setPlaceDescription,
}: PlaceDescriptionSlideProps) {
  const characterLimit = 400;

  const handleDescriptionChange = (text: string) => {
    if (text.length <= characterLimit) {
      setPlaceDescription(text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 m-8 mt-0">
        <Text className="text-3xl font-extrabold">
          How would you describe your place?
        </Text>
        <Text className="mt-2 text-description">
          Write a short description of your place, highlighting what makes it
          unique.
        </Text>
        <View className="mt-8">
          <TextInput
            className="border border-line rounded-xl p-4 h-[160px] text-start"
            placeholder="Enter place Description"
            value={placeDescription}
            onChangeText={handleDescriptionChange}
            maxLength={characterLimit}
            multiline={true}
            textAlignVertical="top"
          />
          <Text className="ml-1 text-sm text-description mt-1">
            {placeDescription.length}/{characterLimit}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
