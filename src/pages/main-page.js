module.exports = {
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
