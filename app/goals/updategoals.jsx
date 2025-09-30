// app/goals/updategoals.jsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGoals } from "../../hooks/useGoals";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const UpdateGoals = () => {
  const { id } = useLocalSearchParams();
  const { goals, updateGoal, fetchGoals } = useGoals();
  const router = useRouter();

  const [goalText, setGoalText] = useState("");
  const [progress, setProgress] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    if (id) {
      const goal = goals.find((g) => g.id === id);
      if (goal) {
        setGoalText(goal.goal);
        setProgress(goal.progress?.toString() ?? "0");
        setNotFound(false);
      } else if (goals.length > 0) {
        setNotFound(true);
      }
    }
  }, [goals, id]);

  const handleUpdate = async () => {
    await updateGoal(id, { goal: goalText, progress: Number(progress) });
    router.back();
  };

  // Gradient Button Component
  const GradientButton = ({ onPress, children, style }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ marginVertical: 8, alignSelf: "center", ...style }}
    >
      <LinearGradient
        colors={["#FFA500", "#FF8C00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  // 🚨 No ID param
  if (!id) {
    return (
      <LinearGradient
        colors={["#FF8C00", "#FF6F00", "#FF4500"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.warning}>
            ⚠️ You haven’t selected a goal yet. Please go back and choose one from
            <Text style={{ fontWeight: "bold" }}> Your Goals </Text>.
          </Text>
          <GradientButton onPress={() => router.push("/goals")}>Go to Your Goals</GradientButton>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // 🚨 Invalid ID
  if (notFound) {
    return (
      <LinearGradient
        colors={["#FF8C00", "#FF6F00", "#FF4500"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.warning}>
            ❌ Goal not found. Please go back and try again.
          </Text>
          <GradientButton onPress={() => router.push("/goals")}>Cancel</GradientButton>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#FF8C00", "#FF6F00", "#FF4500"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inner}>
              <Text style={styles.title}>Update Goal</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  value={goalText}
                  onChangeText={setGoalText}
                  placeholder="Goal"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                />
                <TextInput
                  style={styles.input}
                  value={progress}
                  onChangeText={setProgress}
                  placeholder="Progress"
                  keyboardType="numeric"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                />
                <GradientButton onPress={handleUpdate}>Save</GradientButton>
                <GradientButton onPress={() => router.back()}>Cancel</GradientButton>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UpdateGoals;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  inner: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  form: {
    width: width > 500 ? 400 : "100%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.3)",
    color: "white",
    width: "100%",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  warning: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    padding: 20,
  },
});
