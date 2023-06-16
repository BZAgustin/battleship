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

  display.body.addEventListener('keypress', (e) => {
    if(e.key === 'r') {
      Array.from(display.leftBoard.children).forEach(cell => {
        const cellDiv = cell;
        const {row} = cellDiv.dataset;
        const {col} = cellDiv.dataset;
        if(player.gameboard.board[row][col] === null) {
          cellDiv.style.backgroundColor = 'white';
        }
      });

      display.switchAxis();
  };
});

  return { start, newTurn, restart }
}

export default Game;