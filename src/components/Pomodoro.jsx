import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import styles from "../css/pomodoro.module.css";

const Pomodoro = () => {
  const [start, setStart] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [PomodoroInterval, setPomodoroInterval] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [breakInterval, setBreakInterval] = useState(0);

  const startTimer = () => {
    return setInterval(() => {
      setSeconds((prev, next) => prev + 1);
    }, 1000);
  };

  function stopTimer() {
    clearInterval(PomodoroInterval);
    setSeconds(0);
  }
  function resetTimer() {
    setSeconds(0);
    setMinutes(0);
    setCycles(0);
    setStart(true);
    clearInterval(PomodoroInterval);
  }

  function startBreak() {
    return setInterval(() => {
      setBreakSeconds((prevState, nextState) => prevState + 1);
    }, 1000);
  }

  function stopBreak() {
    setBreakMinutes(0);
    setBreakSeconds(0);
    clearInterval(breakInterval);
    setPomodoroInterval(startTimer());
  }

  // Pomodoro timer effect
  useEffect(() => {
    if (seconds >= 60) {
      setSeconds(0);
      setMinutes(minutes + 1);
    }
    if (minutes >= 20) {
      setCycles(cycles + 1);
      setMinutes(0);
      setSeconds(0);
      stopTimer();
      setBreakInterval(startBreak());
    }
    if (cycles >= 4) {
      stopTimer();
    }
  }, [seconds]);

  // Break timer effect
  useEffect(() => {
    if (breakSeconds >= 60) {
      setBreakSeconds(0);
      setBreakMinutes(breakMinutes + 1);
    }
    if (breakMinutes >= 5) {
      stopBreak();
    }
  }, [breakSeconds]);

  function handleStartPomodoro() {
    setStart(!start);
    if (start === false) {
      setPomodoroInterval(startTimer());
    }
    if (start === true) {
      stopTimer();
    }
  }

  return (
    <div className={styles["app-wrapper"]}>
      <Timer
        seconds={seconds}
        minutes={minutes}
        cycles={cycles}
        breakSeconds={breakSeconds}
        breakMinutes={breakMinutes}
      />
      <div className={styles["buttons-wrapper"]}>
        <button type="button" onClick={() => handleStartPomodoro()}>
          {start === false ? "start" : "stop"}
        </button>
        <button type="button" onClick={() => resetTimer()}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
