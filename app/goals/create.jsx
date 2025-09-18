import { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  Pressable, 
  Keyboard, 
  Platform 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGoals } from '../../hooks/useGoals'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

const Create = () => {
  const [goal, setGoal] = useState('')
  const { createGoal } = useGoals()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!goal.trim()) return // prevent empty goals
    await createGoal({
      goal,
      progress: 0
    })
    setGoal('')
    Keyboard.dismiss()
    router.push('/goals')
  }

  return (
    <LinearGradient
      colors={["#FF8C00", "#FF6F00", "#FF4500"]} // Orange gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Create a New Goal</Text>

        <TextInput
          style={styles.input}
          placeholder="What do you want to do?"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={goal}
          onChangeText={setGoal}
        />

        <Pressable 
          onPress={handleSubmit} 
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.8 } // subtle press effect
          ]}
        >
          <Text style={styles.buttonText}>Add New Goal</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Create

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.3)', // semi-transparent
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
    color: 'white',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0,0,0,0.3)', // slightly dark button on gradient
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
