import { useKeyPressEvent } from "react-use";

import {USER_ACTION} from "../App";
import styles from "./Controls.module.css";

export type ControlsProps = {
  onChange: (userAction: USER_ACTION) => void
}

export default function Controls({onChange}: ControlsProps) {
  useKeyPressEvent("ArrowLeft", () => onChange(USER_ACTION.MOVE_LEFT));
  useKeyPressEvent("ArrowRight", () => onChange(USER_ACTION.MOVE_RIGHT));
  useKeyPressEvent("ArrowDown", () => onChange(USER_ACTION.MOVE_DOWN));
  useKeyPressEvent("ArrowUp", () => onChange(USER_ACTION.TURNING));

  return <div className={styles.container}>
    <button onClick={() => onChange(USER_ACTION.MOVE_LEFT)} className={styles.control}>←</button>
    <button onClick={() => onChange(USER_ACTION.TURNING)} className={styles.control}>↻</button>
    <button onClick={() => onChange(USER_ACTION.MOVE_RIGHT)} className={styles.control}>→</button>
    <button onClick={() => onChange(USER_ACTION.MOVE_DOWN)} className={styles.control}>↓</button>
  </div>
}