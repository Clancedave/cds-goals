import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* All screens in /auth will have no header */}
    </Stack>
  );
}