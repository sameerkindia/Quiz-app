import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useQuizContext } from "../context/QuizProvider";

type AnswerOption = {
  option: string;
  // isSelected?: boolean;
  // onPress: (option: string) => void;
};

const AnswerOption = ({ option=""}: AnswerOption) => {

  const {selectedOption, setSelectedOption} = useQuizContext()

  const isSelected = option === selectedOption

  // console.log(option)
  return (
    <Pressable
      onPress={() => setSelectedOption(option)}
      style={[styles.container, isSelected && styles.selectedOption]}
    >
      <Text>{option}</Text>
    </Pressable>
  );
};

export default AnswerOption;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 20,
    borderRadius: 100,
  },
  selectedOption: {
    backgroundColor: "#E1F396",
    borderColor: "#E1F396",
  },
});
