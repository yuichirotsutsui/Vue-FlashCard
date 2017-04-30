(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var dataManager = require('./data-manager');
var words = dataManager.data;

var _require = require('./pages'),
    MainPage = _require.MainPage,
    TestPage = _require.TestPage,
    AnswerPage = _require.AnswerPage;

module.exports = {
  el: "#app",

  template: '\n    <div class="app">\n      <div class="title">\n        Vue Flash Card\n        <main-page v-if="currentPage === \'mainPage\'" :words="words"></main-page>\n        <test-page v-if="currentPage === \'testPage\'"></test-page>\n        <answer-page v-if="currentPage === \'answerPage\'"></answer-page>\n      </div>\n    </div>\n  ',

  components: { MainPage: MainPage, TestPage: TestPage, AnswerPage: AnswerPage },

  data: {
    words: words,
    currentPage: "mainPage",
    test: {
      wordList: [],
      wordCount: 0
    }
  },

  methods: {
    startTest: function startTest(testWords) {
      this.test.wordCount = 0;
      this.test.wordList = testWords;
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
      _data = JSON.parse(localStorage.getItem(storageKey)) || [];
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

var MainPage = require('./main-page');
var AnswerPage = require('./answer-page');
var TestPage = require('./test-page');

module.exports = { MainPage: MainPage, AnswerPage: AnswerPage, TestPage: TestPage };

},{"./answer-page":3,"./main-page":5,"./test-page":6}],5:[function(require,module,exports){
'use strict';

var Word = {
  template: '\n    <div class="word">\n      <div>{{ word.english }}</div>\n      <div>{{ word.japanese }}</div>\n    </div>\n  ',
  props: ['word']
};

var AddWordForm = {
  template: '\n    <div class="addWordForm">\n      <form @submit.prevent="addNewWord" class="addWordForm">\n        <input v-model="english" placeholder="English">\n        <input v-model="japanese" placeholder="\u65E5\u672C\u8A9E">\n        <button type="submit">\u8FFD\u52A0</button>\n      </form>\n    </div>\n  ',
  data: function data() {
    return {
      english: '',
      japanese: ''
    };
  },

  methods: {
    addNewWord: function addNewWord() {
      var english = this.english,
          japanese = this.japanese;

      if (english !== '' && japanese !== '') {
        this.$root.words.push({ english: english, japanese: japanese, done: false, cleared: false });
        this.clearForm();
      }
    },
    clearForm: function clearForm() {
      this.english = '';
      this.japanese = '';
    }
  }
};

var List = {
  template: '\n    <div :class="\'list \' + className">\n      <div class="listLabel">\n        {{ label }}\n      </div>\n      <div class="wordContainer">\n        <word v-for="word in words" :word="word"></word>\n        <add-word-form v-if="addable"></add-word-form>\n      </div>\n    </div>\n  ',
  components: { Word: Word, AddWordForm: AddWordForm },
  props: ['words', 'className', 'label', 'addable']
};

module.exports = {
  template: '\n    <div>\n      <div class="testStartButton">\n        <button @click="startTest">\u30C6\u30B9\u30C8\u30B9\u30BF\u30FC\u30C8</button>\n      </div>\n      <div class="mainContainer">\n        <list :words="normalWords" className="normal" label="Cards" :addable="true"></list>\n        <list :words="clearedWords" className="cleared" label="Cleared"></list>\n        <list :words="notClearedWords" className="notCleared" label="Not Cleared"></list>\n      </div>\n    </div>\n  ',
  components: { List: List },
  props: ['words'],

  computed: {
    normalWords: function normalWords() {
      return this.words.filter(function (element) {
        return !element.done;
      });
    },
    clearedWords: function clearedWords() {
      return this.words.filter(function (element) {
        return element.done && element.cleared;
      });
    },
    notClearedWords: function notClearedWords() {
      return this.words.filter(function (element) {
        return element.done && !element.cleared;
      });
    },
    testWords: function testWords() {
      return this.normalWords.concat(this.notClearedWords);
    }
  },

  methods: {
    startTest: function startTest() {
      this.$root.startTest(this.testWords);
    }
  }
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
