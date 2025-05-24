import { View } from "react-native";
import LocationCard from "./LocationCard";

type LocationListProps = {
  properties: any[];
};

export default function LocationList({ properties }: LocationListProps) {
  return (
    <View className="flex-row flex-wrap justify-between">
      {properties.map((place, index) => (
        <LocationCard key={index} property={place} />
      ))}
    </View>
  );
}
