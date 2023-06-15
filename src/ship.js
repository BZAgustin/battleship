/* eslint-disable no-unused-vars */

const Ship = (_length) => {
  const length = _length;
  const hits = 0;

  function isSunk() {
    return hits === length;
  }

  function hit() {
    this.hits += 1;
  }

  return { length, hits, isSunk, hit };
}

export default Ship;