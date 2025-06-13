import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { axiosPublic } from "@/lib/axios/public";
import { useQuery } from "@tanstack/react-query";

interface Category {
  id: number;
  name: string;
  icon?: string;
}

interface PlaceTypeSlideProps {
  setSelectedType: (type: Category | null) => void;
  initialType?: string | null;
}

export default function PlaceTypeSlide({
  setSelectedType,
  initialType = null,
}: PlaceTypeSlideProps) {
  const [selected, setSelected] = useState<Category | null>(null);

  const { data: category } = useQuery({
    queryKey: ["propertyCategories"],
    queryFn: async () => {
      const response = await axiosPublic.get("/accomodation/category");
      return response.data.objects;
    },
  });

  const handleSelectType = (type: Category) => {
    console.log(type);
    setSelected(type);
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
          {category?.map((type: Category, i: number) => (
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
