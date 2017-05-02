(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var wordList = JSON.parse(localStorage.getItem("wordList")) || [];

var _require = require('./pages'),
    mainPage = _require.mainPage,
    testPage = _require.testPage,
    answerPage = _require.answerPage;

var app = {
    el: "#app",
    template: "<div>\n                    <div class=\"title\">\n\t\t                Vue Flash Card\n\t                </div>\n\t\t            <main-page :wordList=\"wordList\" v-if=\"currentPage == 'mainPage'\"></main-page>\n\t\t            <test-page :test=\"test\" v-else-if=\"currentPage == 'testPage'\"></test-page>\n\t\t            <answer-page :test=\"test\" v-else-if=\"currentPage == 'answerPage'\"></answer-page>\n\t             </div>",
    data: {
        wordList: wordList,
        currentPage: "mainPage",
        test: {
            wordList: [],
            wordCount: 0
        }
    },
    methods: {
        addNewWord: function addNewWord(newEnglish, newJapanese) {
            this.wordList.push({ english: newEnglish, japanese: newJapanese, done: false, cleared: false });
        },
        startTest: function startTest(normalWordList, notClearedWordList) {
            this.test.wordCount = 0;
            this.test.wordList = normalWordList.concat(notClearedWordList);
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
        localStorage.setItem("wordList", JSON.stringify(this.wordList));
    },

    components: {
        "main-page": mainPage,
        "test-page": testPage,
        "answer-page": answerPage
    }
};

module.exports = app;

},{"./pages":3}],2:[function(require,module,exports){
"use strict";

var card = {
	template: "<div class=\"word\">\n                    <div class=\"wordCard\">\n\t\t\t\t        <div>{{test.wordList[test.wordCount].english}}</div>\n\t\t\t\t\t    <div>{{test.wordList[test.wordCount].japanese}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t    <div class=\"tfButtons\">\n\t\t\t\t\t\t<div class=\"tButton\">\n\t\t\t\t    \t\t<button @click=\"$root.goNext\">\u6B21\u306E\u5358\u8A9E\u3078</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",
	props: ["test"]
};

var answerPage = {
	template: "<div>\n\t\t\t\t\t<div class=\"testEndButton\">\n\t\t\t\t\t\t<form @submit.prevent=\"$root.endTest\">\n\t\t\t\t\t\t\t<button type=\"submit\">\u30C6\u30B9\u30C8\u7D42\u4E86</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"testContainer\">\n\t\t\t\t\t\t<div class=\"list test\">\n\t\t\t\t\t\t\t<div class=\"listLabel\">\n\t\t\t\t\t\t\t\tAnswer\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<card :test=\"test\"></card>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",
	props: ["test"],
	components: {
		"card": card
	}
};

module.exports = answerPage;

},{}],3:[function(require,module,exports){
'use strict';

var mainPage = require('./main-page');
var testPage = require('./test-page');
var answerPage = require('./answer-page');
module.exports = { mainPage: mainPage, testPage: testPage, answerPage: answerPage };

},{"./answer-page":2,"./main-page":4,"./test-page":5}],4:[function(require,module,exports){
"use strict";

var addWordForm = {
    template: "<div class=\"wordContainer\">\n\t\t\t\t\t<form @submit.prevent=\"addButtonClicked\" class=\"addWordForm\">\n\t\t\t\t\t\t<input v-model=\"newEnglish\" placeholder=\"\u82F1\u5358\u8A9E\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\">\n\t\t\t\t\t\t<input v-model=\"newJapanese\" placeholder=\"\u65E5\u672C\u8A9E\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\">\n\t\t\t\t\t\t<button type=\"submit\">\u8FFD\u52A0</button>\n\t\t\t\t\t</form>\n\t\t\t\t</div>",
    data: function data() {
        return {
            newEnglish: "",
            newJapanese: ""
        };
    },

    methods: {
        addButtonClicked: function addButtonClicked() {
            if (this.newEnglish && this.newJapanese) {
                this.$root.addNewWord(this.newEnglish, this.newJapanese);
                this.newEnglish = "";
                this.newJapanese = "";
            }
        }
    }
};

var cardList = {
    template: "<div :class=\"listClassName\">\n\t\t\t\t\t<div class=\"listLabel\">\n\t\t\t\t\t\t{{listName}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wordContainer\">\n\t\t\t\t\t\t<div v-for=\"word in wordList\" class=\"word\">\n\t\t\t\t\t\t\t<div>{{word.english}}</div>\n\t\t\t\t\t        <div>{{word.japanese}}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<add-word-form v-if=\"label === 'normal'\"></add-word-form>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",
    props: ["label", "wordList"],
    computed: {
        listClassName: function listClassName() {
            return "list " + this.label;
        },
        listName: function listName() {
            return this.label + " cards";
        }
    },
    components: {
        "add-word-form": addWordForm
    }
};

var mainPage = {
    template: "<div>\n\t\t\t\t\t<div class=\"testStartButton\">\n\t\t\t\t\t\t<button @click=\"$root.startTest(normalWordList, notClearedWordList)\">\u30C6\u30B9\u30C8\u30B9\u30BF\u30FC\u30C8</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mainContainer\">\n\t\t\t\t\t\t<card-list :label=\"'normal'\" :wordList=\"normalWordList\"></card-list>\n\t\t\t\t\t\t<card-list :label=\"'cleared'\" :wordList=\"clearedWordList\"></card-list>\n\t\t\t\t\t\t<card-list :label=\"'notCleared'\" :wordList=\"notClearedWordList\"></card-list>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",
    props: ["wordList"],
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
    components: {
        "card-list": cardList
    }
};

module.exports = mainPage;

},{}],5:[function(require,module,exports){
"use strict";

var testButtons = {
	template: "<div class=\"tfButtons\">\n\t\t\t\t\t<div class=\"tButton\">\n\t\t\t\t\t\t<button @click=\"$root.goNext\">\u308F\u304B\u308B</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"fButton\">\t\t\n\t\t\t\t\t\t<button @click=\"$root.showAnswer\">\u308F\u304B\u3089\u306A\u3044</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>"
};

var card = {
	template: "<div class=\"list test\">\n\t\t\t\t\t<div class=\"listLabel\">\n\t\t\t\t\t\ttest\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t    <div class=\"word\">\n\t\t\t\t\t\t    {{test.wordList[test.wordCount].english}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<test-buttons></test-buttons>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",
	props: ["label", "test"],
	components: {
		"test-buttons": testButtons
	}
};

var testPage = {
	template: "<div>\n\t\t\t\t\t<div class=\"testEndButton\">\n\t\t\t\t\t\t<form @submit.prevent=\"$root.endTest\">\n\t\t\t\t\t\t\t<button type=\"submit\">\u30C6\u30B9\u30C8\u7D42\u4E86</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"testContainer\">\n\t\t\t\t\t    <card :label=\"'test'\" :test=\"test\"></card>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",
	props: ["test"],
	components: {
		"card": card
	}
};

module.exports = testPage;

},{}],6:[function(require,module,exports){
'use strict';

var app = require('./app');

new Vue(app);

},{"./app":1}]},{},[6]);
