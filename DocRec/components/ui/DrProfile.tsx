import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface DoctorCardProps {
  name: string;
  specialty: string;
  image: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    marginBottom: 20,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  specialty: {
    fontSize: 14,
    color: "gray",
  },
});

export default DoctorCard;
