import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function About() {
  return (
    <LinearGradient
      colors={["#FF8C00", "#FF6F00", "#FF4500"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>TalksY</Text>
        <Text style={styles.text}>
          TalksY Tracker helps you manage and track your goals effectively.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#fff" },
  text: { fontSize: 16, textAlign: "center", paddingHorizontal: 20, color: "#fff" },
});
