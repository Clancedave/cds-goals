import { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert, Platform, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // ✅ Gradient import
import { auth } from "../../firebaseConfig";
import { useSignOut } from "../signout/useSignout";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const router = useRouter();
  const { handleSignOut } = useSignOut();
  const [user, setUser] = useState(null);

  // Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleProtectedNav = (path) => {
    if (!user) {
      const message = "You need to sign-in your account";
      if (Platform.OS === "web") {
        window.alert(message);
        router.push("/auth/auth");
      } else {
        Alert.alert("Authentication Required", message, [
          { text: "OK", onPress: () => router.push("/auth/auth") },
        ]);
      }
      return;
    }
    router.push(path);
  };

  // Gradient button wrapper
  const GradientButton = ({ onPress, children }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={["#FFA500", "#FF8C00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.link}
      >
        <Text style={styles.linkText}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#FF8C00", "#FF6F00", "#FF4500"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>T A L K S Y</Text>

      <GradientButton onPress={() => handleProtectedNav("/goals")}>
        View Your Goals
      </GradientButton>

      <GradientButton onPress={() => handleProtectedNav("/goals/create")}>
        Add a New Goal
      </GradientButton>

      {!user ? (
        <GradientButton onPress={() => router.push("/auth/auth")}>
          Sign In
        </GradientButton>
      ) : (
        <GradientButton onPress={handleSignOut}>
          Sign Out
        </GradientButton>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: { 
    marginBottom: 50,
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  link: {
    marginVertical: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    minWidth: 220,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  linkText: { 
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default Home;
