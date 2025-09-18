import React, { useState } from "react";
import {
  View, TextInput, Button, Text, StyleSheet,
  TouchableOpacity, Platform
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router"; // ✅ add router for navigation

function Auth() {
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      router.replace("/"); // ✅ redirect to Home after sign-in
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError("");

      // Switch back to Sign In form after account creation
      setIsSignIn(true);
      setEmail("");
      setPassword("");
      setUsername("");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setBirthdate("");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleConfirm = (date) => {
    const isoDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    setBirthdate(isoDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignIn ? "Sign In" : "Sign Up"}</Text>
      {!isSignIn && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            autoCapitalize="words"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Middle Name"
            autoCapitalize="words"
            value={middleName}
            onChangeText={setMiddleName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            autoCapitalize="words"
            value={lastName}
            onChangeText={setLastName}
          />

          {/* Birthdate Picker */}
          {Platform.OS === "web" ? (
            <View style={styles.input}>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: 16,
                  backgroundColor: "transparent",
                }}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: birthdate ? "#000" : "#aaa" }}>
                  {birthdate ? birthdate : "Select Birthdate"}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setShowDatePicker(false)}
                maximumDate={new Date()}
              />
            </>
          )}
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.buttonWrapper}>
        <Button
          title={isSignIn ? "Sign In" : "Sign Up"}
          onPress={isSignIn ? handleSignIn : handleSignUp}
        />
      </View>
      <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
        <Text style={styles.toggle}>
          {isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    maxWidth: 350,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  buttonWrapper: {
    width: "100%",
    maxWidth: 350,
    marginTop: 12,
  },
  toggle: {
    color: "#007bff",
    marginTop: 16,
    textAlign: "center",
  },
});
