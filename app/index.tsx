import CategoryGrid from "@/components/home/CategoryGrid";
import { Button, SafeAreaView, Text } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold text-blue-600">
        Welcome to Gala 🎉
      </Text>
      <Text className="mt-2 text-gray-500">Your app is running!</Text>
      <CategoryGrid />
      <Button
        title="Go to Details"
        onPress={() => router.push("/(root)/home")}
      />
    </SafeAreaView>
  );
}
