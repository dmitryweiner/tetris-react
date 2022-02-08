import {EMPTY_FIELD} from "../helpers";
import styles from "./Dot.module.css";

export type DotProps = {
  dot: number
};

export default function Dot({dot} : DotProps) {
  return <><div className={`${styles.dot} ${dot !== EMPTY_FIELD ? styles.filled : null}`}/></>;
}