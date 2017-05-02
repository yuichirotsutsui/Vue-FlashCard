const addWordForm = {
    template:	`<div class="wordContainer">
					<form @submit.prevent="addButtonClicked" class="addWordForm">
						<input v-model="newEnglish" placeholder="英単語を入力してください">
						<input v-model="newJapanese" placeholder="日本語を入力してください">
						<button type="submit">追加</button>
					</form>
				</div>`,
    data() {
        return {
            newEnglish: "",
            newJapanese: ""
        }
    },
    methods: {
        addButtonClicked() {
            if (this.newEnglish && this.newJapanese) {
                this.$root.addNewWord(this.newEnglish, this.newJapanese)
                this.newEnglish = ""
                this.newJapanese = ""
            }
        }
    }
}

const cardList = {
    template: 	`<div :class="listClassName">
					<div class="listLabel">
						{{listName}}
					</div>
					<div class="wordContainer">
						<div v-for="word in wordList" class="word">
							<div>{{word.english}}</div>
					        <div>{{word.japanese}}</div>
						</div>
						<add-word-form v-if="label === 'normal'"></add-word-form>
					</div>
				</div>`,
    props: ["label", "wordList"],
    computed: {
        listClassName() {
            return "list " + this.label
        },
        listName() {
            return this.label + " cards"
        }
    },
    components: {
        "add-word-form": addWordForm
    }
}

const mainPage = {
    template: 	`<div>
					<div class="testStartButton">
						<button @click="$root.startTest(normalWordList, notClearedWordList)">テストスタート</button>
					</div>
					<div class="mainContainer">
						<card-list :label="'normal'" :wordList="normalWordList"></card-list>
						<card-list :label="'cleared'" :wordList="clearedWordList"></card-list>
						<card-list :label="'notCleared'" :wordList="notClearedWordList"></card-list>
					</div>
				</div>`,
    props: ["wordList"],
    computed: {
        normalWordList() {
            return this.wordList.filter(function(element){return !element.done})
        },
        clearedWordList() {
            return this.wordList.filter(function(element){return element.done && element.cleared})
        },
        notClearedWordList() {
            return this.wordList.filter(function(element){return element.done && !element.cleared})
        },
    },
    components: {
        "card-list": cardList
    }
}

module.exports = mainPage