import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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
  return (
    <LinearGradient
      colors={["#ffffff", "#f3f9ff"]}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      {/* Doctor Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.doctorImage} />
      </View>

      {/* Info */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.specialty}>{specialty}</Text>
      <Text style={styles.experience}>{experience} experience</Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name="star"
            size={14}
            color={i < 4 ? "#FFD700" : "#ccc"} // 4/5 stars
            style={{ marginHorizontal: 1 }}
          />
        ))}
        <Text style={styles.ratingText}>4.0</Text>
      </View>

      {/* Consult Button */}
      <TouchableOpacity style={styles.consultButton} onPress={onPress}>
        <LinearGradient
          colors={["#0078FF", "#005FCC"]}
          style={styles.consultGradient}>
          <Text style={styles.consultText}>Consult</Text>
        </LinearGradient>
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
    backgroundColor: "#fff",
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
    color: "#222",
    textAlign: "center",
  },
  specialty: {
    fontSize: 14,
    color: "#0078FF",
    marginTop: 2,
    fontWeight: "500",
  },
  experience: { fontSize: 12, color: "#666", marginTop: 2 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingText: { fontSize: 12, color: "#444", marginLeft: 4 },
  consultButton: {
    marginTop: 12,
    width: "80%",
    borderRadius: 25,
    overflow: "hidden",
  },
  consultGradient: {
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  consultText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
