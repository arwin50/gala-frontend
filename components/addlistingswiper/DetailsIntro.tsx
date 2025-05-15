import TellDetails from "@/assets/addlisting/TellDetails.svg";
import TellPlace from "@/assets/addlisting/TellPlace.svg";
import TellPrice from "@/assets/addlisting/TellPrice.svg";
import { DetailsIntroInterface } from "@/interfaces";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

export default function DetailsIntro({ onGetStarted }: DetailsIntroInterface) {
  return (
    <View className="flex-1  m-8 mt-0">
      <Text className="text-3xl font-extrabold">Start your listing setup</Text>
      <View className="flex mt-10 gap-y-8">
        <View className="flex flex-row items-center">
          <View className="w-[68%] text-fancy">
            <Text className="text-xl">Tell us about your place</Text>
            <Text className="mt-2 text-description">
              Give your space a name and choose the property type. This helps
              guests understand what kind of stay they can expect.
            </Text>
          </View>
          <View className="w-full flex-1 items-center ">
            <TellPlace width={80} height={80} />
          </View>
        </View>
        <View className="border-b border-line" />
        <View>
          <View className="flex flex-row items-center">
            <View className="w-[68%] text-fancy">
              <Text className="text-xl">
                Set guest capacity and property features
              </Text>
              <Text className="mt-2 text-description">
                Let us know how many guests you can host, and how many bedrooms,
                beds, and bathrooms are available. Accurate details build trust
                and set the right expectations.
              </Text>
            </View>
            <View className="w-full flex-1 items-center ">
              <TellDetails width={80} height={80} />
            </View>
          </View>
        </View>
        <View className="border-b border-line" />
        <View>
          <View className="flex flex-row items-center">
            <View className="w-[68%] text-fancy">
              <Text className="text-xl">Set your price and availability</Text>
              <Text className="mt-2 text-description">
                Decide how much to charge per night and when your space is
                available. You stay in control while we help maximize your
                earnings.
              </Text>
            </View>
            <View className="w-full flex-1 items-center ">
              <TellPrice width={80} height={80} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onGetStarted}>
          <LinearGradient
            colors={["#166EF3", "#2665BE"]}
            locations={[0.32, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 25,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            }}
            className="w-full  mt-5"
          >
            <Text className="text-xl p-6 text-white font-semibold text-center">
              Get Started
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
