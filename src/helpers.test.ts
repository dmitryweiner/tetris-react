import {
  BAR, canPutFigureOnField,
  copyMatrix,
  createGameField,
  EMPTY_FIELD,
  getFigureMiddlePosition,
  getRandomFigureID,
  HEIGHT,
  L_SHAPE,
  ORIENTATION, processGameField,
  putFigureOnField,
  ROTATE_DIRECTION,
  rotateMatrix,
  S_SHAPE,
  SQUARE,
  TRI,
  WIDTH
} from "./helpers";

test("createGameField", () => {
  const field = createGameField();
  expect(field.length).toEqual(HEIGHT);
  expect(field[0].length).toEqual(WIDTH);
  expect(field[0][0]).toEqual(EMPTY_FIELD);
});

test("getRandomFigureID", () => {
  let figureId;
  for (let i = 0; i < 100; i++) {
    figureId = getRandomFigureID();
    expect([BAR, L_SHAPE, TRI, S_SHAPE, SQUARE].includes(figureId)).toBeTruthy();
  }
});

test("copyMatrix", () => {
  const field = createGameField();
  const copiedField = copyMatrix(field);
  expect(field === copiedField).toBeFalsy();
  expect(field[0] === copiedField[0]).toBeFalsy();
});

test("rotateMatrix", () => {
  const initialMatrix = [
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0]
  ];

  let matrix = rotateMatrix(initialMatrix, ROTATE_DIRECTION.CLOCKWISE);
  expect(matrix === initialMatrix).toBeFalsy();
  expect(matrix[2][2]).toBe(1);
  expect(matrix[0][2]).toBe(0);

  matrix = rotateMatrix(initialMatrix, ROTATE_DIRECTION.COUNTERCLOCKWISE);
  expect(matrix === initialMatrix).toBeFalsy();
  expect(matrix[0][0]).toBe(1);
  expect(matrix[0][2]).toBe(0);
});

test("putFigureOnField BAR", () => {
  let field = putFigureOnField(createGameField(), 0, 0, BAR);
  expect(field[0][0]).toEqual(BAR);
  expect(field[1][0]).toEqual(BAR);
  expect(field[2][0]).toEqual(BAR);
  expect(field[3][0]).toEqual(BAR);

  field = putFigureOnField(createGameField(), 1, 1, BAR);
  expect(field[1][1]).toEqual(BAR);
  expect(field[2][1]).toEqual(BAR);
  expect(field[3][1]).toEqual(BAR);
  expect(field[4][1]).toEqual(BAR);

  field = putFigureOnField(createGameField(), 0, 0, BAR, ORIENTATION.LEFT);
  expect(field[0][0]).toEqual(BAR);
  expect(field[0][1]).toEqual(BAR);
  expect(field[0][2]).toEqual(BAR);
  expect(field[0][3]).toEqual(BAR);
});

test("putFigureOnField L", () => {
  let field = putFigureOnField(createGameField(), 0, 0, L_SHAPE);
  expect(field[0][0]).toEqual(L_SHAPE);
  expect(field[1][0]).toEqual(L_SHAPE);
  expect(field[2][0]).toEqual(L_SHAPE);
  expect(field[2][1]).toEqual(L_SHAPE);

  field = putFigureOnField(createGameField(), 1, 1, L_SHAPE);
  expect(field[1][1]).toEqual(L_SHAPE);
  expect(field[2][1]).toEqual(L_SHAPE);
  expect(field[3][1]).toEqual(L_SHAPE);
  expect(field[3][2]).toEqual(L_SHAPE);

  field = putFigureOnField(createGameField(), 0, 0, L_SHAPE, ORIENTATION.DOWN);
  expect(field[0][0]).toEqual(L_SHAPE);
  expect(field[0][1]).toEqual(L_SHAPE);
  expect(field[1][1]).toEqual(L_SHAPE);
  expect(field[2][1]).toEqual(L_SHAPE);
});

test("putFigureOnField S", () => {
  let field = putFigureOnField(createGameField(), 0, 0, S_SHAPE);
  expect(field[0][0]).toEqual(EMPTY_FIELD);
  expect(field[0][1]).toEqual(S_SHAPE);
  expect(field[0][2]).toEqual(S_SHAPE);
  expect(field[1][0]).toEqual(S_SHAPE);
  expect(field[1][1]).toEqual(S_SHAPE);
  expect(field[1][2]).toEqual(EMPTY_FIELD);
});

test("putFigureOnField TRI", () => {
  let field = putFigureOnField(createGameField(), 0, 0, TRI);
  expect(field[0][0]).toEqual(EMPTY_FIELD);
  expect(field[0][1]).toEqual(TRI);
  expect(field[0][2]).toEqual(EMPTY_FIELD);
  expect(field[1][0]).toEqual(TRI);
  expect(field[1][1]).toEqual(TRI);
  expect(field[1][2]).toEqual(TRI);

  field = putFigureOnField(createGameField(), 0, 0, TRI, ORIENTATION.RIGHT);
  expect(field[0][0]).toEqual(TRI);
  expect(field[0][1]).toEqual(EMPTY_FIELD);
  expect(field[1][0]).toEqual(TRI);
  expect(field[1][1]).toEqual(TRI);
  expect(field[2][0]).toEqual(TRI);
  expect(field[2][1]).toEqual(EMPTY_FIELD);
});

test("putFigureOnField SQUARE", () => {
  const field = putFigureOnField(createGameField(), 0, 0, SQUARE);
  expect(field[0][0]).toEqual(SQUARE);
  expect(field[0][1]).toEqual(SQUARE);
  expect(field[1][0]).toEqual(SQUARE);
  expect(field[1][1]).toEqual(SQUARE);
});

test("canPutFigureOnField", () => {
  const field = createGameField();
  expect(canPutFigureOnField(field, 0, 0, SQUARE)).toBeTruthy();
  field[0][0] = BAR;
  expect(canPutFigureOnField(field, 0, 0, SQUARE)).toBeFalsy();

  expect(canPutFigureOnField(field, 0, 0, L_SHAPE)).toBeFalsy();
  expect(canPutFigureOnField(field, 0, 0, L_SHAPE, ORIENTATION.LEFT)).toBeTruthy();
});

test("getFigureMiddlePosition", () => {
  expect(getFigureMiddlePosition(BAR)).toBe(WIDTH - 5);
});

test("processGameField with no filled", () => {
  const field = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 4, 0, 0, 0],
    [1, 1, 1, 1, 4, 4, 2, 3, 3, 0]
  ];

  const results = processGameField(field);
  expect(results.scoreToAdd).toBe(0);
  expect(results.processedField).toEqual(field);
});

test("processGameField", () => {
  const field = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 4, 0, 0, 0],
    [1, 1, 1, 1, 4, 4, 2, 3, 3, 3]
  ];

  const resultField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 4, 0, 0, 0]
  ];

  const results = processGameField(field);
  expect(results.scoreToAdd).toBe(1);
  expect(results.processedField).toEqual(resultField);
});

test("processGameField two rows", () => {
  const field = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 2, 2, 4, 4, 2, 3, 4],
    [1, 1, 1, 1, 4, 4, 2, 3, 3, 3]
  ];

  const resultField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
  ];

  const results = processGameField(field);
  expect(results.scoreToAdd).toBe(2);
  expect(results.processedField).toEqual(resultField);
});