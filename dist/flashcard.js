(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var dataManager = require('./data-manager');
var wordList = dataManager.data;

var _require = require('./pages'),
    MainPage = _require.MainPage,
    TestPage = _require.TestPage,
    AnswerPage = _require.AnswerPage;

module.exports = {
	el: "#app",

	template: '\n    <div class="app">\n      <div class="title">\n        Vue Flash Card\n        <main-page v-if="currentPage === \'mainPage\'"></main-page>\n        <test-page v-if="currentPage === \'testPage\'"></test-page>\n        <answer-page v-if="currentPage === \'answerPage\'"></answer-page>\n      </div>\n    </div>\n  ',

	components: { MainPage: MainPage, TestPage: TestPage, AnswerPage: AnswerPage },

	data: {
		wordList: wordList,
		currentPage: "mainPage",
		newEnglish: "",
		newJapanese: "",
		test: {
			wordList: [],
			wordCount: 0
		}
	},

	computed: {
		normalWordList: function normalWordList() {
			return this.wordList.filter(function (element) {
				return !element.done;
			});
		},
		clearedWordList: function clearedWordList() {
			return this.wordList.filter(function (element) {
				return element.done && element.cleared;
			});
		},
		notClearedWordList: function notClearedWordList() {
			return this.wordList.filter(function (element) {
				return element.done && !element.cleared;
			});
		}
	},

	methods: {
		addNewWord: function addNewWord() {
			if (this.newEnglish != "" && this.newJapanese != "") {
				this.wordList.push({ english: this.newEnglish, japanese: this.newJapanese, done: false, cleared: false });
				this.newEnglish = "";
				this.newJapanese = "";
			}
		},
		startTest: function startTest() {
			this.test.wordCount = 0;
			this.test.wordList = this.normalWordList.concat(this.notClearedWordList);
			if (this.test.wordList.length != 0) {
				this.currentPage = "testPage";
			}
		},
		endTest: function endTest() {
			this.currentPage = "mainPage";
		},
		goNext: function goNext() {
			this.test.wordList[this.test.wordCount].done = true;
			if (this.currentPage === "testPage") {
				this.test.wordList[this.test.wordCount].cleared = true;
			}
			if (this.test.wordCount + 1 === this.test.wordList.length) {
				this.currentPage = "mainPage";
			} else {
				this.test.wordCount += 1;
				this.currentPage = "testPage";
			}
		},
		showAnswer: function showAnswer() {
			this.currentPage = "answerPage";
		}
	},

	updated: function updated() {
		dataManager.save();
	}
};

},{"./data-manager":2,"./pages":4}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storageKey = "wordList";
var _data = void 0;

var DataManager = function () {
  function DataManager() {
    _classCallCheck(this, DataManager);

    this.load();
  }

  _createClass(DataManager, [{
    key: "load",
    value: function load() {
      _data = localStorage.getItem(storageKey) || [];
    }
  }, {
    key: "save",
    value: function save() {
      localStorage.setItem(storageKey, JSON.stringify(this.data));
    }
  }, {
    key: "data",
    get: function get() {
      return _data;
    }
  }]);

  return DataManager;
}();

module.exports = new DataManager();

},{}],3:[function(require,module,exports){
"use strict";

module.exports = {
  template: "\n    <div>\n      <div class=\"testEndButton\">\n        <form @submit.prevent=\"endTest\">\n          <button type=\"submit\">\u30C6\u30B9\u30C8\u7D42\u4E86</button>\n        </form>\n      </div>\n      <div class=\"testContainer\">\n        <div class=\"list test\">\n          <div class=\"listLabel\">\n            Test Card\n          </div>\n          <div class=\"word\">\n            {{test.wordList[test.wordCount].english}}\n            {{test.wordList[test.wordCount].japanese}}\n            <div class=\"tfButtons\">\n              <div class=\"tButton\">\n                <button @click=\"goNext\">\u6B21\u306E\u5358\u8A9E\u3078</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
};

},{}],4:[function(require,module,exports){
'use strict';

var MainPage = require('./main');
var AnswerPage = require('./answer');
var TestPage = require('./test');

module.exports = { MainPage: MainPage, AnswerPage: AnswerPage, TestPage: TestPage };

},{"./answer":3,"./main":5,"./test":6}],5:[function(require,module,exports){
"use strict";

module.exports = {
  template: "\n    <div>\n      <div class=\"testStartButton\">\n        <button @click=\"startTest\">\u30C6\u30B9\u30C8\u30B9\u30BF\u30FC\u30C8</button>\n      </div>\n      <div class=\"mainContainer\">\n        <div class=\"list normal\">\n          <div class=\"listLabel\">\n            Cards\n          </div>\n          <div class=\"wordContainer\">\n            <div v-for=\"word in normalWordList\" class=\"word\">\n              <div>{{word.english}}</div>\n              <div>{{word.japanese}}</div>\n            </div>\n            <div class=\"addWordForm\">\n              <form @submit.prevent=\"addNewWord\" class=\"addWordForm\">\n                <input v-model=\"newEnglish\" placeholder=\"input\">\n                <input v-model=\"newJapanese\" placeholder=\"input\">\n                <button type=\"submit\">\u8FFD\u52A0</button>\n              </form>\n            </div>\n          </div>\n        </div>\n        <div class=\"list cleared\">\n          <div class=\"listLabel\">\n            Cleared\n          </div>\n          <div class=\"wordContainer\">\n              <div v-for=\"word in clearedWordList\" class=\"word\">\n                <div>{{word.english}}</div>\n              <div>{{word.japanese}}</div>\n              </div>\n          </div>\n        </div>\n        <div class=\"list notCleared\">\n          <div class=\"listLabel\">\n            Not Cleared\n          </div>\n          <div class=\"wordContainer\">\n            <div v-for=\"word in notClearedWordList\" class=\"word\">\n                  <div>{{word.english}}</div>\n              <div>{{word.japanese}}</div>\n                </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
};

},{}],6:[function(require,module,exports){
"use strict";

module.exports = {
  template: "\n    <div>\n      <div class=\"testEndButton\">\n        <form @submit.prevent=\"endTest\">\n          <button type=\"submit\">\u30C6\u30B9\u30C8\u7D42\u4E86</button>\n        </form>\n      </div>\n      <div class=\"testContainer\">\n        <div class=\"list test\">\n          <div class=\"listLabel\">\n            Test Card\n          </div>\n          <div class=\"word\">\n            {{test.wordList[test.wordCount].english}}\n            <div class=\"tfButtons\">\n              <div class=\"tButton\">\n                <button @click=\"goNext\">\u308F\u304B\u308B</button>\n              </div>\n              <div class=\"fButton\">\t\t\n                <button @click=\"showAnswer\">\u308F\u304B\u3089\u306A\u3044</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
};

},{}],7:[function(require,module,exports){
'use strict';

var app = require('./app');

new Vue(app);

},{"./app":1}]},{},[7]);
