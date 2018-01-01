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
	var guessesRemaining;
	var currentTeam;
	var currentWins;
	var currentLosses;
	var thisObject       = this; //Save off the current Hangman object's 'this' context.

    //initGame is the entry point into the Hangman game logic. It sets guessesRemaining and calls the nextTeam function
	this.initGame = function() {
		
		this.currentWins      = 0;
		this.currentLosses    = 0;
		
		//Get a random Major League Baseball team name. Each team
		// is identified by its city or state
		// and the team's name -- e.g., St. Louis Cardinals or Arizona Diamondbacks.
		this.nextTeam();
	};

	

	//nextTeam grabs a random Major League Baseball team name, instantiates the team name into a Word object 
	// -- that is, into an array of Letter objects. It displays the array (which will have an underscore for each
	// printable character). There will be a space displayed where the character is a space, and any other char will
	// be displayed as is.
	this.nextTeam = function () {
		this.guessesRemaining = numGuesses;
		var newTeam      = teams[Math.floor(Math.random() * teams.length)];
		this.currentTeam = new Word(newTeam); //turn this.currentTeam into an array of characters
		//As we begin, each of the letters in currentTeam is displayed as "_" -- that is, no letters have been guessed,
		//and so no letters are visible. Note that the space character and any punctuation is always visible.
		console.log ("\nCurrent Team to guess is "+this.currentTeam.toString()+"\n"); 
		
		this.guessTeam(); //Let's start guessing!
	};
	
	this.displayCurrentStats = function() {
		console.log("You currently have "+thisObject.currentWins+" wins and "+thisObject.currentLosses+" losses");
	}

	//guessTeam is the logic that gets the user's guess by calling getKeyStroke and then processes the guess
	this.guessTeam = function() {
		
		this.getKeyStroke().then(function() {
			console.log("\nCurrent Team to guess is "+thisObject.currentTeam.toString()+"\n");
			if (thisObject.guessesRemaining === 0) {
				// User is out of guesses. Show user the solution and ask whether user wants to play again
				thisObject.currentLosses++; //record the loss
				console.log("\nNo guesses remaining");
				console.log("The Major League Baseball team was "+thisObject.currentTeam.solved());
				thisObject.displayCurrentStats();
				thisObject.continuePlay();
			} else {
				if (thisObject.currentTeam.allVisible()) {
					//Success! -- If all letters are visible, the puzzle is solved
					console.log("Congratulations -- you have solved the riddle!");
					thisObject.currentWins++;
					thisObject.displayCurrentStats();
					thisObject.continuePlay();
				} else {
					thisObject.guessTeam();
				}
			}
		});
		
	}
    
    //getKeyStroke asks the user for a guess -- that is, a keystroke.  Since currentTeam, the word that user is
    //trying to guess, is an object of type Word, we can use the
    //guessLetter prototype function to see whether there's a match between the keystroke "guess" and one or more
    //chars in the currentTeam.  If there is a match, let the user know. If there is no match, also let the user know
    //and decrement the count of guesses remaining.
    this.getKeyStroke = function() {
		return inquirer
	    	.prompt([
	    	 {
		        type: "input",
          		name: "choice",
          		message: "Guess a letter!",
          		validate: function(keyStroke) {
            		// The user must guess a letter. Punctuation and spaces are already visible, and there
            		// are no numbers in the team names
            		return /[a-z]/gi.test(keyStroke) || "You must press an alphabetic key!";
          		}
          	 }
	      ]).then(function(keyStroke) {
	        // If the user's guess is in the current word, so inform the user
	        var correctGuess = thisObject.currentTeam.guessLetter(keyStroke.choice);
	        if (correctGuess) { 
	          //Successful guesses don't reduce the number of guesses remaining
	          console.log(chalk.green("\nCORRECT!!!\n"));
	        } else {
	          //Otherwise decrement guessesRemaining and inform user 
	          thisObject.guessesRemaining--;
	          console.log(chalk.red("\nINCORRECT!!!\n"));
	          console.log(thisObject.guessesRemaining + " guesses remaining!!!\n");
	        }
	      });
	      
	};

	//the function continuePlay asks user whether user wants to continue playing. 
	//If so, make a recursive call to this Hangman object's initGame function. 
	//Otherwise, call the exit function
	this.continuePlay = function() {
	    inquirer.prompt([
		 {
		          type: "confirm",
		          name: "playAgain",
		          message: "Do You Want To Play Again?"
         }
		]).then(function(answer) {
		        // If the user says yes to another game, play again, otherwise quit the game
		        if (answer.playAgain) {
		          thisObject.nextTeam();
		        }
		        else {
		          thisObject.endGame();
		        }
		    }
		);
	};

	//endGame exits the current instance of the Hangman object
	this.endGame = function() {
		console.log("\nYour final score was "+thisObject.currentWins+" wins and "+thisObject.currentLosses+" losses");
		console.log("Thanks for playing!");
		process.exit(0); //And thanks to stack overflow for the "clean exit" -- beats "ctrl-c"!
	}


} // end of the Hangman function

module.exports = Hangman;









