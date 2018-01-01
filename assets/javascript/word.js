

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
  console.log("The word is "+this.letters);

}

Word.prototype.guessLetter = function (char) {
  var found = false;

  //We will see if any of the letters in the "letters" array match the user's guessed char (the input parameter).
  //If they do, we'll set the visible property of the matching letters in "letters" to 
  //"visible" (via the letter.guess method).
  this.letters.forEach(letter => {
    if (letter.guess(char)) {
      found = true;
    }
  });

  return found;
}

Word.prototype.solvedSoFar = function(){
  var solvedArray=[];

  this.letters.forEach(letter => {
    if (visible) {
      solvedArray.push(this.char);
    }
  });

  return solvedArray.join('');
}

//Override the Object toString() method with our own, so that when we output the Word object's letters,
//we get a string in which each char is separated by a " "
Word.prototype.toString = function() {
  return this.letters.join(' ');  
};


// This code determines whether the user has guessed all the letters in the word correctly
Word.prototype.foundAll = function() {
  // does the callback return true for every letter? if so, every returns true. if not, returns false
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;