import { BAR, EMPTY_FIELD, L_SHAPE, S_SHAPE, SQUARE, TRI } from "../helpers";
import styles from "./Dot.module.css";

export type DotProps = {
  dot: number,
  showBackground?: boolean
};

export default function Dot({dot, showBackground = true} : DotProps) {
  function getClassByFigureId(figureId: number): string {
    switch (figureId) {
      case BAR: return styles.bar;
      case L_SHAPE: return styles["l-shape"];
      case S_SHAPE: return styles["s-shape"];
      case SQUARE: return styles.square;
      case TRI: return styles.tri;
      default: return "";
    }
  }

  function getDotClass() {
    if (dot !== EMPTY_FIELD) {
      return getClassByFigureId(dot);
    }
    if (showBackground) {
      return styles.empty;
    }
    return null;
  }

  return <><div className={`${styles.dot} ${getDotClass()}`}/></>;
}