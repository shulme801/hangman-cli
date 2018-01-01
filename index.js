/* This is the entry point to the Node cli Hangman game.See the hangman.js file 
   detailed documentation and pseudo code.
*/

var Hangman = require("./Assets/javascript/hangman.js");

// Start by instantiating a new Hangman game object
var hangman = new Hangman();

// Start playing
hangman.initGame();
