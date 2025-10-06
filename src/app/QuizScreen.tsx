import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import questions from "../questions";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import { QuizContext, useQuizContext } from "../context/QuizProvider";
import { useTimer } from "../hooks/useTimer";

const QuizScreen = () => {
  // const [questionIndex, setQuestionIndex] = useState(0);
  // const question = questions[questionIndex];

  // const {question , questionIndex} = useContext(QuizContext)

  const { question, questionIndex, score, totalQuestions, bestScore, onNext } =
    useQuizContext();

  const { time, startTimer, clearTimer } = useTimer(20);

  // const [time, setTime] = useState(20);

  useEffect(() => {
    // setTime(20);
    // const intervel = setInterval(() => {
    //   setTime((prevTime) => prevTime - 1);
    // }, 1000);

    startTimer();

    if (questionIndex === totalQuestions) {
      // console.log(questionIndex, totalQuestions);
      // clearInterval(intervel);
      clearTimer();
    }

    // return () => clearInterval(intervel);
    return () => {
      clearTimer();
    };
  }, [question]);

  useEffect(() => {
    if (time < 0) {
      onNext();
    }
  }, [time]);
  // console.log(quizData.questionIndex)

  // const OnNext = ()=>{
  //   // setQuestionIndex(questionIndex + 1)
  // }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <Text style={styles.title}>
          Question {questionIndex + 1}/{totalQuestions}
        </Text>
      </View>

      {question ? (
        <View>
          <QuestionCard question={question} />
          {/* <Text style={styles.time}>{time} sec</Text> */}
          <Pressable onPress={clearTimer}>
            <Text style={styles.time}>{time} sec</Text>
          </Pressable>
        </View>
      ) : (
        <Card title="Well done">
          <Text>
            Correct answers: {score}/{totalQuestions}
          </Text>
          <Text>Best score: {bestScore}</Text>
        </Card>
      )}

      {/* Footer */}
      <CustomButton
        title="Next"
        onPress={onNext}
        rightIcon={
          <FontAwesome6 name="arrow-right-long" size={16} color="white" />
        }
      />
      {/* <Pressable onPress={() => console.warn("press")} style={styles.button}>
        <Text style={styles.buttonText}>
          Next{" "}
          <FontAwesome6
            name="arrow-right-long"
            size={16}
            color="white"
            style={styles.buttonIcon}
          />{" "}
        </Text>
      </Pressable> */}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFEF4",
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#005055",
  },
  time: {
    textAlign: "center",
    marginTop: 15,
    color: "#005055",
    fontWeight: "bold",
  },
  // button: {
  //   backgroundColor: "#005055",
  //   padding: 20,
  //   borderRadius: 100,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // buttonText: {
  //   color: "white",
  //   fontWeight: "500",
  //   fontSize: 16,
  //   letterSpacing: 1.5,
  // },
  // buttonIcon: {
  //   position: 'absolute',
  //   right: 400
  // },
});
