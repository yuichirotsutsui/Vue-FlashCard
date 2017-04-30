(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var dataManager = require('./data-manager');
var words = dataManager.data;

var _require = require('./pages'),
    MainPage = _require.MainPage,
    TestPage = _require.TestPage;

module.exports = {
  el: "#app",

  template: '\n    <div class="app">\n      <div class="title">\n        Vue Flash Card\n        <main-page v-if="!testStarted" :words="words"></main-page>\n        <test-page v-show="testStarted" ref="testPage"></test-page>\n      </div>\n    </div>\n  ',

  components: { MainPage: MainPage, TestPage: TestPage },

  data: {
    words: words,
    testStarted: false
  },

  methods: {
    startTest: function startTest(testWords) {
      if (testWords.length > 0) {
        this.$refs.testPage.startTest(testWords);
        this.testStarted = true;
      }
    },
    finishTest: function finishTest() {
      this.testStarted = false;
    }
  },

  updated: function updated() {
    dataManager.save();
  }
};

},{"./data-manager":2,"./pages":3}],2:[function(require,module,exports){
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
'use strict';

var MainPage = require('./main-page');
var TestPage = require('./test-page');

module.exports = { MainPage: MainPage, TestPage: TestPage };

},{"./main-page":4,"./test-page":5}],4:[function(require,module,exports){
'use strict';

var Word = {
  template: '\n    <div class="word">\n      <div>{{ word.english }}</div>\n      <div>{{ word.japanese }}</div>\n    </div>\n  ',
  props: ['word']
};

var AddWordForm = {
  template: '\n    <div class="addWordForm">\n      <form @submit.prevent="addNewWord" class="addWordForm">\n        <input v-model="english" ref="englishInput" placeholder="English">\n        <input v-model="japanese" placeholder="\u65E5\u672C\u8A9E">\n        <button type="submit">\u8FFD\u52A0</button>\n      </form>\n    </div>\n  ',
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
      this.$refs.englishInput.focus();
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
      return this.words.filter(function (word) {
        return !word.done;
      });
    },
    clearedWords: function clearedWords() {
      return this.words.filter(function (word) {
        return word.done && word.cleared;
      });
    },
    notClearedWords: function notClearedWords() {
      return this.words.filter(function (word) {
        return word.done && !word.cleared;
      });
    },
    testWords: function testWords() {
      return this.words.filter(function (word) {
        return !word.cleared;
      });
    }
  },

  methods: {
    startTest: function startTest() {
      this.$root.startTest(this.testWords);
    }
  }
};

},{}],5:[function(require,module,exports){
"use strict";

var TestCard = {
  template: "\n    <div class=\"word\">\n      {{ $parent.currentWord.english }}\n      <div class=\"tfButtons\">\n        <div class=\"tButton\">\n          <button @click=\"$parent.goNext\">\u308F\u304B\u308B</button>\n        </div>\n        <div class=\"fButton\">\t\t\n          <button @click=\"$parent.showAnswer\">\u308F\u304B\u3089\u306A\u3044</button>\n        </div>\n      </div>\n    </div>\n  "
};

var AnswerCard = {
  template: "\n    <div class=\"word\">\n      {{ $parent.currentWord.english }}\n      {{ $parent.currentWord.japanese }}\n      <div class=\"tfButtons\">\n        <div class=\"tButton\">\n          <button @click=\"$parent.goNext\">{{ $parent.isLastWord ? '\u30C6\u30B9\u30C8\u3092\u7D42\u4E86\u3059\u308B' : '\u6B21\u306E\u5358\u8A9E\u3078' }}</button>\n        </div>\n      </div>\n    </div>\n  "
};

module.exports = {
  template: "\n    <div>\n      <div class=\"testEndButton\">\n        <button @click=\"finishTest\" type=\"submit\">\u30C6\u30B9\u30C8\u7D42\u4E86</button>\n      </div>\n      <div class=\"testContainer\">\n        <div class=\"list test\">\n          <div class=\"listLabel\">\n            Test Card\n          </div>\n          <test-card v-if=\"!answerShown\"></test-card>\n          <answer-card v-else></answer-card>\n        </div>\n      </div>\n    </div>\n  ",
  components: { TestCard: TestCard, AnswerCard: AnswerCard },

  data: function data() {
    return {
      words: [],
      index: 0,
      answerShown: false
    };
  },


  computed: {
    currentWord: function currentWord() {
      return this.words[this.index] || {};
    },
    isLastWord: function isLastWord() {
      return this.index + 1 === this.words.length;
    }
  },

  methods: {
    startTest: function startTest(words) {
      this.words = words;
      this.index = 0;
    },
    finishTest: function finishTest() {
      this.$root.finishTest();
    },
    goNext: function goNext() {
      this.currentWord.done = true;
      if (this.answerShown) {
        this.hideAnswer();
      } else {
        this.currentWord.cleared = true;
      }
      if (this.isLastWord) {
        this.finishTest();
      }
      this.index += 1;
    },
    showAnswer: function showAnswer() {
      this.answerShown = true;
    },
    hideAnswer: function hideAnswer() {
      this.answerShown = false;
    }
  }
};

},{}],6:[function(require,module,exports){
'use strict';

var app = require('./app');

new Vue(app);

},{"./app":1}]},{},[6]);
