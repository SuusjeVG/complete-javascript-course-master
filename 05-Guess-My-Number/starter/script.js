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

// check if the input is the same as the random number
function checkIfCorrect(input) {
  input = Number(input);

  if (input === random_number) {
    message.textContent = "🎉 It's correct 🎉";
    document.body.style.backgroundColor = '#60b347';
    highscore.textContent = score.toString();
    btn_check.disabled = true;
  } else if (input < random_number && input <= 20) {
    message.textContent = "❌ It's too low ❌";
    score--;
    span_score.textContent = score.toString();
  } else if (input > random_number && input <= 20) {
    message.textContent = "❌ It's too high ❌";
    score--;
    span_score.textContent = score.toString();
  } else if (input > 20) {
    message.textContent = 'Guess a number between 1 and 20';
  }
}

btn_check.addEventListener('click', function () {
  const guess_input = guess.value;
  number.textContent = guess_input;
  checkIfCorrect(guess_input);
});

btn_again.addEventListener('click', function () {
  guess.value = '';
  number.textContent = '?';
  message.textContent = 'Start guessing...';
  btn_check.disabled = false;
  document.body.style.backgroundColor = '#222';
  random_number = Math.ceil(Math.random() * 20);
  // console.log(random_number);
  score = 20;
  span_score.textContent = score.toString();
});
