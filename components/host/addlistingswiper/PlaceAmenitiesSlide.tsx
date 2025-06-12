import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { axiosPublic } from "@/lib/axios/public";

interface Amenity {
  id: number;
  name: string;
  icon?: string;
}

interface PlaceAmenitiesSlideProps {
  setSelectedAmenities: (amenities: { id: number }[]) => void;
  initialAmenities?: { id: number }[];
}

export default function PlaceAmenitiesSlide({
  setSelectedAmenities,
  initialAmenities = [],
}: PlaceAmenitiesSlideProps) {
  const [selectedAmenities, setSelectedAmenitiesLocal] =
    useState<{ id: number }[]>(initialAmenities);
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  useEffect(() => {
    const fetchAccomodationAmenities = async () => {
      try {
        const response = await axiosPublic.get("/accomodation/amenity");
        setAmenities(response.data.objects);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };
    fetchAccomodationAmenities();
  }, []);

  const toggleAmenity = (amenity: Amenity) => {
    const newSelectedAmenities = selectedAmenities.some(
      (a) => a.id === amenity.id
    )
      ? selectedAmenities.filter((a) => a.id !== amenity.id)
      : [...selectedAmenities, { id: amenity.id }];

    setSelectedAmenitiesLocal(newSelectedAmenities);
    setSelectedAmenities(newSelectedAmenities);
  };

  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        What amenities does your place have?
      </Text>
      <Text className="mt-2 text-description">
        Amenities can be changed after publishing your listing later.
      </Text>
      <ScrollView
        className="mt-8 mb-5 p-4 border border-line rounded-xl drop-shadow-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap gap-4">
          {amenities?.map((amenity) => (
            <Pressable
              key={amenity.id}
              onPress={() => toggleAmenity(amenity)}
              className={`w-[30%] h-[100px] mb-4 shadow rounded-lg p-2 ${
                selectedAmenities.some((a) => a.id === amenity.id)
                  ? "bg-blue-50 border-2 border-blue-500"
                  : "bg-white"
              }`}
            >
              <View className="items-center justify-center h-full">
                {/*  <MaterialCommunityIcons
                  name={amenity.icon}
                  size={24}
                  color={
                    selectedAmenities.includes(amenity.name)
                      ? "#0066CC"
                      : "#666666"
                  }
                /> */}
                <Text
                  className={`mt-1 text-center font-medium text-xs ${
                    selectedAmenities.some((a) => a.id === amenity.id)
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {amenity.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
