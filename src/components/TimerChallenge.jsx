import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const timer = useRef();
  const dialog = useRef();

  function handleClick() {
    setTimerStarted((prev) => !prev);
    setTimerExpired(false);

    if (!timerStarted) {
      // Start timer
      timer.current = setTimeout(() => {
        setTimerExpired(true);
        setTimerStarted(false);
        dialog.current.open();
      }, targetTime * 1000);
    } else {
      // Stop timer
      clearTimeout(timer.current);
    }
  }

  return (
    <>
      <ResultModal ref={dialog} result="lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} seconds{targetTime > 1 && "s"}
        </p>
        <p>
          <button onClick={handleClick}>
            {timerStarted ? "Stop" : "Start"} challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
