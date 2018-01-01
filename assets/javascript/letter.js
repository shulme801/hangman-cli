/*  The Letter constructor builds a Letter object from the input character. 
      This Letter object has two properties. 
        this.char is the character itself. this.visible is true if the character 
          can be displayed.
        this.visible will be set to true when a letter in the riddle is guessed by the user. In addition, spaces and 
          punctuation characters are always visible. 

   toString() overrides the inherited Object toString() method. Our toString() looks first at this.visible property.
    If this.visible is true, it returns the underlying character value. If this.visible is false, it returns an 
    underscore character. This method is used to build output displays of the current state of the riddle.

   isVisible() returns true if the Letter object is currently displayable (e.g., if the underlying character has been 
     guessed).
     Otherwise, it returns the "_" character because the underlying character has not been guessed.

   guess() is the method that actually determines whether the input guessed character matches the current this.char.
*/

function Letter(inChar) {
  
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