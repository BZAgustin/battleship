/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable prefer-const */
var Display = function Display() {
  var SIZE = 10;
  var body = document.querySelector('body');
  var leftBoard = document.getElementById('left-board');
  var rightBoard = document.getElementById('right-board');
  var myStats = document.getElementById('left-stats');
  var opponentStats = document.getElementById('right-stats');
  var overlay = document.querySelector('.overlay-container');
  var winner = document.getElementById('winner');
  var btnPlayAgain = document.getElementById('btn-play-again');
  var verticalPlacement = true;
  function drawBoards() {
    for (var i = 0; i < SIZE; i += 1) {
      for (var j = 0; j < SIZE; j += 1) {
        var leftCell = document.createElement('div');
        var rightCell = document.createElement('div');
        leftCell.className = 'cell';
        rightCell.className = 'cell';
        leftCell.dataset.row = i;
        leftCell.dataset.col = j;
        rightCell.dataset.row = i;
        rightCell.dataset.col = j;
        leftBoard.appendChild(leftCell);
        rightBoard.appendChild(rightCell);
      }
    }
  }
  function clearBoards() {
    while (leftBoard.firstChild && rightBoard.firstChild) {
      leftBoard.removeChild(leftBoard.firstChild);
      rightBoard.removeChild(rightBoard.firstChild);
    }
  }
  function reset() {
    clearBoards();
    myStats.innerHTML = '';
    opponentStats.innerHTML = '';
  }
  function updateCell(cell, div) {
    var cellDiv = div;
    if (cell !== null) {
      cellDiv.style.backgroundColor = 'pink';
    } else {
      cellDiv.style.backgroundColor = 'gray';
    }
    cellDiv.innerHTML = '●';
  }
  function updateStats(hit, div) {
    var statsDiv = div;
    if (hit) {
      statsDiv.innerHTML = "It's a hit!";
    } else {
      statsDiv.innerHTML = "No hit";
    }
  }
  function getPlaceholder(board, length, row, col, isVertical) {
    var cells = [];
    for (var i = 0; i < length; i += 1) {
      if (isVertical) {
        var cell = document.querySelector("[data-row=\"".concat(row + i, "\"][data-col=\"").concat(col, "\"]"));
        if (row + i < 10 && board[row + i][col] === null) {
          cells.push(cell);
        }
      } else {
        var _cell = document.querySelector("[data-row=\"".concat(row, "\"][data-col=\"").concat(col + i, "\"]"));
        if (col + i < 10 && board[row][col + i] === null) {
          cells.push(_cell);
        }
      }
    }
    return cells;
  }
  function drawShip(board, length, row, col) {
    var cells = getPlaceholder(board, length, row, col, verticalPlacement);
    cells.forEach(function (cell) {
      var cellDiv = cell;
      cellDiv.style.backgroundColor = 'green';
    });
  }
  function hideShip(board, length, row, col) {
    var cells = getPlaceholder(board, length, row, col, verticalPlacement);
    cells.forEach(function (cell) {
      var cellDiv = cell;
      cellDiv.style.backgroundColor = 'white';
    });
  }
  function switchAxis() {
    verticalPlacement = !verticalPlacement;
  }
  function showGameOverScreen(winnerName) {
    overlay.style.display = 'flex';
    winner.innerHTML = "".concat(winnerName, " is the winner!");
  }
  function addCellListeners(opponent, player, handleTurn) {
    var children = Array.from(rightBoard.childNodes);
    children.forEach(function (cell) {
      cell.addEventListener('click', function (e) {
        var row = parseInt(e.target.dataset.row, 10);
        var col = parseInt(e.target.dataset.col, 10);
        if (opponent.gameboard.isCoordinateTaken(row, col)) {
          opponentStats.innerHTML = 'Coordinate already hit';
          return null;
        }
        updateCell(opponent.gameboard.board[row][col], e.target);
        handleTurn(player, opponent, row, col, opponentStats);
        var randomRow = Math.floor(Math.random() * 10);
        var randomCol = Math.floor(Math.random() * 10);
        while (player.gameboard.isCoordinateTaken(randomRow, randomCol)) {
          randomRow = Math.floor(Math.random() * 10);
          randomCol = Math.floor(Math.random() * 10);
        }
        updateCell(player.gameboard.board[randomRow][randomCol], leftBoard.querySelector("[data-row=\"".concat(randomRow, "\"][data-col=\"").concat(randomCol, "\"]")));
        handleTurn(opponent, player, randomRow, randomCol, myStats);
        return null;
      });
    });
  }
  function addRestartListener(restartHandler) {
    btnPlayAgain.addEventListener('click', function () {
      overlay.style.display = 'none';
      restartHandler();
    });
  }
  function addShipPlacementListeners(player, playHandler) {
    var children = Array.from(leftBoard.childNodes);
    children.forEach(function (cell) {
      cell.addEventListener('click', function (e) {
        var row = parseInt(e.target.dataset.row, 10);
        var col = parseInt(e.target.dataset.col, 10);
        if (player.placedShips === 5) {
          return null;
        }
        try {
          player.gameboard.placeShip(player["float"][player.placedShips], row, col, verticalPlacement);
          player.addPlacedShip();
          if (player.placedShips === 5) {
            myStats.innerHTML = "Player's turn";
          } else {
            myStats.innerHTML = "Place your ".concat(player["float"][player.placedShips].name);
          }
        } catch (_unused) {
          myStats.innerHTML = 'Invalid placement';
          return null;
        }
        if (player.placedShips === 5) {
          children.forEach(function (square) {
            square.classList.add('disabled');
          });
          playHandler();
        }
        return null;
      });
      cell.addEventListener('mouseenter', function (e) {
        var row = parseInt(e.target.dataset.row, 10);
        var col = parseInt(e.target.dataset.col, 10);
        if (player.placedShips === 5 || player.gameboard.board[row][col] !== null) {
          return null;
        }
        drawShip(player.gameboard.board, player["float"][player.placedShips].length, row, col);
        return null;
      });
      cell.addEventListener('mouseleave', function (e) {
        var row = parseInt(e.target.dataset.row, 10);
        var col = parseInt(e.target.dataset.col, 10);
        if (player.placedShips === 5 || player.gameboard.board[row][col] !== null) {
          return null;
        }
        hideShip(player.gameboard.board, player["float"][player.placedShips].length, row, col);
        return null;
      });
    });
  }
  return {
    body: body,
    leftBoard: leftBoard,
    myStats: myStats,
    opponentStats: opponentStats,
    verticalPlacement: verticalPlacement,
    drawBoards: drawBoards,
    clearBoards: clearBoards,
    switchAxis: switchAxis,
    reset: reset,
    updateStats: updateStats,
    showGameOverScreen: showGameOverScreen,
    addCellListeners: addCellListeners,
    addRestartListener: addRestartListener,
    addShipPlacementListeners: addShipPlacementListeners
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);

/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ "./src/display.js");


