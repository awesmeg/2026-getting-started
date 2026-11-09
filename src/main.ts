//import './style.css'

import { GuessingGame } from "./guessing-game";

const btnMinRange = document.getElementById("btnMinRange");
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

const userMinRange = document.getElementById(
  "minRangeAnswer",
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

  game = new GuessingGame(maxGuess, maxGuessNumber);
  currentGuessesDiv!.innerText = `you have ${game.remainingGuesses}/${game.maxGuesses} guesses left.`;
}

btnAnswer?.addEventListener("click", handleAnswerClick);
btnRedo?.addEventListener("click", restartGame);
btnMinRange?.addEventListener("click", getUserRange);

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

function getUserRange(): number | null {
  if (userMinRange == null) {
    return null;
  }

  let answer = Number(userMinRange.value);

  if (Number.isNaN(answer)) {
    return null;
  }

  userMinRange.value = "";
  userMinRange.focus();
  return answer;
}
