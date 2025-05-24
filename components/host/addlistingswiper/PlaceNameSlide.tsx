import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PlaceNameSlideProps } from "../../../interfaces";

export default function PlaceNameSlide({
  placeName,
  setPlaceName,
}: PlaceNameSlideProps) {
  const characterLimit = 32;

  const handleNameChange = (text: string) => {
    if (text.length <= characterLimit) {
      setPlaceName(text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 m-8 mt-0">
        <Text className="text-3xl font-extrabold">
          What is the name of your place?
        </Text>
        <Text className="mt-2 text-description">
          Give your place a name, you can change it after posting later.
        </Text>
        <View className="mt-8">
          <TextInput
            className="border border-line rounded-xl p-4 text"
            placeholder="Enter place name"
            value={placeName}
            onChangeText={handleNameChange}
            maxLength={characterLimit}
          />
          <Text className="ml-1 text-sm text-description mt-1">
            {placeName.length}/{characterLimit}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
