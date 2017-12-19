// This is the entry point to the Hangman game.
// Pseudo code is located in the hangman.js file, which contains the logic that drives the game.
var Hangman = require("./Assets/javascript/hangman.js");

// Start by initializing a new Hangman game object
var hangman = new Hangman();

// Start playing
hangman.initGame();