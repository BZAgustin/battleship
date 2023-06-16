const Ship = (_name, _length) => {
  const name = _name;
  const length = _length;
  const hits = 0;

  function isSunk() {
    return this.hits === this.length;
  }

  function hit() {
    this.hits += 1;
  }

  return { name, length, hits, isSunk, hit };
}

export default Ship;