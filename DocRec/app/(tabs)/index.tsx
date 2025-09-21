import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

      // Navigate to suggestions screen
      router.push({ pathname: "./suggestions", params: { symptoms: input } });
    }, 1200);

    setInput("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}>
            <Text style={{ color: item.sender === "user" ? "white" : "black" }}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your symptoms..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  message: { padding: 10, borderRadius: 10, marginBottom: 8, maxWidth: "80%" },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#0078FF" },
  botMessage: { alignSelf: "flex-start", backgroundColor: "#e5e5e5" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#0078FF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
