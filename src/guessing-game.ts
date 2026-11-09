import { GuessResult } from "./guess-result";

export class GuessingGame {
   minRange: number = 1;
   maxRange: number;

  readonly maxGuesses: number;
  readonly secret: number;

  readonly lastGuess: number = 0;
  remainingGuesses: number;

  playerWon: boolean;
  isGamerOver: boolean;

  constructor(maxRange: number, numberOfGuesses: number) {
    this.maxRange = maxRange;
    this.maxGuesses = numberOfGuesses;
    this.remainingGuesses = this.maxGuesses;

    this.playerWon = false;
    this.isGamerOver = false;

    this.secret = this.generateSecret();
  }

  private generateSecret(): number {
    let r = Math.random();
    r = r * this.maxRange + this.minRange;
    r = Math.floor(r);
    return r;
  }

  guess(answer: number | null): GuessResult {
    let validationResult = this.validate(answer);
    if (validationResult != null) {
      return validationResult;
    }
    return this.checkAnswer(answer!);
  }

  private validate(answer: number | null): GuessResult | null {
    if (answer == null) {
      return new GuessResult(true, "Please enter a number!");
    }

    if (answer < this.minRange || answer > this.maxRange) {
      return new GuessResult(
        true,
        `Please enter a number between ${this.minRange} and ${this.maxRange}!`,
      );
    }

    if (!Number.isInteger(answer)) {
      return new GuessResult(true, "Please enter a whole number!");
    }
    
    return null;
  }

  private checkAnswer(answer: number): GuessResult {
    this.remainingGuesses -= 1;
    let message = "";
    if (answer == this.secret) {
      message = `you won! ${this.secret} was correct!`;
      this.playerWon = true;
      this.isGamerOver = true;
    } else if (answer < this.secret) {
      message = `${answer} is too low`;
    } else {
      message = `${answer} is too high`;
    }

    if (!this.playerWon && this.remainingGuesses == 0) {
      // ll il ii l_
      message = `you lost, ${this.secret} was the number`;
      this.isGamerOver = true;
    }
    return new GuessResult(false, message);
  }


  private currentGuesses() {
    
  }
}
