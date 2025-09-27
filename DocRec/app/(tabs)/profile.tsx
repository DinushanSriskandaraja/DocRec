import { BorderRadius, FontSizes, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ExampleComponent() {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={{ color: theme.text, fontSize: FontSizes.large }}>
        Hello Theme!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    margin: Spacing.sm,
  },
});
