import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PlaceVerificationSlideProps } from "../../../interfaces";

export default function PlaceVerificationSlide({
  contactNumber,
  setContactNumber,
  emailAddress,
  setEmailAddress,
  verificationImage,
  setVerificationImage,
}: PlaceVerificationSlideProps) {
  const handleScanID = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera and media library permissions to make this work."
      );
      return;
    }

    Alert.alert(
      "Choose Image Source",
      "Would you like to take a photo or select from the library?",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setVerificationImage(result.assets[0].uri);
            }
          },
        },
        {
          text: "Choose from Library",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setVerificationImage(result.assets[0].uri);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const handleCheckAllowedIDs = () => {
    console.log("Check allowed IDs link pressed");
    // TODO: Add navigation or modal to show allowed ID types
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <View className="m-8 mt-0">
          <Text className="text-3xl font-extrabold">
            Verification and Contact
          </Text>
          <Text className="mt-2 text-description">
            To help build a safe and trusted community, we require users to
            verify their identity and contact details before they can host or
            book.
          </Text>
        </View>
        <ScrollView className="flex-1">
          <View className="m-8 mt-0">
            <Text className="text-xl font-medium mb-4">
              Verify your identity
            </Text>
            {verificationImage ? (
              <View className="mb-4">
                <Image
                  source={{ uri: verificationImage }}
                  className="w-full h-48 rounded-lg mb-2"
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => setVerificationImage(null)}
                  className="bg-red-500 p-2 rounded-lg self-end"
                >
                  <Text className="text-white">Remove Image</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={handleScanID}
                className="flex-row items-center justify-center border border-gray-300 rounded-lg p-4 mb-2"
              >
                <Ionicons name="camera-outline" size={24} color="black" />
                <Text className="text-base ml-2">Scan your ID</Text>
              </Pressable>
            )}
            <Pressable
              onPress={handleCheckAllowedIDs}
              className="self-end mb-8"
            >
              <Text className="text-blue-600 underline text-sm ">
                check allowed IDs here.
              </Text>
            </Pressable>

            {/* Contact Details */}
            <Text className="text-xl font-medium mb-4">Contact Details</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-4"
              placeholder="Contact No."
              placeholderTextColor="#a1a1aa"
              keyboardType="phone-pad"
              value={contactNumber}
              onChangeText={setContactNumber}
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-8"
              placeholder="Email address"
              placeholderTextColor="#a1a1aa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
