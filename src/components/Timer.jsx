import React from "react";
import styles from "../css/timer.module.css";

const Timer = ({ seconds, minutes, breakSeconds, breakMinutes, cycles }) => {
  return (
    <div className={styles["timer-wrapper"]}>
      <div className={styles["timer-display"]}>
        <h3>
          {`${minutes <= 9 ? "0" + minutes : minutes} : ${
            seconds <= 9 ? "0" + seconds : seconds
          }`}
        </h3>
        <h6>
          Cycles : <small>{cycles}</small>
        </h6>
      </div>
      <div className={styles["break-display"]}>
        <h3>
          break ! :{" "}
          <small>{`${
            breakMinutes <= 10 ? "0" + breakMinutes : breakMinutes
          } : ${
            breakSeconds <= 10 ? "0" + breakSeconds : breakSeconds
          } `}</small>
        </h3>
      </div>
    </div>
  );
};

export default Timer;
