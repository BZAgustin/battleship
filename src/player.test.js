/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import Player from "./player";
import Ship from "./ship";

let player;
let testboard;
let ships = [];

beforeEach(() => {
  player = Player();
  ships = [
    Ship('Carrier', 5),
    Ship('Battleship', 4),
    Ship('Cruiser', 3),
    Ship('Submarine', 3),
    Ship('Destroyer', 2)
  ];
  testboard = Array.from({ length: 10 },
            () => Array(10).fill(null));
});

test('Checks if a float is sunk', () => {
  expect(JSON.stringify(player.gameboard.board)).toEqual(JSON.stringify(testboard));
});

test('Places the player float', () => {
  testboard[0][0] = ships[0];
  testboard[1][0] = ships[0];
  testboard[2][0] = ships[0];
  testboard[3][0] = ships[0];
  testboard[4][0] = ships[0];

  testboard[0][1] = ships[1];
  testboard[1][1] = ships[1];
  testboard[2][1] = ships[1];
  testboard[3][1] = ships[1];

  testboard[0][2] = ships[2];
  testboard[1][2] = ships[2];
  testboard[2][2] = ships[2];

  testboard[0][3] = ships[3];
  testboard[1][3] = ships[3];
  testboard[2][3] = ships[3];

  testboard[0][4] = ships[4];
  testboard[1][4] = ships[4];

  player.placeMyFloat();

  expect(JSON.stringify(player.gameboard.board)).toEqual(JSON.stringify(testboard));
});