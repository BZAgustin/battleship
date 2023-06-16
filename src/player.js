/* eslint-disable no-restricted-syntax */
import Gameboard from "./gameboard"
import Ship from "./ship";

const Player = (_name) => {
  const name = _name;

  const gameboard = Gameboard();
  
  const float = [
    Ship(5),
    Ship(4),
    Ship(3),
    Ship(3),
    Ship(2)
  ];

  const placedShips = 0;

  function isFloatSunk() {
    return float.every((ship) => ship.isSunk() === true);
  }

  function placeMyFloat() {
    const myFloat = [];
    float.forEach(ship => myFloat.push(ship));

    gameboard.placeFloat(myFloat);
  }

  function addPlacedShip() {
    this.placedShips += 1;
  }

  return { name, gameboard, float, placedShips, isFloatSunk, placeMyFloat, addPlacedShip };
}

export default Player;