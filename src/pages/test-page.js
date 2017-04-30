const TestCard = {
  template: `
    <div class="word">
      {{ $parent.currentWord.english }}
      <div class="tfButtons">
        <div class="tButton">
          <button @click="$parent.goNext">わかる</button>
        </div>
        <div class="fButton">		
          <button @click="$parent.showAnswer">わからない</button>
        </div>
      </div>
    </div>
  `,
}

const AnswerCard = {
  template: `
    <div class="word">
      {{ $parent.currentWord.english }}
      {{ $parent.currentWord.japanese }}
      <div class="tfButtons">
        <div class="tButton">
          <button @click="$parent.goNext">{{ $parent.isLastWord ? 'テストを終了する' : '次の単語へ' }}</button>
        </div>
      </div>
    </div>
  `,
}

module.exports = {
  template: `
    <div>
      <div class="testEndButton">
        <button @click="finishTest" type="submit">テスト終了</button>
      </div>
      <div class="testContainer">
        <div class="list test">
          <div class="listLabel">
            Test Card
          </div>
          <test-card v-if="!answerShown"></test-card>
          <answer-card v-else></answer-card>
        </div>
      </div>
    </div>
  `,
  components: { TestCard, AnswerCard },

  data() {
    return {
      words: [],
      index: 0,
      answerShown: false
    }
  },

  computed: {
    currentWord() {
      return this.words[this.index] || {};
    },
    isLastWord() {
      return this.index + 1 === this.words.length;
    }
  },

  methods: {
    startTest(words) {
      this.words = words;
      this.index = 0;
    },
    finishTest() {
      this.$root.finishTest();
    },
    goNext() {
      this.currentWord.done = true;
      if(this.answerShown) {
        this.hideAnswer();
      } else {
        this.currentWord.cleared = true;
      }
      if (this.isLastWord) {
        this.finishTest();
      } 
      this.index += 1;
    },
    showAnswer() {
      this.answerShown = true;
    },
    hideAnswer() {
      this.answerShown = false;
    },
  },
};

