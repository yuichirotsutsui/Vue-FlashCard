const dataManager = require('./data-manager');
const words = dataManager.data;
const { MainPage, TestPage } = require('./pages');

module.exports = {
  el: "#app",

  template: `
    <div class="app">
      <div class="title">
        Vue Flash Card
        <main-page v-if="!testStarted" :words="words"></main-page>
        <test-page v-show="testStarted" ref="testPage"></test-page>
      </div>
    </div>
  `,

  components: { MainPage, TestPage },

  data: {
    words,
    testStarted: false
  },

  methods: {
    startTest(testWords) {
      if (testWords.length > 0) {
        this.$refs.testPage.startTest(testWords);
        this.testStarted = true;
      }
    },
    finishTest() {
      this.testStarted = false;
    }
  },

  updated() {
    dataManager.save();
  },
};

