import Player from "./player"
import Display from "./display";

const Game = () => {
  let player = Player('Player');
  let opponent = Player('Computer');
  const display = Display();

  
  function newTurn(attacker, defender, row, column, defenderStats) {
    display.updateStats(defender.gameboard.receiveAttack(row, column), defenderStats);
    if(defender.isFloatSunk()) {
      display.showGameOverScreen(attacker.name);
    }
  }
  
  function play() {
    opponent.placeMyFloat();
    display.addCellListeners(opponent, player, newTurn);
  }
  
  function start() {
    display.drawBoards();
    display.addShipPlacementListeners(player, play);
  }
  
  function restart() {
    display.reset();
    player = Player('Player');
    opponent = Player('Computer');
    start();
  }

  display.addRestartListener(restart);
  
  return { start, newTurn, restart }
}

export default Game;