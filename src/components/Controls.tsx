import {ORIENTATION, Orientation} from "../helpers";
//import styles from "./Controls.module.css";

export type ControlsProps = {
  onChange: (orientation: Orientation) => void
}

export default function Controls({onChange}: ControlsProps) {
  return <>
    <button onClick={() => onChange(ORIENTATION.LEFT)}>←</button>
    <button onClick={() => onChange(ORIENTATION.UP)}>↑</button>
    <button onClick={() => onChange(ORIENTATION.RIGHT)}>→</button>
    <button onClick={() => onChange(ORIENTATION.DOWN)}>↓</button>
  </>
}