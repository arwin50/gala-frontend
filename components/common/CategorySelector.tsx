import { categories } from "@/constants/categoryData";
import { useEffect, useRef, useState } from "react";
import type { View as ViewType } from "react-native";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";

export default function CategorySelector({
  selectedCategoryId,
  onCategoryChange,
}: {
  selectedCategoryId: number | undefined;
  onCategoryChange: (categoryId: number) => void;
}) {
  const scrollViewRef = useRef<ScrollView>(null);
  const itemRefs = useRef<Record<string, ViewType | null>>({});
  const [selectedId, setSelectedId] = useState<number | undefined>(
    selectedCategoryId
  );

  useEffect(() => {
    setSelectedId(selectedCategoryId);

    if (selectedCategoryId && itemRefs.current[selectedCategoryId]) {
      itemRefs.current[selectedCategoryId]?.measureLayout(
        scrollViewRef.current as any,
        (x) => {
          scrollViewRef.current?.scrollTo({ x: x - 16, animated: true });
        },
        () => {
          console.warn("measureLayout error");
        }
      );
    }
  }, [selectedCategoryId]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="pt-4"
    >
      {categories.map((cat) => {
        const isSelected = selectedId === cat.id;

        return (
          <TouchableOpacity
            key={cat.id}
            ref={(ref) => {
              itemRefs.current[cat.id] = ref;
            }}
            onPress={() => {
              setSelectedId(cat.id);
              onCategoryChange(cat.id);
            }}
            className="p-3 items-center"
            style={{
              width: 100,
              backgroundColor: isSelected ? cat.color : "#ffffff",
            }}
          >
            <Image
              source={cat.image}
              className="w-12 h-12 rounded-full mb-1"
              resizeMode="cover"
            />
            <Text
              className="text-sm font-medium text-center leading-none text-gray-700"
              style={{
                fontWeight: isSelected ? "bold" : "normal",
              }}
            >
              {cat.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
