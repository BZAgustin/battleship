/* eslint-disable no-unused-vars */

const shipFactory = (_length) => {
  const length = _length;
  let hits = 0;
  let sunk = false;

  function isSunk() {
    return hits === length;
  }

  function hit() {
    hits += 1;
    sunk = isSunk();
  }

  return { isSunk, hit };
}

export default shipFactory;