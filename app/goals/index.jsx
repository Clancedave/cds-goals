import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGoals } from "../../hooks/useGoals";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const Goals = () => {
  const { goals, fetchGoals, deleteGoal } = useGoals();
  const router = useRouter();

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleDelete = (id) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this goal?");
      if (confirmed) deleteGoal(id);
    } else {
      Alert.alert(
        "Delete Goal",
        "Are you sure you want to delete this goal?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => deleteGoal(id) },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <LinearGradient
      colors={["#FF8C00", "#FF6F00", "#FF4500"]} // Orange gradient background
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Your Goals</Text>

        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{item.goal || "No Goal Title"}</Text>
              <Text style={styles.progressText}>Progress: {item.progress ?? 0}%</Text>

              {/* Actions Row */}
              <View style={styles.actionsRow}>
                {/* Edit Button */}
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() =>
                    router.push({
                      pathname: "/goals/updategoals",
                      params: { id: item.id },
                    })
                  }
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No goals yet.</Text>
          }
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Goals;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: width > 500 ? 80 : 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
    fontSize: width > 500 ? 28 : 22,
    color: "white", // make title readable on orange gradient
  },
  goalItem: {
    marginVertical: 8,
    padding: width > 500 ? 20 : 14,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)", // semi-transparent to show gradient
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  goalText: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: width > 500 ? 20 : 16,
    color: "white",
  },
  progressText: {
    color: "white",
    fontSize: width > 500 ? 16 : 13,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButton: {
    marginRight: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  deleteButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  editText: {
    color: "white",
    fontWeight: "500",
  },
  deleteText: {
    color: "white",
    fontWeight: "500",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "rgba(255,255,255,0.8)",
    fontSize: width > 500 ? 18 : 14,
  },
});
