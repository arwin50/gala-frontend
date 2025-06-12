import { Accommodation } from "@/interfaces/accommodation";
import { View } from "react-native";
import LocationCard from "./LocationCard";

type LocationListProps = {
  properties: Accommodation[];
};

export default function LocationList({ properties }: LocationListProps) {
  return (
    <View className="flex-row flex-wrap justify-between px-4">
      {properties.map((place, index) => (
        <LocationCard key={index} accommodation={place} />
      ))}
    </View>
  );
}
