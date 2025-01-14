import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      const { username: storedUsername, password: storedPassword } = JSON.parse(storedUser);
      if (username === storedUsername && password === storedPassword) {
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Invalid Credentials");
      }
    } else {
      Alert.alert("Error", "No user found, please register first.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* Input Fields */}
      <TextInput
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Login Button */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>

      {/* Register Navigation */}
      <Text style={styles.registerText}>
        Don't have an account?{" "}
        <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff", // Light Blue Background
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    padding: 5,
    backgroundColor: "#007AFF", // iOS Style Blue Button
  },
  registerText: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
  },
  registerLink: {
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default LoginScreen;
