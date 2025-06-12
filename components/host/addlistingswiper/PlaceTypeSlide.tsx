import { PlaceTypeSlideProps, PropertyType, Category } from "@/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { axiosPublic } from "@/lib/axios/public";

export default function PlaceTypeSlide({
  setSelectedType,
  initialType = null,
}: PlaceTypeSlideProps) {
  const [category, setCategory] = useState<Category[] | null>(null);
  const [selected, setSelected] = useState<Category | null>(initialType);

  useEffect(() => {
    const fetchAccomodationCategories = async () => {
      try {
        const response = await axiosPublic.get("/accomodation/category");
        console.log("API Response:", response.data); // Debug log
        setCategory(response.data.objects);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAccomodationCategories();
  }, []);

  const handleSelectType = (type: Category) => {
    setSelected(type);
    console.log(type);
    setSelectedType(type);
  };

  return (
    <View className="flex-1  m-8 mt-0">
      <Text className="text-3xl font-extrabold">
        What type of property is your place?
      </Text>
      <ScrollView
        className="mt-8 mb-5 p-6 border border-line rounded-xl drop-shadow-lg"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between relative">
          {category?.map((type, i) => (
            <Pressable
              key={i}
              onPress={() => handleSelectType(type)}
              className={`w-[48%] h-[140px] mb-8 shadow rounded-lg p-4 ${
                selected?.id === type.id
                  ? "bg-blue-50 border-2 border-blue-500"
                  : "bg-white"
              }`}
            >
              <View className="items-center justify-center h-full">
                {/* <MaterialCommunityIcons
                  name={type.icon}
                  size={32}
                  color={selected === type.name ? "#0066CC" : "#666666"}
                /> */}
                <Text
                  className={`mt-2 text-center font-medium ${
                    selected?.id === type.id ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {type.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
