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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDRSxJQUFJLEtBQUssSUFBSSxDQUFDdEYsTUFBTTtFQUNsQztFQUVBLFNBQVNKLEdBQUdBLENBQUEsRUFBRztJQUNiLElBQUksQ0FBQzBGLElBQUksSUFBSSxDQUFDO0VBQ2hCO0VBRUEsT0FBTztJQUFFaEQsSUFBSSxFQUFKQSxJQUFJO0lBQUV0QyxNQUFNLEVBQU5BLE1BQU07SUFBRXNGLElBQUksRUFBSkEsSUFBSTtJQUFFRixNQUFNLEVBQU5BLE1BQU07SUFBRXhGLEdBQUcsRUFBSEE7RUFBSSxDQUFDO0FBQzVDLENBQUM7QUFFRCxpRUFBZXFGLElBQUk7Ozs7OztVQ2hCbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05vQztBQUVwQ3JDLDJEQUFJLENBQUMsQ0FBQyxDQUFDVSxLQUFLLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1jb25zdCAqL1xuY29uc3QgRGlzcGxheSA9ICgpID0+IHtcbiAgY29uc3QgU0laRSA9IDEwO1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBsZWZ0Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVmdC1ib2FyZCcpO1xuICBjb25zdCByaWdodEJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LWJvYXJkJyk7XG4gIGNvbnN0IG15U3RhdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVmdC1zdGF0cycpO1xuICBjb25zdCBvcHBvbmVudFN0YXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LXN0YXRzJyk7XG5cbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWNvbnRhaW5lcicpO1xuICBjb25zdCB3aW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVyJyk7XG4gIGNvbnN0IGJ0blBsYXlBZ2FpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tcGxheS1hZ2FpbicpO1xuXG4gIGxldCB2ZXJ0aWNhbFBsYWNlbWVudCA9IHRydWU7XG5cbiAgZnVuY3Rpb24gZHJhd0JvYXJkcygpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgU0laRTsgaSArPSAxKSB7XG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgU0laRTsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGxlZnRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGxlZnRDZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgcmlnaHRDZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcblxuICAgICAgICBsZWZ0Q2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIGxlZnRDZWxsLmRhdGFzZXQuY29sID0gajtcblxuICAgICAgICByaWdodENlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICByaWdodENlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICBcbiAgICAgICAgbGVmdEJvYXJkLmFwcGVuZENoaWxkKGxlZnRDZWxsKTtcbiAgICAgICAgcmlnaHRCb2FyZC5hcHBlbmRDaGlsZChyaWdodENlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyQm9hcmRzKCkge1xuICAgIHdoaWxlKGxlZnRCb2FyZC5maXJzdENoaWxkICYmIHJpZ2h0Qm9hcmQuZmlyc3RDaGlsZCkge1xuICAgICAgbGVmdEJvYXJkLnJlbW92ZUNoaWxkKGxlZnRCb2FyZC5maXJzdENoaWxkKTtcbiAgICAgIHJpZ2h0Qm9hcmQucmVtb3ZlQ2hpbGQocmlnaHRCb2FyZC5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBjbGVhckJvYXJkcygpO1xuICAgIG15U3RhdHMuaW5uZXJIVE1MID0gJyc7XG4gICAgb3Bwb25lbnRTdGF0cy5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNlbGwoY2VsbCwgZGl2KSB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRpdjtcblxuICAgIGlmKGNlbGwgIT09IG51bGwpIHtcbiAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3BpbmsnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmF5JztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTdGF0cyhoaXQsIGRpdikge1xuICAgIGNvbnN0IHN0YXRzRGl2ID0gZGl2O1xuXG4gICAgaWYoaGl0KSB7XG4gICAgICBzdGF0c0Rpdi5pbm5lckhUTUwgPSBgSXQncyBhIGhpdCFgO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0c0Rpdi5pbm5lckhUTUwgPSBgTm8gaGl0YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQbGFjZWhvbGRlcihib2FyZCwgbGVuZ3RoLCByb3csIGNvbCwgaXNWZXJ0aWNhbCkge1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmKGlzVmVydGljYWwpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93K2l9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG5cbiAgICAgICAgaWYocm93ICsgaSA8IDEwICYmIGJvYXJkW3JvdytpXVtjb2xdID09PSBudWxsKSB7XG4gICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sK2l9XCJdYCk7XG5cbiAgICAgICAgaWYoY29sICsgaSA8IDEwICYmIGJvYXJkW3Jvd11bY29sK2ldID09PSBudWxsKSB7XG4gICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbHM7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3U2hpcChib2FyZCwgbGVuZ3RoLCByb3csIGNvbCkge1xuICAgIGNvbnN0IGNlbGxzID0gZ2V0UGxhY2Vob2xkZXIoYm9hcmQsIGxlbmd0aCwgcm93LCBjb2wsIHZlcnRpY2FsUGxhY2VtZW50KTtcblxuICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjb25zdCBjZWxsRGl2ID0gY2VsbDtcbiAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJztcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVTaGlwKGJvYXJkLCBsZW5ndGgsIHJvdywgY29sKSB7XG4gICAgY29uc3QgY2VsbHMgPSBnZXRQbGFjZWhvbGRlcihib2FyZCwgbGVuZ3RoLCByb3csIGNvbCwgdmVydGljYWxQbGFjZW1lbnQpO1xuXG4gICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNvbnN0IGNlbGxEaXYgPSBjZWxsO1xuICAgICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzd2l0Y2hBeGlzKCkge1xuICAgIHZlcnRpY2FsUGxhY2VtZW50ID0gIXZlcnRpY2FsUGxhY2VtZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0dhbWVPdmVyU2NyZWVuKHdpbm5lck5hbWUpIHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgd2lubmVyLmlubmVySFRNTCA9IGAke3dpbm5lck5hbWV9IGlzIHRoZSB3aW5uZXIhYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgaGFuZGxlVHVybikge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShyaWdodEJvYXJkLmNoaWxkTm9kZXMpO1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKG9wcG9uZW50LmdhbWVib2FyZC5pc0Nvb3JkaW5hdGVUYWtlbihyb3csIGNvbCkpIHtcbiAgICAgICAgICBvcHBvbmVudFN0YXRzLmlubmVySFRNTCA9ICdDb29yZGluYXRlIGFscmVhZHkgaGl0JztcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBcblxuICAgICAgICB1cGRhdGVDZWxsKG9wcG9uZW50LmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0sIGUudGFyZ2V0KTtcbiAgICAgICAgaGFuZGxlVHVybihwbGF5ZXIsIG9wcG9uZW50LCByb3csIGNvbCwgb3Bwb25lbnRTdGF0cyk7XG5cbiAgICAgICAgbGV0IHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHJhbmRvbUNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgICB3aGlsZShwbGF5ZXIuZ2FtZWJvYXJkLmlzQ29vcmRpbmF0ZVRha2VuKHJhbmRvbVJvdywgcmFuZG9tQ29sKSkge1xuICAgICAgICAgIHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDZWxsKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcmFuZG9tUm93XVtyYW5kb21Db2xdLCBsZWZ0Qm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyYW5kb21Sb3d9XCJdW2RhdGEtY29sPVwiJHtyYW5kb21Db2x9XCJdYCkpO1xuICAgICAgICBoYW5kbGVUdXJuKG9wcG9uZW50LCBwbGF5ZXIsIHJhbmRvbVJvdywgcmFuZG9tQ29sLCBteVN0YXRzKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkUmVzdGFydExpc3RlbmVyKHJlc3RhcnRIYW5kbGVyKSB7XG4gICAgYnRuUGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcmVzdGFydEhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMocGxheWVyLCBwbGF5SGFuZGxlcikge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShsZWZ0Qm9hcmQuY2hpbGROb2Rlcyk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIGlmKHBsYXllci5wbGFjZWRTaGlwcyA9PT0gNSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChwbGF5ZXIuZmxvYXRbcGxheWVyLnBsYWNlZFNoaXBzXSwgcm93LCBjb2wsIHZlcnRpY2FsUGxhY2VtZW50KTtcbiAgICAgICAgICBwbGF5ZXIuYWRkUGxhY2VkU2hpcCgpO1xuICAgICAgICBpZihwbGF5ZXIucGxhY2VkU2hpcHMgPT09IDUpIHtcbiAgICAgICAgICBteVN0YXRzLmlubmVySFRNTCA9IGBQbGF5ZXIncyB0dXJuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBteVN0YXRzLmlubmVySFRNTCA9IGBQbGFjZSB5b3VyICR7cGxheWVyLmZsb2F0W3BsYXllci5wbGFjZWRTaGlwc10ubmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIG15U3RhdHMuaW5uZXJIVE1MID0gJ0ludmFsaWQgcGxhY2VtZW50JztcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHBsYXllci5wbGFjZWRTaGlwcyA9PT0gNSkge1xuICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcGxheUhhbmRsZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG5cbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sLCAxMCk7XG5cbiAgICAgICAgaWYocGxheWVyLnBsYWNlZFNoaXBzID09PSA1IHx8IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3U2hpcChwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkLCBwbGF5ZXIuZmxvYXRbcGxheWVyLnBsYWNlZFNoaXBzXS5sZW5ndGgsIHJvdywgY29sKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcblxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGUpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wsIDEwKTtcblxuICAgICAgICBpZihwbGF5ZXIucGxhY2VkU2hpcHMgPT09IDUgfHwgcGxheWVyLmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGhpZGVTaGlwKHBsYXllci5nYW1lYm9hcmQuYm9hcmQsIHBsYXllci5mbG9hdFtwbGF5ZXIucGxhY2VkU2hpcHNdLmxlbmd0aCwgcm93LCBjb2wpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBib2R5LCBsZWZ0Qm9hcmQsIG15U3RhdHMsIG9wcG9uZW50U3RhdHMsIHZlcnRpY2FsUGxhY2VtZW50LCBkcmF3Qm9hcmRzLCBjbGVhckJvYXJkcywgc3dpdGNoQXhpcywgcmVzZXQsIHVwZGF0ZVN0YXRzLCBzaG93R2FtZU92ZXJTY3JlZW4sIGFkZENlbGxMaXN0ZW5lcnMsIGFkZFJlc3RhcnRMaXN0ZW5lciwgYWRkU2hpcFBsYWNlbWVudExpc3RlbmVycyB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5OyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCJcbmltcG9ydCBEaXNwbGF5IGZyb20gXCIuL2Rpc3BsYXlcIjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgbGV0IHBsYXllciA9IFBsYXllcignUGxheWVyJyk7XG4gIGxldCBvcHBvbmVudCA9IFBsYXllcignQ29tcHV0ZXInKTtcbiAgY29uc3QgZGlzcGxheSA9IERpc3BsYXkoKTtcbiAgXG4gIGZ1bmN0aW9uIG5ld1R1cm4oYXR0YWNrZXIsIGRlZmVuZGVyLCByb3csIGNvbHVtbiwgZGVmZW5kZXJTdGF0cykge1xuICAgIGRpc3BsYXkudXBkYXRlU3RhdHMoZGVmZW5kZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pLCBkZWZlbmRlclN0YXRzKTtcbiAgICBpZihkZWZlbmRlci5pc0Zsb2F0U3VuaygpKSB7XG4gICAgICBkaXNwbGF5LnNob3dHYW1lT3ZlclNjcmVlbihhdHRhY2tlci5uYW1lKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgb3Bwb25lbnQucGxhY2VNeUZsb2F0KCk7XG4gICAgZGlzcGxheS5hZGRDZWxsTGlzdGVuZXJzKG9wcG9uZW50LCBwbGF5ZXIsIG5ld1R1cm4pO1xuICB9XG4gIFxuICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICBkaXNwbGF5LmRyYXdCb2FyZHMoKTtcbiAgICBkaXNwbGF5LmFkZFNoaXBQbGFjZW1lbnRMaXN0ZW5lcnMocGxheWVyLCBwbGF5KTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gcmVzdGFydCgpIHtcbiAgICBkaXNwbGF5LnJlc2V0KCk7XG4gICAgcGxheWVyID0gUGxheWVyKCdQbGF5ZXInKTtcbiAgICBvcHBvbmVudCA9IFBsYXllcignQ29tcHV0ZXInKTtcbiAgICBzdGFydCgpO1xuICB9XG5cbiAgZGlzcGxheS5hZGRSZXN0YXJ0TGlzdGVuZXIocmVzdGFydCk7XG5cbiAgZGlzcGxheS5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBpZihlLmtleSA9PT0gJ3InKSB7XG4gICAgICBBcnJheS5mcm9tKGRpc3BsYXkubGVmdEJvYXJkLmNoaWxkcmVuKS5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICBjb25zdCBjZWxsRGl2ID0gY2VsbDtcbiAgICAgICAgY29uc3Qge3Jvd30gPSBjZWxsRGl2LmRhdGFzZXQ7XG4gICAgICAgIGNvbnN0IHtjb2x9ID0gY2VsbERpdi5kYXRhc2V0O1xuICAgICAgICBpZihwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRpc3BsYXkuc3dpdGNoQXhpcygpO1xuICB9O1xufSk7XG5cbiAgcmV0dXJuIHsgc3RhcnQsIG5ld1R1cm4sIHJlc3RhcnQgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgXG4gICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgY29uc3QgdHJhY2tpbmdCb2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIFxuICAoKSA9PiBBcnJheSgxMCkuZmlsbChmYWxzZSkpO1xuXG4gIGZ1bmN0aW9uIGlzQ29vcmRpbmF0ZVRha2VuKHJvdywgY29sdW1uKSB7XG4gICAgcmV0dXJuIHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPdmVybGFwcGluZyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmKGlzVmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgaWYoYm9hcmRbcm93XVtjb2x1bW4raV0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgaWYoYm9hcmRbcm93K2ldW2NvbHVtbl0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHNoaXAubGVuZ3RoICsgY29sdW1uID4gMTA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzaGlwLmxlbmd0aCArIHJvdyA+IDEwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYoaXNPdXRPZkJvdW5kcyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hpcCBsZW5ndGggZXhjZWVkcyBib3VuZGFyaWVzJyk7XG4gICAgfSBlbHNlIGlmKGlzT3ZlcmxhcHBpbmcoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJsYXBwaW5nIG90aGVyIHNoaXAnKTtcbiAgICB9XG5cbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkgeyAgXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgYm9hcmRbcm93XVtjb2x1bW4raV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgYm9hcmRbcm93K2ldW2NvbHVtbl0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBpZih0cmFja2luZ0JvYXJkW3Jvd11bY29sdW1uXSA9PT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb29yZGluYXRlIGFscmVhZHkgaGl0Jyk7XG4gICAgfVxuXG4gICAgaWYoYm9hcmRbcm93XVtjb2x1bW5dICE9PSBudWxsKSB7XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KCk7XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBudWxsO1xuICAgICAgdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFyZVNoaXBzU3VuaygpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrPTEpIHtcbiAgICAgIGlmKCFib2FyZFtpXS5ldmVyeShlbGVtZW50ID0+IGVsZW1lbnQgPT09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZUZsb2F0KHNoaXBzKSB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgICBsZXQgaXNTaGlwUGxhY2VkID0gZmFsc2U7XG4gIFxuICAgICAgd2hpbGUgKCFpc1NoaXBQbGFjZWQpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBjb25zdCByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIFxuICAgICAgICBjb25zdCByYW5kb21BeGlzID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgXG4gICAgICAgIGlmICghaXNPdXRPZkJvdW5kcyhzaGlwLCByYW5kb21Sb3csIHJhbmRvbUNvbCwgISFyYW5kb21BeGlzKSkge1xuICAgICAgICAgIGlmICghaXNPdmVybGFwcGluZyhzaGlwLCByYW5kb21Sb3csIHJhbmRvbUNvbCwgISFyYW5kb21BeGlzKSkge1xuICAgICAgICAgICAgaWYocmFuZG9tQXhpcyA9PT0gMCkge1xuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hpcCwgcmFuZG9tUm93LCByYW5kb21Db2wsICEhcmFuZG9tQXhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hpcCwgcmFuZG9tUm93LCByYW5kb21Db2wsICEhcmFuZG9tQXhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlzU2hpcFBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4geyBib2FyZCwgdHJhY2tpbmdCb2FyZCwgaXNDb29yZGluYXRlVGFrZW4sIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYXJlU2hpcHNTdW5rLCBwbGFjZUZsb2F0IH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAoX25hbWUpID0+IHtcbiAgY29uc3QgbmFtZSA9IF9uYW1lO1xuXG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBcbiAgY29uc3QgZmxvYXQgPSBbXG4gICAgU2hpcCgnQ2FycmllcicsIDUpLFxuICAgIFNoaXAoJ0JhdHRsZXNoaXAnLCA0KSxcbiAgICBTaGlwKCdDcnVpc2VyJywgMyksXG4gICAgU2hpcCgnU3VibWFyaW5lJywgMyksXG4gICAgU2hpcCgnRGVzdHJveWVyJywgMilcbiAgXTtcblxuICBjb25zdCBwbGFjZWRTaGlwcyA9IDA7XG5cbiAgZnVuY3Rpb24gaXNGbG9hdFN1bmsoKSB7XG4gICAgcmV0dXJuIGZsb2F0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpID09PSB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlTXlGbG9hdCgpIHtcbiAgICBnYW1lYm9hcmQucGxhY2VGbG9hdChmbG9hdCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQbGFjZWRTaGlwKCkge1xuICAgIHRoaXMucGxhY2VkU2hpcHMgKz0gMTtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIGdhbWVib2FyZCwgZmxvYXQsIHBsYWNlZFNoaXBzLCBpc0Zsb2F0U3VuaywgcGxhY2VNeUZsb2F0LCBhZGRQbGFjZWRTaGlwIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjb25zdCBTaGlwID0gKF9uYW1lLCBfbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBfbmFtZTtcbiAgY29uc3QgbGVuZ3RoID0gX2xlbmd0aDtcbiAgY29uc3QgaGl0cyA9IDA7XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgbGVuZ3RoLCBoaXRzLCBpc1N1bmssIGhpdCB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZUNvbnRyb2xsZXJcIjtcblxuR2FtZSgpLnN0YXJ0KCk7Il0sIm5hbWVzIjpbIkRpc3BsYXkiLCJTSVpFIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxlZnRCb2FyZCIsImdldEVsZW1lbnRCeUlkIiwicmlnaHRCb2FyZCIsIm15U3RhdHMiLCJvcHBvbmVudFN0YXRzIiwib3ZlcmxheSIsIndpbm5lciIsImJ0blBsYXlBZ2FpbiIsInZlcnRpY2FsUGxhY2VtZW50IiwiZHJhd0JvYXJkcyIsImkiLCJqIiwibGVmdENlbGwiLCJjcmVhdGVFbGVtZW50IiwicmlnaHRDZWxsIiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsInJvdyIsImNvbCIsImFwcGVuZENoaWxkIiwiY2xlYXJCb2FyZHMiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJyZXNldCIsImlubmVySFRNTCIsInVwZGF0ZUNlbGwiLCJjZWxsIiwiZGl2IiwiY2VsbERpdiIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwidXBkYXRlU3RhdHMiLCJoaXQiLCJzdGF0c0RpdiIsImdldFBsYWNlaG9sZGVyIiwiYm9hcmQiLCJsZW5ndGgiLCJpc1ZlcnRpY2FsIiwiY2VsbHMiLCJjb25jYXQiLCJwdXNoIiwiZHJhd1NoaXAiLCJmb3JFYWNoIiwiaGlkZVNoaXAiLCJzd2l0Y2hBeGlzIiwic2hvd0dhbWVPdmVyU2NyZWVuIiwid2lubmVyTmFtZSIsImRpc3BsYXkiLCJhZGRDZWxsTGlzdGVuZXJzIiwib3Bwb25lbnQiLCJwbGF5ZXIiLCJoYW5kbGVUdXJuIiwiY2hpbGRyZW4iLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwYXJzZUludCIsInRhcmdldCIsImdhbWVib2FyZCIsImlzQ29vcmRpbmF0ZVRha2VuIiwicmFuZG9tUm93IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tQ29sIiwiYWRkUmVzdGFydExpc3RlbmVyIiwicmVzdGFydEhhbmRsZXIiLCJhZGRTaGlwUGxhY2VtZW50TGlzdGVuZXJzIiwicGxheUhhbmRsZXIiLCJwbGFjZWRTaGlwcyIsInBsYWNlU2hpcCIsImFkZFBsYWNlZFNoaXAiLCJuYW1lIiwiX3VudXNlZCIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsIlBsYXllciIsIkdhbWUiLCJuZXdUdXJuIiwiYXR0YWNrZXIiLCJkZWZlbmRlciIsImNvbHVtbiIsImRlZmVuZGVyU3RhdHMiLCJyZWNlaXZlQXR0YWNrIiwiaXNGbG9hdFN1bmsiLCJwbGF5IiwicGxhY2VNeUZsb2F0Iiwic3RhcnQiLCJyZXN0YXJ0Iiwia2V5IiwiR2FtZWJvYXJkIiwiZmlsbCIsInRyYWNraW5nQm9hcmQiLCJpc092ZXJsYXBwaW5nIiwic2hpcCIsImlzT3V0T2ZCb3VuZHMiLCJFcnJvciIsImFyZVNoaXBzU3VuayIsImV2ZXJ5IiwiZWxlbWVudCIsInBsYWNlRmxvYXQiLCJzaGlwcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJ2YWx1ZSIsImlzU2hpcFBsYWNlZCIsInJhbmRvbUF4aXMiLCJyb3VuZCIsImVyciIsImYiLCJTaGlwIiwiX25hbWUiLCJmbG9hdCIsImlzU3VuayIsIl9sZW5ndGgiLCJoaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==