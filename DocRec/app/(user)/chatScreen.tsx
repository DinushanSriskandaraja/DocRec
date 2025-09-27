import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ChatLandingScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: "👋 Hi! Tell me your symptoms, and I’ll suggest the right doctors.",
    },
  ]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets(); // for bottom safe area

  const FLOATING_TAB_HEIGHT = 70; // match your _layout.tsx tab bar height

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: `Got it! Symptoms: "${input}". Let me find doctors for you...`,
        },
      ]);
      router.push({ pathname: "./suggestions", params: { symptoms: input } });
    }, 1200);

    setInput("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={FLOATING_TAB_HEIGHT + insets.bottom + 10} // 👈 moves input above floating tab
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.sender === "user" ? styles.userMessage : styles.botMessage,
              ]}>
              <Text
                style={{ color: item.sender === "user" ? "white" : "#222" }}>
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{
            padding: 12,
            paddingBottom: FLOATING_TAB_HEIGHT + insets.bottom + 20, // extra space for floating tab
          }}
        />

        <View style={[styles.inputContainer, { marginBottom: insets.bottom }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type your symptoms..."
            placeholderTextColor="#888"
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000000  " },
  container: { flex: 1 },
  message: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 8,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0078FF",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#00000010",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#222",
  },
  sendButton: {
    backgroundColor: "#0078FF",
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
