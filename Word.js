// Contains a constructor, Word, that depends on the Letter constructor. This is used
// to create an object representing the current word the user is attempting to guess.
var Letter = require("./Letter.js");

var Word = function(wordToGuess) {
    //An array of new Letter objects representing the letters of the underlying word
    this.wordToGuess = wordToGuess;
    //A function that returns a string representing the word. This should call the
    //function on each letter object (the first function defined in Letter.js) that
    //displays the character or an underscore and concatenate those together.
    this.returnWordString = function(wordToGuess,wordString){
        wordString = "";
        for (let index = 0; index < wordToGuess.length; index++) {
            wordString = wordString + wordToGuess[index];
        }
        console.log(wordString);     
      };
    //A function that takes a character as an argument and calls the 
    //guess function on each letter object (the second function
    //defined in Letter.js)
    this.letterInWord = function(letterCharacter,wordToGuess,letterGuessed, letterPositions){
        var letter = new Letter (letterCharacter, letterGuessed);
        // console.log("letter object: ", letter);
        // console.log(wordToGuess, letterCharacter, letterGuessed);
        letter.returnUnderlyingCharacter(wordToGuess, letterCharacter, letterGuessed, letterPositions);
        console.log("In Word.letterInWord:", wordToGuess, letterCharacter, letterGuessed, letterPositions);
    };
};

// Exporting our Word constructor. 
module.exports = Word;