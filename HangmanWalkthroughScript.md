# Hangman Walkthrough Script
Hello, my name is Steve Hulme. This is a walkthrough of my hangman application. It is a javascript node application that uses Constructors; manipulates inheritance; and uses recursion.

This is a hangman game, in which  one of the 30 major league teams is chosen at random and encoded in a riddle. The user plays the game by guessing letters. If a guess matches one or more letters in the riddle, the letters are revealed. If the guess does not match any letter it is considered a “miss”. The game continues until either all letters have been revealed or the user has missed 10 guesses.

The app is built on the concept of a “session of play”. Within each session, the user can play the game multiple times. The app keeps track of the number of wins and losses. At the end of each game it presents the current tally to the user.

With no further ado, let’s walk through the application.

1. Play the game successfully.
2. Point out the success message and updated win/loss tally.
3. Play the game a second time
	1. Show that character matching is case-insensitive.
	2. Demo the character validation.
	3. Deliberately loose to demonstrate that the number of misses remaining is decremented to 0.
	4. Show the final tally and exit.