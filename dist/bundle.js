/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar SIZE = 10;\nvar Display = function Display() {\n  var leftBoard = document.getElementById('left-board');\n  var rightBoard = document.getElementById('right-board');\n  function drawBoards() {\n    for (var i = 0; i < SIZE; i += 1) {\n      for (var j = 0; j < SIZE; j += 1) {\n        var leftCell = document.createElement('div');\n        var rightCell = document.createElement('div');\n        leftCell.className = 'cell';\n        rightCell.className = 'cell';\n        leftCell.dataset.row = i;\n        leftCell.dataset.col = j;\n        rightCell.dataset.row = i;\n        rightCell.dataset.col = j;\n        leftBoard.appendChild(leftCell);\n        rightBoard.appendChild(rightCell);\n      }\n    }\n  }\n  return {\n    drawBoards: drawBoards\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);\n\n//# sourceURL=webpack://battleship/./src/display.js?");

/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ \"./src/display.js\");\n\n\nvar Game = function Game() {\n  var player = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var opponent = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var display = (0,_display__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  var activeDefender = opponent;\n  function initGame() {\n    player.placeMyFloat();\n    opponent.placeMyFloat();\n    display.drawBoards();\n  }\n  function playerTurn(defender, row, column) {\n    defender.gameboard.receiveAttack(row, column);\n  }\n  function play() {\n    initGame();\n  }\n  return {\n    play: play,\n    playerTurn: playerTurn\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack://battleship/./src/gameController.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Gameboard = function Gameboard() {\n  var board = Array.from({\n    length: 10\n  }, function () {\n    return Array(10).fill(null);\n  });\n  var trackingBoard = Array.from({\n    length: 10\n  }, function () {\n    return Array(10).fill(false);\n  });\n  function isOverlapping(ship, row, column, isVertical) {\n    if (isVertical === false) {\n      for (var i = 0; i < ship.length; i += 1) {\n        if (board[row][column + i] !== null) {\n          return true;\n        }\n      }\n    } else {\n      for (var _i = 0; _i < ship.length; _i += 1) {\n        if (board[row + _i][column] !== null) {\n          return true;\n        }\n      }\n    }\n    return false;\n  }\n  function isOutOfBounds(ship, row, column, isVertical) {\n    if (isVertical === false) {\n      return ship.length + column > 10;\n    }\n    return ship.length + row > 10;\n  }\n  function placeShip(ship, row, column, isVertical) {\n    if (isOutOfBounds(ship, row, column, isVertical)) {\n      throw new Error('Ship length exceeds boundaries');\n    } else if (isOverlapping(ship, row, column, isVertical)) {\n      throw new Error('Overlapping other ship');\n    }\n    if (isVertical === false) {\n      for (var i = 0; i < ship.length; i += 1) {\n        board[row][column + i] = ship;\n      }\n    } else {\n      for (var _i2 = 0; _i2 < ship.length; _i2 += 1) {\n        board[row + _i2][column] = ship;\n      }\n    }\n  }\n  function receiveAttack(row, column) {\n    if (trackingBoard[row][column] === true) {\n      throw new Error('Coordinate already hit');\n    }\n    if (board[row][column] !== null) {\n      board[row][column].hit();\n      board[row][column] = null;\n    }\n    trackingBoard[row][column] = true;\n  }\n  function areShipsSunk() {\n    for (var i = 0; i < 10; i += 1) {\n      if (!board[i].every(function (element) {\n        return element === null;\n      })) {\n        return false;\n      }\n    }\n    return true;\n  }\n  function placeFloat(ships) {\n    for (var i = 0; i < ships.length; i += 1) {\n      placeShip(ships[i], 0, i, true);\n    }\n  }\n  return {\n    board: board,\n    trackingBoard: trackingBoard,\n    placeShip: placeShip,\n    receiveAttack: receiveAttack,\n    areShipsSunk: areShipsSunk,\n    placeFloat: placeFloat\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ \"./src/gameController.js\");\n\n(0,_gameController__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().play();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* eslint-disable no-restricted-syntax */\n\n\nvar Player = function Player() {\n  var gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var _float = [(0,_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(5), (0,_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(4), (0,_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(2)];\n  function isFloatSunk() {\n    Array.from(_float).every(function (ship) {\n      return ship.isSunk() === true;\n    });\n  }\n  function placeMyFloat() {\n    var myFloat = [];\n    _float.forEach(function (ship) {\n      return myFloat.push(ship);\n    });\n    gameboard.placeFloat(myFloat);\n  }\n  return {\n    gameboard: gameboard,\n    \"float\": _float,\n    isFloatSunk: isFloatSunk,\n    placeMyFloat: placeMyFloat\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable no-unused-vars */\n\nvar Ship = function Ship(_length) {\n  var length = _length;\n  var hits = 0;\n  function isSunk() {\n    return hits === length;\n  }\n  function hit() {\n    hits += 1;\n  }\n  return {\n    length: length,\n    isSunk: isSunk,\n    hit: hit\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;