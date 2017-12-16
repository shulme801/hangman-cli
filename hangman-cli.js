
var inquirer   = require("inquirer");
var isLetter   = require('is-letter');
var randomWord = require('random-word');

var Word       = require('./word.js');
var dialog     = require('./user-input.js');


var hangman = {

  guessCount: 0,
  targetWord: "",
  guessLimit: 10,
  wordDisplay: "",
  

  startGame: function() {
    inquirer.prompt(dialog.startQuestion).then(callback);
    this.newGame();
    },

    newGame: function() {
      this.guessCount = 0;
      this.targetWord=randomWord();
      console.log("target is "+randomWord);
      // for (var i=0; i<this.targetWord.length; i++) {  
      //  this.wordDisplay += “_”;
      // }
       console.log("*******************");
       console.log("Here we go");
       console.log("Word to guess is: "+wordDisplay);
    }

}; //End hangman object

hangman.startGame();
