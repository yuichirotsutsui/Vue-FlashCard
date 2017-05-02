const card = {
    template:   `<div class="word">
                    <div class="wordCard">
				        <div>{{test.wordList[test.wordCount].english}}</div>
					    <div>{{test.wordList[test.wordCount].japanese}}</div>
					</div>
				    <div class="tfButtons">
						<div class="tButton">
				    		<button @click="$root.goNext">次の単語へ</button>
						</div>
					</div>
				</div>`,
    props: ["test"]
}

const answerPage = {
    template: 	`<div>
					<div class="testEndButton">
						<form @submit.prevent="$root.endTest">
							<button type="submit">テスト終了</button>
						</form>
					</div>
					<div class="testContainer">
						<div class="list test">
							<div class="listLabel">
								Answer
							</div>
							<card :test="test"></card>
						</div>
					</div>
				</div>`,
    props: ["test"],
    components: {
        "card": card
    }
}

module.exports = answerPage