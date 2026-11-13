//import './style.css'

import { GuessingGame } from "./guessing-game";


const btnRedo = document.getElementById("btnRestart");
const btnAnswer = document.getElementById("btnAnswer");
// check ans
const userMessageDiv = document.getElementById("userMessage");
// validateGuess
const errorDiv = document.getElementById("errorMessage");

const currentGuessesDiv = document.getElementById("currentGuesses");

const answerElement = document.getElementById(
  "userAnswer",
) as HTMLInputElement | null;

const userMaxRange = document.getElementById(
  "maxRange",
) as HTMLInputElement | null;

const userMinRange = document.getElementById(
  "minRange",
) as HTMLInputElement | null;

const userMaxGuesses = document.getElementById(
  "maxGuesses",
) as HTMLInputElement | null;

let maxGuess = 10;
let maxGuessNumber = 3;
let game = new GuessingGame(maxGuess, maxGuessNumber);
currentGuessesDiv!.innerText = `you have ${game.remainingGuesses}/${game.maxGuesses} guesses left.`;

function handleAnswerClick() {
  if (game.isGamerOver) {
    return;
    // its so over
  }

  errorDiv!.innerText = "";
  userMessageDiv!.innerText = "";

  let answer = getUserAnswer();
  let result = game.guess(answer);

  if (result.isError) {
    errorDiv!.innerText = result.message;
  } else {
    userMessageDiv!.innerText = result.message;
  }
  answerElement?.focus();
  if (game.remainingGuesses > 0) {
    currentGuessesDiv!.innerText = `you have ${game.remainingGuesses}/${game.maxGuesses} guesses left.`;
  } else {
    currentGuessesDiv!.innerText = "";
  }
}

function restartGame() {
  errorDiv!.innerText = "";
  userMessageDiv!.innerText = `Restarted, answer was ${game.secret}.`;
  answerElement!.value = "";
  answerElement?.focus();
  
  let maxRange = getUserMaxRange()
  let minRange = getUserMinRange()

  let maxGuesses = getUserMaxGuesses()

  if (minRange >= maxRange) {
    errorDiv!.innerText = "Please enter a min range lower than max range."
    console.log(minRange, maxRange)
    return
  }

  game = new GuessingGame(maxRange, maxGuesses, minRange);
  currentGuessesDiv!.innerText = `you have ${game.remainingGuesses}/${game.maxGuesses} guesses left.`;
  console.log (game)
}

btnAnswer?.addEventListener("click", handleAnswerClick);
btnRedo?.addEventListener("click", restartGame);



function getUserAnswer(): number | null {
  if (answerElement == null) {
    return null;
  }

  let answer = Number(answerElement.value);

  if (Number.isNaN(answer)) {
    return null;
  }

  answerElement.value = "";
  answerElement.focus();
  return answer;
}



function getUserMinRange(): number {
  if (userMinRange == null || userMinRange!.value == "") {
    return 1;
  }
  
  let answer = Number(userMinRange.value);
  
  return Math.floor(answer);
}



function getUserMaxRange(): number {
  if (userMaxRange == null || userMaxRange!.value == "") {
    return 10;
  }

  let answer = Number(userMaxRange.value);
  
  return Math.floor(answer);
}


function getUserMaxGuesses(): number {
  if (userMaxGuesses == null || userMaxGuesses!.value == "") {
    return 3;
  }
  
  let answer = Number(userMaxGuesses.value);
  
  return Math.floor(answer);
}



