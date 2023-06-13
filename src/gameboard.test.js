/* eslint-disable no-undef */

import Gameboard from "./gameboard";
import Ship from "./ship";

let gameboard;
let ship;
let testboard = [];
let trackboard = [];

beforeEach(() => {
  gameboard = Gameboard();
  ship = Ship(3);
  testboard = Array.from({ length: 10 },
            () => Array(10).fill(null));
  trackboard = Array.from({ length: 10 },
            () => Array(10).fill(false));
});

test('Builds gameboard', () => {
  expect(gameboard.board).toEqual(testboard);
});

describe('Ship placement', () => {
  test('Places a ship horizontally', () => {
    gameboard.placeShip(ship, 0, 0, false);
    testboard[0][0] = ship;
    testboard[0][1] = ship;
    testboard[0][2] = ship;
    expect(JSON.stringify(gameboard.board)).toEqual(JSON.stringify(testboard));
  });
  
  test('Places a ship vertically', () => {
    gameboard.placeShip(ship, 0, 2, true);
    testboard[0][2] = ship;
    testboard[1][2] = ship;
    testboard[2][2] = ship;
    expect(JSON.stringify(gameboard.board)).toEqual(JSON.stringify(testboard));
  });
  
  test('Places ships near each other', () => {
    gameboard.placeShip(ship, 4, 0, true);
    gameboard.placeShip(ship, 1, 0, true);
    testboard[1][0] = ship;
    testboard[2][0] = ship;
    testboard[3][0] = ship;
    testboard[4][0] = ship;
    testboard[5][0] = ship;
    testboard[6][0] = ship;
    expect(JSON.stringify(gameboard.board)).toEqual(JSON.stringify(testboard));
  });
  
  test('Throws an error if placing a ship that exceeds horizontal boundaries', () => {
    expect(() => gameboard.placeShip(ship, 0, 8, false)).toThrow('Ship length exceeds boundaries');
  });
  
  test('Throws an error if placing a ship that exceeds vertical boundaries', () => {
    expect(() => gameboard.placeShip(ship, 8, 0, true)).toThrow('Ship length exceeds boundaries');
  });
  
  test('Throws an error if placing a ship that overlaps with another ship', () => {
    gameboard.placeShip(ship, 0, 0, false);
  
    expect(() => gameboard.placeShip(ship, 0, 0, true)).toThrow('Overlapping other ship');
  });
});

describe('Attacks on board', () => {
  test('Receives an attack on the board', () => {
    gameboard.receiveAttack(0, 0);
    trackboard[0][0] = true;
    expect(JSON.stringify(gameboard.trackingBoard)).toEqual(JSON.stringify(trackboard));
  });

  test('Throws an error if the cell has already been hit', () => {
    gameboard.receiveAttack(0, 0);
    expect(() => gameboard.receiveAttack(0, 0)).toThrow('Coordinate already hit');
  });

  test('Reports when all ships have been sunk', () => {
    gameboard.placeShip(ship, 0, 0, false);
    expect(gameboard.areShipsSunk()).toEqual(false);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.areShipsSunk()).toEqual(true);
  });
});

