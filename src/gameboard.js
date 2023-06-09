import shipFactory from "./ship";

const gameboardFactory = () => {
  const board = Array.from({ length: 10 }, 
  () => Array(10).fill(null));
  const trackingBoard = Array.from({ length: 10 }, 
  () => Array(10).fill(false));

  const float = {
    carrier: shipFactory(5),
    battleship: shipFactory(4),
    cruiser: shipFactory(3),
    submarine: shipFactory(3),
    destroyer: shipFactory(2)
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
    }

    trackingBoard[row][column] = true;
  }

  function areShipsSunk() {
    for(let i = 0; i < 10; i+=1) {
      if(!board[i].every(element => element === null)) {
        return false;
      }
    }
    
    return true;
  }

  return { board, trackingBoard, float, placeShip, receiveAttack, areShipsSunk }
};

export default gameboardFactory;