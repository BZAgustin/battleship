const Display = () => {
  const SIZE = 10;
  const leftBoard = document.getElementById('left-board');
  const rightBoard = document.getElementById('right-board');
  const myStats = document.getElementById('left-stats');
  const opponentStats = document.getElementById('right-stats');

  const overlay = document.querySelector('.overlay-container');
  const winner = document.getElementById('winner');
  const btnPlayAgain = document.getElementById('btn-play-again');

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

  function clearBoards() {
    while(leftBoard.firstChild && rightBoard.firstChild) {
      leftBoard.removeChild(leftBoard.firstChild);
      rightBoard.removeChild(rightBoard.firstChild);
    }
  }

  function reset() {
    clearBoards();
    myStats.innerHTML = '';
    opponentStats.innerHTML = '';
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

  function showGameOverScreen(winnerName) {
    overlay.style.display = 'flex';
    winner.innerHTML = `${winnerName} is the winner!`;
  }

  function addCellListeners(opponent, player, handleTurn) {
    const cells = document.getElementById('right-board');
    const children = Array.from(cells.childNodes);
    children.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const row = parseInt(e.target.dataset.row, 10);
        const col = parseInt(e.target.dataset.col, 10);

        if(opponent.gameboard.isCoordinateTaken(row, col)) {
          opponentStats.innerHTML = 'Coordinate already hit';
          return null;
        } 

        updateCell(opponent.gameboard.board[row][col], e.target);
        handleTurn(player, opponent, row, col, opponentStats);

        let randomRow = Math.floor(Math.random() * 10);
        let randomCol = Math.floor(Math.random() * 10);

        while(player.gameboard.isCoordinateTaken(randomRow, randomCol)) {
          randomRow = Math.floor(Math.random() * 10);
          randomCol = Math.floor(Math.random() * 10);
        }

        updateCell(player.gameboard.board[randomRow][randomCol], leftBoard.querySelector(`[data-row="${randomRow}"][data-col="${randomCol}"]`));
        handleTurn(opponent, player, randomRow, randomCol, myStats);

        return null;
      });
    });
  }

  function addRestartListener(restartHandler) {
    btnPlayAgain.addEventListener('click', () => {
      overlay.style.display = 'none';
      restartHandler();
    });
  }

  return { myStats, opponentStats, drawBoards, clearBoards, reset, updateStats, showGameOverScreen, addCellListeners, addRestartListener }
};

export default Display;