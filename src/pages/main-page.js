const Word = {
  template: `
    <div class="word">
      <div>{{ word.english }}</div>
      <div>{{ word.japanese }}</div>
    </div>
  `,
  props: ['word']
};

const AddWordForm = {
  template: `
    <div class="addWordForm">
      <form @submit.prevent="addNewWord" class="addWordForm">
        <input v-model="english" placeholder="English">
        <input v-model="japanese" placeholder="日本語">
        <button type="submit">追加</button>
      </form>
    </div>
  `,
  data() {
    return {
      english: '',
      japanese: '',
    }
  },
  methods: {
    addNewWord() {
      const { english, japanese } = this;
      if (english !== '' && japanese !== '') {
        this.$root.words.push({ english, japanese, done: false, cleared: false });
        this.clearForm();
      }
    },
    clearForm() {
      this.english = '';
      this.japanese = '';
    }
  }
};

const List = {
  template: `
    <div :class="'list ' + className">
      <div class="listLabel">
        {{ label }}
      </div>
      <div class="wordContainer">
        <word v-for="word in words" :word="word"></word>
        <add-word-form v-if="addable"></add-word-form>
      </div>
    </div>
  `,
  components: { Word, AddWordForm },
  props: ['words', 'className', 'label', 'addable']
};

module.exports = {
  template: `
    <div>
      <div class="testStartButton">
        <button @click="startTest">テストスタート</button>
      </div>
      <div class="mainContainer">
        <list :words="normalWords" className="normal" label="Cards" :addable="true"></list>
        <list :words="clearedWords" className="cleared" label="Cleared"></list>
        <list :words="notClearedWords" className="notCleared" label="Not Cleared"></list>
      </div>
    </div>
  `,
  components: { List },
  props: ['words'],

  computed: {
    normalWords() {
      return this.words.filter((element) => !element.done);
    },
    clearedWords() {
      return this.words.filter((element) => (element.done && element.cleared));
    },
    notClearedWords() {
      return this.words.filter((element) => (element.done && !element.cleared));
    },
    testWords() {
      return this.normalWords.concat(this.notClearedWords);
    }
  },

  methods: {
    startTest() {
      this.$root.startTest(this.testWords);
    }
  }
};
