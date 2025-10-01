import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import questions from "../questions";
import { Question } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type QuizContext = {
  question?: Question;
  questionIndex: number;
  selectedOption?: string;
  score: number;
  bestScore: number;
  totalQuestions: number;
  setSelectedOption: Dispatch<SetStateAction<string | undefined>>;
  // setSelectedOption: () => void;
  onNext: () => void;
};

export const QuizContext = createContext<QuizContext>({
  questionIndex: 0,
  score: 0,
  totalQuestions: 0,
  bestScore: 0,
  // selectedOption: '',
  setSelectedOption: () => {},
  onNext: () => {},
});

export default function QuizProvider({ children }: PropsWithChildren) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const isFinished = questionIndex >= questions.length;
  // console.log(isFinished , questionIndex , questions.length)
  const question = questions[questionIndex];

  useEffect(() => {
    loadingBestScore();
  }, []);

  useEffect(() => {
    if (isFinished === true && score > bestScore) {
      setBestScore(score);
      saveBestScore(score);
    }
  }, [isFinished]);

  const restart = () => {
    setQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
  };

  const onNext = () => {
    if (isFinished) {
      restart();
      return;
    }

    if (selectedOption === question?.correctAnswer) {
      setScore((currScore) => currScore + 1);
    }

    setQuestionIndex((currQuestion) => currQuestion + 1);
  };

  const saveBestScore = async (value: number) => {
    try {
      // console.log("Save best score: ", value);
      await AsyncStorage.setItem("best-score", value.toString());
    } catch (e) {
      // saving error
    }
  };

  const loadingBestScore = async () => {
    try {
      const value = await AsyncStorage.getItem("best-score");
      if (value !== null) {
        setBestScore(Number.parseInt(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  // console.log(score, " this is score");

  return (
    <QuizContext.Provider
      value={{
        question,
        questionIndex,
        onNext,
        selectedOption,
        setSelectedOption,
        score,
        totalQuestions: questions.length,
        bestScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => {
  return useContext(QuizContext);
};
