// This constructor decides whether the "guessedChar" should be made visible. It also saves off the char in the current "this"
// context.


function Letter(guessedChar) {
  // Use a Reg Ex to see whether the guessed letter is an alphanumeric. If it is, make it visible.
  this.visible = !/[A-Za-z1-9]/i.test(guessedChar);
  // In any case, save off the character.
  this.char = guessedChar;

}

// Use a prototype to decide whether we want to display this character or display an underscore in its place
// This will be a very useful function when we analyze the character that the user guessed.
Letter.prototype.visibleChar = function() {
  if (this.visible === true) {
    return this.char;
  }
  return "_";
};

module.exports = Letter;