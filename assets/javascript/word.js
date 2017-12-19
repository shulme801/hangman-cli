var Letter = require("./Letter"); //Bring in the Letter constructor so we have the logic to analyze the guessed character.

// The Word constructor is responsible for creating an array of Letter objects and determining if the user guessed every Letter correctly
function Word(word) {
  // The map() method creates a new array and calls the function in the parameter on every element in the calling array.
  this.letters = word.split("").map(function(char) {
    return new Letter(char);
  console.log("letters is "+this.letters).
  });
}


Word.prototype.solvedSoFar = function() {
  return this.letters.map(function(letter) { 
    return letter.getSolution(); // the map will look at each letter and return an array of solved letters
  }).join(''); // and we add the "join" to make the array of solved letters into a string.
}


Word.prototype.toString = function() {
  return this.letters.join(' '); //we join the letters into one string
};

Word.prototype.guessedLetter = function(char) {
  // do any of the letters in the letters array match the user's guess?
  var foundLetter = false;
  this.letters.forEach(function(letter) {
    if (letter.guess(char)) {
      foundLetter = true;
    }
  });

  //Print the word guessed so var
  console.log("\n" + this + "\n");
  // returns the status -- did we find a letter or not?
  return foundLetter;
};

// This code determines whether the user has guessed all the letters in the word correctly
Word.prototype.foundTarget = function() {
  // does the callback return true for every letter? if so, every returns true. if not, returns false
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;