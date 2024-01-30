'use strict';

const message = document.querySelector('.message');
const number = document.querySelector('.number');
let guess = document.querySelector('input.guess');
const btn_check = document.querySelector('.check');
const btn_again = document.querySelector('.again');

// get score value and make it an int
let span_score = document.querySelector('.score');
let score = Number(span_score.textContent);

let highscore = document.querySelector('.highscore');

// make random numebr between 1 and 20
let random_number = Math.ceil(Math.random() * 20);
// console.log(random_number);

// function that displays message for every outcome
const displayMessage = function (message_string) {
  message.textContent = message_string;
};

// check if the input is the same as the random number
function checkIfCorrect(input) {
  input = Number(input);

  // if guessed number is to high or te low
  if (input > 20 || !input) {
    // message.textContent = 'Guess a number between 1 and 20';
    displayMessage('Guess a number between 1 and 20');

    // if user guessed the secret number correct
  } else if (input === random_number) {
    // message.textContent = "🎉 It's correct 🎉";
    displayMessage("🎉 It's correct 🎉");
    document.body.style.backgroundColor = '#60b347';
    number.textContent = guess.value;
    number.style.width = '30rem';
    btn_check.disabled = true;

    // only update the highscore if the score is higher then the highscore.
    if (score > Number(highscore.textContent)) {
      highscore.textContent = score.toString();
    }

    // if guess is not equal to the secret random number
  } else if (input !== random_number && input <= 20) {
    // message.textContent = input > random_number ? '❌ Too high ❌' : '❌ Too low ❌';
    displayMessage(input > random_number ? '❌ Too high ❌' : '❌ Too low ❌');
    score--;
    span_score.textContent = score.toString();
  }
  // if guess is higher then secret number
  // } else if (input > random_number && input <= 20) {
  //   message.textContent = '❌ Too high ❌';
  //   score--;
  //   span_score.textContent = score.toString();
  // }

  // if you lose the game
  if (score === 0) {
    displayMessage('💥 You lost the game! 💥');
    document.body.style.backgroundColor = '#ed3104';
    btn_check.disabled = true;
  }
}

btn_check.addEventListener('click', function () {
  const guess_input = guess.value;
  checkIfCorrect(guess_input);
});

btn_again.addEventListener('click', function () {
  guess.value = '';
  number.textContent = '?';
  number.style.width = '15rem';
  displayMessage('Start guessing...');
  btn_check.disabled = false;
  document.body.style.backgroundColor = '#222';
  random_number = Math.ceil(Math.random() * 20);
  // console.log(random_number);
  score = 20;
  span_score.textContent = score.toString();
});
