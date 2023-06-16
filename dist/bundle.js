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
    body.addEventListener('keypress', function (e) {
      if (e.key === 'r') {
        children.forEach(function (cell) {
          var cellDiv = cell;
          var row = cellDiv.dataset.row;
          var col = cellDiv.dataset.col;
          if (player.gameboard.board[row][col] === null) {
            cellDiv.style.backgroundColor = 'white';
          }
        });
        verticalPlacement = !verticalPlacement;
      }
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
  var _float = [(0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(5), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(4), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(2)];
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

(0,_gameController__WEBPACK_IMPORTED_MODULE_0__["default"])().start();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBRXBDekIsMkRBQUksQ0FBQyxDQUFDLENBQUNXLEtBQUssQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlzcGxheSA9ICgpID0+IHtcbiAgY29uc3QgU0laRSA9IDEwO1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBsZWZ0Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVmdC1ib2FyZCcpO1xuICBjb25zdCByaWdodEJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LWJvYXJkJyk7XG4gIGNvbnN0IG15U3RhdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVmdC1zdGF0cycpO1xuICBjb25zdCBvcHBvbmVudFN0YXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LXN0YXRzJyk7XG5cbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWNvbnRhaW5lcicpO1xuICBjb25zdCB3aW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVyJyk7XG4gIGNvbnN0IGJ0blBsYXlBZ2FpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tcGxheS1hZ2FpbicpO1xuXG4gIGxldCB2ZXJ0aWNhbFBsYWNlbWVudCA9IHRydWU7XG5cbiAgZnVuY3Rpb24gZHJhd0JvYXJkcygpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgU0laRTsgaSArPSAxKSB7XG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgU0laRTsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGxlZnRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGxlZnRDZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgcmlnaHRDZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcblxuICAgICAgICBsZWZ0Q2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIGxlZnRDZWxsLmRhdGFzZXQuY29sID0gajtcblxuICAgICAgICByaWdodENlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICByaWdodENlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICBcbiAgICAgICAgbGVmdEJvYXJkLmFwcGVuZENoaWxkKGxlZnRDZWxsKTtcbiAgICAgICAgcmlnaHRCb2FyZC5hcHBlbmRDaGlsZChyaWdodENlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyQm9hcmRzKCkge1xuICAgIHdoaWxlKGxlZnRCb2FyZC5maXJzdENoaWxkICYmIHJpZ2h0Qm9hcmQuZmlyc3RDaGlsZCkge1xuICAgICAgbGVmdEJvYXJkLnJlbW92ZUNoaWxkKGxlZnRCb2FyZC5maXJzdENoaWxkKTtcbiAgICAgIHJpZ2h0Qm9hcmQucmVtb3ZlQ2hpbGQocmlnaHRCb2FyZC5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBjbGVhckJvYXJkcygpO1xuICAgIG15U3RhdHMuaW5uZXJIVE1MID0gJyc7XG4gICAgb3Bwb25lbnRTdGF0cy5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNlbGwoY2VsbCwgZGl2KSB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRpdjtcblxuICAgIGlmKGNlbGwgIT09IG51bGwpIHtcbiAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3BpbmsnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmF5JztcbiAgICB9XG5cbiAgICBjZWxsRGl2LmlubmVySFRNTCA9ICfil48nO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU3RhdHMoaGl0LCBkaXYpIHtcbiAgICBjb25zdCBzdGF0c0RpdiA9IGRpdjtcblxuICAgIGlmKGhpdCkge1xuICAgICAgc3RhdHNEaXYuaW5uZXJIVE1MID0gYEl0J3MgYSBoaXQhYDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHNEaXYuaW5uZXJIVE1MID0gYE5vIGhpdGA7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXIoYm9hcmQsIGxlbmd0aCwgcm93LCBjb2wsIGlzVmVydGljYWwpIHtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZihpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3JvdytpfVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuXG4gICAgICAgIGlmKHJvdyArIGkgPCAxMCAmJiBib2FyZFtyb3craV1bY29sXSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbCtpfVwiXWApO1xuXG4gICAgICAgIGlmKGNvbCArIGkgPCAxMCAmJiBib2FyZFtyb3ddW2NvbCtpXSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgIH1cbiAgICAgIH0gXG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGxzO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1NoaXAoYm9hcmQsIGxlbmd0aCwgcm93LCBjb2wpIHtcbiAgICBjb25zdCBjZWxscyA9IGdldFBsYWNlaG9sZGVyKGJvYXJkLCBsZW5ndGgsIHJvdywgY29sLCB2ZXJ0aWNhbFBsYWNlbWVudCk7XG5cbiAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgY29uc3QgY2VsbERpdiA9IGNlbGw7XG4gICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlU2hpcChib2FyZCwgbGVuZ3RoLCByb3csIGNvbCkge1xuICAgIGNvbnN0IGNlbGxzID0gZ2V0UGxhY2Vob2xkZXIoYm9hcmQsIGxlbmd0aCwgcm93LCBjb2wsIHZlcnRpY2FsUGxhY2VtZW50KTtcblxuICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjb25zdCBjZWxsRGl2ID0gY2VsbDtcbiAgICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0dhbWVPdmVyU2NyZWVuKHdpbm5lck5hbWUpIHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgd2lubmVyLmlubmVySFRNTCA9IGAke3dpbm5lck5hbWV9IGlzIHRoZSB3aW5uZXIhYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgaGFuZGxlVHVybikge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShyaWdodEJvYXJkLmNoaWxkTm9kZXMpO1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKG9wcG9uZW50LmdhbWVib2FyZC5pc0Nvb3JkaW5hdGVUYWtlbihyb3csIGNvbCkpIHtcbiAgICAgICAgICBvcHBvbmVudFN0YXRzLmlubmVySFRNTCA9ICdDb29yZGluYXRlIGFscmVhZHkgaGl0JztcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBcblxuICAgICAgICB1cGRhdGVDZWxsKG9wcG9uZW50LmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0sIGUudGFyZ2V0KTtcbiAgICAgICAgaGFuZGxlVHVybihwbGF5ZXIsIG9wcG9uZW50LCByb3csIGNvbCwgb3Bwb25lbnRTdGF0cyk7XG5cbiAgICAgICAgbGV0IHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHJhbmRvbUNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgICB3aGlsZShwbGF5ZXIuZ2FtZWJvYXJkLmlzQ29vcmRpbmF0ZVRha2VuKHJhbmRvbVJvdywgcmFuZG9tQ29sKSkge1xuICAgICAgICAgIHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDZWxsKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcmFuZG9tUm93XVtyYW5kb21Db2xdLCBsZWZ0Qm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyYW5kb21Sb3d9XCJdW2RhdGEtY29sPVwiJHtyYW5kb21Db2x9XCJdYCkpO1xuICAgICAgICBoYW5kbGVUdXJuKG9wcG9uZW50LCBwbGF5ZXIsIHJhbmRvbVJvdywgcmFuZG9tQ29sLCBteVN0YXRzKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkUmVzdGFydExpc3RlbmVyKHJlc3RhcnRIYW5kbGVyKSB7XG4gICAgYnRuUGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcmVzdGFydEhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMocGxheWVyLCBwbGF5SGFuZGxlcikge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShsZWZ0Qm9hcmQuY2hpbGROb2Rlcyk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKHBsYXllci5wbGFjZWRTaGlwcyA9PT0gNSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChwbGF5ZXIuZmxvYXRbcGxheWVyLnBsYWNlZFNoaXBzXSwgcm93LCBjb2wsIHZlcnRpY2FsUGxhY2VtZW50KTtcbiAgICAgICAgICBwbGF5ZXIuYWRkUGxhY2VkU2hpcCgpO1xuICAgICAgICAgIFxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICBteVN0YXRzLmlubmVySFRNTCA9ICdJbnZhbGlkIHBsYWNlbWVudCc7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihwbGF5ZXIucGxhY2VkU2hpcHMgPT09IDUpIHtcbiAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHBsYXlIYW5kbGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKHBsYXllci5wbGFjZWRTaGlwcyA9PT0gNSB8fCBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZHJhd1NoaXAocGxheWVyLmdhbWVib2FyZC5ib2FyZCwgcGxheWVyLmZsb2F0W3BsYXllci5wbGFjZWRTaGlwc10ubGVuZ3RoLCByb3csIGNvbCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG5cbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG5cbiAgICAgICAgaWYocGxheWVyLnBsYWNlZFNoaXBzID09PSA1IHx8IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBoaWRlU2hpcChwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkLCBwbGF5ZXIuZmxvYXRbcGxheWVyLnBsYWNlZFNoaXBzXS5sZW5ndGgsIHJvdywgY29sKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgICBpZihlLmtleSA9PT0gJ3InKSB7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgY29uc3QgY2VsbERpdiA9IGNlbGw7XG4gICAgICAgICAgY29uc3Qge3Jvd30gPSBjZWxsRGl2LmRhdGFzZXQ7XG4gICAgICAgICAgY29uc3Qge2NvbH0gPSBjZWxsRGl2LmRhdGFzZXQ7XG4gICAgICAgICAgaWYocGxheWVyLmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgICAgICB9XG4gICAgICAgICB9KTtcblxuICAgICAgICB2ZXJ0aWNhbFBsYWNlbWVudCA9ICF2ZXJ0aWNhbFBsYWNlbWVudDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7IG15U3RhdHMsIG9wcG9uZW50U3RhdHMsIGRyYXdCb2FyZHMsIGNsZWFyQm9hcmRzLCByZXNldCwgdXBkYXRlU3RhdHMsIHNob3dHYW1lT3ZlclNjcmVlbiwgYWRkQ2VsbExpc3RlbmVycywgYWRkUmVzdGFydExpc3RlbmVyLCBhZGRTaGlwUGxhY2VtZW50TGlzdGVuZXJzIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BsYXk7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIlxuaW1wb3J0IERpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICBsZXQgcGxheWVyID0gUGxheWVyKCdQbGF5ZXInKTtcbiAgbGV0IG9wcG9uZW50ID0gUGxheWVyKCdDb21wdXRlcicpO1xuICBjb25zdCBkaXNwbGF5ID0gRGlzcGxheSgpO1xuXG4gIFxuICBmdW5jdGlvbiBuZXdUdXJuKGF0dGFja2VyLCBkZWZlbmRlciwgcm93LCBjb2x1bW4sIGRlZmVuZGVyU3RhdHMpIHtcbiAgICBkaXNwbGF5LnVwZGF0ZVN0YXRzKGRlZmVuZGVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSwgZGVmZW5kZXJTdGF0cyk7XG4gICAgaWYoZGVmZW5kZXIuaXNGbG9hdFN1bmsoKSkge1xuICAgICAgZGlzcGxheS5zaG93R2FtZU92ZXJTY3JlZW4oYXR0YWNrZXIubmFtZSk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBwbGF5KCkge1xuICAgIG9wcG9uZW50LnBsYWNlTXlGbG9hdCgpO1xuICAgIGRpc3BsYXkuYWRkQ2VsbExpc3RlbmVycyhvcHBvbmVudCwgcGxheWVyLCBuZXdUdXJuKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgZGlzcGxheS5kcmF3Qm9hcmRzKCk7XG4gICAgZGlzcGxheS5hZGRTaGlwUGxhY2VtZW50TGlzdGVuZXJzKHBsYXllciwgcGxheSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHJlc3RhcnQoKSB7XG4gICAgZGlzcGxheS5yZXNldCgpO1xuICAgIHBsYXllciA9IFBsYXllcignUGxheWVyJyk7XG4gICAgb3Bwb25lbnQgPSBQbGF5ZXIoJ0NvbXB1dGVyJyk7XG4gICAgc3RhcnQoKTtcbiAgfVxuXG4gIGRpc3BsYXkuYWRkUmVzdGFydExpc3RlbmVyKHJlc3RhcnQpO1xuICBcbiAgcmV0dXJuIHsgc3RhcnQsIG5ld1R1cm4sIHJlc3RhcnQgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsIlxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIFxuICAoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gIGNvbnN0IHRyYWNraW5nQm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCBcbiAgKCkgPT4gQXJyYXkoMTApLmZpbGwoZmFsc2UpKTtcblxuICBmdW5jdGlvbiBpc0Nvb3JkaW5hdGVUYWtlbihyb3csIGNvbHVtbikge1xuICAgIHJldHVybiB0cmFja2luZ0JvYXJkW3Jvd11bY29sdW1uXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3ZlcmxhcHBpbmcoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGlmKGJvYXJkW3Jvd11bY29sdW1uK2ldICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGlmKGJvYXJkW3JvdytpXVtjb2x1bW5dICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBpc091dE9mQm91bmRzKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYoaXNWZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBzaGlwLmxlbmd0aCArIGNvbHVtbiA+IDEwO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc2hpcC5sZW5ndGggKyByb3cgPiAxMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmKGlzT3V0T2ZCb3VuZHMoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoaXAgbGVuZ3RoIGV4Y2VlZHMgYm91bmRhcmllcycpO1xuICAgIH0gZWxzZSBpZihpc092ZXJsYXBwaW5nKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdmVybGFwcGluZyBvdGhlciBzaGlwJyk7XG4gICAgfVxuXG4gICAgaWYoaXNWZXJ0aWNhbCA9PT0gZmFsc2UpIHsgIFxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGJvYXJkW3Jvd11bY29sdW1uK2ldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGJvYXJkW3JvdytpXVtjb2x1bW5dID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgaWYodHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29vcmRpbmF0ZSBhbHJlYWR5IGhpdCcpO1xuICAgIH1cblxuICAgIGlmKGJvYXJkW3Jvd11bY29sdW1uXSAhPT0gbnVsbCkge1xuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gbnVsbDtcbiAgICAgIHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dID0gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBhcmVTaGlwc1N1bmsoKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKz0xKSB7XG4gICAgICBpZighYm9hcmRbaV0uZXZlcnkoZWxlbWVudCA9PiBlbGVtZW50ID09PSBudWxsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VGbG9hdChzaGlwcykge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrPTEpIHtcbiAgICAgIHBsYWNlU2hpcChzaGlwc1tpXSwgMCwgaSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgYm9hcmQsIHRyYWNraW5nQm9hcmQsIGlzQ29vcmRpbmF0ZVRha2VuLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFyZVNoaXBzU3VuaywgcGxhY2VGbG9hdCB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCJcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgUGxheWVyID0gKF9uYW1lKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBfbmFtZTtcblxuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgXG4gIGNvbnN0IGZsb2F0ID0gW1xuICAgIFNoaXAoNSksXG4gICAgU2hpcCg0KSxcbiAgICBTaGlwKDMpLFxuICAgIFNoaXAoMyksXG4gICAgU2hpcCgyKVxuICBdO1xuXG4gIGNvbnN0IHBsYWNlZFNoaXBzID0gMDtcblxuICBmdW5jdGlvbiBpc0Zsb2F0U3VuaygpIHtcbiAgICByZXR1cm4gZmxvYXQuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT09IHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VNeUZsb2F0KCkge1xuICAgIGNvbnN0IG15RmxvYXQgPSBbXTtcbiAgICB0aGlzLmZsb2F0LmZvckVhY2goc2hpcCA9PiBteUZsb2F0LnB1c2goc2hpcCkpO1xuXG4gICAgdGhpcy5nYW1lYm9hcmQucGxhY2VGbG9hdChteUZsb2F0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBsYWNlZFNoaXAoKSB7XG4gICAgdGhpcy5wbGFjZWRTaGlwcyArPSAxO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgZ2FtZWJvYXJkLCBmbG9hdCwgcGxhY2VkU2hpcHMsIGlzRmxvYXRTdW5rLCBwbGFjZU15RmxvYXQsIGFkZFBsYWNlZFNoaXAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmNvbnN0IFNoaXAgPSAoX2xlbmd0aCkgPT4ge1xuICBjb25zdCBsZW5ndGggPSBfbGVuZ3RoO1xuICBjb25zdCBoaXRzID0gMDtcblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICByZXR1cm4geyBsZW5ndGgsIGhpdHMsIGlzU3VuaywgaGl0IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lQ29udHJvbGxlclwiO1xuXG5HYW1lKCkuc3RhcnQoKTsiXSwibmFtZXMiOlsiRGlzcGxheSIsIlNJWkUiLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGVmdEJvYXJkIiwiZ2V0RWxlbWVudEJ5SWQiLCJyaWdodEJvYXJkIiwibXlTdGF0cyIsIm9wcG9uZW50U3RhdHMiLCJvdmVybGF5Iiwid2lubmVyIiwiYnRuUGxheUFnYWluIiwidmVydGljYWxQbGFjZW1lbnQiLCJkcmF3Qm9hcmRzIiwiaSIsImoiLCJsZWZ0Q2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJyaWdodENlbGwiLCJjbGFzc05hbWUiLCJkYXRhc2V0Iiwicm93IiwiY29sIiwiYXBwZW5kQ2hpbGQiLCJjbGVhckJvYXJkcyIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInJlc2V0IiwiaW5uZXJIVE1MIiwidXBkYXRlQ2VsbCIsImNlbGwiLCJkaXYiLCJjZWxsRGl2Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ1cGRhdGVTdGF0cyIsImhpdCIsInN0YXRzRGl2IiwiZ2V0UGxhY2Vob2xkZXIiLCJib2FyZCIsImxlbmd0aCIsImlzVmVydGljYWwiLCJjZWxscyIsImNvbmNhdCIsInB1c2giLCJkcmF3U2hpcCIsImZvckVhY2giLCJoaWRlU2hpcCIsInNob3dHYW1lT3ZlclNjcmVlbiIsIndpbm5lck5hbWUiLCJkaXNwbGF5IiwiYWRkQ2VsbExpc3RlbmVycyIsIm9wcG9uZW50IiwicGxheWVyIiwiaGFuZGxlVHVybiIsImNoaWxkcmVuIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJnYW1lYm9hcmQiLCJpc0Nvb3JkaW5hdGVUYWtlbiIsInJhbmRvbVJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbUNvbCIsImFkZFJlc3RhcnRMaXN0ZW5lciIsInJlc3RhcnRIYW5kbGVyIiwiYWRkU2hpcFBsYWNlbWVudExpc3RlbmVycyIsInBsYXlIYW5kbGVyIiwicGxhY2VkU2hpcHMiLCJwbGFjZVNoaXAiLCJhZGRQbGFjZWRTaGlwIiwiX3VudXNlZCIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsImtleSIsIlBsYXllciIsIkdhbWUiLCJuZXdUdXJuIiwiYXR0YWNrZXIiLCJkZWZlbmRlciIsImNvbHVtbiIsImRlZmVuZGVyU3RhdHMiLCJyZWNlaXZlQXR0YWNrIiwiaXNGbG9hdFN1bmsiLCJuYW1lIiwicGxheSIsInBsYWNlTXlGbG9hdCIsInN0YXJ0IiwicmVzdGFydCIsIkdhbWVib2FyZCIsImZpbGwiLCJ0cmFja2luZ0JvYXJkIiwiaXNPdmVybGFwcGluZyIsInNoaXAiLCJpc091dE9mQm91bmRzIiwiRXJyb3IiLCJhcmVTaGlwc1N1bmsiLCJldmVyeSIsImVsZW1lbnQiLCJwbGFjZUZsb2F0Iiwic2hpcHMiLCJTaGlwIiwiX25hbWUiLCJmbG9hdCIsImlzU3VuayIsIm15RmxvYXQiLCJfbGVuZ3RoIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=