import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AnswerOption from "./AnswerOption";
import { Question } from "../types";
import Card from "./Card";
// import { useQuizContext } from "../context/QuizProvider";

type QuestionCard = {
  question: Question;
};

const QuestionCard = ({ question }: QuestionCard) => {
  // const [selectedOption, setSelectedOption] = useState<string>("");
  // const selectedOption = question.options[0];

  // const {selectedOption, setSelectedOption} = useQuizContext()

  // const onOptionSelected = (option: string) => {
  //   setSelectedOption(option);
  //   // console.warn("Selected", option);
  // };

  return (
    <Card title={question.title}>
      <View style={{ gap: 10 }}>
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            // isSelected={option === selectedOption}
            // onPress={onOptionSelected}
          />
        ))}

        {/* <AnswerOption
          option={question.options[0]}
          isSelected={question.options[0] === selectedOption}
          onPress={onOptionSelected}
        />
        <AnswerOption
          option={question.options[1]}
          isSelected={question.options[1] === selectedOption}
          onPress={onOptionSelected}
        />
        <AnswerOption
          option={question.options[2]}
          isSelected={question.options[2] === selectedOption}
          onPress={onOptionSelected}
        />
        <AnswerOption
          option={question.options[3]}
          isSelected={question.options[3] === selectedOption}
          onPress={onOptionSelected}
        /> */}
      </View>
    </Card>
  );
};

export default QuestionCard;

// const styles = StyleSheet.create({
//   questionCard: {
//     backgroundColor: "white",
//     padding: 20,
//     paddingVertical: 20,
//     borderRadius: 20,
//     gap: 20,
//     // Shadow
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,

//     elevation: 5,
//   },
//   question: {
//     fontSize: 24,
//     fontWeight: 500,
//   },
// });

{
  /* <FlatList
          data={question.options}
          renderItem={(data: any) => (
            <AnswerOption
              option={data.item}
              isSelected={data.item === selectedOption}
              onPress={onOptionSelected}
            />
          )}
          style={{gap: 10}}
          keyExtractor={(index) => index}
        /> */
}
