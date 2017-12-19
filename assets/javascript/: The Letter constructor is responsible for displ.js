// The Letter constructor is responsible for displaying either an underscore or the underlying character for each letter in the word

function Letter(guessedChar) {
  // If a character is not a number or a letter, make it visible right away
  this.visible = !/[A-Za-z1-9]/i.test(char);
  // Save the underlying character
  this.char = char;

}


Letter.prototype.visibleChar = function() {
  if (this.visible === true) {
    return this.char;
  }
  return "_";
};
