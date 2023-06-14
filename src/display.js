const SIZE = 10;

const Display = () => {
  const leftBoard = document.getElementById('left-board');
  const rightBoard = document.getElementById('right-board');

  function drawBoards() {
    for(let i = 0; i < SIZE; i += 1) {
      for(let j = 0; j < SIZE; j += 1) {
        const leftCell = document.createElement('div');
        const rightCell = document.createElement('div');
        leftCell.className = 'cell';
        rightCell.className = 'cell';
        leftCell.id = `0${i}${j}`;
        rightCell.id = `1${i}${j}`;
        leftBoard.appendChild(leftCell);
        rightBoard.appendChild(rightCell);
      }
    }
  }

  return { drawBoards }
};

export default Display;