import shipFactory from "./ship";

const gameboardFactory = () => {
  const board = Array.from({ length: 10 }, 
    () => Array(10).fill(null));
  const trackingBoard = Array.from({ length: 10 }, 
    () => Array(10).fill(0));

  const float = {
    carrier: shipFactory(5),
    battleship: shipFactory(4),
    cruiser: shipFactory(3),
    submarine: shipFactory(3),
    destroyer: shipFactory(2)
  }

  function isOverlapping(ship, x, y, axis) {
    if(axis === 0) {
      for(let i = 0; i < ship.length; i+=1) {
        if(board[y][x+i] !== null) {
          return true;
        }
      }
    } else {
      for(let i = 0; i < ship.length; i+=1) {
        if(board[y+i][x] !== null) {
          return true;
        } 
      }
    }

    return false;
  }

  function isOutOfBounds(ship, x, y, axis) {
    if(axis === 0) {
      return ship.length + x > 10;
    }
    
    return ship.length + y > 10;
  }

  function placeShip(ship, x, y, axis) {
    if(isOutOfBounds(ship, x, y, axis)) {
      throw new Error('Ship length exceeds boundaries');
    } else if(isOverlapping(ship, x, y, axis)) {
      throw new Error('Overlapping other ship');
    }

    if(axis === 0) {  
      for(let i = 0; i < ship.length; i+=1) {
        board[y][x+i] = ship;
      }
    } else {
      for(let i = 0; i < ship.length; i+=1) {
        board[y+i][x] = ship;
      }
    }
  }

  function receiveAttack(x, y) {
    if(board[y][x] !== null) {
      board[y][x].hit();
    }

    trackingBoard[y][x] = 1;
  }

  return { board, float, placeShip, receiveAttack }
};

export default gameboardFactory;