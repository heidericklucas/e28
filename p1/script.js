const app = new Vue({
    el: "#app",
    data: function() {
      return {
        strikes: 11,
        word: "HANGMAN",
        wordLetters: ['H', 'A', 'N', 'G', 'M', 'A', 'N'],
        wordDisplayLetters: ['H', 'A', 'N', 'G', 'M', 'A', 'N'],
        usedLetters: [],
        possibleLetters1: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        possibleLetters2: ["J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
        possibleLetters3: ["T", "U", "V", "W", "X", "Y", "Z"],
        initialState: true,
        initialized: false,
        gameOverState: false,
        youWinState: false,
        wordBank: ['COFFEE', 'ZEBRA', 'ELEPHANT', 'CHICAGO', 'AMSTERDAM', 'BARCELONA', 'SHENZHEN', 'LONDON', 'MISSISSIPPI', 'STARTUP', 'JAVASCRIPT', 'PYTHON']
      }
    },
    methods: {
      initialize() {
        this.initialState = false
        this.initialized = true
        this.gameOverState = false
        this.youWinState = false
        this.strikes = 0
        this.word = this.getRandomWord()
        this.wordLetters = this.word.split('')
        this.wordDisplayLetters = Array(this.word.length)
        this.usedLetters = []
      },

      getRandomWord() {
        let index = Math.random() * (this.wordBank.length - 0)
        index = Math.floor(index)
        
        let word = this.wordBank[index]
        this.wordBank.splice(index, 1) // remove the word so it won't be repeated
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

        if (_.isEmpty(_.xor(this.wordDisplayLetters, this.wordLetters))) { //used lodash's _.isEmpty and _.xor functions to compare the arrays
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
      },

      gameOver() {
        this.youWinState = false
        this.gameOverState = true
        this.initialized = false
      }

    }
  })
  