import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";

export const useSignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");

      // Redirect to auth page after sign out
      router.push("/auth/auth");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return { handleSignOut };
};
