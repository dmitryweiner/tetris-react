import {GameFiled} from "../helpers";
import Dot from "./Dot";
import styles from "./GameField.module.css";

export type GameFieldProps = {
  field: GameFiled
};

export default function GameField({field}: GameFieldProps) {
  return <>
    {field.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.row}>
        {row.map((dot, dotIndex) => (
          <Dot dot={dot} key={dotIndex}/>
        ))}
      </div>
    ))}
  </>;
}