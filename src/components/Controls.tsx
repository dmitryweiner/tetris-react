import { useKeyPressEvent } from "react-use";

import {USER_ACTION} from "../App";
//import styles from "./Controls.module.css";

export type ControlsProps = {
  onChange: (userAction: USER_ACTION) => void
}

export default function Controls({onChange}: ControlsProps) {
  useKeyPressEvent("ArrowLeft", () => onChange(USER_ACTION.MOVE_LEFT));
  useKeyPressEvent("ArrowRight", () => onChange(USER_ACTION.MOVE_RIGHT));
  useKeyPressEvent("ArrowDown", () => onChange(USER_ACTION.MOVE_DOWN));
  useKeyPressEvent("ArrowUp", () => onChange(USER_ACTION.TURNING));

  return <>
    <button onClick={() => onChange(USER_ACTION.MOVE_LEFT)}>←</button>
    <button onClick={() => onChange(USER_ACTION.TURNING)}>↻</button>
    <button onClick={() => onChange(USER_ACTION.MOVE_RIGHT)}>→</button>
    <button onClick={() => onChange(USER_ACTION.MOVE_DOWN)}>↓</button>
  </>
}