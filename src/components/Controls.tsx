import { useRef } from "react";
import { useKeyPressEvent } from "react-use";

import {USER_ACTION} from "../App";
import styles from "./Controls.module.css";

const REPEAT_RATE = 100;

export type ControlsProps = {
  onChange: (userAction: USER_ACTION) => void
}

export default function Controls({onChange}: ControlsProps) {
  const downTimer: {current: NodeJS.Timeout | null} = useRef(null);

  useKeyPressEvent("p", () => onChange(USER_ACTION.PAUSE));
  useKeyPressEvent("ArrowLeft", () => onChange(USER_ACTION.MOVE_LEFT));
  useKeyPressEvent("ArrowRight", () => onChange(USER_ACTION.MOVE_RIGHT));

  const downKeyDownHandler = () => {
    onChange(USER_ACTION.MOVE_DOWN);
    downTimer.current = setInterval(() => {
      onChange(USER_ACTION.MOVE_DOWN);
    }, REPEAT_RATE);
  };

  const downKeyUpHandler = () => {
    if (downTimer.current) {
      clearInterval(downTimer.current);
    }
  };

  useKeyPressEvent("ArrowDown", downKeyDownHandler, downKeyUpHandler);
  useKeyPressEvent(" ", downKeyDownHandler, downKeyUpHandler);
  useKeyPressEvent("ArrowUp", () => onChange(USER_ACTION.TURNING));

  return <>
    <div className={styles.container}>
    <button onClick={() => onChange(USER_ACTION.MOVE_LEFT)} className={styles.control}>←</button>
    <button onClick={() => onChange(USER_ACTION.TURNING)} className={styles.control}>↻</button>
    <button onClick={() => onChange(USER_ACTION.MOVE_RIGHT)} className={styles.control}>→</button>
    <button onClick={() => onChange(USER_ACTION.MOVE_DOWN)} className={styles.control}>↓</button>
  </div>
    <div className={styles.message}>
      Use arrow keys on the keyboard to play.
    </div>
    </>
}