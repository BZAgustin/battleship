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

  function isOverlapping(ship, row, column, axis) {
    if(axis === 0) {
      for(let i = 0; i < ship.length; i+=1) {
        if(board[column][row+i] !== null) {
          return true;
        }
      }
    } else {
      for(let i = 0; i < ship.length; i+=1) {
        if(board[column+i][row] !== null) {
          return true;
        } 
      }
    }

    return false;
  }

  function isOutOfBounds(ship, row, column, axis) {
    if(axis === 0) {
      return ship.length + row > 10;
    }
    
    return ship.length + column > 10;
  }

  function placeShip(ship, row, column, axis) {
    if(isOutOfBounds(ship, row, column, axis)) {
      throw new Error('Ship length exceeds boundaries');
    } else if(isOverlapping(ship, row, column, axis)) {
      throw new Error('Overlapping other ship');
    }

    if(axis === 0) {  
      for(let i = 0; i < ship.length; i+=1) {
        board[column][row+i] = ship;
      }
    } else {
      for(let i = 0; i < ship.length; i+=1) {
        board[column+i][row] = ship;
      }
    }
  }

  function receiveAttack(row, column) {
    if(board[column][row] !== null) {
      board[column][row].hit();
    }

    trackingBoard[column][row] = 1;
  }

  return { board, float, placeShip, receiveAttack }
};

export default gameboardFactory;