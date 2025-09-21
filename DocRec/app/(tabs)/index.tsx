import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DoctorCard from "@/components/ui/DoctorCard"; // 👈 import reusable card
import { router } from "expo-router";

const categories = [
  { id: "1", name: "Dentist", icon: "🦷" },
  { id: "2", name: "Cardiologist", icon: "❤️" },
  { id: "3", name: "Dermatologist", icon: "🌿" },
  { id: "4", name: "Neurologist", icon: "🧠" },
];

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Dentist",
    experience: "8 yrs",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Dr. Mark Lee",
    specialty: "Cardiologist",
    experience: "12 yrs",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.title}>Find your specialist</Text>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/85.jpg" }}
          style={styles.avatar}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search doctors, specialties..."
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Specialties</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      {/* Top Doctors using reusable DoctorCard */}
      <Text style={styles.sectionTitle}>Top Doctors</Text>
      <FlatList
        data={doctors}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard
            name={item.name}
            specialty={item.specialty}
            experience={item.experience}
            image={item.image}
            onPress={() => alert(`Booking with ${item.name}`)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      {/* Book Appointment CTA */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => router.push("/(user)/chatScreen")}>
        <Text style={styles.bookButtonText}>Check Disease</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },

  // Header
  header: {
    padding: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 16, color: "#666" },
  title: { fontSize: 22, fontWeight: "700", color: "#222", marginTop: 4 },
  avatar: { width: 45, height: 45, borderRadius: 22 },

  // Search
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: "#333" },

  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
    color: "#222",
  },

  // Categories
  categoryCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    width: 90,
  },
  categoryIcon: { fontSize: 26 },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  // CTA Button
  bookButton: {
    backgroundColor: "#0078FF",
    margin: 25,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
});
