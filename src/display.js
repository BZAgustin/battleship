/* eslint-disable prefer-const */
const Display = () => {
  const SIZE = 10;
  const body = document.querySelector('body');
  const leftBoard = document.getElementById('left-board');
  const rightBoard = document.getElementById('right-board');
  const myStats = document.getElementById('left-stats');
  const opponentStats = document.getElementById('right-stats');
  const hitIconSrc = './assets/explosion.png'

  const overlay = document.querySelector('.overlay-container');
  const winner = document.getElementById('winner');
  const btnPlayAgain = document.getElementById('btn-play-again');

  let verticalPlacement = true;

  function drawBoards() {
    for(let i = 0; i < SIZE; i += 1) {
      for(let j = 0; j < SIZE; j += 1) {
        const leftCell = document.createElement('div');
        const rightCell = document.createElement('div');
        const leftIcon = document.createElement('img');
        const rightIcon = document.createElement('img');

        leftIcon.src = hitIconSrc;
        rightIcon.src = hitIconSrc;

        leftIcon.style.display = 'none';
        rightIcon.style.display = 'none';

        leftCell.className = 'cell';
        rightCell.className = 'cell';

        leftCell.dataset.row = i;
        leftCell.dataset.col = j;

        rightCell.dataset.row = i;
        rightCell.dataset.col = j;
        
        leftCell.appendChild(leftIcon);
        rightCell.appendChild(rightIcon);
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
    myStats.innerHTML = 'Place your Carrier';
    opponentStats.innerHTML = '';
  }

  function updateCell(cell, div) {
    const cellDiv = div;

    if(cell !== null) {
      cellDiv.style.backgroundColor = '#ff6200';
      cellDiv.firstChild.style.display = 'block';
    } else {
      cellDiv.style.backgroundColor = 'rgba(150, 150, 150, 0.5)';
    }
  }

  function updateStats(sunk, div, shipName = '') {
    const statsDiv = div;

    if(sunk === null) {
      statsDiv.innerHTML = `No hit`;
    } else if(!sunk) {
      statsDiv.innerHTML = `It's a hit!`;
    } else if (sunk) {
      statsDiv.innerHTML = `${shipName} has been sunk!`;
    }
  }

  function getPlaceholder(board, length, row, col, isVertical) {
    const cells = [];

    for(let i = 0; i < length; i += 1) {
      if(isVertical) {
        const cell = document.querySelector(`[data-row="${row+i}"][data-col="${col}"]`);

        if(row + i < 10 && board[row+i][col] === null) {
          cells.push(cell);
        }
      } else {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col+i}"]`);

        if(col + i < 10 && board[row][col+i] === null) {
          cells.push(cell);
        }
      } 
    }

    return cells;
  }

  function drawShip(board, length, row, col) {
    const cells = getPlaceholder(board, length, row, col, verticalPlacement);

    cells.forEach(cell => {
      const cellDiv = cell;
      cellDiv.style.backgroundColor = '#0077ff';
    });
  }

  function hideShip(board, length, row, col) {
    const cells = getPlaceholder(board, length, row, col, verticalPlacement);

    cells.forEach(cell => {
      const cellDiv = cell;
        cellDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    });
  }

  function switchAxis() {
    verticalPlacement = !verticalPlacement;
  }

  function showGameOverScreen(winnerName) {
    overlay.style.display = 'flex';
    winner.innerHTML = `${winnerName} is the winner!`;
  }

  function addCellListeners(opponent, player, handleTurn) {
    const children = Array.from(rightBoard.childNodes);
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

  function addShipPlacementListeners(player, playHandler) {
    const children = Array.from(leftBoard.childNodes);
    children.forEach(cell => {
      cell.addEventListener('click', (e) => {
        const row = parseInt(e.target.dataset.row, 10);
        const col = parseInt(e.target.dataset.col, 10);

        if(player.placedShips === 5) {
          return null;
        }

        try {
          player.gameboard.placeShip(player.float[player.placedShips], row, col, verticalPlacement);
          player.addPlacedShip();
        if(player.placedShips === 5) {
          myStats.innerHTML = `Player's turn`;
        } else {
          myStats.innerHTML = `Place your ${player.float[player.placedShips].name} (Press 'R' to rotate)`;
        }
        } catch {
          myStats.innerHTML = 'Invalid placement';
          return null;
        }

        if(player.placedShips === 5) {
          children.forEach(square => {
            square.classList.add('disabled');
          });

          playHandler();
        }

        return null;
      });

      cell.addEventListener('mouseenter', (e) => {
        const row = parseInt(e.target.dataset.row, 10);
        const col = parseInt(e.target.dataset.col, 10);

        if(player.placedShips === 5 || player.gameboard.board[row][col] !== null) {
          return null;
        }

        drawShip(player.gameboard.board, player.float[player.placedShips].length, row, col);
        return null;
      });

      cell.addEventListener('mouseleave', (e) => {
        const row = parseInt(e.target.dataset.row, 10);
        const col = parseInt(e.target.dataset.col, 10);

        if(player.placedShips === 5 || player.gameboard.board[row][col] !== null) {
          return null;
        }

        hideShip(player.gameboard.board, player.float[player.placedShips].length, row, col)
        return null;
      });
    });
  }

  return { body, leftBoard, myStats, opponentStats, verticalPlacement, drawBoards, clearBoards, switchAxis, reset, updateStats, showGameOverScreen, addCellListeners, addRestartListener, addShipPlacementListeners }
};

export default Display;