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
        // var letter = new Letter (letterCharacter, letterGuessed);
        // console.log("letter object: ", letter);
        // console.log(wordToGuess, letterCharacter, letterGuessed);
        // letter.returnUnderlyingCharacter(wordToGuess, letterCharacter, letterGuessed, letterPositions);

        var returnUnderlyingFunctionWillResolve = true;
        var asyncReturnUnderlyingCharacter = new Promise(
          function (resolve, reject) {
            if (returnUnderlyingFunctionWillResolve) {
              console.log("About  to Call returnUnderlyingCharacer Function");
              var letter = new Letter (letterCharacter, letterGuessed);
              letter.returnUnderlyingCharacter(wordToGuess, letterCharacter, letterGuessed, letterPositions);
              console.log("In Word.js/Promise code:",  wordToGuess, letterCharacter, letterGuessed, letterPositions);
              resolve("Promise Function Resolved");
            } else {
              var reason = new Error("Issue in Word Promise Function");
              reject(reason);
            }
          }
        );
  
        // function executeLetterInWordPromise() {
        var executeReturnUnderlyingCharacterPromise = function () {
            asyncReturnUnderlyingCharacter
              .then
                  // (fulfilled => console.log("In index.js:",  chosenLetter, singerNameToGuessArr,
                  //                                             letterGuessed, letterPositions))
                  (function (fulfilled) {
                    console.log("In Word.js/Promise.then code:",  wordToGuess, 
                                                                  letterCharacter, letterGuessed, letterPositions);
                    console.log(fulfilled);
                  })
              .catch
                  // (error => console.log("ERROR in index.js" ));
                  (function (error) {
                    console.log("In Word.js/Promise.catch code:",  wordToGuess, 
                                                                   letterCharacter, letterGuessed, letterPositions);
                    console.log(error.message);
                  });
        };

        executeReturnUnderlyingCharacterPromise();
        console.log("In Word.letterInWord:", wordToGuess, letterCharacter, letterGuessed, letterPositions);
    };
};

// Exporting our Word constructor. 
module.exports = Word;