const Display = () => {
  const SIZE = 10;
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

  function updateCell(cell, div) {
    const cellDiv = div;

    if(cell !== null) {
      cellDiv.style.backgroundColor = 'pink';
    } else {
      cellDiv.style.backgroundColor = 'gray';
    }

    cellDiv.innerHTML = '●';
  }

  function updateStats(hit, div) {
    const statsDiv = div;

    if(hit) {
      statsDiv.innerHTML = `It's a hit!`;
    } else {
      statsDiv.innerHTML = `No hit`;
    }
  }

  function addCellListeners(opponent, player, handleTurn) {
    const cells = document.getElementById('right-board');
    const children = Array.from(cells.childNodes);
    children.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const row = parseInt(e.target.dataset.row, 10);
        const col = parseInt(e.target.dataset.col, 10);

        updateCell(opponent.gameboard.board[row][col], e.target);
        handleTurn(opponent, row, col, opponentStats);

        const randomRow = Math.floor(Math.random() * 10); 
        const randomCol = Math.floor(Math.random() * 10);

        updateCell(player.gameboard.board[randomRow][randomCol], leftBoard.querySelector(`[data-row="${randomRow}"][data-col="${randomCol}"]`));
        handleTurn(player, randomRow, randomCol, myStats);
      });
    });
  }

  return { myStats, opponentStats, drawBoards, updateStats, addCellListeners }
};

export default Display;