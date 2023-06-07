/* eslint-disable no-plusplus */
import shipFactory from "./ship";

const shipTypes = [
  { name: "destroyer", length: 3 },
  { name: "scout", length: 2 },
  { name: "submarine", length: 4 },
];

const testShipSinking = (ship, shipLength) => {
  for (let i = 0; i < shipLength - 1; i++) {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  }

  ship.hit();
  expect(ship.isSunk()).toBe(true);
};

shipTypes.forEach((shipType) => {
  test(`Returns true if hit sunk ${shipType.name}`, () => {
    const ship = shipFactory(shipType.length);
    testShipSinking(ship, shipType.length);
  });
});