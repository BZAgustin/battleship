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
    var cells = document.getElementById('right-board');
    var children = Array.from(cells.childNodes);
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
  return {
    myStats: myStats,
    opponentStats: opponentStats,
    drawBoards: drawBoards,
    clearBoards: clearBoards,
    reset: reset,
    updateStats: updateStats,
    showGameOverScreen: showGameOverScreen,
    addCellListeners: addCellListeners,
    addRestartListener: addRestartListener
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
    player.placeMyFloat();
    opponent.placeMyFloat();
    display.drawBoards();
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
  return {
    name: name,
    gameboard: gameboard,
    "float": _float,
    isFloatSunk: isFloatSunk,
    placeMyFloat: placeMyFloat
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVNKLE1BQU1BLENBQUEsRUFBRztJQUNoQixPQUFPLElBQUksQ0FBQ0ksSUFBSSxLQUFLLElBQUksQ0FBQ3JCLE1BQU07RUFDbEM7RUFFQSxTQUFTNUMsR0FBR0EsQ0FBQSxFQUFHO0lBQ2IsSUFBSSxDQUFDaUUsSUFBSSxJQUFJLENBQUM7RUFDaEI7RUFFQSxPQUFPO0lBQUVyQixNQUFNLEVBQU5BLE1BQU07SUFBRXFCLElBQUksRUFBSkEsSUFBSTtJQUFFSixNQUFNLEVBQU5BLE1BQU07SUFBRTdELEdBQUcsRUFBSEE7RUFBSSxDQUFDO0FBQ3RDLENBQUM7QUFFRCxpRUFBZTBELElBQUk7Ozs7OztVQ2pCbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05vQztBQUVwQzNCLDJEQUFJLENBQUMsQ0FBQyxDQUFDUyxJQUFJLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpc3BsYXkgPSAoKSA9PiB7XG4gIGNvbnN0IFNJWkUgPSAxMDtcbiAgY29uc3QgbGVmdEJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZnQtYm9hcmQnKTtcbiAgY29uc3QgcmlnaHRCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWdodC1ib2FyZCcpO1xuICBjb25zdCBteVN0YXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZnQtc3RhdHMnKTtcbiAgY29uc3Qgb3Bwb25lbnRTdGF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWdodC1zdGF0cycpO1xuXG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheS1jb250YWluZXInKTtcbiAgY29uc3Qgd2lubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbm5lcicpO1xuICBjb25zdCBidG5QbGF5QWdhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXBsYXktYWdhaW4nKTtcblxuICBmdW5jdGlvbiBkcmF3Qm9hcmRzKCkge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBTSVpFOyBpICs9IDEpIHtcbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBTSVpFOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgbGVmdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcmlnaHRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgbGVmdENlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuICAgICAgICByaWdodENlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuXG4gICAgICAgIGxlZnRDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgbGVmdENlbGwuZGF0YXNldC5jb2wgPSBqO1xuXG4gICAgICAgIHJpZ2h0Q2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIHJpZ2h0Q2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIFxuICAgICAgICBsZWZ0Qm9hcmQuYXBwZW5kQ2hpbGQobGVmdENlbGwpO1xuICAgICAgICByaWdodEJvYXJkLmFwcGVuZENoaWxkKHJpZ2h0Q2VsbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJCb2FyZHMoKSB7XG4gICAgd2hpbGUobGVmdEJvYXJkLmZpcnN0Q2hpbGQgJiYgcmlnaHRCb2FyZC5maXJzdENoaWxkKSB7XG4gICAgICBsZWZ0Qm9hcmQucmVtb3ZlQ2hpbGQobGVmdEJvYXJkLmZpcnN0Q2hpbGQpO1xuICAgICAgcmlnaHRCb2FyZC5yZW1vdmVDaGlsZChyaWdodEJvYXJkLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGNsZWFyQm9hcmRzKCk7XG4gICAgbXlTdGF0cy5pbm5lckhUTUwgPSAnJztcbiAgICBvcHBvbmVudFN0YXRzLmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2VsbChjZWxsLCBkaXYpIHtcbiAgICBjb25zdCBjZWxsRGl2ID0gZGl2O1xuXG4gICAgaWYoY2VsbCAhPT0gbnVsbCkge1xuICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncGluayc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyYXknO1xuICAgIH1cblxuICAgIGNlbGxEaXYuaW5uZXJIVE1MID0gJ+KXjyc7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTdGF0cyhoaXQsIGRpdikge1xuICAgIGNvbnN0IHN0YXRzRGl2ID0gZGl2O1xuXG4gICAgaWYoaGl0KSB7XG4gICAgICBzdGF0c0Rpdi5pbm5lckhUTUwgPSBgSXQncyBhIGhpdCFgO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0c0Rpdi5pbm5lckhUTUwgPSBgTm8gaGl0YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93R2FtZU92ZXJTY3JlZW4od2lubmVyTmFtZSkge1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB3aW5uZXIuaW5uZXJIVE1MID0gYCR7d2lubmVyTmFtZX0gaXMgdGhlIHdpbm5lciFgO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2VsbExpc3RlbmVycyhvcHBvbmVudCwgcGxheWVyLCBoYW5kbGVUdXJuKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtYm9hcmQnKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LmZyb20oY2VsbHMuY2hpbGROb2Rlcyk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG5cbiAgICAgICAgaWYob3Bwb25lbnQuZ2FtZWJvYXJkLmlzQ29vcmRpbmF0ZVRha2VuKHJvdywgY29sKSkge1xuICAgICAgICAgIG9wcG9uZW50U3RhdHMuaW5uZXJIVE1MID0gJ0Nvb3JkaW5hdGUgYWxyZWFkeSBoaXQnO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IFxuXG4gICAgICAgIHVwZGF0ZUNlbGwob3Bwb25lbnQuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSwgZS50YXJnZXQpO1xuICAgICAgICBoYW5kbGVUdXJuKHBsYXllciwgb3Bwb25lbnQsIHJvdywgY29sLCBvcHBvbmVudFN0YXRzKTtcblxuICAgICAgICBsZXQgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBsZXQgcmFuZG9tQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICAgIHdoaWxlKHBsYXllci5nYW1lYm9hcmQuaXNDb29yZGluYXRlVGFrZW4ocmFuZG9tUm93LCByYW5kb21Db2wpKSB7XG4gICAgICAgICAgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgIHJhbmRvbUNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNlbGwocGxheWVyLmdhbWVib2FyZC5ib2FyZFtyYW5kb21Sb3ddW3JhbmRvbUNvbF0sIGxlZnRCb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3JhbmRvbVJvd31cIl1bZGF0YS1jb2w9XCIke3JhbmRvbUNvbH1cIl1gKSk7XG4gICAgICAgIGhhbmRsZVR1cm4ob3Bwb25lbnQsIHBsYXllciwgcmFuZG9tUm93LCByYW5kb21Db2wsIG15U3RhdHMpO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRSZXN0YXJ0TGlzdGVuZXIocmVzdGFydEhhbmRsZXIpIHtcbiAgICBidG5QbGF5QWdhaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXN0YXJ0SGFuZGxlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgbXlTdGF0cywgb3Bwb25lbnRTdGF0cywgZHJhd0JvYXJkcywgY2xlYXJCb2FyZHMsIHJlc2V0LCB1cGRhdGVTdGF0cywgc2hvd0dhbWVPdmVyU2NyZWVuLCBhZGRDZWxsTGlzdGVuZXJzLCBhZGRSZXN0YXJ0TGlzdGVuZXIgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcGxheTsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiXG5pbXBvcnQgRGlzcGxheSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5cbmNvbnN0IEdhbWUgPSAoKSA9PiB7XG4gIGxldCBwbGF5ZXIgPSBQbGF5ZXIoJ1BsYXllcicpO1xuICBsZXQgb3Bwb25lbnQgPSBQbGF5ZXIoJ0NvbXB1dGVyJyk7XG4gIGNvbnN0IGRpc3BsYXkgPSBEaXNwbGF5KCk7XG5cbiAgZnVuY3Rpb24gbmV3VHVybihhdHRhY2tlciwgZGVmZW5kZXIsIHJvdywgY29sdW1uLCBkZWZlbmRlclN0YXRzKSB7XG4gICAgZGlzcGxheS51cGRhdGVTdGF0cyhkZWZlbmRlci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbiksIGRlZmVuZGVyU3RhdHMpO1xuICAgIGlmKGRlZmVuZGVyLmlzRmxvYXRTdW5rKCkpIHtcbiAgICAgIGRpc3BsYXkuc2hvd0dhbWVPdmVyU2NyZWVuKGF0dGFja2VyLm5hbWUpO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICBwbGF5ZXIucGxhY2VNeUZsb2F0KCk7XG4gICAgb3Bwb25lbnQucGxhY2VNeUZsb2F0KCk7XG4gICAgZGlzcGxheS5kcmF3Qm9hcmRzKCk7XG4gICAgZGlzcGxheS5hZGRDZWxsTGlzdGVuZXJzKG9wcG9uZW50LCBwbGF5ZXIsIG5ld1R1cm4pO1xuICB9XG4gIFxuICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIGRpc3BsYXkucmVzZXQoKTtcbiAgICBwbGF5ZXIgPSBQbGF5ZXIoJ1BsYXllcicpO1xuICAgIG9wcG9uZW50ID0gUGxheWVyKCdDb21wdXRlcicpO1xuICAgIHBsYXkoKTtcbiAgfVxuXG4gIGRpc3BsYXkuYWRkUmVzdGFydExpc3RlbmVyKHJlc3RhcnQpO1xuICBcbiAgcmV0dXJuIHsgcGxheSwgbmV3VHVybiwgcmVzdGFydCB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgXG4gICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgY29uc3QgdHJhY2tpbmdCb2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIFxuICAoKSA9PiBBcnJheSgxMCkuZmlsbChmYWxzZSkpO1xuXG4gIGZ1bmN0aW9uIGlzQ29vcmRpbmF0ZVRha2VuKHJvdywgY29sdW1uKSB7XG4gICAgcmV0dXJuIHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPdmVybGFwcGluZyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmKGlzVmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgaWYoYm9hcmRbcm93XVtjb2x1bW4raV0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgaWYoYm9hcmRbcm93K2ldW2NvbHVtbl0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHNoaXAubGVuZ3RoICsgY29sdW1uID4gMTA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzaGlwLmxlbmd0aCArIHJvdyA+IDEwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYoaXNPdXRPZkJvdW5kcyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hpcCBsZW5ndGggZXhjZWVkcyBib3VuZGFyaWVzJyk7XG4gICAgfSBlbHNlIGlmKGlzT3ZlcmxhcHBpbmcoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJsYXBwaW5nIG90aGVyIHNoaXAnKTtcbiAgICB9XG5cbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkgeyAgXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgYm9hcmRbcm93XVtjb2x1bW4raV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgYm9hcmRbcm93K2ldW2NvbHVtbl0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBpZih0cmFja2luZ0JvYXJkW3Jvd11bY29sdW1uXSA9PT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb29yZGluYXRlIGFscmVhZHkgaGl0Jyk7XG4gICAgfVxuXG4gICAgaWYoYm9hcmRbcm93XVtjb2x1bW5dICE9PSBudWxsKSB7XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KCk7XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBudWxsO1xuICAgICAgdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFyZVNoaXBzU3VuaygpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrPTEpIHtcbiAgICAgIGlmKCFib2FyZFtpXS5ldmVyeShlbGVtZW50ID0+IGVsZW1lbnQgPT09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZUZsb2F0KHNoaXBzKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSs9MSkge1xuICAgICAgcGxhY2VTaGlwKHNoaXBzW2ldLCAwLCBpLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBib2FyZCwgdHJhY2tpbmdCb2FyZCwgaXNDb29yZGluYXRlVGFrZW4sIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYXJlU2hpcHNTdW5rLCBwbGFjZUZsb2F0IH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAoX25hbWUpID0+IHtcbiAgY29uc3QgbmFtZSA9IF9uYW1lO1xuXG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBcbiAgY29uc3QgZmxvYXQgPSBbXG4gICAgU2hpcCg1KSxcbiAgICBTaGlwKDQpLFxuICAgIFNoaXAoMyksXG4gICAgU2hpcCgzKSxcbiAgICBTaGlwKDIpXG4gIF07XG5cbiAgZnVuY3Rpb24gaXNGbG9hdFN1bmsoKSB7XG4gICAgcmV0dXJuIGZsb2F0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpID09PSB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlTXlGbG9hdCgpIHtcbiAgICBjb25zdCBteUZsb2F0ID0gW107XG4gICAgZmxvYXQuZm9yRWFjaChzaGlwID0+IG15RmxvYXQucHVzaChzaGlwKSk7XG5cbiAgICBnYW1lYm9hcmQucGxhY2VGbG9hdChteUZsb2F0KTtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIGdhbWVib2FyZCwgZmxvYXQsIGlzRmxvYXRTdW5rLCBwbGFjZU15RmxvYXQgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmNvbnN0IFNoaXAgPSAoX2xlbmd0aCkgPT4ge1xuICBjb25zdCBsZW5ndGggPSBfbGVuZ3RoO1xuICBjb25zdCBoaXRzID0gMDtcblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICByZXR1cm4geyBsZW5ndGgsIGhpdHMsIGlzU3VuaywgaGl0IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lQ29udHJvbGxlclwiO1xuXG5HYW1lKCkucGxheSgpOyJdLCJuYW1lcyI6WyJEaXNwbGF5IiwiU0laRSIsImxlZnRCb2FyZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyaWdodEJvYXJkIiwibXlTdGF0cyIsIm9wcG9uZW50U3RhdHMiLCJvdmVybGF5IiwicXVlcnlTZWxlY3RvciIsIndpbm5lciIsImJ0blBsYXlBZ2FpbiIsImRyYXdCb2FyZHMiLCJpIiwiaiIsImxlZnRDZWxsIiwiY3JlYXRlRWxlbWVudCIsInJpZ2h0Q2VsbCIsImNsYXNzTmFtZSIsImRhdGFzZXQiLCJyb3ciLCJjb2wiLCJhcHBlbmRDaGlsZCIsImNsZWFyQm9hcmRzIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicmVzZXQiLCJpbm5lckhUTUwiLCJ1cGRhdGVDZWxsIiwiY2VsbCIsImRpdiIsImNlbGxEaXYiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInVwZGF0ZVN0YXRzIiwiaGl0Iiwic3RhdHNEaXYiLCJzaG93R2FtZU92ZXJTY3JlZW4iLCJ3aW5uZXJOYW1lIiwiZGlzcGxheSIsImNvbmNhdCIsImFkZENlbGxMaXN0ZW5lcnMiLCJvcHBvbmVudCIsInBsYXllciIsImhhbmRsZVR1cm4iLCJjZWxscyIsImNoaWxkcmVuIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInBhcnNlSW50IiwidGFyZ2V0IiwiZ2FtZWJvYXJkIiwiaXNDb29yZGluYXRlVGFrZW4iLCJib2FyZCIsInJhbmRvbVJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbUNvbCIsImFkZFJlc3RhcnRMaXN0ZW5lciIsInJlc3RhcnRIYW5kbGVyIiwiUGxheWVyIiwiR2FtZSIsIm5ld1R1cm4iLCJhdHRhY2tlciIsImRlZmVuZGVyIiwiY29sdW1uIiwiZGVmZW5kZXJTdGF0cyIsInJlY2VpdmVBdHRhY2siLCJpc0Zsb2F0U3VuayIsIm5hbWUiLCJwbGF5IiwicGxhY2VNeUZsb2F0IiwicmVzdGFydCIsIkdhbWVib2FyZCIsImxlbmd0aCIsImZpbGwiLCJ0cmFja2luZ0JvYXJkIiwiaXNPdmVybGFwcGluZyIsInNoaXAiLCJpc1ZlcnRpY2FsIiwiaXNPdXRPZkJvdW5kcyIsInBsYWNlU2hpcCIsIkVycm9yIiwiYXJlU2hpcHNTdW5rIiwiZXZlcnkiLCJlbGVtZW50IiwicGxhY2VGbG9hdCIsInNoaXBzIiwiU2hpcCIsIl9uYW1lIiwiZmxvYXQiLCJpc1N1bmsiLCJteUZsb2F0IiwicHVzaCIsIl9sZW5ndGgiLCJoaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==