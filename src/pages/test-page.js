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
};

