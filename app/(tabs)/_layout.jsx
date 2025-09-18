import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <LinearGradient
      colors={["#FF8C00", "#FF6F00", "#FF4500"]} // Orange gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "rgba(255,255,255,0.95)",
          tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
          tabBarStyle: { 
            backgroundColor: "transparent",
            borderTopWidth: 0,
          },
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* About */}
        <Tabs.Screen
          name="about/about"
          options={{
            title: "About",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "information-circle" : "information-circle-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
