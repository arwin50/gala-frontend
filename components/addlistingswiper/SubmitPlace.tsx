import { Image, Text, View } from "react-native";
import HomeWithGirlPng from "../../assets/addlisting/homeWithGirl.png";

export default function SubmitPlace() {
  return (
    <View className="flex-1  m-8 mt-0">
      <Text className="text-3xl font-extrabold">Your place is now ready!</Text>
      <Text className="mt-2 text-description">
        Your listing is complete and your place is now available for guests to
        book. Make sure to keep your calendar up to date and get ready to start
        hosting!
      </Text>
      <View className="mt-20 items-center justify-center">
        <Image
          source={HomeWithGirlPng}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
