import './App.css';

import React, {useEffect, useState} from 'react';

import Controls from "./components/Controls";
import GameField from "./components/GameField";
import GameOver from "./components/GameOver";
import NextFigure from "./components/NextFigure";
import {
  canPutFigureOnField,
  createGameField,
  FigureId, GameFiled, getFigureMiddlePosition,
  getRandomFigureID,
  ORIENTATION,
  Orientation, processGameField, putFigureOnField, rotateOrientation,
} from "./helpers";

enum GAME_STATE {
  FALLING,
  GAME_OVER
}

export enum USER_ACTION {
  IDLE,
  MOVE_RIGHT,
  MOVE_LEFT,
  MOVE_DOWN,
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
}

function getInitialAppState(): AppState {
  const figureID = getRandomFigureID();

  const figure = {
    id: figureID,
    x: getFigureMiddlePosition(figureID),
    y: 0,
    orientation: ORIENTATION.UP
  };

  return {
    gameField: createGameField(),
    gameFieldWithoutCurrentFigure: createGameField(),
    gameState: GAME_STATE.FALLING,
    figure,
    nextFigureId: getRandomFigureID(),
    score: 0,
  };
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
  const [appState, setAppState] = useState<AppState>(getInitialAppState());

  const handleButtons = (userAction: USER_ACTION) => {
    if (appState.gameState !== GAME_STATE.FALLING) {
      return;
    }

    setAppState((state) => {
      const figure = {
        ...state.figure
      };
      switch (userAction) {
        case USER_ACTION.MOVE_LEFT: {
          figure.x--;
          break;
        }
        case USER_ACTION.MOVE_RIGHT: {
          figure.x++;
          break;
        }
        case USER_ACTION.MOVE_DOWN: {
          // TODO: move till touchdown
          figure.y = figure.y + 2;
          break;
        }
        case USER_ACTION.TURNING: {
          figure.orientation = rotateOrientation(figure.orientation);
          break;
        }
      }

      // check if can do move
      if (canPutFigureOnField(state.gameFieldWithoutCurrentFigure, figure.x, figure.y, figure.id, figure.orientation)) {
        return {
          ...state,
          gameField: putFigureOnField(state.gameFieldWithoutCurrentFigure, figure.x, figure.y, figure.id, figure.orientation),
          figure,
        };
      }
      return state;
    });
  };

  const playAgain = () => {
    setAppState(getInitialAppState());
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      setAppState((state) => {
        console.log("Tick", state);
        switch (state.gameState) {
          case GAME_STATE.FALLING: {
            const figure = {
              ...state.figure,
              y: state.figure.y + 1,
            };

            // check if not touched
            if (canPutFigureOnField(state.gameFieldWithoutCurrentFigure, figure.x, figure.y, figure.id, figure.orientation)) {
              return {
                ...state,
                gameField: putFigureOnField(state.gameFieldWithoutCurrentFigure, figure.x, figure.y, figure.id, figure.orientation),
                figure,
              };
            }

            // count score, process game field
            const {scoreToAdd, processedField} = processGameField(state.gameField);

            // create new figure
            const newFigure = {
              id: state.nextFigureId,
              x: getFigureMiddlePosition(state.nextFigureId),
              y: 0,
              orientation: ORIENTATION.UP
            };

            // check if game over
            if (!canPutFigureOnField(processedField, newFigure.x, newFigure.y, newFigure.id, newFigure.orientation)) {
              return {
                ...state,
                gameState: GAME_STATE.GAME_OVER,
              };
            }

            return {
              ...state,
              gameState: GAME_STATE.FALLING,
              gameField: putFigureOnField(processedField, newFigure.x, newFigure.y, newFigure.id, newFigure.orientation),
              figure: newFigure,
              nextFigureId: getRandomFigureID(),
              gameFieldWithoutCurrentFigure: processedField,
              score: state.score + scoreToAdd,
            };
          }
          default:
            return state;
        }
      });
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div className="App">
      <h3>Tetris v0.3</h3>
      <div className="upper-block">
        <div>
          Score: <b>{appState.score}</b>
        </div>
        <NextFigure figureId={appState.nextFigureId}/>
      </div>
      <GameField field={appState.gameField}/>
      <Controls onChange={handleButtons}/>
      <GameOver visible={appState.gameState === GAME_STATE.GAME_OVER} onClick={playAgain}/>
    </div>
  );
}

export default App;
