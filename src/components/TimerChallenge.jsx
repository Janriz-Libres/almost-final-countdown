import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TIME_INTERVAL = 10;

export default function TimerChallenge({ title, targetTime }) {
  const targetTimeMs = targetTime * 1000;

  const [timeRemaining, setTimeRemaining] = useState(targetTimeMs);
  const timer = useRef();
  const dialog = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTimeMs;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTimeMs);
  }

  function handleClick() {
    if (!timerIsActive) {
      timer.current = setInterval(
        () => setTimeRemaining((prev) => prev - TIME_INTERVAL),
        TIME_INTERVAL
      );
    } else {
      // Stop timer
      clearInterval(timer.current);
      dialog.current.open();
    }
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} seconds{targetTime > 1 && "s"}
        </p>
        <p>
          <button onClick={handleClick}>
            {timerIsActive ? "Stop" : "Start"} challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
