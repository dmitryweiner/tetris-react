import { FigureId, FIGURES } from "../helpers";
import Dot from "./Dot";
import styles from "./NextFigure.module.css";

type NextFigureProps = {
  figureId: FigureId
};

export default function NextFigure({figureId}: NextFigureProps) {
  const figure = FIGURES[figureId];
  return <div className={styles.container}>
    {figure.data.map((row, rowIndex) => (
      <div className={styles.row} key={rowIndex}>
        {row.map((dot, dotIndex) => (
          <Dot dot={dot} showBackground={false} key={dotIndex}/>
        ))}
      </div>
    ))}
  </div>;
}