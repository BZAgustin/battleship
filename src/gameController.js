import Player from "./player"

const Game = () => {
  const player = Player();
  const opponent = Player();

  let activeDefender = opponent

  player.placeMyFloat();
  opponent.placeMyFloat();

  function play() {
    // playerTurn(activeDefender, )
  }

  function playerTurn(defender, row, column) {
    defender.gameboard.receiveAttack(row, column);
  }

  return { play, playerTurn }  
}

export default Game;