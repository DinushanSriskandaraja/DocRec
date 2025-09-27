import DatePicker from "@/components/ui/DatePicker";
import DoctorCard from "@/components/ui/DrProfile";
import TimeSlots from "@/components/ui/TimeSlot";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleBooking = (slot: string) => {
    setSelectedSlot(slot);
    Alert.alert("Appointment Selected", `Date: ${selectedDate}\nTime: ${slot}`);
  };

  return (
    <View style={styles.container}>
      <DoctorCard
        name="Dr. Jane Smith"
        specialty="Cardiologist"
        image="https://randomuser.me/api/portraits/women/44.jpg"
      />

      <Text style={styles.sectionTitle}>Select Date</Text>
      <DatePicker onSelectDate={setSelectedDate} />

      {selectedDate ? (
        <>
          <Text style={styles.sectionTitle}>Available Time Slots</Text>
          <TimeSlots
            startTime="09:00"
            endTime="17:00"
            onSelect={handleBooking}
          />
        </>
      ) : (
        <Text style={{ marginTop: 20, color: "gray" }}>
          Please select a date
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
});

export default AppointmentsPage;
