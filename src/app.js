const wordList = JSON.parse(localStorage.getItem("wordList")) || []
const {mainPage, testPage, answerPage} = require('./pages')

const app = {
    el: "#app",
    template:   `<div>
                    <div class="title">
		                Vue Flash Card
	                </div>
		            <main-page :wordList="wordList" v-if="currentPage == 'mainPage'"></main-page>
		            <test-page :test="test" v-else-if="currentPage == 'testPage'"></test-page>
		            <answer-page :test="test" v-else-if="currentPage == 'answerPage'"></answer-page>
	             </div>`,
    data: {
        wordList: wordList,
        currentPage: "mainPage",
        test: {
            wordList: [],
            wordCount: 0
        }
    },
    methods: {
        addNewWord(newEnglish, newJapanese) {
            this.wordList.push({english: newEnglish, japanese: newJapanese, done: false, cleared: false})
        },
        startTest(normalWordList, notClearedWordList){
            this.test.wordCount = 0
            this.test.wordList = normalWordList.concat(notClearedWordList)
            if (this.test.wordList.length != 0){
                this.currentPage = "testPage"
            }
        },
        endTest(){
            this.currentPage = "mainPage"
        },
        goNext(){
            this.test.wordList[this.test.wordCount].done = true
            if (this.currentPage === "testPage"){
                this.test.wordList[this.test.wordCount].cleared = true
            }
            if (this.test.wordCount + 1 === this.test.wordList.length) {
                this.currentPage = "mainPage"
            }else{
                this.test.wordCount += 1
                this.currentPage = "testPage"
            }
        },
        showAnswer(){
            this.currentPage = "answerPage"
        }
    },
    updated(){
        localStorage.setItem("wordList", JSON.stringify(this.wordList))
    },
    components: {
        "main-page": mainPage,
        "test-page": testPage,
        "answer-page": answerPage
    }
}

module.exports = app