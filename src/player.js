/* eslint-disable no-restricted-syntax */
import Gameboard from "./gameboard"
import Ship from "./ship";

const Player = (_name) => {
  const name = _name;

  const gameboard = Gameboard();
  
  const float = [
    Ship('Carrier', 5),
    Ship('Battleship', 4),
    Ship('Cruiser', 3),
    Ship('Submarine', 3),
    Ship('Destroyer', 2)
  ];

  const placedShips = 0;

  function isFloatSunk() {
    return float.every((ship) => ship.isSunk() === true);
  }

  function placeMyFloat() {
    gameboard.placeFloat(float);
  }

  function addPlacedShip() {
    this.placedShips += 1;
  }

  return { name, gameboard, float, placedShips, isFloatSunk, placeMyFloat, addPlacedShip };
}

export default Player;