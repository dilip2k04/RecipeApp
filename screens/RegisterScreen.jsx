import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";


const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const user = { username, password };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    Alert.alert("Success", "Registration Successful!");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo Section */}
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us and start Cooking!</Text>

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

        <TextInput
          label="Confirm Password"
          mode="outlined"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        {/* Register Button */}
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Sign Up
        </Button>

        {/* Login Navigation */}
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
            Login
          </Text>
        </Text>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e8cf4d",
  },
  subtitle: {
    fontSize: 16,
    color: "green",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 15,
    // backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent Input
  },
  button: {
    width: "100%",
    padding: 5,
    backgroundColor: "#ff9800", // Orange Theme
  },
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: "black",
  },
  loginLink: {
    fontWeight: "bold",
    color: "green",
  },
});

export default RegisterScreen;