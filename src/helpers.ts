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

export type GameFiled = number[][];

export const TURN = {
  NO_ACTION: 0,
  LEFT: 1,
  RIGHT: 2,
  SPIN: 3
};

export type Action = keyof typeof TURN;
export type Turn = typeof TURN[Action];

export const ORIENTATION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};
export type Orientation = typeof ORIENTATION[keyof typeof ORIENTATION];

export const ROTATE_DIRECTION = {
  CLOCKWISE: 0,
  COUNTERCLOCKWISE: 1
};
export type RotateDirection = typeof ROTATE_DIRECTION[keyof typeof ROTATE_DIRECTION];

export function createGameField(): GameFiled {
  const result = [];
  for (let i = 0; i < HEIGHT; i++) {
    result[i] = Array(WIDTH);
    for (let j = 0; j < WIDTH; j++) {
      result[i][j] = EMPTY_FIELD
    }
  }
  return result;
}

export function getRandomFigureID(): FigureId {
  // here we can fine tune the probability of different figures
  return Math.ceil(Math.random() * FIGURES_COUNT) as FigureId;
}

export function copyMatrix(matrix: number[][]): number[][] {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    result[i] = [...matrix[i]];
  }
  return result;
}

export function rotateMatrix(matrix: number[][], direction: RotateDirection): number[][] {
  if (direction === ROTATE_DIRECTION.CLOCKWISE) {
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
  }
  return matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index]));
}

function getFigureDots(matrix: number[][], orientation: Orientation): number[][] {
  switch (orientation) {
    case ORIENTATION.RIGHT: {
      matrix = rotateMatrix(matrix, ROTATE_DIRECTION.CLOCKWISE);
      break;
    }
    case ORIENTATION.DOWN: {
      matrix = rotateMatrix(matrix, ROTATE_DIRECTION.CLOCKWISE);
      matrix = rotateMatrix(matrix, ROTATE_DIRECTION.CLOCKWISE);
      break;
    }
    case ORIENTATION.LEFT: {
      matrix = rotateMatrix(matrix, ROTATE_DIRECTION.COUNTERCLOCKWISE);
      break;
    }
  }
  return matrix;
}


export function putFigureOnField(
  field: GameFiled,
  x: number,
  y: number,
  figureID: FigureId,
  orientation?: Orientation
): GameFiled {

  if (orientation === undefined) {
    orientation = ORIENTATION.UP;
  }

  const fieldCopy = copyMatrix(field);
  const figure = FIGURES[figureID];
  let matrix = figure.data;
  matrix = getFigureDots(matrix, orientation);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== EMPTY_FIELD) {
        fieldCopy[i + x][j + y] = matrix[i][j];
      }
    }
  }
  return fieldCopy;
}

export function canPutFigureOnField(
  field: GameFiled,
  x: number,
  y: number,
  figureID: FigureId,
  orientation?: Orientation
): boolean {
  if (orientation === undefined) {
    orientation = ORIENTATION.UP;
  }

  if (x < 0 || y < 0) {
    return false;
  }

  const figure = FIGURES[figureID];

  if (orientation === ORIENTATION.RIGHT || orientation === ORIENTATION.LEFT) {
    if (x + figure.height > WIDTH) {
      return false;
    }
  } else {
    if (x + figure.width > WIDTH) {
      return false;
    }
  }

  let matrix = figure.data;
  matrix = getFigureDots(matrix, orientation);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== EMPTY_FIELD && field[i + x][j + y] !== EMPTY_FIELD) {
        return false;
      }
    }
  }

  return true;
}
