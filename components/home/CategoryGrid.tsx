// CategoryGrid.js
import React from "react";
import {
  Pressable,
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import hotelImg from "@/assets/images/category_hotels.png";
import resortsImg from "@/assets/images/category_resorts.png";
import recreationalImg from "@/assets/images/category_exp.png";
import eventSpacesImg from "@/assets/images/category_eventSpaces.png";
import homestaysImg from "@/assets/images/category_homestay.png";

const categories = [
  { title: "Hotels", color: "bg-[#D3E7FF]", image: hotelImg },
  { title: "Resorts", color: "bg-[#D9FFC0]", image: resortsImg },
  { title: "Recreational", color: "bg-[#F9C2D2]", image: recreationalImg },
  { title: "Event Places", color: "bg-[#F1D1FA]", image: eventSpacesImg },
  { title: "Transients", color: "bg-[#FFF2C0]", image: homestaysImg },
];

export default function CategoryGrid() {
  return (
    <View className="w-full">
      <View className="flex-row gap-4 mb-3">
        <CategoryCard
          title={categories[0].title}
          color={categories[0].color}
          image={categories[0].image}
        />
        <CategoryCard
          title={categories[1].title}
          color={categories[1].color}
          image={categories[1].image}
        />
      </View>

      <View className="flex-row gap-3 mb-3">
        <CategoryCard
          title={categories[2].title}
          color={categories[2].color}
          image={categories[2].image}
        />
        <CategoryCard
          title={categories[3].title}
          color={categories[3].color}
          image={categories[3].image}
        />
        <CategoryCard
          title={categories[4].title}
          color={categories[4].color}
          image={categories[4].image}
        />
      </View>

      <TouchableOpacity className="flex flex-row h-16 rounded-xl bg-[#306FC7] justify-between items-center">
        <View className="flex w-4/5 items-center justify-center">
          <Text className="text-white font-bold text-base">
            More Categories
          </Text>
        </View>
        <View className="flex items-center justify-center h-full w-16 border-l-2 border-white">
          <AntDesign name="caretdown" size={12} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

type CategoryCardProps = {
  title: string;
  color: string; // Tailwind class like "bg-[#C9E7FF]"
  image: ImageSourcePropType;
};

function CategoryCard({ title, color, image }: CategoryCardProps) {
  return (
    <Pressable
      className={`relative flex-1 h-32 rounded-xl p-3 ${color} overflow-hidden`}
    >
      <Text className="font-bold text-base leading-none z-10">{title}</Text>
      <Image
        source={image}
        className="absolute h-48 w-48 bottom-[-72] right-[-48]"
      />
    </Pressable>
  );
}
