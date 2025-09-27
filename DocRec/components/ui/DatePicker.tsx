import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

interface DatePickerProps {
  onSelectDate: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDate }) => {
  const theme = useTheme();
  const [selected, setSelected] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="calendar" size={20} color={theme.primary} />
        <Text style={[styles.headerText, { color: theme.text }]}>
          Select a Date
        </Text>
      </View>

      {/* Calendar */}
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
          onSelectDate(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: theme.primary,
            selectedTextColor: "#fff",
          },
        }}
        theme={{
          backgroundColor: theme.card,
          calendarBackground: theme.card,
          textSectionTitleColor: theme.textSecondary,
          dayTextColor: theme.text,
          todayTextColor: theme.primary,
          monthTextColor: theme.text,
          arrowColor: theme.primary,
          textDisabledColor: theme.placeholder,
          selectedDayBackgroundColor: theme.primary,
          selectedDayTextColor: "#fff",
        }}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 15,
    margin: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  calendar: {
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default DatePicker;
