export const WIDTH = 10;
export const HEIGHT = 20;
export const EMPTY_FIELD = 0;

export const BAR = 1;
export const L_SHAPE = 2;
export const TRI = 3;
export const S_SHAPE = 4;
export const SQUARE = 5;
export type FigureId = typeof BAR | typeof L_SHAPE | typeof TRI | typeof S_SHAPE | typeof SQUARE;

export const FIGURES_COUNT = 5;

export const FIGURES = {
  [BAR]: {
    data: [
      [BAR],
      [BAR],
      [BAR],
      [BAR],
    ],
    width: 1,
    height: 4
  },
  [L_SHAPE]: {
    data: [
      [L_SHAPE, EMPTY_FIELD],
      [L_SHAPE, EMPTY_FIELD],
      [L_SHAPE, L_SHAPE]
    ],
    width: 2,
    height: 3
  },
  [TRI]: {
    data: [
      [EMPTY_FIELD, TRI, EMPTY_FIELD],
      [TRI, TRI, TRI],
    ],
    width: 3,
    height: 2
  },
  [S_SHAPE]: {
    data: [
      [EMPTY_FIELD, S_SHAPE, S_SHAPE],
      [S_SHAPE, S_SHAPE, EMPTY_FIELD]
    ],
    width: 3,
    height: 2
  },
  [SQUARE]: {
    data: [
      [SQUARE, SQUARE],
      [SQUARE, SQUARE],
    ],
    width: 2,
    height: 2
  }
};

export type GameFiled = Number[][];

export const TURN = {
  NO_ACTION: 0,
  LEFT: 1,
  RIGHT: 2,
  SPIN: 3
};

export type Action = keyof typeof TURN;
export type Turn = typeof TURN[Action];

export function createGameField(): GameFiled {
  const result = [];
  for (let i = 0; i < HEIGHT; i++) {
    result[i] = Array(WIDTH);
    for (let j = 0; j < WIDTH; j++) {
      result[i][j] = EMPTY_FIELD
    }
  }
  return  result;
}

export function getRandomFigureID(): FigureId {
  // here we can fine tune the probability of different figures
  return Math.ceil(Math.random() * FIGURES_COUNT) as FigureId;
}

export function copyField(field: GameFiled): GameFiled {
  const result = [];
  for(let i = 0; i < WIDTH; i++) {
    result[i] = [...field[i]];
  }
  return result;
}

export function putFigureOnField(field: GameFiled, x: number, y: number, figureID: FigureId): GameFiled {
  const fieldCopy = copyField(field);
  const figure = FIGURES[figureID];
  for (let i = 0; i < figure.height; i++) {
    for (let j = 0; j < figure.width; j++) {
      if (figure.data[i][j] !== EMPTY_FIELD) {
        fieldCopy[i + x][j + y] = figure.data[i][j];
      }
    }
  }
  return fieldCopy;
}
