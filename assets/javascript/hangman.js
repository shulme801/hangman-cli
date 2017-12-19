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

	** myGame.startPlay() {
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

var inquirer 	= require("inquirer");
var chalk    	= require("chalk"); //allows us to change the font color of console.log responses
var randomWord	= require("random-word"); //returns a random English word
var Word 	 	= require("./Word"); //This contains the Word constructor and class methods/prototypes.

function Hangman() {
	var guessesRemaining = 10;
	var myGame = this;
	

	myGame.initGame = function() {
		var randWord = randomWord();
		myGame.targetWord = new Word(randWord);

		console.log("This is the target word "+myGame.targetWord);
		
		myGame.guessLetters();
	}

	myGame.guessLetters = function() {
		console.log("In guessLetters, targetWord is "+ myGame.targetWord);
	} //end of the guessLatters function

	myGame.makeAGuess = function() {
		return inquirer
		.prompt([
		  //here's the prompt's object
		  {
		  	type: 		"input",
		  	name: 		"choice",
		  	message:    "Guess a letter",
		  	validate:   function(val) {
		  		return /[A-Za-z1-9]/ig.test(val); //use a RegEx to test whether the guessed letter is an alphanumeric
		  	}

		  }
		]) 
		.then(function(val) {
			//See whether the guessed letter is present in the targetWord. If it is, let user know it was a valid guess
			var correctGuess = myGame.targetWord.foundTheLetter(val.choice);

			if (correctGuess) {
				console.log(chalk.green("\nYou guessed correctly!\n"));
			} else {
				console.log(chalk.red("\nYou guessed wrong, try again!\n"));
			}
			guessesRemaining--;
			console.log(chalk.blue("You have "+guessesRemaining+" guesses remaining"));

		});
	} //end of the makeAGuess function


} // end of the Hangman function

module.exports = Hangman;









