import DoctorCard from "@/components/ui/DoctorCard";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
    name: "Dr. Dinushan Sriskandaraja",
    specialty: "Cardiologist",
    experience: "32 yrs",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>
            Hello 👋
          </Text>
          <Text style={[styles.title, { color: theme.text }]}>
            Find your specialist
          </Text>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/85.jpg" }}
          style={styles.avatar}
        />
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
        <Ionicons
          name="search"
          size={20}
          color={theme.placeholder}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search doctors, specialties..."
          placeholderTextColor={theme.placeholder}
          style={[styles.searchInput, { color: theme.text }]}
        />
      </View>

      {/* Categories */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Specialties
      </Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        style={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryCard, { backgroundColor: theme.card }]}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={[styles.categoryText, { color: theme.text }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      {/* Top Doctors */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Top Doctors
      </Text>
      <FlatList
        data={doctors}
        horizontal
        keyExtractor={(item) => item.id}
        style={{ paddingBottom: 20 }}
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
        style={[styles.bookButton, { backgroundColor: theme.primary }]}
        onPress={() => router.push("/(user)/chatScreen")}>
        <Text style={[styles.bookButtonText, { color: "#fff" }]}>
          Check Disease
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 60 },

  // Header
  header: {
    padding: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 16 },
  title: { fontSize: 22, fontWeight: "700", marginTop: 4 },
  avatar: { width: 45, height: 45, borderRadius: 22 },

  // Search
  searchContainer: {
    flexDirection: "row",
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
  searchInput: { flex: 1, fontSize: 15 },

  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  // Categories
  categoryCard: {
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
    fontWeight: "500",
  },

  // CTA Button
  bookButton: {
    margin: 25,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: { fontWeight: "bold", fontSize: 17 },
});
