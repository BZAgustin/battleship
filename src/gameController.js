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
    display.drawBoards();
    display.addShipPlacementListeners(player);
    display.addCellListeners(opponent, player, newTurn);
  }
  
  function restart() {
    display.reset();
    player = Player('Player');
    opponent = Player('Computer');
    play();
  }

  display.addRestartListener(restart);
  
  return { play, newTurn, restart }
}

export default Game;