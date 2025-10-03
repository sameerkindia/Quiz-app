import { useRef, useState } from "react";

export const useTimer = (maxTime: number = 20) => {
  const [time, setTime] = useState(maxTime);
  const intervel = useRef<NodeJS.Timeout | undefined>(undefined);
  // let intervel:NodeJS.Timeout | undefined;

  //   console.log("render ", intervel);

  function startTimer() {
    setTime(maxTime);
    intervel.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // console.log(intervel, "start timer");

    // return () => clearInterval(intervel);
  }

  function clearTimer() {
    // console.log(intervel, " clear timer");
    return clearInterval(intervel.current);
  }

  return { time, startTimer, clearTimer };
};
