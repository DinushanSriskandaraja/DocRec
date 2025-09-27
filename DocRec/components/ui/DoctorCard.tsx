import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router"; // 👈 import router
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DoctorCardProps {
  name: string;
  specialty: string;
  experience: string;
  image: string;
  onPress?: () => void; // For consult button / navigation
}

export default function DoctorCard({
  name,
  specialty,
  experience,
  image,
  onPress,
}: DoctorCardProps) {
  const theme = useTheme();
  const router = useRouter(); // 👈 get router instance

  return (
    <LinearGradient
      colors={[theme.card, theme.card]}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      {/* Doctor Image */}
      <View style={[styles.imageWrapper, { backgroundColor: theme.card }]}>
        <Image source={{ uri: image }} style={styles.doctorImage} />
      </View>

      {/* Info */}
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <Text style={[styles.specialty, { color: theme.primary }]}>
        {specialty}
      </Text>
      <Text style={[styles.experience, { color: theme.textSecondary }]}>
        {experience} experience
      </Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name="star"
            size={14}
            color={i < 4 ? "#FFD700" : theme.textSecondary}
            style={{ marginHorizontal: 1 }}
          />
        ))}
        <Text style={[styles.ratingText, { color: theme.textSecondary }]}>
          4.0
        </Text>
      </View>

      {/* Consult Button */}
      <TouchableOpacity
        style={[styles.consultButton, { backgroundColor: theme.primary }]}
        onPress={() => {
          if (onPress) {
            router.push("/(user)/Appointment");
            // onPress(); // 👈 if a custom action is passed
          } else {
            router.push("/(user)/Appointment"); // 👈 navigate to appointment page
          }
        }}>
        <Text style={styles.consultText}>Consult</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginRight: 15,
    alignItems: "center",
    width: 200,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageWrapper: {
    borderRadius: 50,
    padding: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 12,
  },
  doctorImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  specialty: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: "500",
  },
  experience: { fontSize: 12, marginTop: 2 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingText: { fontSize: 12, marginLeft: 4 },
  consultButton: {
    marginTop: 12,
    width: "80%",
    borderRadius: 25,
    overflow: "hidden",
    paddingVertical: 10,
    // borderRadius: 25,
    alignItems: "center",
  },
  // consultGradient: {
  //   paddingVertical: 10,
  //   borderRadius: 25,
  //   alignItems: "center",
  // },
  consultText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
