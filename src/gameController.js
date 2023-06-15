import Player from "./player"
import Display from "./display";

const Game = () => {
  const player = Player();
  const opponent = Player();
  const display = Display();

  let activeDefender = opponent;
  
  function playerTurn(defender, row, column) {
      if(defender.receiveAttack(row, column)) {
        display.opponentStats.innerHTML = `It's a hit!`;
      } else {
        display.opponentStats.innerHTML = `No hit`;
      };

      if(activeDefender === opponent) {
        activeDefender = player;
      } else {
        activeDefender = opponent;
      }
  }

  function initGame() {
    player.placeMyFloat();
    opponent.placeMyFloat();
    display.drawBoards();
    display.addCellListeners(activeDefender.gameboard, playerTurn);
  }


  function play() {
    initGame();
  }


  return { play, playerTurn }  
}

export default Game;