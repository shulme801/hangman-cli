/* word.js contains the constructor for the Word object and its prototype methods. 

   The Word object constructor creates an array of Letters. The array of Letters is an array of Letter objects. 
     The riddle is instantiated through a Word object.

   guessLetter() looks at the Letter objects in the Word object to see whether the input "char" matches one or more of them. 
     if there is a match, return true.

   solved() is a method that solves the riddle by returning a string in which all letters are visible.

   toString() overrides the Object toString method. It looks at each Letter in the Word object, so that when we output 
     the Word object's letters, we get a string in which each char is separated by a " "

   allVisible() is a method that returns true if every letter is visible. We'll use this method to determine whether
     the riddle has been solved.
*/

var Letter = require("./Letter"); //Bring in the Letter constructor so we have the logic to analyze the guessed character.


// The Word constructor is responsible for creating an array of Letter objects and determining if the user guessed every Letter correctly
function Word(word) {
  // The map() method creates a new array.
  // it also calls the callback function in the parameter on every element in that array.
  // At the end, this.letters is a Word, which is an object that itself is an array of letter objects. 
  //
  // Each "letter" object will consist of the 
  // underlying character and a "visible" property. Non-alpha characters (like ".") are visible by default;
  // alpha characters have to be guessed and so are not visible.
  this.letters = word.split("").map((char) => {
     return new Letter(char); //Iterate over each char in Word and make each of them into a Letter object.
     //Each Letter has two properties: the character itself, and the "visible" property.
  });
}

Word.prototype.guessLetter = function (char) {
  var found = false;

  //We will see if any of the letters in the "letters" obj of type "Word". We try to 
  //match the user's guessed char (the input parameter).
  //If they do, we'll set the visible property of the matching letters in "letters" to 
  //"visible" (via the letter.guess method).
  this.letters.forEach(letter => {
    if (letter.guess(char)) {
      found = true;
    }
  });

  return found;
}

Word.prototype.solved = function(){
  return this.letters.map(function(letter) { // iterate over each Letter obj in the "letters" obj of type Word.
    return letter.char; // return the actual character out of each individual Letter object.
  }).join(''); // convert the array of returned characters into a string
}

//Override the Object toString() method with our own, so that when we output the Word object's letters,
//we get a string in which each char is separated by a " ".
Word.prototype.toString = function() {
  return this.letters.join(' ');  
};


// This prototype method determines whether the user has guessed all the letters in the word correctly
Word.prototype.allVisible = function() {
  // look at each of the Letter's "visible" property. 
  // From MDN, "The every() method tests whether all elements in the array pass the test 
  // implemented by the provided function". So, allVisible will return "True" if and only if the
  // "visible" property is turned on for every Letter object within the Word object "letters".
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;