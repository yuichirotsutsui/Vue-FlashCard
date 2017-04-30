module.exports = {
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
};

