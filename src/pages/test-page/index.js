const testButtons = {
    template: 	`<div class="tfButtons">
					<div class="tButton">
						<button @click="$root.goNext">わかる</button>
					</div>
					<div class="fButton">		
						<button @click="$root.showAnswer">わからない</button>
					</div>
				</div>`
}

const card = {
    template: 	`<div class="list test">
					<div class="listLabel">
						test
					</div>
					<div>
					    <div class="word">
						    {{test.wordList[test.wordCount].english}}
						</div>
						<test-buttons></test-buttons>
					</div>
				</div>`,
    props: ["label", "test"],
    components: {
        "test-buttons": testButtons
    }
}

const testPage = {
    template: 	`<div>
					<div class="testEndButton">
						<form @submit.prevent="$root.endTest">
							<button type="submit">テスト終了</button>
						</form>
					</div>
					<div class="testContainer">
					    <card :label="'test'" :test="test"></card>
					</div>
				</div>`,
    props: ["test"],
    components: {
        "card": card
    }
}

module.exports = testPage