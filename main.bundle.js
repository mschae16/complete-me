/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Trie__ = __webpack_require__(1);


const userInput = document.querySelector('.input-field')
const searchBtn = document.querySelector('.search-btn')


userInput.addEventListener('input', filterThroughList)
searchBtn.addEventListener('click', appendList)

function filterThroughList () {
  console.log('working')
}

function appendList () {
  console.log('clicked')
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Node__ = __webpack_require__(2);


class Trie {
  constructor () {
    this.root = null
    this.wordCount = 0
  }

  insert(word) {
    const node = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* default */]()

    if (!this.root) {
      this.root = node
    }

    let letters = [...word.toLowerCase()]
    let currentNode = this.root

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* default */](letter)
      }
      currentNode = currentNode.children[letter]
    })

    if (!currentNode.isWord) {
      currentNode.isWord = true
      this.wordCount++
    }
  }

  count () {
    return this.wordCount
  }

  suggest (data) {
    let letters = [...data.toLowerCase()]
    let currentNode = this.root
    let suggestions = []

    letters.forEach(letter => {
      currentNode = currentNode.children[letter]
    })

    const traverseTrie = (data, currentNode) => {
      let keys = Object.keys(currentNode.children)

      for(let i = 0; i < keys.length; i++) {
        const child = currentNode.children[keys[i]]
        let newString = data + child.letter

        if (child.isWord) {
          suggestions.push({word: newString,
                            frequency: child.frequency,
                            lastSelected: child.lastSelected})
        }
        traverseTrie(newString, child)
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestions.push({word: data,
                        frequency: currentNode.frequency,
                        lastSelected: currentNode.lastSelected})
    }

    if(currentNode) {
      traverseTrie(data, currentNode)
    }

    console.log('suggestions before sort', suggestions)

    suggestions.sort((a, b) => {
      return b.frequency - a.frequency || b.lastSelected - a.lastSelected
    })

    console.log('suggestions after sort', suggestions)

    return suggestions.map(object => {
      return object.word
    })
  }

  select(word) {
    let wordsArray = [...word]
    let currentNode = this.root

    wordsArray.forEach(letter => {
      currentNode = currentNode.children[letter]
    })
    currentNode.frequency++
    currentNode.lastSelected = new Date()
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word)
    })
  }


}
/* unused harmony export default */



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Node {
  constructor (letter = null) {
    this.letter = letter
    this.isWord = false
    this.children = {}
    this.frequency = 0
    this.lastSelected = new Date(1986, 1, 1)
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Node;



/***/ })
/******/ ]);