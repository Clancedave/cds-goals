import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../firebaseConfig";

export const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);

  async function fetchGoals() {
    try {
      const snapshot = await getDocs(collection(db, "goals"));
      const goalsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(goalsList);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }

  async function createGoal(goalData) {
    try {
      await addDoc(collection(db, "goals"), goalData);
      await fetchGoals();
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  }

  async function updateGoal(id, updatedData) {
    try {
      const goalRef = doc(db, "goals", id);
      await updateDoc(goalRef, updatedData);
      await fetchGoals();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  }

  async function deleteGoal(id) {
    try {
      const goalRef = doc(db, "goals", id);
      await deleteDoc(goalRef);
      await fetchGoals(); // refresh list after deletion
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  }

  return (
    <GoalsContext.Provider
      value={{ goals, fetchGoals, createGoal, updateGoal, deleteGoal }}
    >
      {children}
    </GoalsContext.Provider>
  );
}
