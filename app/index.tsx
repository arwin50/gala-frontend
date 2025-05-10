import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold text-blue-600">
        Welcome to Gala 🎉
      </Text>
      <Text className="mt-2 text-gray-500">Your app is running!</Text>
    </SafeAreaView>
  );
}
