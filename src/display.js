const SIZE = 10;

const Display = () => {
  const leftBoard = document.getElementById('left-board');
  const rightBoard = document.getElementById('right-board');
  const myStats = document.getElementById('left-stats');
  const opponentStats = document.getElementById('right-stats');

  function drawBoards() {
    for(let i = 0; i < SIZE; i += 1) {
      for(let j = 0; j < SIZE; j += 1) {
        const leftCell = document.createElement('div');
        const rightCell = document.createElement('div');
        leftCell.className = 'cell';
        rightCell.className = 'cell';
        leftCell.dataset.row = i;
        leftCell.dataset.col = j;
        rightCell.dataset.row = i;
        rightCell.dataset.col = j;
        leftBoard.appendChild(leftCell);
        rightBoard.appendChild(rightCell);
      }
    }
  }

  function addCellListeners(gameboard, handleTurn) {
    const cells = document.getElementById('right-board');
    const children = Array.from(cells.childNodes);
    children.forEach((cell) => {
      cell.addEventListener('click', (e) => {
          const row = parseInt(e.target.dataset.row, 10);
          const col = parseInt(e.target.dataset.col, 10);

          if(gameboard.board[row][col] !== null) {
            e.target.style.backgroundColor = 'pink';
          } else {
            e.target.style.backgroundColor = 'gray';
          }
          
          handleTurn(gameboard, row, col);
          e.target.innerHTML = '●';
        });
      });
  }

  return { myStats, opponentStats, drawBoards, addCellListeners }
};

export default Display;