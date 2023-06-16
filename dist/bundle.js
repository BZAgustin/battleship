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
var Display = function Display() {
  var SIZE = 10;
  var leftBoard = document.getElementById('left-board');
  var rightBoard = document.getElementById('right-board');
  var myStats = document.getElementById('left-stats');
  var opponentStats = document.getElementById('right-stats');
  var overlay = document.querySelector('.overlay-container');
  var winner = document.getElementById('winner');
  var btnPlayAgain = document.getElementById('btn-play-again');
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
  function addShipPlacementListeners(player) {
    var children = Array.from(leftBoard.childNodes);
    children.forEach(function (cell) {
      cell.addEventListener('click', function (e) {
        var row = parseInt(e.target.dataset.row, 10);
        var col = parseInt(e.target.dataset.col, 10);
        if (player.placedShips === 5) {
          return null;
        }
        try {
          player.gameboard.placeShip(player["float"][player.placedShips], row, col);
          player.addPlacedShip();
        } catch (_unused) {
          myStats.innerHTML = 'Invalid placement';
          return null;
        }
        return null;
      });
    });
  }
  return {
    myStats: myStats,
    opponentStats: opponentStats,
    drawBoards: drawBoards,
    clearBoards: clearBoards,
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
    display.drawBoards();
    display.addShipPlacementListeners(player);
    display.addCellListeners(opponent, player, newTurn);
  }
  function restart() {
    display.reset();
    player = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])('Player');
    opponent = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])('Computer');
    play();
  }
  display.addRestartListener(restart);
  return {
    play: play,
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
  var _float = [(0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(5), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(4), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(2)];
  var placedShips = 0;
  function isFloatSunk() {
    return _float.every(function (ship) {
      return ship.isSunk() === true;
    });
  }
  function placeMyFloat() {
    var myFloat = [];
    _float.forEach(function (ship) {
      return myFloat.push(ship);
    });
    gameboard.placeFloat(myFloat);
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
/* eslint-disable no-unused-vars */

var Ship = function Ship(_length) {
  var length = _length;
  var hits = 0;
  function isSunk() {
    return this.hits === this.length;
  }
  function hit() {
    this.hits += 1;
  }
  return {
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

(0,_gameController__WEBPACK_IMPORTED_MODULE_0__["default"])().play();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNJLElBQUksS0FBSyxJQUFJLENBQUNwQixNQUFNO0VBQ2xDO0VBRUEsU0FBU2hELEdBQUdBLENBQUEsRUFBRztJQUNiLElBQUksQ0FBQ29FLElBQUksSUFBSSxDQUFDO0VBQ2hCO0VBRUEsT0FBTztJQUFFcEIsTUFBTSxFQUFOQSxNQUFNO0lBQUVvQixJQUFJLEVBQUpBLElBQUk7SUFBRUosTUFBTSxFQUFOQSxNQUFNO0lBQUVoRSxHQUFHLEVBQUhBO0VBQUksQ0FBQztBQUN0QyxDQUFDO0FBRUQsaUVBQWU2RCxJQUFJOzs7Ozs7VUNqQm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFFcEMxQiwyREFBSSxDQUFDLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBEaXNwbGF5ID0gKCkgPT4ge1xuICBjb25zdCBTSVpFID0gMTA7XG4gIGNvbnN0IGxlZnRCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0LWJvYXJkJyk7XG4gIGNvbnN0IHJpZ2h0Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtYm9hcmQnKTtcbiAgY29uc3QgbXlTdGF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0LXN0YXRzJyk7XG4gIGNvbnN0IG9wcG9uZW50U3RhdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtc3RhdHMnKTtcblxuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXktY29udGFpbmVyJyk7XG4gIGNvbnN0IHdpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5uZXInKTtcbiAgY29uc3QgYnRuUGxheUFnYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1wbGF5LWFnYWluJyk7XG5cbiAgZnVuY3Rpb24gZHJhd0JvYXJkcygpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgU0laRTsgaSArPSAxKSB7XG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgU0laRTsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGxlZnRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGxlZnRDZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgcmlnaHRDZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcblxuICAgICAgICBsZWZ0Q2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIGxlZnRDZWxsLmRhdGFzZXQuY29sID0gajtcblxuICAgICAgICByaWdodENlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICByaWdodENlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICBcbiAgICAgICAgbGVmdEJvYXJkLmFwcGVuZENoaWxkKGxlZnRDZWxsKTtcbiAgICAgICAgcmlnaHRCb2FyZC5hcHBlbmRDaGlsZChyaWdodENlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyQm9hcmRzKCkge1xuICAgIHdoaWxlKGxlZnRCb2FyZC5maXJzdENoaWxkICYmIHJpZ2h0Qm9hcmQuZmlyc3RDaGlsZCkge1xuICAgICAgbGVmdEJvYXJkLnJlbW92ZUNoaWxkKGxlZnRCb2FyZC5maXJzdENoaWxkKTtcbiAgICAgIHJpZ2h0Qm9hcmQucmVtb3ZlQ2hpbGQocmlnaHRCb2FyZC5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBjbGVhckJvYXJkcygpO1xuICAgIG15U3RhdHMuaW5uZXJIVE1MID0gJyc7XG4gICAgb3Bwb25lbnRTdGF0cy5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNlbGwoY2VsbCwgZGl2KSB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRpdjtcblxuICAgIGlmKGNlbGwgIT09IG51bGwpIHtcbiAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3BpbmsnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmF5JztcbiAgICB9XG5cbiAgICBjZWxsRGl2LmlubmVySFRNTCA9ICfil48nO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU3RhdHMoaGl0LCBkaXYpIHtcbiAgICBjb25zdCBzdGF0c0RpdiA9IGRpdjtcblxuICAgIGlmKGhpdCkge1xuICAgICAgc3RhdHNEaXYuaW5uZXJIVE1MID0gYEl0J3MgYSBoaXQhYDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHNEaXYuaW5uZXJIVE1MID0gYE5vIGhpdGA7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0dhbWVPdmVyU2NyZWVuKHdpbm5lck5hbWUpIHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgd2lubmVyLmlubmVySFRNTCA9IGAke3dpbm5lck5hbWV9IGlzIHRoZSB3aW5uZXIhYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgaGFuZGxlVHVybikge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShyaWdodEJvYXJkLmNoaWxkTm9kZXMpO1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKG9wcG9uZW50LmdhbWVib2FyZC5pc0Nvb3JkaW5hdGVUYWtlbihyb3csIGNvbCkpIHtcbiAgICAgICAgICBvcHBvbmVudFN0YXRzLmlubmVySFRNTCA9ICdDb29yZGluYXRlIGFscmVhZHkgaGl0JztcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBcblxuICAgICAgICB1cGRhdGVDZWxsKG9wcG9uZW50LmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0sIGUudGFyZ2V0KTtcbiAgICAgICAgaGFuZGxlVHVybihwbGF5ZXIsIG9wcG9uZW50LCByb3csIGNvbCwgb3Bwb25lbnRTdGF0cyk7XG5cbiAgICAgICAgbGV0IHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHJhbmRvbUNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgICB3aGlsZShwbGF5ZXIuZ2FtZWJvYXJkLmlzQ29vcmRpbmF0ZVRha2VuKHJhbmRvbVJvdywgcmFuZG9tQ29sKSkge1xuICAgICAgICAgIHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDZWxsKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcmFuZG9tUm93XVtyYW5kb21Db2xdLCBsZWZ0Qm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyYW5kb21Sb3d9XCJdW2RhdGEtY29sPVwiJHtyYW5kb21Db2x9XCJdYCkpO1xuICAgICAgICBoYW5kbGVUdXJuKG9wcG9uZW50LCBwbGF5ZXIsIHJhbmRvbVJvdywgcmFuZG9tQ29sLCBteVN0YXRzKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkUmVzdGFydExpc3RlbmVyKHJlc3RhcnRIYW5kbGVyKSB7XG4gICAgYnRuUGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcmVzdGFydEhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMocGxheWVyKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGxlZnRCb2FyZC5jaGlsZE5vZGVzKTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG5cbiAgICAgICAgaWYocGxheWVyLnBsYWNlZFNoaXBzID09PSA1KSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHBsYXllci5mbG9hdFtwbGF5ZXIucGxhY2VkU2hpcHNdLCByb3csIGNvbCk7XG4gICAgICAgICAgcGxheWVyLmFkZFBsYWNlZFNoaXAoKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgbXlTdGF0cy5pbm5lckhUTUwgPSAnSW52YWxpZCBwbGFjZW1lbnQnO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgbXlTdGF0cywgb3Bwb25lbnRTdGF0cywgZHJhd0JvYXJkcywgY2xlYXJCb2FyZHMsIHJlc2V0LCB1cGRhdGVTdGF0cywgc2hvd0dhbWVPdmVyU2NyZWVuLCBhZGRDZWxsTGlzdGVuZXJzLCBhZGRSZXN0YXJ0TGlzdGVuZXIsIGFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcGxheTsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiXG5pbXBvcnQgRGlzcGxheSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5cbmNvbnN0IEdhbWUgPSAoKSA9PiB7XG4gIGxldCBwbGF5ZXIgPSBQbGF5ZXIoJ1BsYXllcicpO1xuICBsZXQgb3Bwb25lbnQgPSBQbGF5ZXIoJ0NvbXB1dGVyJyk7XG4gIGNvbnN0IGRpc3BsYXkgPSBEaXNwbGF5KCk7XG5cbiAgZnVuY3Rpb24gbmV3VHVybihhdHRhY2tlciwgZGVmZW5kZXIsIHJvdywgY29sdW1uLCBkZWZlbmRlclN0YXRzKSB7XG4gICAgZGlzcGxheS51cGRhdGVTdGF0cyhkZWZlbmRlci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbiksIGRlZmVuZGVyU3RhdHMpO1xuICAgIGlmKGRlZmVuZGVyLmlzRmxvYXRTdW5rKCkpIHtcbiAgICAgIGRpc3BsYXkuc2hvd0dhbWVPdmVyU2NyZWVuKGF0dGFja2VyLm5hbWUpO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICBvcHBvbmVudC5wbGFjZU15RmxvYXQoKTtcbiAgICBkaXNwbGF5LmRyYXdCb2FyZHMoKTtcbiAgICBkaXNwbGF5LmFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMocGxheWVyKTtcbiAgICBkaXNwbGF5LmFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgbmV3VHVybik7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHJlc3RhcnQoKSB7XG4gICAgZGlzcGxheS5yZXNldCgpO1xuICAgIHBsYXllciA9IFBsYXllcignUGxheWVyJyk7XG4gICAgb3Bwb25lbnQgPSBQbGF5ZXIoJ0NvbXB1dGVyJyk7XG4gICAgcGxheSgpO1xuICB9XG5cbiAgZGlzcGxheS5hZGRSZXN0YXJ0TGlzdGVuZXIocmVzdGFydCk7XG4gIFxuICByZXR1cm4geyBwbGF5LCBuZXdUdXJuLCByZXN0YXJ0IH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJcbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCBcbiAgKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICBjb25zdCB0cmFja2luZ0JvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgXG4gICgpID0+IEFycmF5KDEwKS5maWxsKGZhbHNlKSk7XG5cbiAgZnVuY3Rpb24gaXNDb29yZGluYXRlVGFrZW4ocm93LCBjb2x1bW4pIHtcbiAgICByZXR1cm4gdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl07XG4gIH1cblxuICBmdW5jdGlvbiBpc092ZXJsYXBwaW5nKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYoaXNWZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBpZihib2FyZFtyb3ddW2NvbHVtbitpXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBpZihib2FyZFtyb3craV1bY29sdW1uXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPdXRPZkJvdW5kcyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmKGlzVmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gc2hpcC5sZW5ndGggKyBjb2x1bW4gPiAxMDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHNoaXAubGVuZ3RoICsgcm93ID4gMTA7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZihpc091dE9mQm91bmRzKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGlwIGxlbmd0aCBleGNlZWRzIGJvdW5kYXJpZXMnKTtcbiAgICB9IGVsc2UgaWYoaXNPdmVybGFwcGluZyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignT3ZlcmxhcHBpbmcgb3RoZXIgc2hpcCcpO1xuICAgIH1cblxuICAgIGlmKGlzVmVydGljYWwgPT09IGZhbHNlKSB7ICBcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBib2FyZFtyb3ddW2NvbHVtbitpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBib2FyZFtyb3craV1bY29sdW1uXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGlmKHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dID09PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nvb3JkaW5hdGUgYWxyZWFkeSBoaXQnKTtcbiAgICB9XG5cbiAgICBpZihib2FyZFtyb3ddW2NvbHVtbl0gIT09IG51bGwpIHtcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IG51bGw7XG4gICAgICB0cmFja2luZ0JvYXJkW3Jvd11bY29sdW1uXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0cmFja2luZ0JvYXJkW3Jvd11bY29sdW1uXSA9IHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gYXJlU2hpcHNTdW5rKCkge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSs9MSkge1xuICAgICAgaWYoIWJvYXJkW2ldLmV2ZXJ5KGVsZW1lbnQgPT4gZWxlbWVudCA9PT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlRmxvYXQoc2hpcHMpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKz0xKSB7XG4gICAgICBwbGFjZVNoaXAoc2hpcHNbaV0sIDAsIGksIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGJvYXJkLCB0cmFja2luZ0JvYXJkLCBpc0Nvb3JkaW5hdGVUYWtlbiwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhcmVTaGlwc1N1bmssIHBsYWNlRmxvYXQgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IFBsYXllciA9IChfbmFtZSkgPT4ge1xuICBjb25zdCBuYW1lID0gX25hbWU7XG5cbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIFxuICBjb25zdCBmbG9hdCA9IFtcbiAgICBTaGlwKDUpLFxuICAgIFNoaXAoNCksXG4gICAgU2hpcCgzKSxcbiAgICBTaGlwKDMpLFxuICAgIFNoaXAoMilcbiAgXTtcblxuICBjb25zdCBwbGFjZWRTaGlwcyA9IDA7XG5cbiAgZnVuY3Rpb24gaXNGbG9hdFN1bmsoKSB7XG4gICAgcmV0dXJuIGZsb2F0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpID09PSB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlTXlGbG9hdCgpIHtcbiAgICBjb25zdCBteUZsb2F0ID0gW107XG4gICAgZmxvYXQuZm9yRWFjaChzaGlwID0+IG15RmxvYXQucHVzaChzaGlwKSk7XG5cbiAgICBnYW1lYm9hcmQucGxhY2VGbG9hdChteUZsb2F0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBsYWNlZFNoaXAoKSB7XG4gICAgdGhpcy5wbGFjZWRTaGlwcyArPSAxO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgZ2FtZWJvYXJkLCBmbG9hdCwgcGxhY2VkU2hpcHMsIGlzRmxvYXRTdW5rLCBwbGFjZU15RmxvYXQsIGFkZFBsYWNlZFNoaXAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmNvbnN0IFNoaXAgPSAoX2xlbmd0aCkgPT4ge1xuICBjb25zdCBsZW5ndGggPSBfbGVuZ3RoO1xuICBjb25zdCBoaXRzID0gMDtcblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICByZXR1cm4geyBsZW5ndGgsIGhpdHMsIGlzU3VuaywgaGl0IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lQ29udHJvbGxlclwiO1xuXG5HYW1lKCkucGxheSgpOyJdLCJuYW1lcyI6WyJEaXNwbGF5IiwiU0laRSIsImxlZnRCb2FyZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyaWdodEJvYXJkIiwibXlTdGF0cyIsIm9wcG9uZW50U3RhdHMiLCJvdmVybGF5IiwicXVlcnlTZWxlY3RvciIsIndpbm5lciIsImJ0blBsYXlBZ2FpbiIsImRyYXdCb2FyZHMiLCJpIiwiaiIsImxlZnRDZWxsIiwiY3JlYXRlRWxlbWVudCIsInJpZ2h0Q2VsbCIsImNsYXNzTmFtZSIsImRhdGFzZXQiLCJyb3ciLCJjb2wiLCJhcHBlbmRDaGlsZCIsImNsZWFyQm9hcmRzIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicmVzZXQiLCJpbm5lckhUTUwiLCJ1cGRhdGVDZWxsIiwiY2VsbCIsImRpdiIsImNlbGxEaXYiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInVwZGF0ZVN0YXRzIiwiaGl0Iiwic3RhdHNEaXYiLCJzaG93R2FtZU92ZXJTY3JlZW4iLCJ3aW5uZXJOYW1lIiwiZGlzcGxheSIsImNvbmNhdCIsImFkZENlbGxMaXN0ZW5lcnMiLCJvcHBvbmVudCIsInBsYXllciIsImhhbmRsZVR1cm4iLCJjaGlsZHJlbiIsIkFycmF5IiwiZnJvbSIsImNoaWxkTm9kZXMiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwYXJzZUludCIsInRhcmdldCIsImdhbWVib2FyZCIsImlzQ29vcmRpbmF0ZVRha2VuIiwiYm9hcmQiLCJyYW5kb21Sb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21Db2wiLCJhZGRSZXN0YXJ0TGlzdGVuZXIiLCJyZXN0YXJ0SGFuZGxlciIsImFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMiLCJwbGFjZWRTaGlwcyIsInBsYWNlU2hpcCIsImFkZFBsYWNlZFNoaXAiLCJfdW51c2VkIiwiUGxheWVyIiwiR2FtZSIsIm5ld1R1cm4iLCJhdHRhY2tlciIsImRlZmVuZGVyIiwiY29sdW1uIiwiZGVmZW5kZXJTdGF0cyIsInJlY2VpdmVBdHRhY2siLCJpc0Zsb2F0U3VuayIsIm5hbWUiLCJwbGF5IiwicGxhY2VNeUZsb2F0IiwicmVzdGFydCIsIkdhbWVib2FyZCIsImxlbmd0aCIsImZpbGwiLCJ0cmFja2luZ0JvYXJkIiwiaXNPdmVybGFwcGluZyIsInNoaXAiLCJpc1ZlcnRpY2FsIiwiaXNPdXRPZkJvdW5kcyIsIkVycm9yIiwiYXJlU2hpcHNTdW5rIiwiZXZlcnkiLCJlbGVtZW50IiwicGxhY2VGbG9hdCIsInNoaXBzIiwiU2hpcCIsIl9uYW1lIiwiZmxvYXQiLCJpc1N1bmsiLCJteUZsb2F0IiwicHVzaCIsIl9sZW5ndGgiLCJoaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==