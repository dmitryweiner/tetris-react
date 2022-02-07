import {
  BAR,
  copyField,
  createGameField,
  EMPTY_FIELD,
  getRandomFigureID,
  HEIGHT,
  L_SHAPE, processField,
  putFigureOnField,
  S_SHAPE,
  SQUARE,
  TRI, TURN,
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
  for(let i = 0; i < 100; i++) {
    figureId = getRandomFigureID();
    expect([BAR, L_SHAPE, TRI, S_SHAPE, SQUARE].includes(figureId)).toBeTruthy();
  }
});

test("copyField", () => {
  const field = createGameField();
  const copiedField = copyField(field);
  expect(field === copiedField).toBeFalsy();
  expect(field[0] === copiedField[0]).toBeFalsy();
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
});

test("putFigureOnField SQUARE", () => {
  const field = putFigureOnField(createGameField(), 0, 0, SQUARE);
  expect(field[0][0]).toEqual(SQUARE);
  expect(field[0][1]).toEqual(SQUARE);
  expect(field[1][0]).toEqual(SQUARE);
  expect(field[1][1]).toEqual(SQUARE);
});
