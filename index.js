// Load the inquirer package and other dependent packages 
var inquirer = require("inquirer");
// var Letter = require("./Letter.js");
var Word = require("./Word.js");

//Define the global variables
var letterPositions = [];
var letterGuessed = [];
var totalGuesses = 5;
var remainingGuesses = 5;
var singerNames = ["michael jackson", "phil collins", "madonna", "prince", 
                          "elton john", "celine dion"];


// Randomly chooses a choice from the singer names array.
var singerNameToGuessStr = singerNames[Math.floor(Math.random() * singerNames.length)];
console.log(singerNameToGuessStr);
singerNameToGuessArr = singerNameToGuessStr.split("");
// console.log(singerNameToGuessArr);
// Set up a word space array filled with "_" for user to guess and position letters in.
var singerNamePortionsGuessed = [];
for (let index = 0; index < singerNameToGuessArr.length; index++) {
  singerNamePortionsGuessed.push("_");
}
// console.log(singerNamePortionsGuessed);
var newWord = new Word(singerNameToGuessArr);
console.log(newWord);

function userLetterGuess(){
  inquirer
    .prompt([
      {
        type: "input",
        message: ("You have " + remainingGuesses + " guesses. Pick a letter:"),
        name: "letter",
        validate: function(input) {
            var regEx = new RegExp(/^[a-zA-Z\s]{1,1}$/);
            if (regEx.test(input)) {
                return true;
            } else {
                console.log(" ERROR:  Please enter ONLY 1 VALID LETTER at a time!");
                return false;
            }
        }
      }
    ]).then(function(inquirerResponse) {
      console.log("================================================================");
      var chosenLetter = inquirerResponse.letter;
      // console.log("letter chosen: ", chosenLetter);
      // console.log(newWord);
      // console.log(singerNameToGuessArr);
      // var letterGuessed = false;
      //letterPositions = [];
      
      var functionWillResolve = true;
      var asyncHandleLetterInWord = new Promise(
        function (resolve, reject) {
          if (functionWillResolve) {
            console.log("index.js: About  to Call LetterInWord Function");
            newWord.letterInWord(chosenLetter,singerNameToGuessArr,letterGuessed, letterPositions );
            console.log("index.js/Promise code:",  chosenLetter, singerNameToGuessArr,
                                                                   letterGuessed, letterPositions );
            resolve("Promise Function Resolved");
          } else {
            var reason = new Error("Issue in Promise Function");
            reject(reason);
          }
        }
      );

      // function executeLetterInWordPromise() {
      var executeLetterInWordPromise = function () {
        asyncHandleLetterInWord
            .then
                // (fulfilled => console.log("In index.js:",  chosenLetter, singerNameToGuessArr,
                //                                             letterGuessed, letterPositions))
                (function (fulfilled) {
                  console.log("index.js/Promise.THEN code:",  chosenLetter, singerNameToGuessArr,
                                                            letterGuessed, letterPositions );
                  if (letterGuessed[0]) {
                    for (let index = 0; index < letterPositions.length; index++) {
                      singerNamePortionsGuessed[letterPositions[index]] = chosenLetter;
                    }
                    console.log(singerNamePortionsGuessed);
                    if (singerNamePortionsGuessed === singerNameToGuessArr) {
                      console.log("YOU ARE CORRECT AND A WINNER! ", singerNamePortionsGuessed, " is the correct answer!")
                    } else {
                      letterPositions = [];
                      letterGuessed = [];
                      //Go for the next letter guess.
                      userLetterGuess();
                    }
                  }
                  else {
                      // You lose a guess
                      remainingGuesses = remainingGuesses - 1;
                      if (remainingGuesses === 0) {
                        console.log("YOU ARE A LOSER!")
                        //Check if they want to play again
                      }
                      //Go for the next letter guess.
                      letterPositions = [];
                      letterGuessed = [];
                      userLetterGuess();
                  };
                  console.log(fulfilled, "In index.js/Promise.THEN code");
                })
            .catch
                // (error => console.log("ERROR in index.js" ));
                (function (error) {
                  console.log("In index.js/Promise.CATCH code:",  chosenLetter, singerNameToGuessArr,
                                                            letterGuessed, letterPositions );
                  console.log(error.message);
                });
      };
      
      executeLetterInWordPromise();
      // console.log("index.js/After executeLetter.. call",  chosenLetter, singerNameToGuessArr,
      // letterGuessed, letterPositions );

      // newWord.letterInWord(chosenLetter,singerNameToGuessArr, letterGuessed, letterPositions)
      //  .then(success => console.log("In index.js:",  chosenLetter, singerNameToGuessArr, letterGuessed, letterPositions));


      // newWord.checkLetter(letter);
      // if (newWord.isLetterValid) {
      //     console.log("Sorry but you have already guessed that letter, please try a different one!");
      //     userGuess();
      // } else {
      //     if (newWord.isComplete()) {
      //         console.log("CORRECT! YOU WIN!!!!!!!!!! " + newWord.chosenWord + " was the hidden word!");
      //         playAgain();
      //     } else if (newWord.trysLeft === 0) {
      //         console.log("Sorry but you are all out of trys! The answer was " + " ' " + newWord.chosenWord + " ' ");
      //         playAgain();
      //     } else {
      //         console.log("You have " + newWord.trysLeft + " remaining trys left!");
      //         console.log(".................................................................");
      //         userGuess();
      //     }
      // }

  });
}

//THIS FUNCTION HANDLES THE PLAY AGAIN FEATURE ALSO CONOSLE LOGS IF THEY WANT TO PLAY AGAIN BY HADLING USER INPUT
function playAgain() {
  inquirer.prompt([{
      type: 'input',
      message: 'Would you like to play again? Please type "y" for Yes and "n" for No',
      name: 'playAgain'
  }]).then(function(user) {
      var answer = user.playAgain;
      if (answer == 'y') {
          game.userPrompt(function() {
              newWord = new word.Word(game.chosenWord);
              userGuess();
          });
      } else if (answer === 'n') {
          console.log("Thank you for playing!");
          return;
      }
  })
}

userLetterGuess();



