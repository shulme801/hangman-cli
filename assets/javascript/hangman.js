/* Project Requirements
The completed game should be able to receive user input using the inquirer or prompt npm packages.

Feel free to use as many different types of constructor functions as you are able to, but at a minimum, you must create the following constructor functions:

Word: Used to create an object representing the current word the user is attempting to guess. This should contain word specific logic and data.

Letter: Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.

You must keep track of the user's remaining guesses and prompt the user if they would like to end the game if none remain.

Each constructor function should be in its own file and be exported and required wherever needed.

Look into function prototypes and use them for a few of your constructor's methods.
*/

/* Pseudocode:
	We'll create a "Hangman" constructor that gets instantiated in the "index.js" file that drives the game.
	
	First, save off the hangman context. We have to take this action (the familiar "var that = this") because we'll be using 
	inquirer, and inquirer will redefine "this" to refer to its own context. To (one hopes) reduce confusion, we'll use
	var myGame = this; so that our "game" context is clearly not the inquirer's "this" context.

	Next, define a set of game variables and methods:
	** var guessLimit = 10

	** myGame.initGame() {
	*** set guessesCount to 0
	*** myGame.targetWord = new Word(randomWord()); using the random-word package to grab a random english word and make it a Word object.
	}
	
	***  -- we'll do a little recursion in this function, asking for guesses until user runs out of guesses or gets the word right
	*** mygame.guessLetters () {
	***  inquire askForLetter().then (function {
	***  if this was the last guess, display the myGame.targetWord using RED font from chalk package and call the 
		   myGame.askForContinuedPlay function. This is the "base" case to get us out of the recursive loop.
	***  else
	***   if user has guessed all the letters correctly,
	***    console.log the victory message
	***    myGame.playAgain()
	***   else
    ***    recursively call myGame.userGuess();
    ***  });
	*** }
*/

var inquirer     = require("inquirer");
var chalk    	 = require("chalk"); //allows us to change the font color of console.log responses
var Word 	 	 = require("./Word"); //This contains the Word constructor and class methods/prototypes.
var teams		 = require("./mlb.js"); //The major league baseball teams

const numGuesses = 10;

function Hangman() {
	var guessesRemaining = 10;
	var currentTeam;
	var currentGame = this; //Save off the current Hangman object's 'this' context!

    //initGame is the entry point into the Hangman game logic. It sets guessesRemaining and calls the nextTeam function
	this.initGame = function() {
		this.guessesRemaining = numGuesses;
		//Throw out the first pitch!!! Actually, get a random MLB team. To make the game more interesting, each team
		// is identified by its city or state -- e.g., St. Louis Cardinals or Arizona Diamondbacks
		this.nextTeam();
	};

	//nextTeam grabs a random Major League Baseball team name, instantiates the team name into a Word object 
	// -- that is, into an array of Letter objects. It displays the array (which will have an underscore for each
	// printable character). There will be a space displayed where the character is a space, and any other char will
	// be displayed as is.
	this.nextTeam = function () {
	
		var newTeam      = teams[Math.floor(Math.random() * teams.length)];
		console.log("newTeam is "+newTeam);
		this.currentTeam = new Word(newTeam); //turn this.currentTeam into an array of characters
		
		console.log ("\nCurrent Team to guess is "+this.currentTeam.toString()+"\n"); 
		
		this.guessTeam(); //Let's start guessing!
	};
	
	this.guessTeam = function() {
		
		this.getKeyStroke().then(function() {
			console.log("/nCurrent Team to guess is "+currentGame.currentTeam.toString()+"\n");
			currentGame.guessTeam();
		});
		
	}
    
    this.getKeyStroke = function() {
		return inquirer
	    	.prompt([
	    	 {
		        type: "input",
          		name: "choice",
          		message: "Guess a letter!",
          		validate: function(keyStroke) {
            		// The usermust guess a letter
            		return /[a-z]/gi.test(keyStroke) || "You must press an alphabetic key!";
            		
          		}
          	 }
	      ]).then(function(keyStroke) {
	        // If the user's guess is in the current word, let them know
	        var correctGuess = currentGame.currentTeam.guessLetter(keyStroke.choice);
	        if (correctGuess) {
	          console.log(chalk.green("\nCORRECT!!!\n"));

	          // Otherwise decrement `guessesLeft`, and let the user know how many guesses are left
	        }
	        else {
	          currentGame.guessesRemaining--;
	          console.log(chalk.red("\nINCORRECT!!!\n"));
	          console.log(currentGame.guessesRemaining + " guesses remaining!!!\n");
	        }
	      });
	      
	};

} // end of the Hangman function

module.exports = Hangman;









