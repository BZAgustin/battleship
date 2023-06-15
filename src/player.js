/* eslint-disable no-restricted-syntax */
import Gameboard from "./gameboard"
import Ship from "./ship";

const Player = () => {
  const gameboard = Gameboard();
  
  const float = [
    Ship(5),
    Ship(4),
    Ship(3),
    Ship(3),
    Ship(2)
  ];

  function isFloatSunk() {
    float.every((ship) => ship.isSunk() === true);
  }

  function placeMyFloat() {
    const myFloat = [];
    float.forEach(ship => myFloat.push(ship));

    gameboard.placeFloat(myFloat);
  }

  return { gameboard, float, isFloatSunk, placeMyFloat };
}

export default Player;