var Game = function Game() {
  var player = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])('Player');
  var opponent = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])('Computer');
  var display = (0,_display__WEBPACK_IMPORTED_MODULE_1__["default"])();
  function newTurn(attacker, defender, row, column, defenderStats) {
    display.updateStats(defender.gameboard.receiveAttack(row, column), defenderStats);
    if (defender.isFloatSunk()) {
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
    player = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])('Player');
    opponent = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])('Computer');
    start();
  }
  display.addRestartListener(restart);
  display.body.addEventListener('keypress', function (e) {
    if (e.key === 'r') {
      Array.from(display.leftBoard.children).forEach(function (cell) {
        var cellDiv = cell;
        var row = cellDiv.dataset.row;
        var col = cellDiv.dataset.col;
        if (player.gameboard.board[row][col] === null) {
          cellDiv.style.backgroundColor = 'white';
        }
      });
      display.switchAxis();
    }
    ;
  });
  return {
    start: start,
    newTurn: newTurn,
    restart: restart
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Gameboard = function Gameboard() {
  var board = Array.from({
    length: 10
  }, function () {
    return Array(10).fill(null);
  });
  var trackingBoard = Array.from({
    length: 10
  }, function () {
    return Array(10).fill(false);
  });
  function isCoordinateTaken(row, column) {
    return trackingBoard[row][column];
  }
  function isOverlapping(ship, row, column, isVertical) {
    if (isVertical === false) {
      for (var i = 0; i < ship.length; i += 1) {
        if (board[row][column + i] !== null) {
          return true;
        }
      }
    } else {
      for (var _i = 0; _i < ship.length; _i += 1) {
        if (board[row + _i][column] !== null) {
          return true;
        }
      }
    }
    return false;
  }
  function isOutOfBounds(ship, row, column, isVertical) {
    if (isVertical === false) {
      return ship.length + column > 10;
    }
    return ship.length + row > 10;
  }
  function placeShip(ship, row, column, isVertical) {
    if (isOutOfBounds(ship, row, column, isVertical)) {
      throw new Error('Ship length exceeds boundaries');
    } else if (isOverlapping(ship, row, column, isVertical)) {
      throw new Error('Overlapping other ship');
    }
    if (isVertical === false) {
      for (var i = 0; i < ship.length; i += 1) {
        board[row][column + i] = ship;
      }
    } else {
      for (var _i2 = 0; _i2 < ship.length; _i2 += 1) {
        board[row + _i2][column] = ship;
      }
    }
  }
  function receiveAttack(row, column) {
    if (trackingBoard[row][column] === true) {
      throw new Error('Coordinate already hit');
    }
    if (board[row][column] !== null) {
      board[row][column].hit();
      board[row][column] = null;
      trackingBoard[row][column] = true;
      return true;
    }
    trackingBoard[row][column] = true;
    return false;
  }
  function areShipsSunk() {
    for (var i = 0; i < 10; i += 1) {
      if (!board[i].every(function (element) {
        return element === null;
      })) {
        return false;
      }
    }
    return true;
  }
  function placeFloat(ships) {
    for (var i = 0; i < ships.length; i += 1) {
      placeShip(ships[i], 0, i, true);
    }
  }
  return {
    board: board,
    trackingBoard: trackingBoard,
    isCoordinateTaken: isCoordinateTaken,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    areShipsSunk: areShipsSunk,
    placeFloat: placeFloat
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* eslint-disable no-restricted-syntax */


var Player = function Player(_name) {
  var name = _name;
  var gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var _float = [(0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])('Carrier', 5), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])('Battleship', 4), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])('Cruiser', 3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])('Submarine', 3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])('Destroyer', 2)];
  var placedShips = 0;
  function isFloatSunk() {
    return _float.every(function (ship) {
      return ship.isSunk() === true;
    });
  }
  function placeMyFloat() {
    var myFloat = [];
    this["float"].forEach(function (ship) {
      return myFloat.push(ship);
    });
    this.gameboard.placeFloat(myFloat);
  }
  function addPlacedShip() {
    this.placedShips += 1;
  }
  return {
    name: name,
    gameboard: gameboard,
    "float": _float,
    placedShips: placedShips,
    isFloatSunk: isFloatSunk,
    placeMyFloat: placeMyFloat,
    addPlacedShip: addPlacedShip
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(_name, _length) {
  var name = _name;
  var length = _length;
  var hits = 0;
  function isSunk() {
    return this.hits === this.length;
  }
  function hit() {
    this.hits += 1;
  }
  return {
    name: name,
    length: length,
    hits: hits,
    isSunk: isSunk,
    hit: hit
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ "./src/gameController.js");

(0,_gameController__WEBPACK_IMPORTED_MODULE_0__["default"])().start();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFiQTtFQUFjLENBQUM7QUFDMUYsQ0FBQztBQUVELGlFQUFlTSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQ3JDckIsSUFBTTBCLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFJQyxLQUFLLEVBQUVJLE9BQU8sRUFBSztFQUMvQixJQUFNcEMsSUFBSSxHQUFHZ0MsS0FBSztFQUNsQixJQUFNdEUsTUFBTSxHQUFHMEUsT0FBTztFQUN0QixJQUFNQyxJQUFJLEdBQUcsQ0FBQztFQUVkLFNBQVNILE1BQU1BLENBQUEsRUFBRztJQUNoQixPQUFPLElBQUksQ0FBQ0csSUFBSSxLQUFLLElBQUksQ0FBQzNFLE1BQU07RUFDbEM7RUFFQSxTQUFTSixHQUFHQSxDQUFBLEVBQUc7SUFDYixJQUFJLENBQUMrRSxJQUFJLElBQUksQ0FBQztFQUNoQjtFQUVBLE9BQU87SUFBRXJDLElBQUksRUFBSkEsSUFBSTtJQUFFdEMsTUFBTSxFQUFOQSxNQUFNO0lBQUUyRSxJQUFJLEVBQUpBLElBQUk7SUFBRUgsTUFBTSxFQUFOQSxNQUFNO0lBQUU1RSxHQUFHLEVBQUhBO0VBQUksQ0FBQztBQUM1QyxDQUFDO0FBRUQsaUVBQWV5RSxJQUFJOzs7Ozs7VUNoQm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFFcEN6QiwyREFBSSxDQUFDLENBQUMsQ0FBQ1UsS0FBSyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItY29uc3QgKi9cbmNvbnN0IERpc3BsYXkgPSAoKSA9PiB7XG4gIGNvbnN0IFNJWkUgPSAxMDtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgY29uc3QgbGVmdEJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZnQtYm9hcmQnKTtcbiAgY29uc3QgcmlnaHRCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWdodC1ib2FyZCcpO1xuICBjb25zdCBteVN0YXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZnQtc3RhdHMnKTtcbiAgY29uc3Qgb3Bwb25lbnRTdGF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWdodC1zdGF0cycpO1xuXG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheS1jb250YWluZXInKTtcbiAgY29uc3Qgd2lubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbm5lcicpO1xuICBjb25zdCBidG5QbGF5QWdhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXBsYXktYWdhaW4nKTtcblxuICBsZXQgdmVydGljYWxQbGFjZW1lbnQgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIGRyYXdCb2FyZHMoKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IFNJWkU7IGkgKz0gMSkge1xuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IFNJWkU7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBsZWZ0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCByaWdodENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBsZWZ0Q2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG4gICAgICAgIHJpZ2h0Q2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG5cbiAgICAgICAgbGVmdENlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICBsZWZ0Q2VsbC5kYXRhc2V0LmNvbCA9IGo7XG5cbiAgICAgICAgcmlnaHRDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgcmlnaHRDZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgXG4gICAgICAgIGxlZnRCb2FyZC5hcHBlbmRDaGlsZChsZWZ0Q2VsbCk7XG4gICAgICAgIHJpZ2h0Qm9hcmQuYXBwZW5kQ2hpbGQocmlnaHRDZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhckJvYXJkcygpIHtcbiAgICB3aGlsZShsZWZ0Qm9hcmQuZmlyc3RDaGlsZCAmJiByaWdodEJvYXJkLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGxlZnRCb2FyZC5yZW1vdmVDaGlsZChsZWZ0Qm9hcmQuZmlyc3RDaGlsZCk7XG4gICAgICByaWdodEJvYXJkLnJlbW92ZUNoaWxkKHJpZ2h0Qm9hcmQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgY2xlYXJCb2FyZHMoKTtcbiAgICBteVN0YXRzLmlubmVySFRNTCA9ICcnO1xuICAgIG9wcG9uZW50U3RhdHMuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDZWxsKGNlbGwsIGRpdikge1xuICAgIGNvbnN0IGNlbGxEaXYgPSBkaXY7XG5cbiAgICBpZihjZWxsICE9PSBudWxsKSB7XG4gICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdwaW5rJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JheSc7XG4gICAgfVxuXG4gICAgY2VsbERpdi5pbm5lckhUTUwgPSAn4pePJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVN0YXRzKGhpdCwgZGl2KSB7XG4gICAgY29uc3Qgc3RhdHNEaXYgPSBkaXY7XG5cbiAgICBpZihoaXQpIHtcbiAgICAgIHN0YXRzRGl2LmlubmVySFRNTCA9IGBJdCdzIGEgaGl0IWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRzRGl2LmlubmVySFRNTCA9IGBObyBoaXRgO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyKGJvYXJkLCBsZW5ndGgsIHJvdywgY29sLCBpc1ZlcnRpY2FsKSB7XG4gICAgY29uc3QgY2VsbHMgPSBbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYoaXNWZXJ0aWNhbCkge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3craX1cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcblxuICAgICAgICBpZihyb3cgKyBpIDwgMTAgJiYgYm9hcmRbcm93K2ldW2NvbF0gPT09IG51bGwpIHtcbiAgICAgICAgICBjZWxscy5wdXNoKGNlbGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2wraX1cIl1gKTtcblxuICAgICAgICBpZihjb2wgKyBpIDwgMTAgJiYgYm9hcmRbcm93XVtjb2wraV0gPT09IG51bGwpIHtcbiAgICAgICAgICBjZWxscy5wdXNoKGNlbGwpO1xuICAgICAgICB9XG4gICAgICB9IFxuICAgIH1cblxuICAgIHJldHVybiBjZWxscztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdTaGlwKGJvYXJkLCBsZW5ndGgsIHJvdywgY29sKSB7XG4gICAgY29uc3QgY2VsbHMgPSBnZXRQbGFjZWhvbGRlcihib2FyZCwgbGVuZ3RoLCByb3csIGNvbCwgdmVydGljYWxQbGFjZW1lbnQpO1xuXG4gICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNvbnN0IGNlbGxEaXYgPSBjZWxsO1xuICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZVNoaXAoYm9hcmQsIGxlbmd0aCwgcm93LCBjb2wpIHtcbiAgICBjb25zdCBjZWxscyA9IGdldFBsYWNlaG9sZGVyKGJvYXJkLCBsZW5ndGgsIHJvdywgY29sLCB2ZXJ0aWNhbFBsYWNlbWVudCk7XG5cbiAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgY29uc3QgY2VsbERpdiA9IGNlbGw7XG4gICAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN3aXRjaEF4aXMoKSB7XG4gICAgdmVydGljYWxQbGFjZW1lbnQgPSAhdmVydGljYWxQbGFjZW1lbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93R2FtZU92ZXJTY3JlZW4od2lubmVyTmFtZSkge1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB3aW5uZXIuaW5uZXJIVE1MID0gYCR7d2lubmVyTmFtZX0gaXMgdGhlIHdpbm5lciFgO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2VsbExpc3RlbmVycyhvcHBvbmVudCwgcGxheWVyLCBoYW5kbGVUdXJuKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHJpZ2h0Qm9hcmQuY2hpbGROb2Rlcyk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG5cbiAgICAgICAgaWYob3Bwb25lbnQuZ2FtZWJvYXJkLmlzQ29vcmRpbmF0ZVRha2VuKHJvdywgY29sKSkge1xuICAgICAgICAgIG9wcG9uZW50U3RhdHMuaW5uZXJIVE1MID0gJ0Nvb3JkaW5hdGUgYWxyZWFkeSBoaXQnO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IFxuXG4gICAgICAgIHVwZGF0ZUNlbGwob3Bwb25lbnQuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSwgZS50YXJnZXQpO1xuICAgICAgICBoYW5kbGVUdXJuKHBsYXllciwgb3Bwb25lbnQsIHJvdywgY29sLCBvcHBvbmVudFN0YXRzKTtcblxuICAgICAgICBsZXQgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBsZXQgcmFuZG9tQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICAgIHdoaWxlKHBsYXllci5nYW1lYm9hcmQuaXNDb29yZGluYXRlVGFrZW4ocmFuZG9tUm93LCByYW5kb21Db2wpKSB7XG4gICAgICAgICAgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgIHJhbmRvbUNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNlbGwocGxheWVyLmdhbWVib2FyZC5ib2FyZFtyYW5kb21Sb3ddW3JhbmRvbUNvbF0sIGxlZnRCb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3JhbmRvbVJvd31cIl1bZGF0YS1jb2w9XCIke3JhbmRvbUNvbH1cIl1gKSk7XG4gICAgICAgIGhhbmRsZVR1cm4ob3Bwb25lbnQsIHBsYXllciwgcmFuZG9tUm93LCByYW5kb21Db2wsIG15U3RhdHMpO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRSZXN0YXJ0TGlzdGVuZXIocmVzdGFydEhhbmRsZXIpIHtcbiAgICBidG5QbGF5QWdhaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXN0YXJ0SGFuZGxlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkU2hpcFBsYWNlbWVudExpc3RlbmVycyhwbGF5ZXIsIHBsYXlIYW5kbGVyKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGxlZnRCb2FyZC5jaGlsZE5vZGVzKTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG5cbiAgICAgICAgaWYocGxheWVyLnBsYWNlZFNoaXBzID09PSA1KSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHBsYXllci5mbG9hdFtwbGF5ZXIucGxhY2VkU2hpcHNdLCByb3csIGNvbCwgdmVydGljYWxQbGFjZW1lbnQpO1xuICAgICAgICAgIHBsYXllci5hZGRQbGFjZWRTaGlwKCk7XG4gICAgICAgIGlmKHBsYXllci5wbGFjZWRTaGlwcyA9PT0gNSkge1xuICAgICAgICAgIG15U3RhdHMuaW5uZXJIVE1MID0gYFBsYXllcidzIHR1cm5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG15U3RhdHMuaW5uZXJIVE1MID0gYFBsYWNlIHlvdXIgJHtwbGF5ZXIuZmxvYXRbcGxheWVyLnBsYWNlZFNoaXBzXS5uYW1lfWA7XG4gICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgbXlTdGF0cy5pbm5lckhUTUwgPSAnSW52YWxpZCBwbGFjZW1lbnQnO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocGxheWVyLnBsYWNlZFNoaXBzID09PSA1KSB7XG4gICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwbGF5SGFuZGxlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcblxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wsIDEwKTtcblxuICAgICAgICBpZihwbGF5ZXIucGxhY2VkU2hpcHMgPT09IDUgfHwgcGxheWVyLmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdTaGlwKHBsYXllci5nYW1lYm9hcmQuYm9hcmQsIHBsYXllci5mbG9hdFtwbGF5ZXIucGxhY2VkU2hpcHNdLmxlbmd0aCwgcm93LCBjb2wpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKHBsYXllci5wbGFjZWRTaGlwcyA9PT0gNSB8fCBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaGlkZVNoaXAocGxheWVyLmdhbWVib2FyZC5ib2FyZCwgcGxheWVyLmZsb2F0W3BsYXllci5wbGFjZWRTaGlwc10ubGVuZ3RoLCByb3csIGNvbClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7IGJvZHksIGxlZnRCb2FyZCwgbXlTdGF0cywgb3Bwb25lbnRTdGF0cywgdmVydGljYWxQbGFjZW1lbnQsIGRyYXdCb2FyZHMsIGNsZWFyQm9hcmRzLCBzd2l0Y2hBeGlzLCByZXNldCwgdXBkYXRlU3RhdHMsIHNob3dHYW1lT3ZlclNjcmVlbiwgYWRkQ2VsbExpc3RlbmVycywgYWRkUmVzdGFydExpc3RlbmVyLCBhZGRTaGlwUGxhY2VtZW50TGlzdGVuZXJzIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BsYXk7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIlxuaW1wb3J0IERpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICBsZXQgcGxheWVyID0gUGxheWVyKCdQbGF5ZXInKTtcbiAgbGV0IG9wcG9uZW50ID0gUGxheWVyKCdDb21wdXRlcicpO1xuICBjb25zdCBkaXNwbGF5ID0gRGlzcGxheSgpO1xuICBcbiAgZnVuY3Rpb24gbmV3VHVybihhdHRhY2tlciwgZGVmZW5kZXIsIHJvdywgY29sdW1uLCBkZWZlbmRlclN0YXRzKSB7XG4gICAgZGlzcGxheS51cGRhdGVTdGF0cyhkZWZlbmRlci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbiksIGRlZmVuZGVyU3RhdHMpO1xuICAgIGlmKGRlZmVuZGVyLmlzRmxvYXRTdW5rKCkpIHtcbiAgICAgIGRpc3BsYXkuc2hvd0dhbWVPdmVyU2NyZWVuKGF0dGFja2VyLm5hbWUpO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICBvcHBvbmVudC5wbGFjZU15RmxvYXQoKTtcbiAgICBkaXNwbGF5LmFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgbmV3VHVybik7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGRpc3BsYXkuZHJhd0JvYXJkcygpO1xuICAgIGRpc3BsYXkuYWRkU2hpcFBsYWNlbWVudExpc3RlbmVycyhwbGF5ZXIsIHBsYXkpO1xuICB9XG4gIFxuICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIGRpc3BsYXkucmVzZXQoKTtcbiAgICBwbGF5ZXIgPSBQbGF5ZXIoJ1BsYXllcicpO1xuICAgIG9wcG9uZW50ID0gUGxheWVyKCdDb21wdXRlcicpO1xuICAgIHN0YXJ0KCk7XG4gIH1cblxuICBkaXNwbGF5LmFkZFJlc3RhcnRMaXN0ZW5lcihyZXN0YXJ0KTtcblxuICBkaXNwbGF5LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIGlmKGUua2V5ID09PSAncicpIHtcbiAgICAgIEFycmF5LmZyb20oZGlzcGxheS5sZWZ0Qm9hcmQuY2hpbGRyZW4pLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxEaXYgPSBjZWxsO1xuICAgICAgICBjb25zdCB7cm93fSA9IGNlbGxEaXYuZGF0YXNldDtcbiAgICAgICAgY29uc3Qge2NvbH0gPSBjZWxsRGl2LmRhdGFzZXQ7XG4gICAgICAgIGlmKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdID09PSBudWxsKSB7XG4gICAgICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZGlzcGxheS5zd2l0Y2hBeGlzKCk7XG4gIH07XG59KTtcblxuICByZXR1cm4geyBzdGFydCwgbmV3VHVybiwgcmVzdGFydCB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgXG4gICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgY29uc3QgdHJhY2tpbmdCb2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIFxuICAoKSA9PiBBcnJheSgxMCkuZmlsbChmYWxzZSkpO1xuXG4gIGZ1bmN0aW9uIGlzQ29vcmRpbmF0ZVRha2VuKHJvdywgY29sdW1uKSB7XG4gICAgcmV0dXJuIHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPdmVybGFwcGluZyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmKGlzVmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgaWYoYm9hcmRbcm93XVtjb2x1bW4raV0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgaWYoYm9hcmRbcm93K2ldW2NvbHVtbl0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHNoaXAubGVuZ3RoICsgY29sdW1uID4gMTA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzaGlwLmxlbmd0aCArIHJvdyA+IDEwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYoaXNPdXRPZkJvdW5kcyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hpcCBsZW5ndGggZXhjZWVkcyBib3VuZGFyaWVzJyk7XG4gICAgfSBlbHNlIGlmKGlzT3ZlcmxhcHBpbmcoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJsYXBwaW5nIG90aGVyIHNoaXAnKTtcbiAgICB9XG5cbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkgeyAgXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgYm9hcmRbcm93XVtjb2x1bW4raV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgYm9hcmRbcm93K2ldW2NvbHVtbl0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBpZih0cmFja2luZ0JvYXJkW3Jvd11bY29sdW1uXSA9PT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb29yZGluYXRlIGFscmVhZHkgaGl0Jyk7XG4gICAgfVxuXG4gICAgaWYoYm9hcmRbcm93XVtjb2x1bW5dICE9PSBudWxsKSB7XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KCk7XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBudWxsO1xuICAgICAgdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFyZVNoaXBzU3VuaygpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrPTEpIHtcbiAgICAgIGlmKCFib2FyZFtpXS5ldmVyeShlbGVtZW50ID0+IGVsZW1lbnQgPT09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZUZsb2F0KHNoaXBzKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSs9MSkge1xuICAgICAgcGxhY2VTaGlwKHNoaXBzW2ldLCAwLCBpLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBib2FyZCwgdHJhY2tpbmdCb2FyZCwgaXNDb29yZGluYXRlVGFrZW4sIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYXJlU2hpcHNTdW5rLCBwbGFjZUZsb2F0IH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAoX25hbWUpID0+IHtcbiAgY29uc3QgbmFtZSA9IF9uYW1lO1xuXG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBcbiAgY29uc3QgZmxvYXQgPSBbXG4gICAgU2hpcCgnQ2FycmllcicsIDUpLFxuICAgIFNoaXAoJ0JhdHRsZXNoaXAnLCA0KSxcbiAgICBTaGlwKCdDcnVpc2VyJywgMyksXG4gICAgU2hpcCgnU3VibWFyaW5lJywgMyksXG4gICAgU2hpcCgnRGVzdHJveWVyJywgMilcbiAgXTtcblxuICBjb25zdCBwbGFjZWRTaGlwcyA9IDA7XG5cbiAgZnVuY3Rpb24gaXNGbG9hdFN1bmsoKSB7XG4gICAgcmV0dXJuIGZsb2F0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpID09PSB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlTXlGbG9hdCgpIHtcbiAgICBjb25zdCBteUZsb2F0ID0gW107XG4gICAgdGhpcy5mbG9hdC5mb3JFYWNoKHNoaXAgPT4gbXlGbG9hdC5wdXNoKHNoaXApKTtcblxuICAgIHRoaXMuZ2FtZWJvYXJkLnBsYWNlRmxvYXQobXlGbG9hdCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQbGFjZWRTaGlwKCkge1xuICAgIHRoaXMucGxhY2VkU2hpcHMgKz0gMTtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIGdhbWVib2FyZCwgZmxvYXQsIHBsYWNlZFNoaXBzLCBpc0Zsb2F0U3VuaywgcGxhY2VNeUZsb2F0LCBhZGRQbGFjZWRTaGlwIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjb25zdCBTaGlwID0gKF9uYW1lLCBfbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBfbmFtZTtcbiAgY29uc3QgbGVuZ3RoID0gX2xlbmd0aDtcbiAgY29uc3QgaGl0cyA9IDA7XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgbGVuZ3RoLCBoaXRzLCBpc1N1bmssIGhpdCB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZUNvbnRyb2xsZXJcIjtcblxuR2FtZSgpLnN0YXJ0KCk7Il0sIm5hbWVzIjpbIkRpc3BsYXkiLCJTSVpFIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxlZnRCb2FyZCIsImdldEVsZW1lbnRCeUlkIiwicmlnaHRCb2FyZCIsIm15U3RhdHMiLCJvcHBvbmVudFN0YXRzIiwib3ZlcmxheSIsIndpbm5lciIsImJ0blBsYXlBZ2FpbiIsInZlcnRpY2FsUGxhY2VtZW50IiwiZHJhd0JvYXJkcyIsImkiLCJqIiwibGVmdENlbGwiLCJjcmVhdGVFbGVtZW50IiwicmlnaHRDZWxsIiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsInJvdyIsImNvbCIsImFwcGVuZENoaWxkIiwiY2xlYXJCb2FyZHMiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJyZXNldCIsImlubmVySFRNTCIsInVwZGF0ZUNlbGwiLCJjZWxsIiwiZGl2IiwiY2VsbERpdiIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwidXBkYXRlU3RhdHMiLCJoaXQiLCJzdGF0c0RpdiIsImdldFBsYWNlaG9sZGVyIiwiYm9hcmQiLCJsZW5ndGgiLCJpc1ZlcnRpY2FsIiwiY2VsbHMiLCJjb25jYXQiLCJwdXNoIiwiZHJhd1NoaXAiLCJmb3JFYWNoIiwiaGlkZVNoaXAiLCJzd2l0Y2hBeGlzIiwic2hvd0dhbWVPdmVyU2NyZWVuIiwid2lubmVyTmFtZSIsImRpc3BsYXkiLCJhZGRDZWxsTGlzdGVuZXJzIiwib3Bwb25lbnQiLCJwbGF5ZXIiLCJoYW5kbGVUdXJuIiwiY2hpbGRyZW4iLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwYXJzZUludCIsInRhcmdldCIsImdhbWVib2FyZCIsImlzQ29vcmRpbmF0ZVRha2VuIiwicmFuZG9tUm93IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tQ29sIiwiYWRkUmVzdGFydExpc3RlbmVyIiwicmVzdGFydEhhbmRsZXIiLCJhZGRTaGlwUGxhY2VtZW50TGlzdGVuZXJzIiwicGxheUhhbmRsZXIiLCJwbGFjZWRTaGlwcyIsInBsYWNlU2hpcCIsImFkZFBsYWNlZFNoaXAiLCJuYW1lIiwiX3VudXNlZCIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsIlBsYXllciIsIkdhbWUiLCJuZXdUdXJuIiwiYXR0YWNrZXIiLCJkZWZlbmRlciIsImNvbHVtbiIsImRlZmVuZGVyU3RhdHMiLCJyZWNlaXZlQXR0YWNrIiwiaXNGbG9hdFN1bmsiLCJwbGF5IiwicGxhY2VNeUZsb2F0Iiwic3RhcnQiLCJyZXN0YXJ0Iiwia2V5IiwiR2FtZWJvYXJkIiwiZmlsbCIsInRyYWNraW5nQm9hcmQiLCJpc092ZXJsYXBwaW5nIiwic2hpcCIsImlzT3V0T2ZCb3VuZHMiLCJFcnJvciIsImFyZVNoaXBzU3VuayIsImV2ZXJ5IiwiZWxlbWVudCIsInBsYWNlRmxvYXQiLCJzaGlwcyIsIlNoaXAiLCJfbmFtZSIsImZsb2F0IiwiaXNTdW5rIiwibXlGbG9hdCIsIl9sZW5ndGgiLCJoaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==