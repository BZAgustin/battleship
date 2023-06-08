/* eslint-disable no-undef */

import gameboardFactory from "./gameboard";

let gameboard;

test('Can build gameboard correctly', () => {
  gameboard = gameboardFactory();

  expect(gameboard.board).toStrictEqual([
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ]);
});

test('Can place ship horizontally', () => {
  gameboard = gameboardFactory();

  gameboard.placeShip(gameboard.float.battleship, 0, 0, 0);
  expect(gameboard.board).toStrictEqual([
    [gameboard.float.battleship,
     gameboard.float.battleship,
     gameboard.float.battleship,
     gameboard.float.battleship,
     0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ]);
});

test('Can place ship vertically', () => {
  gameboard = gameboardFactory();

  gameboard.placeShip(gameboard.float.battleship, 0, 2 ,1);
  expect(gameboard.board).toStrictEqual([
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [gameboard.float.battleship,0,0,0,0,0,0,0,0,0],
    [gameboard.float.battleship,0,0,0,0,0,0,0,0,0],
    [gameboard.float.battleship,0,0,0,0,0,0,0,0,0],
    [gameboard.float.battleship,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ]);
});

test('Can place ships near each other', () => {
  gameboard = gameboardFactory();
  gameboard.placeShip(gameboard.float.carrier, 5, 0, 1);
  gameboard.placeShip(gameboard.float.battleship, 2, 0, 1);

  expect(gameboard.board).toStrictEqual([
    [0,0,gameboard.float.battleship,0,0,gameboard.float.carrier,0,0,0,0],
    [0,0,gameboard.float.battleship,0,0,gameboard.float.carrier,0,0,0,0],
    [0,0,gameboard.float.battleship,0,0,gameboard.float.carrier,0,0,0,0],
    [0,0,gameboard.float.battleship,0,0,gameboard.float.carrier,0,0,0,0],
    [0,0,0,0,0,gameboard.float.carrier,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ]);
});

test('Placing a ship that exceeds horizontal boundaries throws an error', () => {
  gameboard = gameboardFactory();

  expect(() => gameboard.placeShip(gameboard.float.carrier, 6, 0, 0)).toThrow('Ship length exceeds boundaries');
});

test('Placing a ship that exceeds vertical boundaries throws an error', () => {
  gameboard = gameboardFactory();

  expect(() => gameboard.placeShip(gameboard.float.carrier, 0, 6, 1)).toThrow('Ship length exceeds boundaries');
});

test('Placing a ship that overlaps with another ship throws an error', () => {
  gameboard = gameboardFactory();
  gameboard.placeShip(gameboard.float.carrier, 0, 0, 0);

  expect(() => gameboard.placeShip(gameboard.float.battleship, 2, 0, 1)).toThrow('Overlapping other ship');
});