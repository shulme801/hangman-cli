// This is the mainline entry point into the Hangman.cli game.
// It includes the hangman object


var mysql      = require("mysql");
var inquirer   = require("inquirer");
var Word       = require('./word.js');
var isLetter   = require('is-letter');
var randomWord = require('random-word');

//randomWord();


var hangman = {
  guessCount: 0,
  guessesAllowed: 10,
  targetWord:  “”,
  wordDisplay: [],
  guessedLetters: [],
  startGame: function() {
    get
 inquire { 
  Do you want to begin a game?
 } .then (function(answer) {
     answer.toUpperCase(answer);
     if (answer===‘YES’) {
           this.newGame();
     } else {
       console.log(“Come back when you are ready to play”);
     }
    }
  },
newGame: function() {
   this.guessCount = 0;
   this.targetWord=randomWord();
   for (var i=0; i<targetWord.length; i++) {
    this.wordDisplay = “_”;
}
}  
}


function getUserInput(callback) {

  var questions = [
    {
      type: 'input',
      name: 'artist',
      message: "What Artist Do You Want To Search For?",
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter an artist to search for!';
        }
      }
    }
  ];

   inquirer.prompt(questions).then(callback);
}


/* Mainline */  
  getUserInput(function(){
    console.log(arguments);
  });
});
