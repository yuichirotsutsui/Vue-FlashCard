const dataManager = require('./data-manager');

const wordList = dataManager.data;

const MainPage = {
  template: `
    <div>
      <div class="testStartButton">
        <button @click="startTest">テストスタート</button>
      </div>
      <div class="mainContainer">
        <div class="list normal">
          <div class="listLabel">
            Cards
          </div>
          <div class="wordContainer">
            <div v-for="word in normalWordList" class="word">
              <div>{{word.english}}</div>
              <div>{{word.japanese}}</div>
            </div>
            <div class="addWordForm">
              <form @submit.prevent="addNewWord" class="addWordForm">
                <input v-model="newEnglish" placeholder="input">
                <input v-model="newJapanese" placeholder="input">
                <button type="submit">追加</button>
              </form>
            </div>
          </div>
        </div>
        <div class="list cleared">
          <div class="listLabel">
            Cleared
          </div>
          <div class="wordContainer">
              <div v-for="word in clearedWordList" class="word">
                <div>{{word.english}}</div>
              <div>{{word.japanese}}</div>
              </div>
          </div>
        </div>
        <div class="list notCleared">
          <div class="listLabel">
            Not Cleared
          </div>
          <div class="wordContainer">
            <div v-for="word in notClearedWordList" class="word">
                  <div>{{word.english}}</div>
              <div>{{word.japanese}}</div>
                </div>
          </div>
        </div>
      </div>
    </div>
  `
};

const TestPage = {
  template: `
    <div>
      <div class="testEndButton">
        <form @submit.prevent="endTest">
          <button type="submit">テスト終了</button>
        </form>
      </div>
      <div class="testContainer">
        <div class="list test">
          <div class="listLabel">
            Test Card
          </div>
          <div class="word">
            {{test.wordList[test.wordCount].english}}
            <div class="tfButtons">
              <div class="tButton">
                <button @click="goNext">わかる</button>
              </div>
              <div class="fButton">		
                <button @click="showAnswer">わからない</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

const AnswerPage = {
  template: `
    <div>
      <div class="testEndButton">
        <form @submit.prevent="endTest">
          <button type="submit">テスト終了</button>
        </form>
      </div>
      <div class="testContainer">
        <div class="list test">
          <div class="listLabel">
            Test Card
          </div>
          <div class="word">
            {{test.wordList[test.wordCount].english}}
            {{test.wordList[test.wordCount].japanese}}
            <div class="tfButtons">
              <div class="tButton">
                <button @click="goNext">次の単語へ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

const app = new Vue({
	el: "#app",

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
});

