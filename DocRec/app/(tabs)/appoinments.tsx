import { useTheme } from "@/hooks/useTheme";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Appointment {
  id: string;
  doctor: string;
  date: string;
  time: string;
}

const doctors = ["Dr. Sarah Johnson", "Dr. Mark Lee", "Dr. Amy Adams"];

export default function AppointmentsScreen() {
  const theme = useTheme();
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleAddAppointment = () => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctor: selectedDoctor,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setAppointments([newAppointment, ...appointments]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Appointment Form */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Book an Appointment
      </Text>

      {/* Select Doctor */}
      <Text style={[styles.label, { color: theme.textSecondary }]}>Doctor</Text>
      <View style={[styles.inputBox, { borderColor: theme.border }]}>
        <FlatList
          horizontal
          data={doctors}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.doctorOption,
                {
                  backgroundColor:
                    selectedDoctor === item ? theme.primary : theme.card,
                },
              ]}
              onPress={() => setSelectedDoctor(item)}>
              <Text
                style={{
                  color: selectedDoctor === item ? "#fff" : theme.text,
                  fontWeight: "500",
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Date & Time */}
      <Text style={[styles.label, { color: theme.textSecondary }]}>Date</Text>
      <TouchableOpacity
        style={[styles.inputBox, { borderColor: theme.border }]}
        onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: theme.text }}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text style={[styles.label, { color: theme.textSecondary }]}>Time</Text>
      <TouchableOpacity
        style={[styles.inputBox, { borderColor: theme.border }]}
        onPress={() => setShowTimePicker(true)}>
        <Text style={{ color: theme.text }}>
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>

      {(showDatePicker || showTimePicker) && (
        <DateTimePicker
          value={date}
          mode={showDatePicker ? "date" : "time"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, selected) => {
            setShowDatePicker(false);
            setShowTimePicker(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.bookButton, { backgroundColor: theme.primary }]}
        onPress={handleAddAppointment}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>

      {/* Appointments List */}
      <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>
        Your Appointments
      </Text>
      {appointments.length === 0 ? (
        <Text style={{ color: theme.textSecondary, marginHorizontal: 20 }}>
          No appointments yet.
        </Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[styles.appointmentCard, { backgroundColor: theme.card }]}>
              <Text style={[styles.doctorName, { color: theme.text }]}>
                {item.doctor}
              </Text>
              <Text style={{ color: theme.textSecondary }}>
                {item.date} at {item.time}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6 },
  inputBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  doctorOption: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 10,
  },
  bookButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  bookButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  appointmentCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  doctorName: { fontWeight: "600", fontSize: 16, marginBottom: 4 },
});
