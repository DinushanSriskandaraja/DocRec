import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface TimeSlotsProps {
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "17:00"
  onSelect: (slot: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({
  startTime,
  endTime,
  onSelect,
}) => {
  const generateSlots = () => {
    const slots: string[] = [];
    let [h, m] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    while (h < endH || (h === endH && m < endM)) {
      const start = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      m += 30;
      if (m >= 60) {
        h++;
        m = 0;
      }
      const end = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      slots.push(`${start} - ${end}`);
    }
    return slots;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {generateSlots().map((slot, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.slot}
          onPress={() => onSelect(slot)}>
          <Text style={styles.slotText}>{slot}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 10,
  },
  slot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    margin: 6,
  },
  slotText: {
    fontSize: 14,
    color: "#333",
  },
});

export default TimeSlots;
