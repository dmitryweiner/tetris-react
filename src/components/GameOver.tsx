import styles from "./GameOver.module.css";

type GameOverProps = {
  visible: boolean,
  onClick: () => void
}

export default function GameOver({visible, onClick}: GameOverProps) {
  if (!visible) return null;

  return <div className={styles.container}>
    <div className={styles.message}>
      <h4 style={{color: "#AD0000"}}>Game over!</h4>
      <button onClick={onClick}>Play again?</button>
    </div>
  </div>;
}