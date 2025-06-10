import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Alert, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import type { MarkedDates } from "react-native-calendars/src/types";

interface PricingData {
  [date: string]: {
    price: number;
    available: boolean;
  };
}

export default function HostCalendarPage() {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [pricingData, setPricingData] = useState<PricingData>({});
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    // Generate months from current month to next year
    const currentDate = new Date();
    const monthsList: string[] = [];

    for (let i = 0; i < 13; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + i,
        1
      );
      monthsList.push(date.toISOString().split("T")[0].substring(0, 7));
    }

    setMonths(monthsList);
  }, []);

  // Simulate fetching availability and pricing data from backend
  useEffect(() => {
    const fetchData = async () => {
      const initialData: PricingData = {
        "2025-06-10": { price: 3200, available: true },
        "2025-06-11": { price: 3100, available: false },
        "2025-06-12": { price: 3000, available: true },
      };

      setPricingData(initialData);

      const marks: MarkedDates = {};
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Mark all past dates as unavailable
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const pastDate = new Date(currentDate);
      pastDate.setDate(pastDate.getDate() - 30); // Mark dates from 30 days ago

      while (pastDate <= currentDate) {
        const dateString = pastDate.toISOString().split("T")[0];
        marks[dateString] = {
          selected: false,
          marked: true,
          dotColor: "#ef4444",
          selectedColor: "#fef2f2",
          disabled: true,
        };
        pastDate.setDate(pastDate.getDate() + 1);
      }

      // Add the pricing data marks
      for (const [date, data] of Object.entries(initialData)) {
        const dateObj = new Date(date);
        if (dateObj >= today) {
          marks[date] = {
            selected: false,
            marked: true,
            dotColor: data.available ? "#22c55e" : "#ef4444",
            selectedColor: data.available ? "#f0fdf4" : "#fef2f2",
          };
        }
      }

      setMarkedDates(marks);
    };

    fetchData();
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    const selectedDate = day.dateString;
    const dateObj = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateObj < today) {
      Alert.alert("Date Info", "This date has already passed.");
      return;
    }

    const pricingInfo = pricingData[selectedDate];
    if (pricingInfo) {
      Alert.alert(
        "Date Info",
        `Price: ₱${pricingInfo.price || "N/A"}\nAvailable: ${
          pricingInfo.available ? "Yes" : "No"
        }`
      );
    } else {
      Alert.alert("Date Info", "No information for this day.");
    }
  };

  const renderMonth = ({ item }: { item: string }) => (
    <View className="mb-4">
      <Calendar
        style={{
          borderRadius: 0,
          backgroundColor: "transparent",
          paddingVertical: 5,
          height: 380,
          width: "100%",
        }}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          textSectionTitleColor: "#334155",
          textSectionTitleDisabledColor: "#94a3b8",
          selectedDayBackgroundColor: "transparent",
          selectedDayTextColor: "#2563eb",
          todayTextColor: "#2563eb",
          dayTextColor: "#1e293b",
          textDisabledColor: "#cbd5e1",
          dotColor: "transparent",
          selectedDotColor: "transparent",
          arrowColor: "#2563eb",
          monthTextColor: "#1e293b",
          indicatorColor: "#2563eb",
          textDayFontWeight: "600",
          textMonthFontWeight: "700",
          textDayHeaderFontWeight: "600",
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={"custom"}
        hideExtraDays={true}
        current={item}
        hideArrows={true}
        disableAllTouchEventsForDisabledDays={true}
        minDate={new Date().toISOString().split("T")[0]}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 mx-4">
      <View className="mb-2">
        <Text className="text-3xl font-bold mt-4">Calendar</Text>
        <Text className="text-gray-600 mt-4">
          Manage your property&apos;s availability and pricing. Green dots
          indicate available dates, while red dots show unavailable or past
          dates.
        </Text>
      </View>
      <FlatList
        data={months}
        renderItem={renderMonth}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
