/* Project Requirements - paraphrased from the instructions:

"The completed game should be able to receive user input using the inquirer or prompt npm packages.
 Use as many different types of constructor functions as you are able to, but at a minimum, 
 you must create the following constructor functions:
   Word: Used to create an object representing the current word the user is attempting to guess. 
         This constructor should contain word specific logic and data.

   Letter: Used for each letter in the current word. Each letter object should either display an underlying character, 
           or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. 
           This constructor should contain letter specific logic and data.

  You must keep track of the user's remaining guesses and prompt the user to end the game 
  if no guesses remain.

  Each constructor function should be in its own file. It will be exported and required wherever needed. Use 
  function prototypes for at least a few of the constructors' methods.
*/

/* Overview and Game Rules:
	
	This file contains a "Hangman" constructor. This Hangman constructor requires the word.js and letter.js files. This
	constructor, when instantiated, contains the logic for one game session, which will include one or more iterations
	of the Hangman game.

	In each "Hangman" game the user tries to guess the letters of the Major League Baseball team name that is hidden in
	the teamName riddle.

	When it begins, the game picks a team name at random, conceals all its alphabetic letters, and 
	presents it to the user. The user will guess letters in the team name. The user is allowed 10 misses. If the user
	makes a correct guess, the letter(s) that match the guess are revealed. 

	If the user guesses all the letters in the teamName riddle with less than 10 misses, the user has solved the riddle
	and wins the game. The user can then continue playing the current game session or quit.

	Racking up 10 misses without solving the riddle is a loss. The user can then continue playing the current game 
	session or quit.

	As noted, the game tracks wins and losses within the current game session. This is an additional feature beyond the
	project's requirements.
*/

/* Flow of execution:

	Initialization:

	* initGame is where a new game session (a new Hangman object) begins. This function sets the number of wins and 
	  number of losses to zero and then calls the nextTeam function.

	* nextTeam picks a random team name, turns it into a Word object, then displays the team name as a string of "_" and
	  " ". Alphabetic letters (letters to be guessed) are displayed as "_". Spaces and punctuation characters are always
	  visible.  nextTeam then calls guessTeam.

	Guessing:

	* guessTeam is the function that contains the guessing logic. It calls getKeyStroke to get the user's next guess.
       **After the guess (whether correct or incorrect). the game will present the current state of the hidden team name.
	     Letters in the teamName riddle whose "visible" property is "true" (set by getKeyStroke) will be displayed.
       **Next, the game evaluates the state of play:
       ***If number of guesses remaining is 0, game is over and the user has lost. 
       ****The number of losses is incremented. 
       ****Current wins/losses are displayed. 
       ****The user is asked whether the game should continue. 
       *****If user wants to continue, the game instance makes a recursive call to its nextTeam logic to get a new 
              team name to guess. If not, the game calls the exit logic.
       ***Otherwise the number of guesses remaining is not 0 and so the user has not lost. 
       *****If all the alphabetic chars in the teamName riddle are visible, the user has won. The game increments the number of wins, displays
	          current wins and losses, and asks the user whether the game should continue. If user wants to continue, 
	          the game makes a recursive call to its nextTeam logic to get a new team name to guess.
	   *****Otherwise, the game knows that there are letters remaining to be guessed, so it makes a recursive call to the
	        the current game's guessTeam function.

	* getKeyStroke gets the user's next guess. It then checks to see whether the letter guessed appears one or more times
	  in the teamName riddle. 
	  **If the user has guessed a letter that appears in the team name, the "visible" property of the corresponding
	      letters is set to "true".
	  **Otherwise, the guess is incorrect and so the number of guesses is decremented by 1.

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
		console.log(chalk.cyan("\n***Play Major League Baseball Hangman\n"));
		console.log(chalk.green("A Team Name Is Hidden In This Riddle"));
		console.log("\nThe Riddle is "+this.currentTeam.toString()+"\n"); 
		
		this.guessTeam(); //Let's start guessing!
	};
	
	this.displayCurrentStats = function() {
		console.log("You currently have "+thisObject.currentWins+" wins and "+thisObject.currentLosses+" losses");
	}

	//guessTeam is the logic that gets the user's guess by calling getKeyStroke and then processes the guess
	this.guessTeam = function() {
		
		this.getKeyStroke().then(function() {
			console.log("\nCurrent state of the riddle is "+thisObject.currentTeam.toString()+"\n");
			if (thisObject.guessesRemaining === 0) {
				// User is out of guesses. Show user the solution and ask whether user wants to play again
				thisObject.currentLosses++; //record the loss
				console.log("\nNo guesses remaining");
				console.log("The Major League Baseball team riddle was "+thisObject.currentTeam.solved());
				thisObject.displayCurrentStats();
				thisObject.continuePlay();
			} else {
				if (thisObject.currentTeam.allVisible()) {
					//Success! -- If all letters are visible, the puzzle is solved
					console.log("Congratulations -- you have solved the Major League riddle!");
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
		          message: "Do You Want To Guess Another Major League Team?"
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
		console.log("Thanks for playing Major League Baseball Hangman!");
		process.exit(0); //And thanks to stack overflow for the "clean exit" -- beats "ctrl-c"!
	}


} // end of the Hangman function

module.exports = Hangman;









