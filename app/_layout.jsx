import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tabs group (bottom nav) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Non-tab screens */}
        <Stack.Screen name="auth/auth" options={{ headerShown: false }} />
        <Stack.Screen name="goals/index" options={{ headerShown: false }} />
        <Stack.Screen name="goals/create" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
