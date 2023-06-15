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
var SIZE = 10;
var Display = function Display() {
  var leftBoard = document.getElementById('left-board');
  var rightBoard = document.getElementById('right-board');
  var myStats = document.getElementById('left-stats');
  var opponentStats = document.getElementById('right-stats');
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
  function addCellListeners(gameboard, handleTurn) {
    var cells = document.getElementById('right-board');
    var children = Array.from(cells.childNodes);
    children.forEach(function (cell) {
      cell.addEventListener('click', function (e) {
        var row = parseInt(e.target.dataset.row, 10);
        var col = parseInt(e.target.dataset.col, 10);
        if (gameboard.board[row][col] !== null) {
          e.target.style.backgroundColor = 'pink';
        } else {
          e.target.style.backgroundColor = 'gray';
        }
        handleTurn(gameboard, row, col);
        e.target.innerHTML = '●';
      });
    });
  }
  return {
    myStats: myStats,
    opponentStats: opponentStats,
    drawBoards: drawBoards,
    addCellListeners: addCellListeners
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
  var player = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var opponent = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var display = (0,_display__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var activeDefender = opponent;
  function playerTurn(defender, row, column) {
    if (defender.receiveAttack(row, column)) {
      display.opponentStats.innerHTML = "It's a hit!";
    } else {
      display.opponentStats.innerHTML = "No hit";
    }
    ;
    if (activeDefender === opponent) {
      activeDefender = player;
    } else {
      activeDefender = opponent;
    }
  }
  function initGame() {
    player.placeMyFloat();
    opponent.placeMyFloat();
    display.drawBoards();
    display.addCellListeners(activeDefender.gameboard, playerTurn);
  }
  function play() {
    initGame();
  }
  return {
    play: play,
    playerTurn: playerTurn
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


var Player = function Player() {
  var gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var _float = [(0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(5), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(4), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(2)];
  function isFloatSunk() {
    _float.every(function (ship) {
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
    return hits === length;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNJWkUgPSAxMDtcblxuY29uc3QgRGlzcGxheSA9ICgpID0+IHtcbiAgY29uc3QgbGVmdEJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZnQtYm9hcmQnKTtcbiAgY29uc3QgcmlnaHRCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWdodC1ib2FyZCcpO1xuICBjb25zdCBteVN0YXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZnQtc3RhdHMnKTtcbiAgY29uc3Qgb3Bwb25lbnRTdGF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWdodC1zdGF0cycpO1xuXG4gIGZ1bmN0aW9uIGRyYXdCb2FyZHMoKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IFNJWkU7IGkgKz0gMSkge1xuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IFNJWkU7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBsZWZ0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCByaWdodENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGVmdENlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuICAgICAgICByaWdodENlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuICAgICAgICBsZWZ0Q2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIGxlZnRDZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgcmlnaHRDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgcmlnaHRDZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgbGVmdEJvYXJkLmFwcGVuZENoaWxkKGxlZnRDZWxsKTtcbiAgICAgICAgcmlnaHRCb2FyZC5hcHBlbmRDaGlsZChyaWdodENlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENlbGxMaXN0ZW5lcnMoZ2FtZWJvYXJkLCBoYW5kbGVUdXJuKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtYm9hcmQnKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LmZyb20oY2VsbHMuY2hpbGROb2Rlcyk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbiAgICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgICAgaWYoZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3BpbmsnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JheSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGhhbmRsZVR1cm4oZ2FtZWJvYXJkLCByb3csIGNvbCk7XG4gICAgICAgICAgZS50YXJnZXQuaW5uZXJIVE1MID0gJ+KXjyc7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBteVN0YXRzLCBvcHBvbmVudFN0YXRzLCBkcmF3Qm9hcmRzLCBhZGRDZWxsTGlzdGVuZXJzIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BsYXk7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIlxuaW1wb3J0IERpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgY29uc3Qgb3Bwb25lbnQgPSBQbGF5ZXIoKTtcbiAgY29uc3QgZGlzcGxheSA9IERpc3BsYXkoKTtcblxuICBsZXQgYWN0aXZlRGVmZW5kZXIgPSBvcHBvbmVudDtcbiAgXG4gIGZ1bmN0aW9uIHBsYXllclR1cm4oZGVmZW5kZXIsIHJvdywgY29sdW1uKSB7XG4gICAgICBpZihkZWZlbmRlci5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSkge1xuICAgICAgICBkaXNwbGF5Lm9wcG9uZW50U3RhdHMuaW5uZXJIVE1MID0gYEl0J3MgYSBoaXQhYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BsYXkub3Bwb25lbnRTdGF0cy5pbm5lckhUTUwgPSBgTm8gaGl0YDtcbiAgICAgIH07XG5cbiAgICAgIGlmKGFjdGl2ZURlZmVuZGVyID09PSBvcHBvbmVudCkge1xuICAgICAgICBhY3RpdmVEZWZlbmRlciA9IHBsYXllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZURlZmVuZGVyID0gb3Bwb25lbnQ7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0R2FtZSgpIHtcbiAgICBwbGF5ZXIucGxhY2VNeUZsb2F0KCk7XG4gICAgb3Bwb25lbnQucGxhY2VNeUZsb2F0KCk7XG4gICAgZGlzcGxheS5kcmF3Qm9hcmRzKCk7XG4gICAgZGlzcGxheS5hZGRDZWxsTGlzdGVuZXJzKGFjdGl2ZURlZmVuZGVyLmdhbWVib2FyZCwgcGxheWVyVHVybik7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgaW5pdEdhbWUoKTtcbiAgfVxuXG5cbiAgcmV0dXJuIHsgcGxheSwgcGxheWVyVHVybiB9ICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJcbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCBcbiAgKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICBjb25zdCB0cmFja2luZ0JvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgXG4gICgpID0+IEFycmF5KDEwKS5maWxsKGZhbHNlKSk7XG5cbiAgZnVuY3Rpb24gaXNPdmVybGFwcGluZyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmKGlzVmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgaWYoYm9hcmRbcm93XVtjb2x1bW4raV0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgaWYoYm9hcmRbcm93K2ldW2NvbHVtbl0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHNoaXAubGVuZ3RoICsgY29sdW1uID4gMTA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzaGlwLmxlbmd0aCArIHJvdyA+IDEwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYoaXNPdXRPZkJvdW5kcyhzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hpcCBsZW5ndGggZXhjZWVkcyBib3VuZGFyaWVzJyk7XG4gICAgfSBlbHNlIGlmKGlzT3ZlcmxhcHBpbmcoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJsYXBwaW5nIG90aGVyIHNoaXAnKTtcbiAgICB9XG5cbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkgeyAgXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgYm9hcmRbcm93XVtjb2x1bW4raV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgYm9hcmRbcm93K2ldW2NvbHVtbl0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBpZih0cmFja2luZ0JvYXJkW3Jvd11bY29sdW1uXSA9PT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb29yZGluYXRlIGFscmVhZHkgaGl0Jyk7XG4gICAgfVxuXG4gICAgaWYoYm9hcmRbcm93XVtjb2x1bW5dICE9PSBudWxsKSB7XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KCk7XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBudWxsO1xuICAgICAgdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFyZVNoaXBzU3VuaygpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrPTEpIHtcbiAgICAgIGlmKCFib2FyZFtpXS5ldmVyeShlbGVtZW50ID0+IGVsZW1lbnQgPT09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZUZsb2F0KHNoaXBzKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSs9MSkge1xuICAgICAgcGxhY2VTaGlwKHNoaXBzW2ldLCAwLCBpLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBib2FyZCwgdHJhY2tpbmdCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhcmVTaGlwc1N1bmssIHBsYWNlRmxvYXQgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIFxuICBjb25zdCBmbG9hdCA9IFtcbiAgICBTaGlwKDUpLFxuICAgIFNoaXAoNCksXG4gICAgU2hpcCgzKSxcbiAgICBTaGlwKDMpLFxuICAgIFNoaXAoMilcbiAgXTtcblxuICBmdW5jdGlvbiBpc0Zsb2F0U3VuaygpIHtcbiAgICBmbG9hdC5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZU15RmxvYXQoKSB7XG4gICAgY29uc3QgbXlGbG9hdCA9IFtdO1xuICAgIGZsb2F0LmZvckVhY2goc2hpcCA9PiBteUZsb2F0LnB1c2goc2hpcCkpO1xuXG4gICAgZ2FtZWJvYXJkLnBsYWNlRmxvYXQobXlGbG9hdCk7XG4gIH1cblxuICByZXR1cm4geyBnYW1lYm9hcmQsIGZsb2F0LCBpc0Zsb2F0U3VuaywgcGxhY2VNeUZsb2F0IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5jb25zdCBTaGlwID0gKF9sZW5ndGgpID0+IHtcbiAgY29uc3QgbGVuZ3RoID0gX2xlbmd0aDtcbiAgY29uc3QgaGl0cyA9IDA7XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiBoaXRzID09PSBsZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICByZXR1cm4geyBsZW5ndGgsIGhpdHMsIGlzU3VuaywgaGl0IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lQ29udHJvbGxlclwiO1xuXG5HYW1lKCkucGxheSgpOyJdLCJuYW1lcyI6WyJTSVpFIiwiRGlzcGxheSIsImxlZnRCb2FyZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyaWdodEJvYXJkIiwibXlTdGF0cyIsIm9wcG9uZW50U3RhdHMiLCJkcmF3Qm9hcmRzIiwiaSIsImoiLCJsZWZ0Q2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJyaWdodENlbGwiLCJjbGFzc05hbWUiLCJkYXRhc2V0Iiwicm93IiwiY29sIiwiYXBwZW5kQ2hpbGQiLCJhZGRDZWxsTGlzdGVuZXJzIiwiZ2FtZWJvYXJkIiwiaGFuZGxlVHVybiIsImNlbGxzIiwiY2hpbGRyZW4iLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZm9yRWFjaCIsImNlbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInBhcnNlSW50IiwidGFyZ2V0IiwiYm9hcmQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImlubmVySFRNTCIsIlBsYXllciIsIkdhbWUiLCJwbGF5ZXIiLCJvcHBvbmVudCIsImRpc3BsYXkiLCJhY3RpdmVEZWZlbmRlciIsInBsYXllclR1cm4iLCJkZWZlbmRlciIsImNvbHVtbiIsInJlY2VpdmVBdHRhY2siLCJpbml0R2FtZSIsInBsYWNlTXlGbG9hdCIsInBsYXkiLCJHYW1lYm9hcmQiLCJsZW5ndGgiLCJmaWxsIiwidHJhY2tpbmdCb2FyZCIsImlzT3ZlcmxhcHBpbmciLCJzaGlwIiwiaXNWZXJ0aWNhbCIsImlzT3V0T2ZCb3VuZHMiLCJwbGFjZVNoaXAiLCJFcnJvciIsImhpdCIsImFyZVNoaXBzU3VuayIsImV2ZXJ5IiwiZWxlbWVudCIsInBsYWNlRmxvYXQiLCJzaGlwcyIsIlNoaXAiLCJmbG9hdCIsImlzRmxvYXRTdW5rIiwiaXNTdW5rIiwibXlGbG9hdCIsInB1c2giLCJfbGVuZ3RoIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=