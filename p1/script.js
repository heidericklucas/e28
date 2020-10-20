// music audio effects - did not configure them to loop
var melody = new Audio('audio/melody.mp3')
var tense = new Audio('audio/tense.mp3')
var uhOh = new Audio('audio/uh-oh.mp3')
var cheerClap = new Audio('audio/cheer-clap.mp3')
var aww = new Audio('audio/aww.mp3')

// vue app
const app = new Vue({
    el: "#app",
    data: function() {
      return {
        strikes: 0, // errors
        word: "",
        wordLetters: [], // the actual word letters
        wordDisplayLetters: [], // the elements from usedLetters that match the elements from wordLetters
        usedLetters: [],
        possibleLetters1: [], // alphabet array 1
        possibleLetters2: [], // alphabet array 2
        possibleLetters3: [], // alphabet array 3
        welcomeState: true, // welcome screen
        gameFirst: false, // game first screen
        initialized: false, //game started
        gameOverState: false,
        youWinState: false,
        noMoreWordsState: false,
        wordBank: []
      }
    },
    methods: {
      gameScreen() { //nothing really happens here, it's just an initial screen
        this.welcomeState = false
        this.gameFirst = true
        melody.play()
        this.strikes = 11 // this prints the whole picture of the hangman
        this.word = "HANGMAN"
        this.wordLetters = ['H', 'A', 'N', 'G', 'M', 'A', 'N']
        this.wordDisplayLetters = ['H', 'A', 'N', 'G', 'M', 'A', 'N']
        this.usedLetters = []
        this.possibleLetters1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
        this.possibleLetters2 = ["J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"]
        this.possibleLetters3 = ["T", "U", "V", "W", "X", "Y", "Z"]
        this.initialized = false
        this.gameOverState = false
        this.youWinState = false
        this.noMoreWordsState = false
        this.wordBank = ['HARVARD', 'VUE', 'JAVASCRIPT', 'PROGRAMMING', 'CAMBRIDGE', 'BOSTON', 'SOMERVILLE', 'MASSACHUSETTS', 'USA']
        // Gave it a quick try to use an external text file for the word bank, but didn't dedicate much time to accomplish that.
        // Anyways, should I somehow convert an external .txt file to JSON and then maybe convert it to an array?
        // How do you suggest I do it?
        // Thanks!
      },

      initialize() { //game started
        this.welcomeState = false
        this.gameFirst = false
        melody.pause()
        melody.currentTime = 0
        cheerClap.pause()
        cheerClap.currentTime = 0
        tense.play()
        this.welcomeState = false
        this.initialized = true
        this.gameOverState = false
        this.youWinState = false
        this.noMoreWordsState = false
        this.strikes = 0
        if (this.wordBank.length > 0) { // if there are still words in the wordBank array, execute the following code
          this.word = this.getRandomWord()
          this.wordLetters = this.word.split('')
          this.wordDisplayLetters = Array(this.word.length)
          this.usedLetters = []
        }
        else { // else, trigger noMoreWords() function
          this.noMoreWords()
        }
      },

      getRandomWord() {
        let index = Math.random() * (this.wordBank.length - 0)
        index = Math.floor(index)
        
        let word = this.wordBank[index]
        this.wordBank.splice(index, 1) // removes the word that was used so it will not be repeated
        return word
      },

      tryLetter(letter) {
        if (this.usedLetters.includes(letter)) {
          return
        }
        
        this.usedLetters.push(letter)
        let match = false 
        for (let i = 0; i < this.wordDisplayLetters.length; i++) {
          if (letter === this.wordLetters[i]) {
            this.wordDisplayLetters.splice(i, 1, letter)
            match = true
          }
        }
        
        if (!match) {
          this.strikes++
        }

        // I used lodash's _.isEmpty and _.xor functions to compare the symmetric difference of the arrays.
        // Please observe how it beautifully works using the Vue devtools on the browser.
        // Pretty nice approach, I would say :)
        if (_.isEmpty(_.xor(this.wordDisplayLetters, this.wordLetters))) {
          this.youWin()
        }

        if (this.strikes > 10) {
          this.gameOver()
        }
      },

      getStrikethroughClass(letter) {
        if (this.usedLetters.includes(letter)) {
          return 'diagonal-strike'
        }
        return null
      },

      youWin() {
        this.youWinState = true
        this.gameOverState = false
        this.initialized = false
        this.strikes = 0
        tense.pause()
        tense.currentTime = 0
        cheerClap.play()
      },

      gameOver() {
        this.youWinState = false
        this.gameOverState = true
        this.initialized = false
        tense.pause()
        tense.currentTime = 0
        uhOh.play()
      },

      noMoreWords() {
        this.youWinState = false
        this.gameOverState = false
        this.initialized = false
        this.noMoreWordsState = true
        tense.pause()
        tense.currentTime = 0
        aww.play()
      }

    }
  })
  