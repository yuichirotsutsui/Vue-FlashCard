const dataManager = require('./data-manager');
const wordList = dataManager.data;
const { MainPage, TestPage, AnswerPage } = require('./pages');

module.exports = {
	el: "#app",

  template: `
    <div class="app">
      <div class="title">
        Vue Flash Card
        <main-page v-if="currentPage === 'mainPage'"></main-page>
        <test-page v-if="currentPage === 'testPage'"></test-page>
        <answer-page v-if="currentPage === 'answerPage'"></answer-page>
      </div>
    </div>
  `,

  components: { MainPage, TestPage, AnswerPage },

	data: {
		wordList,
		currentPage: "mainPage",
		newEnglish: "",
		newJapanese: "",
		test: {
			wordList: [],
			wordCount: 0
		}
	},

	computed: {
		normalWordList() {
			return this.wordList.filter((element) => !element.done);
		},

		clearedWordList() {
			return this.wordList.filter((element) => (element.done && element.cleared));
		},

		notClearedWordList() {
			return this.wordList.filter((element) => (element.done && !element.cleared));
		},
	},

	methods: {
		addNewWord() {
			if (this.newEnglish != "" && this.newJapanese != "") {
				this.wordList.push({english: this.newEnglish, japanese: this.newJapanese, done: false, cleared: false});
				this.newEnglish = "";
				this.newJapanese = "";
			}
		},

		startTest() {
			this.test.wordCount = 0;
			this.test.wordList = this.normalWordList.concat(this.notClearedWordList);
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

