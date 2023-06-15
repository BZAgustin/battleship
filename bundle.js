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
  function addCellListeners(opponent, player, handleTurn) {
    var cells = document.getElementById('right-board');
    var children = Array.from(cells.childNodes);
    children.forEach(function (cell) {
      cell.addEventListener('click', function (e) {
        var row = parseInt(e.target.dataset.row, 10);
        var col = parseInt(e.target.dataset.col, 10);
        updateCell(opponent.gameboard.board[row][col], e.target);
        handleTurn(opponent, row, col, opponentStats);
        var randomRow = Math.floor(Math.random() * 10);
        var randomCol = Math.floor(Math.random() * 10);
        updateCell(player.gameboard.board[randomRow][randomCol], leftBoard.querySelector("[data-row=\"".concat(randomRow, "\"][data-col=\"").concat(randomCol, "\"]")));
        handleTurn(player, randomRow, randomCol, myStats);
      });
    });
  }
  return {
    myStats: myStats,
    opponentStats: opponentStats,
    drawBoards: drawBoards,
    updateStats: updateStats,
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
  function newTurn(defender, row, column, defenderStats) {
    display.updateStats(defender.gameboard.receiveAttack(row, column), defenderStats);
  }
  function initGame() {
    player.placeMyFloat();
    opponent.placeMyFloat();
    display.drawBoards();
    display.addCellListeners(opponent, player, newTurn);
  }
  function play() {
    initGame();
  }
  return {
    play: play,
    newTurn: newTurn
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPSSxJQUFJLEtBQUtyQixNQUFNO0VBQ3hCO0VBRUEsU0FBU3JDLEdBQUdBLENBQUEsRUFBRztJQUNiLElBQUksQ0FBQzBELElBQUksSUFBSSxDQUFDO0VBQ2hCO0VBRUEsT0FBTztJQUFFckIsTUFBTSxFQUFOQSxNQUFNO0lBQUVxQixJQUFJLEVBQUpBLElBQUk7SUFBRUosTUFBTSxFQUFOQSxNQUFNO0lBQUV0RCxHQUFHLEVBQUhBO0VBQUksQ0FBQztBQUN0QyxDQUFDO0FBRUQsaUVBQWVtRCxJQUFJOzs7Ozs7VUNqQm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFFcEN6QiwyREFBSSxDQUFDLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBEaXNwbGF5ID0gKCkgPT4ge1xuICBjb25zdCBTSVpFID0gMTA7XG4gIGNvbnN0IGxlZnRCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0LWJvYXJkJyk7XG4gIGNvbnN0IHJpZ2h0Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtYm9hcmQnKTtcbiAgY29uc3QgbXlTdGF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0LXN0YXRzJyk7XG4gIGNvbnN0IG9wcG9uZW50U3RhdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtc3RhdHMnKTtcblxuICBmdW5jdGlvbiBkcmF3Qm9hcmRzKCkge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBTSVpFOyBpICs9IDEpIHtcbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBTSVpFOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgbGVmdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcmlnaHRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxlZnRDZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgcmlnaHRDZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgbGVmdENlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICBsZWZ0Q2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIHJpZ2h0Q2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIHJpZ2h0Q2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIGxlZnRCb2FyZC5hcHBlbmRDaGlsZChsZWZ0Q2VsbCk7XG4gICAgICAgIHJpZ2h0Qm9hcmQuYXBwZW5kQ2hpbGQocmlnaHRDZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDZWxsKGNlbGwsIGRpdikge1xuICAgIGNvbnN0IGNlbGxEaXYgPSBkaXY7XG5cbiAgICBpZihjZWxsICE9PSBudWxsKSB7XG4gICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdwaW5rJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JheSc7XG4gICAgfVxuXG4gICAgY2VsbERpdi5pbm5lckhUTUwgPSAn4pePJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVN0YXRzKGhpdCwgZGl2KSB7XG4gICAgY29uc3Qgc3RhdHNEaXYgPSBkaXY7XG5cbiAgICBpZihoaXQpIHtcbiAgICAgIHN0YXRzRGl2LmlubmVySFRNTCA9IGBJdCdzIGEgaGl0IWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRzRGl2LmlubmVySFRNTCA9IGBObyBoaXRgO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgaGFuZGxlVHVybikge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LWJvYXJkJyk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGNlbGxzLmNoaWxkTm9kZXMpO1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuXG4gICAgICAgIHVwZGF0ZUNlbGwob3Bwb25lbnQuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSwgZS50YXJnZXQpO1xuICAgICAgICBoYW5kbGVUdXJuKG9wcG9uZW50LCByb3csIGNvbCwgb3Bwb25lbnRTdGF0cyk7XG5cbiAgICAgICAgY29uc3QgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApOyBcbiAgICAgICAgY29uc3QgcmFuZG9tQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICAgIHVwZGF0ZUNlbGwocGxheWVyLmdhbWVib2FyZC5ib2FyZFtyYW5kb21Sb3ddW3JhbmRvbUNvbF0sIGxlZnRCb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3JhbmRvbVJvd31cIl1bZGF0YS1jb2w9XCIke3JhbmRvbUNvbH1cIl1gKSk7XG4gICAgICAgIGhhbmRsZVR1cm4ocGxheWVyLCByYW5kb21Sb3csIHJhbmRvbUNvbCwgbXlTdGF0cyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7IG15U3RhdHMsIG9wcG9uZW50U3RhdHMsIGRyYXdCb2FyZHMsIHVwZGF0ZVN0YXRzLCBhZGRDZWxsTGlzdGVuZXJzIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BsYXk7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIlxuaW1wb3J0IERpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgY29uc3Qgb3Bwb25lbnQgPSBQbGF5ZXIoKTtcbiAgY29uc3QgZGlzcGxheSA9IERpc3BsYXkoKTtcblxuICBmdW5jdGlvbiBuZXdUdXJuKGRlZmVuZGVyLCByb3csIGNvbHVtbiwgZGVmZW5kZXJTdGF0cykge1xuICAgIGRpc3BsYXkudXBkYXRlU3RhdHMoZGVmZW5kZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pLCBkZWZlbmRlclN0YXRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRHYW1lKCkge1xuICAgIHBsYXllci5wbGFjZU15RmxvYXQoKTtcbiAgICBvcHBvbmVudC5wbGFjZU15RmxvYXQoKTtcbiAgICBkaXNwbGF5LmRyYXdCb2FyZHMoKTtcbiAgICBkaXNwbGF5LmFkZENlbGxMaXN0ZW5lcnMob3Bwb25lbnQsIHBsYXllciwgbmV3VHVybik7XG4gIH1cblxuICBmdW5jdGlvbiBwbGF5KCkge1xuICAgIGluaXRHYW1lKCk7XG4gIH1cblxuXG4gIHJldHVybiB7IHBsYXksIG5ld1R1cm4gfSAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgXG4gICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgY29uc3QgdHJhY2tpbmdCb2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIFxuICAoKSA9PiBBcnJheSgxMCkuZmlsbChmYWxzZSkpO1xuXG4gIGZ1bmN0aW9uIGlzT3ZlcmxhcHBpbmcoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZihpc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGlmKGJvYXJkW3Jvd11bY29sdW1uK2ldICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGlmKGJvYXJkW3JvdytpXVtjb2x1bW5dICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBpc091dE9mQm91bmRzKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYoaXNWZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBzaGlwLmxlbmd0aCArIGNvbHVtbiA+IDEwO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc2hpcC5sZW5ndGggKyByb3cgPiAxMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmKGlzT3V0T2ZCb3VuZHMoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoaXAgbGVuZ3RoIGV4Y2VlZHMgYm91bmRhcmllcycpO1xuICAgIH0gZWxzZSBpZihpc092ZXJsYXBwaW5nKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdmVybGFwcGluZyBvdGhlciBzaGlwJyk7XG4gICAgfVxuXG4gICAgaWYoaXNWZXJ0aWNhbCA9PT0gZmFsc2UpIHsgIFxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGJvYXJkW3Jvd11bY29sdW1uK2ldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgIGJvYXJkW3JvdytpXVtjb2x1bW5dID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgaWYodHJhY2tpbmdCb2FyZFtyb3ddW2NvbHVtbl0gPT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29vcmRpbmF0ZSBhbHJlYWR5IGhpdCcpO1xuICAgIH1cblxuICAgIGlmKGJvYXJkW3Jvd11bY29sdW1uXSAhPT0gbnVsbCkge1xuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gbnVsbDtcbiAgICAgIHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRyYWNraW5nQm9hcmRbcm93XVtjb2x1bW5dID0gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBhcmVTaGlwc1N1bmsoKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKz0xKSB7XG4gICAgICBpZighYm9hcmRbaV0uZXZlcnkoZWxlbWVudCA9PiBlbGVtZW50ID09PSBudWxsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VGbG9hdChzaGlwcykge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrPTEpIHtcbiAgICAgIHBsYWNlU2hpcChzaGlwc1tpXSwgMCwgaSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgYm9hcmQsIHRyYWNraW5nQm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYXJlU2hpcHNTdW5rLCBwbGFjZUZsb2F0IH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBcbiAgY29uc3QgZmxvYXQgPSBbXG4gICAgU2hpcCg1KSxcbiAgICBTaGlwKDQpLFxuICAgIFNoaXAoMyksXG4gICAgU2hpcCgzKSxcbiAgICBTaGlwKDIpXG4gIF07XG5cbiAgZnVuY3Rpb24gaXNGbG9hdFN1bmsoKSB7XG4gICAgZmxvYXQuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT09IHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VNeUZsb2F0KCkge1xuICAgIGNvbnN0IG15RmxvYXQgPSBbXTtcbiAgICBmbG9hdC5mb3JFYWNoKHNoaXAgPT4gbXlGbG9hdC5wdXNoKHNoaXApKTtcblxuICAgIGdhbWVib2FyZC5wbGFjZUZsb2F0KG15RmxvYXQpO1xuICB9XG5cbiAgcmV0dXJuIHsgZ2FtZWJvYXJkLCBmbG9hdCwgaXNGbG9hdFN1bmssIHBsYWNlTXlGbG9hdCB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuY29uc3QgU2hpcCA9IChfbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IF9sZW5ndGg7XG4gIGNvbnN0IGhpdHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gaGl0cyA9PT0gbGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXRzLCBpc1N1bmssIGhpdCB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZUNvbnRyb2xsZXJcIjtcblxuR2FtZSgpLnBsYXkoKTsiXSwibmFtZXMiOlsiRGlzcGxheSIsIlNJWkUiLCJsZWZ0Qm9hcmQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmlnaHRCb2FyZCIsIm15U3RhdHMiLCJvcHBvbmVudFN0YXRzIiwiZHJhd0JvYXJkcyIsImkiLCJqIiwibGVmdENlbGwiLCJjcmVhdGVFbGVtZW50IiwicmlnaHRDZWxsIiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsInJvdyIsImNvbCIsImFwcGVuZENoaWxkIiwidXBkYXRlQ2VsbCIsImNlbGwiLCJkaXYiLCJjZWxsRGl2Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJpbm5lckhUTUwiLCJ1cGRhdGVTdGF0cyIsImhpdCIsInN0YXRzRGl2IiwiYWRkQ2VsbExpc3RlbmVycyIsIm9wcG9uZW50IiwicGxheWVyIiwiaGFuZGxlVHVybiIsImNlbGxzIiwiY2hpbGRyZW4iLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJnYW1lYm9hcmQiLCJib2FyZCIsInJhbmRvbVJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbUNvbCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25jYXQiLCJQbGF5ZXIiLCJHYW1lIiwiZGlzcGxheSIsIm5ld1R1cm4iLCJkZWZlbmRlciIsImNvbHVtbiIsImRlZmVuZGVyU3RhdHMiLCJyZWNlaXZlQXR0YWNrIiwiaW5pdEdhbWUiLCJwbGFjZU15RmxvYXQiLCJwbGF5IiwiR2FtZWJvYXJkIiwibGVuZ3RoIiwiZmlsbCIsInRyYWNraW5nQm9hcmQiLCJpc092ZXJsYXBwaW5nIiwic2hpcCIsImlzVmVydGljYWwiLCJpc091dE9mQm91bmRzIiwicGxhY2VTaGlwIiwiRXJyb3IiLCJhcmVTaGlwc1N1bmsiLCJldmVyeSIsImVsZW1lbnQiLCJwbGFjZUZsb2F0Iiwic2hpcHMiLCJTaGlwIiwiZmxvYXQiLCJpc0Zsb2F0U3VuayIsImlzU3VuayIsIm15RmxvYXQiLCJwdXNoIiwiX2xlbmd0aCIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9