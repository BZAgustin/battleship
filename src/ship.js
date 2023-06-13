/* eslint-disable no-unused-vars */

const Ship = (_length) => {
  const length = _length;
  let hits = 0;

  function isSunk() {
    return hits === length;
  }

  function hit() {
    hits += 1;
  }

  return { length, isSunk, hit };
}

export default Ship;