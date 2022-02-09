import { BAR, EMPTY_FIELD, L_SHAPE, S_SHAPE, SQUARE, TRI } from "../helpers";
import styles from "./Dot.module.css";

export type DotProps = {
  dot: number
};

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

export default function Dot({dot} : DotProps) {
  return <><div className={`${styles.dot} ${dot !== EMPTY_FIELD ? getClassByFigureId(dot) : null}`}/></>;
}