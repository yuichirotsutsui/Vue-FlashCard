const dataManager = require('./data-manager');
const words = dataManager.data;
const { MainPage, TestPage, AnswerPage } = require('./pages');

module.exports = {
  el: "#app",

  template: `
    <div class="app">
      <div class="title">
        Vue Flash Card
        <main-page v-if="currentPage === 'mainPage'" :words="words"></main-page>
        <test-page v-if="currentPage === 'testPage'"></test-page>
        <answer-page v-if="currentPage === 'answerPage'"></answer-page>
      </div>
    </div>
  `,

  components: { MainPage, TestPage, AnswerPage },

  data: {
    words,
    currentPage: "mainPage",
    test: {
      wordList: [],
      wordCount: 0
    }
  },

  methods: {
    startTest(testWords) {
      this.test.wordCount = 0;
      this.test.wordList = testWords;
      if (this.test.wordList.length != 0) {
        this.currentPage = "testPage";
      }
    },

    endTest() {
      this.currentPage = "mainPage";
    },

    goNext() {
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

    showAnswer() {
      this.currentPage = "answerPage";
    }
  },

  updated() {
    dataManager.save();
  }
};

