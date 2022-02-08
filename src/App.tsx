import './App.css';

import React, {useEffect, useState} from 'react';

import Controls from "./components/Controls";
import GameField from "./components/GameField";
import {
  createGameField,
  FigureId, GameFiled, getFigureMiddlePosition,
  getRandomFigureID,
  ORIENTATION,
  Orientation, putFigureOnField,
} from "./helpers";

enum GAME_STATE {
  IDLE,
  FIGURE_CHOICE,
  FALLING,
  TOUCH,
  GAME_OVER
}

enum USER_ACTION {
  IDLE,
  MOVE_RIGHT,
  MOVE_LEFT,
  TURNING
}

type AppState = {
  gameField: GameFiled,
  gameFieldWithoutCurrentFigure: GameFiled,
  gameState: GAME_STATE
  figure: {
    id: FigureId,
    x: number,
    y: number,
    orientation: Orientation
  },
  nextFigureId: FigureId,
  score: number,
  userAction: USER_ACTION
}

/**
 * Алгоритм работы игры:
 * 1. Выбор фигуры:
 *    - current = next
 *    - next = generate()
 *    - вычислить начальный x, чтоб в середине
 *    - если можно поместить фигуру, п. 2, иначе п. 4
 * 2. Падение:
 *    а) Каждую секунду:
 *      можно ли (у + 1)
 *      если нет, иди на п. 3.
 *      если да, у + 1
 *    б) При нажатии на кнопки:
 *      если можно изменить х или повернуть, то менять
 *      если можно спустить вниз, спустить, иначе п. 3
 * 3. Касание:
 *    Если собрался полный ряд, он исчезает, всё сдвигается вниз, прибавляются очки.
 * 4. Конец игры.
 *    Сообщение: начать игру заново?
 **/
function App() {
  const [appState, setAppState] = useState<AppState>({
    gameField: createGameField(),
    gameFieldWithoutCurrentFigure: createGameField(),
    gameState: GAME_STATE.IDLE,
    figure: {
      id: getRandomFigureID(),
      x: 0,
      y: 0,
      orientation: ORIENTATION.UP
    },
    nextFigureId: getRandomFigureID(),
    score: 0,
    userAction: USER_ACTION.IDLE
  });

  useEffect(() => {
    const intervalID = setInterval(() => {
      setAppState((state) => {
        console.log("Tick", state);
        switch (state.gameState) {
          case GAME_STATE.IDLE: {
            return {
              ...state,
              gameState: GAME_STATE.FIGURE_CHOICE,

            };
          }
          case GAME_STATE.FIGURE_CHOICE: {
            // TODO: check if game over

            const figure = {
              id: state.nextFigureId,
              x: getFigureMiddlePosition(state.nextFigureId),
              y: 0,
              orientation: ORIENTATION.UP
            };

            return {
              ...state,
              gameState: GAME_STATE.FALLING,
              gameField: putFigureOnField(state.gameFieldWithoutCurrentFigure, figure.x, figure.y, figure.id, figure.orientation),
              figure,
              nextFigureId: getRandomFigureID(),
            };
          }
          case GAME_STATE.FALLING: {
            // TODO: check if touched
            // TODO: read user actions

            const figure = {
                ...state.figure,
                y: state.figure.y + 1,
              };

              return {
              ...state,
              gameField: putFigureOnField(state.gameFieldWithoutCurrentFigure, figure.x, figure.y, figure.id, figure.orientation),
              figure,
            };
          }
          default: return state;
        }
      });
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div className="App">
      <GameField field={appState.gameField}/>
      <Controls onChange={(orientation) => console.log(orientation)}/>
    </div>
  );
}

export default App;
