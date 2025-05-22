import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Calendar } from "react-native-calendars";

export default function HostCalendarPage() {
  return (
    <SafeAreaView className="flex-1 relative mx-4 gap-4">
      <Text className="text-3xl font-bold mt-4">Calendar</Text>
      <Calendar
        style={{
          borderRadius: 16,
          backgroundColor: "#f5f7fa",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          paddingVertical: 10,
        }}
        theme={{
          backgroundColor: "#f5f7fa",
          calendarBackground: "#f5f7fa",
          textSectionTitleColor: "#334155",
          textSectionTitleDisabledColor: "#94a3b8",
          selectedDayBackgroundColor: "#2563eb", // blue-600
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#2563eb",
          dayTextColor: "#1e293b",
          textDisabledColor: "#cbd5e1",
          dotColor: "#2563eb",
          selectedDotColor: "#ffffff",
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
        current={"2012-03-01"}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        markedDates={{
          "2012-03-01": {
            selected: true,
            marked: true,
            selectedColor: "#2563eb",
          },
          "2012-03-02": { marked: true, dotColor: "#2563eb" },
          "2012-03-03": {
            selected: true,
            marked: true,
            selectedColor: "#2563eb",
          },
        }}
        hideExtraDays={true}
        enableSwipeMonths={true}
      />
    </SafeAreaView>
  );
}
