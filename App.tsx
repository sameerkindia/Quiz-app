import { SafeAreaView, SafeAreaViewBase, StyleSheet, Text, View } from "react-native";
import QuizScreen from "./src/app/QuizScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import QuizProvider from "./src/context/QuizProvider";

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <QuizProvider>
      <QuizScreen />
      </QuizProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
