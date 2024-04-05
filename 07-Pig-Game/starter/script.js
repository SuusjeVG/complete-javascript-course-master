'use strict';

const btn_roll_dice = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
const btn_newgame = document.querySelector('.btn--new');
let dice_image = document.querySelector('.dice');

let score = 0;
const winner_score = 50;

const dice_one = 'dice-1.png';
const dice_two = 'dice-2.png';
const dice_three = 'dice-3.png';
const dice_four = 'dice-4.png';
const dice_five = 'dice-5.png';
const dice_six = 'dice-6.png';

let dice_array = [
  dice_one,
  dice_two,
  dice_three,
  dice_four,
  dice_five,
  dice_six,
];

let player_1_name = document.getElementById('name--1');
let active_class = document.querySelector('.player--active');
// player 1
const player_1 = document.querySelector('.player--1');
const current_score_player_1 = document.getElementById('current--1');

const score_player_1 = document.getElementById('score--1');

// player 2
let player_2_name = document.getElementById('name--2');
const player_2 = document.querySelector('.player--2');
const current_score_player_2 = document.getElementById('current--2');

const score_player_2 = document.getElementById('score--2');

function playerName() {
  const name_one = prompt('Name player 1:');
  const name_two = prompt('Name player 2:');

  if (name_one || name_two) {
    player_1_name.textContent = name_one;
    player_2_name.textContent = name_two;
  }
}

playerName();

// active player
let active_player = {
  player_1: true,
  player_2: false,
};

function winGame() {
  let score1 = parseInt(score_player_1.textContent);
  let score2 = parseInt(score_player_2.textContent);

  if (score1 >= winner_score || score2 >= winner_score) {
    btn_roll_dice.disabled = true;
    btn_hold.disabled = true;

    if (score1 >= winner_score) {
      player_1.classList.add('player--active', 'player--winner');
      player_2.classList.remove('player--active');
    } else if (score2 >= winner_score) {
      player_2.classList.add('player--active', 'player--winner');
      player_1.classList.remove('player--active');
    }
  }
}

// add click event to roll the dice button.
btn_roll_dice.addEventListener('click', function () {
  // counter for the interval
  let counter = 0;

  // disable the buttons when the roll dice is clicked. So you can't click them while it is rolling.
  btn_roll_dice.disabled = true;
  btn_hold.disabled = true;

  const interval = setInterval(() => {
    // random number for the result of the dice.
    const random_number = Math.floor(Math.random() * 6);
    dice_image.src = dice_array[random_number];
    dice_image.style.display = 'block';

    counter++;

    if (counter === 15) {
      // enable so now you can click one of your 2 options.
      btn_roll_dice.disabled = false;
      btn_hold.disabled = false;

      clearInterval(interval);
      const result = random_number + 1;
      score = score + result;

      if (active_player.player_1) {
        if (random_number === 5) {
          current_score_player_1.textContent = 0;
          score = 0;

          //styling
          player_1.classList.remove('player--active');
          player_2.classList.add('player--active');

          active_player.player_1 = false;
          active_player.player_2 = true;
        } else {
          current_score_player_1.textContent = score;
        }
      } else if (active_player.player_2) {
        if (random_number === 5) {
          current_score_player_2.textContent = 0;
          score = 0;

          //styling
          player_1.classList.add('player--active');
          player_2.classList.remove('player--active');

          active_player.player_1 = true;
          active_player.player_2 = false;
        } else {
          current_score_player_2.textContent = score;
        }
      }
      console.log(score);
    }
  }, 80);
});

btn_hold.addEventListener('click', function () {
  if (score > 0) {
    if (active_player.player_1) {
      // Haal de huidige totale score op en zet deze om naar een integer
      let totalScore = parseInt(score_player_1.textContent);
      totalScore += score;
      // add deze aan de textcontent
      score_player_1.textContent = totalScore;

      //styling
      player_1.classList.remove('player--active');
      player_2.classList.add('player--active');

      active_player.player_1 = false;
      active_player.player_2 = true;

      score = 0;
      current_score_player_1.textContent = 0;
    } else if (active_player.player_2) {
      // Haal de huidige totale score op en zet deze om naar een integer
      let totalScore = parseInt(score_player_2.textContent);
      totalScore += score;
      // add deze aan de textcontent
      score_player_2.textContent = totalScore;

      //styling
      player_1.classList.add('player--active');
      player_2.classList.remove('player--active');

      active_player.player_1 = true;
      active_player.player_2 = false;

      score = 0;
      current_score_player_2.textContent = 0;
    }
  }

  winGame();
});

const newGame = function () {
  score_player_1.textContent = 0;
  score_player_2.textContent = 0;

  active_player.player_1 = true;
  player_1.classList.add('player--active');
  player_1.classList.remove('player--winner');
  player_2.classList.remove('player--active', 'player--winner');

  dice_image.style.display = 'none';

  btn_roll_dice.disabled = false;
  btn_hold.disabled = false;
};

btn_newgame.addEventListener('click', newGame);
