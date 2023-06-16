
const Gameboard = () => {
  const board = Array.from({ length: 10 }, 
  () => Array(10).fill(null));
  const trackingBoard = Array.from({ length: 10 }, 
  () => Array(10).fill(false));

  function isCoordinateTaken(row, column) {
    return trackingBoard[row][column];
  }

  function isOverlapping(ship, row, column, isVertical) {
    if(isVertical === false) {
      for(let i = 0; i < ship.length; i+=1) {
        if(board[row][column+i] !== null) {
          return true;
        }
      }
    } else {
      for(let i = 0; i < ship.length; i+=1) {
        if(board[row+i][column] !== null) {
          return true;
        }
      }
    }

    return false;
  }

  function isOutOfBounds(ship, row, column, isVertical) {
    if(isVertical === false) {
      return ship.length + column > 10;
    }
    
    return ship.length + row > 10;
  }

  function placeShip(ship, row, column, isVertical) {
    if(isOutOfBounds(ship, row, column, isVertical)) {
      throw new Error('Ship length exceeds boundaries');
    } else if(isOverlapping(ship, row, column, isVertical)) {
      throw new Error('Overlapping other ship');
    }

    if(isVertical === false) {  
      for(let i = 0; i < ship.length; i+=1) {
        board[row][column+i] = ship;
      }
    } else {
      for(let i = 0; i < ship.length; i+=1) {
        board[row+i][column] = ship;
      }
    }
  }

  function receiveAttack(row, column) {
    if(trackingBoard[row][column] === true) {
      throw new Error('Coordinate already hit');
    }

    if(board[row][column] !== null) {
      board[row][column].hit();
      board[row][column] = null;
      trackingBoard[row][column] = true;
      return true;
    }

    trackingBoard[row][column] = true;
    return false;
  }

  function areShipsSunk() {
    for(let i = 0; i < 10; i+=1) {
      if(!board[i].every(element => element === null)) {
        return false;
      }
    }
    
    return true;
  }

  function placeFloat(ships) {
    for(let i = 0; i < ships.length; i+=1) {
      placeShip(ships[i], 0, i, true);
    }
  }

  return { board, trackingBoard, isCoordinateTaken, placeShip, receiveAttack, areShipsSunk, placeFloat }
};

export default Gameboard;