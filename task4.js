function generateSecretNumber(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


function checkGuess(guess, secretNumber) {
  if(guess === secretNumber) {
    console.log("Congratulations! You guessed the secrret number!");
  }
  else if(guess > 20 || guess < 1) {
    console.log('Invalid')
  }
  else if(guess > secretNumber) {
    console.log("Too high");
  }
  else if(guess < secretNumber) {
    console.log("Too low");
  }
}
const actualSecretNumber = generateSecretNumber(1, 20);

// 4. Your array of guesses
const guesses = [4, 10, 12, 18, 15];

// 5. Use a loop to check every guess in your array!
for (let i = 0; i < guesses.length; i++) {
  checkGuess(guesses[i], actualSecretNumber);
}
