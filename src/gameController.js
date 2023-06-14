import Player from "./player"
import Display from "./display";

const Game = () => {
  const player = Player();
  const opponent = Player();
  const display = Display();

  let activeDefender = opponent

  function initGame() {
    player.placeMyFloat();
    opponent.placeMyFloat();
    display.drawBoards();
  }
  
  function playerTurn(defender, row, column) {
    defender.gameboard.receiveAttack(row, column);
  }

  function play() {
    initGame();
  }


  return { play, playerTurn }  
}

export default Game;