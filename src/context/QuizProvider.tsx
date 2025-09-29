import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import questions from "../questions";
import { Question } from "../types";

type QuizContext = {
  question?: Question;
  questionIndex: number;
  selectedOption?: string;
  score: number;
  totalQuestions: number;
  setSelectedOption: Dispatch<SetStateAction<string | undefined>>;
  // setSelectedOption: () => void;
  onNext: () => void;
};

export const QuizContext = createContext<QuizContext>({
  questionIndex: 0,
  score: 0,
  totalQuestions: 0,
  // selectedOption: '',
  setSelectedOption: () => {},
  onNext: () => {},
});

export default function QuizProvider({ children }: PropsWithChildren) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [score, setScore] = useState(0);

  const isFinished = questionIndex > questions.length;
  const question = questions[questionIndex];

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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => {
  return useContext(QuizContext);
};
