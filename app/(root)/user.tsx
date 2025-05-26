import ProfileScreen from "@/components/home/ProfileScreen";
import { SafeAreaView, ScrollView } from "react-native";

export default function UserScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 10,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileScreen />
      </ScrollView>
    </SafeAreaView>
  );
}
