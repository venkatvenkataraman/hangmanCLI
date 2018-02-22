// Constructor function - This constructor should be able to either display an underlying 
// character or a blank placeholder (such as an underscore), depending on whether or not 
// the user has guessed the letter.
// letterCharacter - A string value to store the underlying character for the letter
// letterGuessed - A boolean value that stores whether that letter has been guessed yet
var Letter = function(letterCharacter, letterGuessed) {
    this.letterCharacter = letterCharacter;
    this.letterGuessed = letterGuessed;
    // A function that returns the underlying character if the letter has been guessed, 
    // or a placeholder (like an underscore) if the letter has not been guessed
    this.returnUnderlyingCharacter = function(wordToGuess, 
                       letterCharacter, letterGuessed, letterPositions){
      // letterCharacter=JSON.stringify(letterCharacter);
      console.log("Inside returnUnderlyingCharacter function");
      console.log(wordToGuess.indexOf(letterCharacter));
      if (wordToGuess.indexOf(letterCharacter) >= 0 ) {
        this.letterCharacter = letterCharacter;
        this.letterGuessed = true;
        // letterGuessed = true;
        letterGuessed.push(true);
        //letterPositions = [];
        for (let index = 0; index < wordToGuess.length; index++) {
          if (wordToGuess[index] === letterCharacter){
            letterPositions.push(index);
          };
        }
      }
      else {
        this.letterCharacter = "_";
        letterCharacter = "_";
        this.letterGuessed = false;
        // letterGuessed = false;
        letterGuessed.push(false);
      }
      
      console.log("In Letter.returnUnderlyingCharacter function:", wordToGuess, letterCharacter, letterGuessed, letterPositions);
      return letterGuessed, letterPositions;
    };
  };
  
  // Exporting our Letter constructor. 
  module.exports = Letter;