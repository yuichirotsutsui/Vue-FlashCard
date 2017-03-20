var wordList = JSON.parse(localStorage.getItem("wordList")) || []
var app = new Vue({
	el: "#app",
	data: {
		wordList: wordList,
		currentPage: "mainPage",
		newEnglish: "",
		newJapanese: "",
		test: {
			wordList: [],
			wordCount: 0
		}
	},
	computed: {
		normalWordList: function() {
			return this.wordList.filter(function(element){return !element.done})
		},
		clearedWordList: function() {
			return this.wordList.filter(function(element){return element.done && element.cleared})
		},
		notClearedWordList: function() {
			return this.wordList.filter(function(element){return element.done && !element.cleared})
		},
	},
	methods: {
		addNewWord: function (){
			if (this.newEnglish != "" && this.newJapanese != ""){
				this.wordList.push({english: this.newEnglish, japanese: this.newJapanese, done: false, cleared: false})
				this.newEnglish = ""
				this.newJapanese = ""
			}
		},
		startTest: function(){
			this.test.wordCount = 0
			this.test.wordList = this.normalWordList.concat(this.notClearedWordList)
			if (this.test.wordList.length != 0){
				this.currentPage = "testPage"
			}
		},
		endTest: function(){
			this.currentPage = "mainPage"
		},
		goNext: function(){
			var _this = this
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
		showAnswer: function(){
			this.currentPage = "answerPage"
		}
	},
	updated: function(){
		localStorage.setItem("wordList", JSON.stringify(this.wordList))
	}
})

