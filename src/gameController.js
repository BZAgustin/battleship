import Player from "./player"
import Display from "./display";

const Game = () => {
  const player = Player();
  const opponent = Player();
  const display = Display();

  function newTurn(defender, row, column, defenderStats) {
    display.updateStats(defender.gameboard.receiveAttack(row, column), defenderStats);
  }

  function initGame() {
    player.placeMyFloat();
    opponent.placeMyFloat();
    display.drawBoards();
    display.addCellListeners(opponent, player, newTurn);
  }

  function play() {
    initGame();
  }


  return { play, newTurn }  
}

export default Game;