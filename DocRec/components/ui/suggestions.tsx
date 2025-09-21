import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SuggestionsScreen() {
  const { symptoms } = useLocalSearchParams<{ symptoms: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Doctors</Text>
      <Text>Based on your symptoms: {symptoms}</Text>
      {/* Later fetch doctor list here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
