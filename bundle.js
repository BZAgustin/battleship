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
    myStats.innerHTML = 'Place your Carrier';
    opponentStats.innerHTML = '';
  }
  function updateCell(cell, div) {
    var cellDiv = div;
    if (cell !== null) {
      cellDiv.style.backgroundColor = 'pink';
    } else {
      cellDiv.style.backgroundColor = 'gray';
    }
  }
  function updateStats(sunk, div) {
    var shipName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var statsDiv = div;
    if (sunk === null) {
      statsDiv.innerHTML = "No hit";
    } else if (!sunk) {
      statsDiv.innerHTML = "It's a hit!";
    } else if (sunk) {
      statsDiv.innerHTML = "".concat(shipName, " has been sunk!");
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
    if (defender.gameboard.board[row][column] !== null) {
      display.updateStats(defender.gameboard.receiveAttack(row, column), defenderStats, defender.gameboard.board[row][column].name);
    } else {
      display.updateStats(defender.gameboard.receiveAttack(row, column), defenderStats);
    }
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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

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
      if (board[row][column].isSunk()) {
        return true;
      }
      return false;
    }
    trackingBoard[row][column] = true;
    return null;
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
    var _iterator = _createForOfIteratorHelper(ships),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var ship = _step.value;
        var isShipPlaced = false;
        while (!isShipPlaced) {
          var randomRow = Math.floor(Math.random() * 10);
          var randomCol = Math.floor(Math.random() * 10);
          var randomAxis = Math.round(Math.random());
          if (!isOutOfBounds(ship, randomRow, randomCol, !!randomAxis)) {
            if (!isOverlapping(ship, randomRow, randomCol, !!randomAxis)) {
              if (randomAxis === 0) {
                placeShip(ship, randomRow, randomCol, !!randomAxis);
              } else {
                placeShip(ship, randomRow, randomCol, !!randomAxis);
              }
              isShipPlaced = true;
            }
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
    gameboard.placeFloat(_float);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBRXBDdkMsMkRBQUksQ0FBQyxDQUFDLENBQUNVLEtBQUssQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWNvbnN0ICovXG5jb25zdCBEaXNwbGF5ID0gKCkgPT4ge1xuICBjb25zdCBTSVpFID0gMTA7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IGxlZnRCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0LWJvYXJkJyk7XG4gIGNvbnN0IHJpZ2h0Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtYm9hcmQnKTtcbiAgY29uc3QgbXlTdGF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0LXN0YXRzJyk7XG4gIGNvbnN0IG9wcG9uZW50U3RhdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtc3RhdHMnKTtcblxuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXktY29udGFpbmVyJyk7XG4gIGNvbnN0IHdpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5uZXInKTtcbiAgY29uc3QgYnRuUGxheUFnYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1wbGF5LWFnYWluJyk7XG5cbiAgbGV0IHZlcnRpY2FsUGxhY2VtZW50ID0gdHJ1ZTtcblxuICBmdW5jdGlvbiBkcmF3Qm9hcmRzKCkge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBTSVpFOyBpICs9IDEpIHtcbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBTSVpFOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgbGVmdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcmlnaHRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgbGVmdENlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuICAgICAgICByaWdodENlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuXG4gICAgICAgIGxlZnRDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgbGVmdENlbGwuZGF0YXNldC5jb2wgPSBqO1xuXG4gICAgICAgIHJpZ2h0Q2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIHJpZ2h0Q2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIFxuICAgICAgICBsZWZ0Qm9hcmQuYXBwZW5kQ2hpbGQobGVmdENlbGwpO1xuICAgICAgICByaWdodEJvYXJkLmFwcGVuZENoaWxkKHJpZ2h0Q2VsbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJCb2FyZHMoKSB7XG4gICAgd2hpbGUobGVmdEJvYXJkLmZpcnN0Q2hpbGQgJiYgcmlnaHRCb2FyZC5maXJzdENoaWxkKSB7XG4gICAgICBsZWZ0Qm9hcmQucmVtb3ZlQ2hpbGQobGVmdEJvYXJkLmZpcnN0Q2hpbGQpO1xuICAgICAgcmlnaHRCb2FyZC5yZW1vdmVDaGlsZChyaWdodEJvYXJkLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGNsZWFyQm9hcmRzKCk7XG4gICAgbXlTdGF0cy5pbm5lckhUTUwgPSAnUGxhY2UgeW91ciBDYXJyaWVyJztcbiAgICBvcHBvbmVudFN0YXRzLmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2VsbChjZWxsLCBkaXYpIHtcbiAgICBjb25zdCBjZWxsRGl2ID0gZGl2O1xuXG4gICAgaWYoY2VsbCAhPT0gbnVsbCkge1xuICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncGluayc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyYXknO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVN0YXRzKHN1bmssIGRpdiwgc2hpcE5hbWUgPSAnJykge1xuICAgIGNvbnN0IHN0YXRzRGl2ID0gZGl2O1xuXG4gICAgaWYoc3VuayA9PT0gbnVsbCkge1xuICAgICAgc3RhdHNEaXYuaW5uZXJIVE1MID0gYE5vIGhpdGA7XG4gICAgfSBlbHNlIGlmKCFzdW5rKSB7XG4gICAgICBzdGF0c0Rpdi5pbm5lckhUTUwgPSBgSXQncyBhIGhpdCFgO1xuICAgIH0gZWxzZSBpZiAoc3Vuaykge1xuICAgICAgc3RhdHNEaXYuaW5uZXJIVE1MID0gYCR7c2hpcE5hbWV9IGhhcyBiZWVuIHN1bmshYDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQbGFjZWhvbGRlcihib2FyZCwgbGVuZ3RoLCByb3csIGNvbCwgaXNWZXJ0aWNhbCkge1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmKGlzVmVydGljYWwpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93K2l9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG5cbiAgICAgICAgaWYocm93ICsgaSA8IDEwICYmIGJvYXJkW3JvdytpXVtjb2xdID09PSBudWxsKSB7XG4gICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sK2l9XCJdYCk7XG5cbiAgICAgICAgaWYoY29sICsgaSA8IDEwICYmIGJvYXJkW3Jvd11bY29sK2ldID09PSBudWxsKSB7XG4gICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbHM7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3U2hpcChib2FyZCwgbGVuZ3RoLCByb3csIGNvbCkge1xuICAgIGNvbnN0IGNlbGxzID0gZ2V0UGxhY2Vob2xkZXIoYm9hcmQsIGxlbmd0aCwgcm93LCBjb2wsIHZlcnRpY2FsUGxhY2VtZW50KTtcblxuICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjb25zdCBjZWxsRGl2ID0gY2VsbDtcbiAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJztcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVTaGlwKGJvYXJkLCBsZW5ndGgsIHJvdywgY29sKSB7XG4gICAgY29uc3QgY2VsbHMgPSBnZXRQbGFjZWhvbGRlcihib2FyZCwgbGVuZ3RoLCByb3csIGNvbCwgdmVydGljYWxQbGFjZW1lbnQpO1xuXG4gICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNvbnN0IGNlbGxEaXYgPSBjZWxsO1xuICAgICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzd2l0Y2hBeGlzKCkge1xuICAgIHZlcnRpY2FsUGxhY2VtZW50ID0gIXZlcnRpY2FsUGxhY2VtZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0dhbWVPdmVyU2NyZWVuKHdpbm5lck5hbWUpIHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgd2lubmVyLmlubmVySFRNTCA9IGAke3dpbm5lck5hbWV9IGlzIHRoZSB3aW5uZXIhYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgaGFuZGxlVHVybikge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShyaWdodEJvYXJkLmNoaWxkTm9kZXMpO1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKG9wcG9uZW50LmdhbWVib2FyZC5pc0Nvb3JkaW5hdGVUYWtlbihyb3csIGNvbCkpIHtcbiAgICAgICAgICBvcHBvbmVudFN0YXRzLmlubmVySFRNTCA9ICdDb29yZGluYXRlIGFscmVhZHkgaGl0JztcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBcblxuICAgICAgICB1cGRhdGVDZWxsKG9wcG9uZW50LmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0sIGUudGFyZ2V0KTtcbiAgICAgICAgaGFuZGxlVHVybihwbGF5ZXIsIG9wcG9uZW50LCByb3csIGNvbCwgb3Bwb25lbnRTdGF0cyk7XG5cbiAgICAgICAgbGV0IHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHJhbmRvbUNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgICB3aGlsZShwbGF5ZXIuZ2FtZWJvYXJkLmlzQ29vcmRpbmF0ZVRha2VuKHJhbmRvbVJvdywgcmFuZG9tQ29sKSkge1xuICAgICAgICAgIHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDZWxsKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcmFuZG9tUm93XVtyYW5kb21Db2xdLCBsZWZ0Qm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyYW5kb21Sb3d9XCJdW2RhdGEtY29sPVwiJHtyYW5kb21Db2x9XCJdYCkpO1xuICAgICAgICBoYW5kbGVUdXJuKG9wcG9uZW50LCBwbGF5ZXIsIHJhbmRvbVJvdywgcmFuZG9tQ29sLCBteVN0YXRzKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkUmVzdGFydExpc3RlbmVyKHJlc3RhcnRIYW5kbGVyKSB7XG4gICAgYnRuUGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcmVzdGFydEhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMocGxheWVyLCBwbGF5SGFuZGxlcikge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShsZWZ0Qm9hcmQuY2hpbGROb2Rlcyk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKHBsYXllci5wbGFjZWRTaGlwcyA9PT0gNSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChwbGF5ZXIuZmxvYXRbcGxheWVyLnBsYWNlZFNoaXBzXSwgcm93LCBjb2wsIHZlcnRpY2FsUGxhY2VtZW50KTtcbiAgICAgICAgICBwbGF5ZXIuYWRkUGxhY2VkU2hpcCgpO1xuICAgICAgICBpZihwbGF5ZXIucGxhY2VkU2hpcHMgPT09IDUpIHtcbiAgICAgICAgICBteVN0YXRzLmlubmVySFRNTCA9IGBQbGF5ZXIncyB0dXJuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBteVN0YXRzLmlubmVySFRNTCA9IGBQbGFjZSB5b3VyICR7cGxheWVyLmZsb2F0W3BsYXllci5wbGFjZWRTaGlwc10ubmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIG15U3RhdHMuaW5uZXJIVE1MID0gJ0ludmFsaWQgcGxhY2VtZW50JztcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHBsYXllci5wbGFjZWRTaGlwcyA9PT0gNSkge1xuICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcGxheUhhbmRsZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG5cbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG5cbiAgICAgICAgaWYocGxheWVyLnBsYWNlZFNoaXBzID09PSA1IHx8IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3U2hpcChwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkLCBwbGF5ZXIuZmxvYXRbcGxheWVyLnBsYWNlZFNoaXBzXS5sZW5ndGgsIHJvdywgY29sKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcblxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGUpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wsIDEwKTtcblxuICAgICAgICBpZihwbGF5ZXIucGxhY2VkU2hpcHMgPT09IDUgfHwgcGxheWVyLmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGhpZGVTaGlwKHBsYXllci5nYW1lYm9hcmQuYm9hcmQsIHBsYXllci5mbG9hdFtwbGF5ZXIucGxhY2VkU2hpcHNdLmxlbmd0aCwgcm93LCBjb2wpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBib2R5LCBsZWZ0Qm9hcmQsIG15U3RhdHMsIG9wcG9uZW50U3RhdHMsIHZlcnRpY2FsUGxhY2VtZW50LCBkcmF3Qm9hcmRzLCBjbGVhckJvYXJkcywgc3dpdGNoQXhpcywgcmVzZXQsIHVwZGF0ZVN0YXRzLCBzaG93R2FtZU92ZXJTY3JlZW4sIGFkZENlbGxMaXN0ZW5lcnMsIGFkZFJlc3RhcnRMaXN0ZW5lciwgYWRkU2hpcFBsYWNlbWVudExpc3RlbmVycyB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5OyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCJcbmltcG9ydCBEaXNwbGF5IGZyb20gXCIuL2Rpc3BsYXlcIjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgbGV0IHBsYXllciA9IFBsYXllcignUGxheWVyJyk7XG4gIGxldCBvcHBvbmVudCA9IFBsYXllcignQ29tcHV0ZXInKTtcbiAgY29uc3QgZGlzcGxheSA9IERpc3BsYXkoKTtcbiAgXG4gIGZ1bmN0aW9uIG5ld1R1cm4oYXR0YWNrZXIsIGRlZmVuZGVyLCByb3csIGNvbHVtbiwgZGVmZW5kZXJTdGF0cykge1xuICAgIGlmKGRlZmVuZGVyLmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbHVtbl0gIT09IG51bGwpIHtcbiAgICAgIGRpc3BsYXkudXBkYXRlU3RhdHMoZGVmZW5kZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pLCBkZWZlbmRlclN0YXRzLCBkZWZlbmRlci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2x1bW5dLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5LnVwZGF0ZVN0YXRzKGRlZmVuZGVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSwgZGVmZW5kZXJTdGF0cyk7XG4gICAgfVxuICAgIFxuICAgIGlmKGRlZmVuZGVyLmlzRmxvYXRTdW5rKCkpIHtcbiAgICAgIGRpc3BsYXkuc2hvd0dhbWVPdmVyU2NyZWVuKGF0dGFja2VyLm5hbWUpO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICBvcHBvbmVudC5wbGFjZU15RmxvYXQoKTtcbiAgICBkaXNwbGF5LmFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgbmV3VHVybik7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGRpc3BsYXkuZHJhd0JvYXJkcygpO1xuICAgIGRpc3BsYXkuYWRkU2hpcFBsYWNlbWVudExpc3RlbmVycyhwbGF5ZXIsIHBsYXkpO1xuICB9XG4gIFxuICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIGRpc3BsYXkucmVzZXQoKTtcbiAgICBwbGF5ZXIgPSBQbGF5ZXIoJ1BsYXllcicpO1xuICAgIG9wcG9uZW50ID0gUGxheWVyKCdDb21wdXRlcicpO1xuICAgIHN0YXJ0KCk7XG4gIH1cblxuICBkaXNwbGF5LmFkZFJlc3RhcnRMaXN0ZW5lcihyZXN0YXJ0KTtcblxuICBkaXNwbGF5LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIGlmKGUua2V5ID09PSAncicpIHtcbiAgICAgIEFycmF5LmZyb20oZGlzcGxheS5sZWZ0Qm9hcmQuY2hpbGRyZW4pLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxEaXYgPSBjZWxsO1xuICAgICAgICBjb25zdCB7cm93fSA9IGNlbGxEaXYuZGF0YXNldDtcbiAgICAgICAgY29uc3Qge2NvbH0gPSBjZWxsRGl2LmRhdGFzZXQ7XG4gICAgICAgIGlmKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdID09PSBudWxsKSB7XG4gICAgICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZGlzcGxheS5zd2l0Y2hBeGlzKCk7XG4gIH07XG59KTtcblxuICByZXR1cm4geyBzdGFydCwgbmV3VHVybiwgcmVzdGFydCB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCBcbiAgKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICBjb25zdCB0cmFja2luZ0JvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgXG4gICgpID0+IEFycmF5KDEwKS5maWxsKGZhbHNlKSk7XG5cbiAgZnVuY3Rpb24gaXNDb29yZGluYXRlVGFrZW4ocm93LCBjb2x1bW4pIHtcbiAgICByZXR1cm4gdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl07XG4gIH1cblxuICBmdW5jdGlvbiBpc092ZXJsYXBwaW5nKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYoaXNWZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBpZihib2FyZFtyb3ddW2NvbHVtbitpXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBpZihib2FyZFtyb3craV1bY29sdW1uXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPdXRPZkJvdW5kcyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmKGlzVmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gc2hpcC5sZW5ndGggKyBjb2x1bW4gPiAxMDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHNoaXAubGVuZ3RoICsgcm93ID4gMTA7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZihpc091dE9mQm91bmRzKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGlwIGxlbmd0aCBleGNlZWRzIGJvdW5kYXJpZXMnKTtcbiAgICB9IGVsc2UgaWYoaXNPdmVybGFwcGluZyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignT3ZlcmxhcHBpbmcgb3RoZXIgc2hpcCcpO1xuICAgIH1cblxuICAgIGlmKGlzVmVydGljYWwgPT09IGZhbHNlKSB7ICBcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBib2FyZFtyb3ddW2NvbHVtbitpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICBib2FyZFtyb3craV1bY29sdW1uXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGlmKHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dID09PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nvb3JkaW5hdGUgYWxyZWFkeSBoaXQnKTtcbiAgICB9XG5cbiAgICBpZihib2FyZFtyb3ddW2NvbHVtbl0gIT09IG51bGwpIHtcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcbiAgICAgIGlmKGJvYXJkW3Jvd11bY29sdW1uXS5pc1N1bmsoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dID0gdHJ1ZTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFyZVNoaXBzU3VuaygpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrPTEpIHtcbiAgICAgIGlmKCFib2FyZFtpXS5ldmVyeShlbGVtZW50ID0+IGVsZW1lbnQgPT09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZUZsb2F0KHNoaXBzKSB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgICBsZXQgaXNTaGlwUGxhY2VkID0gZmFsc2U7XG4gIFxuICAgICAgd2hpbGUgKCFpc1NoaXBQbGFjZWQpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBjb25zdCByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIFxuICAgICAgICBjb25zdCByYW5kb21BeGlzID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgXG4gICAgICAgIGlmICghaXNPdXRPZkJvdW5kcyhzaGlwLCByYW5kb21Sb3csIHJhbmRvbUNvbCwgISFyYW5kb21BeGlzKSkge1xuICAgICAgICAgIGlmICghaXNPdmVybGFwcGluZyhzaGlwLCByYW5kb21Sb3csIHJhbmRvbUNvbCwgISFyYW5kb21BeGlzKSkge1xuICAgICAgICAgICAgaWYocmFuZG9tQXhpcyA9PT0gMCkge1xuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hpcCwgcmFuZG9tUm93LCByYW5kb21Db2wsICEhcmFuZG9tQXhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hpcCwgcmFuZG9tUm93LCByYW5kb21Db2wsICEhcmFuZG9tQXhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlzU2hpcFBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4geyBib2FyZCwgdHJhY2tpbmdCb2FyZCwgaXNDb29yZGluYXRlVGFrZW4sIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYXJlU2hpcHNTdW5rLCBwbGFjZUZsb2F0IH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IFBsYXllciA9IChfbmFtZSkgPT4ge1xuICBjb25zdCBuYW1lID0gX25hbWU7XG5cbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIFxuICBjb25zdCBmbG9hdCA9IFtcbiAgICBTaGlwKCdDYXJyaWVyJywgNSksXG4gICAgU2hpcCgnQmF0dGxlc2hpcCcsIDQpLFxuICAgIFNoaXAoJ0NydWlzZXInLCAzKSxcbiAgICBTaGlwKCdTdWJtYXJpbmUnLCAzKSxcbiAgICBTaGlwKCdEZXN0cm95ZXInLCAyKVxuICBdO1xuXG4gIGNvbnN0IHBsYWNlZFNoaXBzID0gMDtcblxuICBmdW5jdGlvbiBpc0Zsb2F0U3VuaygpIHtcbiAgICByZXR1cm4gZmxvYXQuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT09IHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VNeUZsb2F0KCkge1xuICAgIGdhbWVib2FyZC5wbGFjZUZsb2F0KGZsb2F0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBsYWNlZFNoaXAoKSB7XG4gICAgdGhpcy5wbGFjZWRTaGlwcyArPSAxO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgZ2FtZWJvYXJkLCBmbG9hdCwgcGxhY2VkU2hpcHMsIGlzRmxvYXRTdW5rLCBwbGFjZU15RmxvYXQsIGFkZFBsYWNlZFNoaXAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImNvbnN0IFNoaXAgPSAoX25hbWUsIF9sZW5ndGgpID0+IHtcbiAgY29uc3QgbmFtZSA9IF9uYW1lO1xuICBjb25zdCBsZW5ndGggPSBfbGVuZ3RoO1xuICBjb25zdCBoaXRzID0gMDtcblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICByZXR1cm4geyBuYW1lLCBsZW5ndGgsIGhpdHMsIGlzU3VuaywgaGl0IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lQ29udHJvbGxlclwiO1xuXG5HYW1lKCkuc3RhcnQoKTsiXSwibmFtZXMiOlsiRGlzcGxheSIsIlNJWkUiLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGVmdEJvYXJkIiwiZ2V0RWxlbWVudEJ5SWQiLCJyaWdodEJvYXJkIiwibXlTdGF0cyIsIm9wcG9uZW50U3RhdHMiLCJvdmVybGF5Iiwid2lubmVyIiwiYnRuUGxheUFnYWluIiwidmVydGljYWxQbGFjZW1lbnQiLCJkcmF3Qm9hcmRzIiwiaSIsImoiLCJsZWZ0Q2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJyaWdodENlbGwiLCJjbGFzc05hbWUiLCJkYXRhc2V0Iiwicm93IiwiY29sIiwiYXBwZW5kQ2hpbGQiLCJjbGVhckJvYXJkcyIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInJlc2V0IiwiaW5uZXJIVE1MIiwidXBkYXRlQ2VsbCIsImNlbGwiLCJkaXYiLCJjZWxsRGl2Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ1cGRhdGVTdGF0cyIsInN1bmsiLCJzaGlwTmFtZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInN0YXRzRGl2IiwiY29uY2F0IiwiZ2V0UGxhY2Vob2xkZXIiLCJib2FyZCIsImlzVmVydGljYWwiLCJjZWxscyIsInB1c2giLCJkcmF3U2hpcCIsImZvckVhY2giLCJoaWRlU2hpcCIsInN3aXRjaEF4aXMiLCJzaG93R2FtZU92ZXJTY3JlZW4iLCJ3aW5uZXJOYW1lIiwiZGlzcGxheSIsImFkZENlbGxMaXN0ZW5lcnMiLCJvcHBvbmVudCIsInBsYXllciIsImhhbmRsZVR1cm4iLCJjaGlsZHJlbiIsIkFycmF5IiwiZnJvbSIsImNoaWxkTm9kZXMiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInBhcnNlSW50IiwidGFyZ2V0IiwiZ2FtZWJvYXJkIiwiaXNDb29yZGluYXRlVGFrZW4iLCJyYW5kb21Sb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21Db2wiLCJhZGRSZXN0YXJ0TGlzdGVuZXIiLCJyZXN0YXJ0SGFuZGxlciIsImFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMiLCJwbGF5SGFuZGxlciIsInBsYWNlZFNoaXBzIiwicGxhY2VTaGlwIiwiYWRkUGxhY2VkU2hpcCIsIm5hbWUiLCJfdW51c2VkIiwic3F1YXJlIiwiY2xhc3NMaXN0IiwiYWRkIiwiUGxheWVyIiwiR2FtZSIsIm5ld1R1cm4iLCJhdHRhY2tlciIsImRlZmVuZGVyIiwiY29sdW1uIiwiZGVmZW5kZXJTdGF0cyIsInJlY2VpdmVBdHRhY2siLCJpc0Zsb2F0U3VuayIsInBsYXkiLCJwbGFjZU15RmxvYXQiLCJzdGFydCIsInJlc3RhcnQiLCJrZXkiLCJHYW1lYm9hcmQiLCJmaWxsIiwidHJhY2tpbmdCb2FyZCIsImlzT3ZlcmxhcHBpbmciLCJzaGlwIiwiaXNPdXRPZkJvdW5kcyIsIkVycm9yIiwiaGl0IiwiaXNTdW5rIiwiYXJlU2hpcHNTdW5rIiwiZXZlcnkiLCJlbGVtZW50IiwicGxhY2VGbG9hdCIsInNoaXBzIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiaXNTaGlwUGxhY2VkIiwicmFuZG9tQXhpcyIsInJvdW5kIiwiZXJyIiwiZiIsIlNoaXAiLCJfbmFtZSIsImZsb2F0IiwiX2xlbmd0aCIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9