// 


function Letter(inChar) {
  //The character object has two properties. this.char is the character itself.
  //this.visible is true if the character is NOT alphabetic. In other words, if the character is
  //not a printable character, we will display it (and user doesn't have to guess it). If the character is a letter,
  //then don't display it automatically.
  this.char    = inChar; //save off the input character itself into the Letter object
  /[a-z]/i.test(inChar) ? this.visible = false : this.visible = true;
  
}


//override the Object toString() method with a prototype method that checks the "visible" attribute in the letter object.
//If "visible" is true, display this.char.  If it isn't, display a "_".
Letter.prototype.toString = function() {
  if (this.visible === true) {
    return this.char;
  }
  return "_";
};

// Use a prototype to decide whether we want to display this character or display an underscore in its place
// This will be a very useful function when we analyze the character that the user guessed.
Letter.prototype.isVisible = function() {
  var ret = (this.visible === true) ? this.char : "_";
  return ret;
};

Letter.prototype.guess = function(guessedChar) {
	//See whether the guessed character matches this.char. If it does, turn on this.visible and return true.
	var correctGuess = false;
	
	if (guessedChar.toUpperCase() === this.char.toUpperCase()) {
		this.visible      = true;
		correctGuess      = true;
	} 
	return correctGuess;
};

module.exports = Letter;