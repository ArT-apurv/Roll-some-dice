'use strict';

// Initial State

var player1Score = document.querySelector('#score--0');
var player2Score = document.querySelector('#score--1');
var active1 = document.querySelector('.player--0');
var active2 = document.querySelector('.player--1');

player1Score.textContent = 0;
player2Score.textContent = 0;

var score = [0, 0];

var dice = document.querySelector('.dice');
dice.classList.add('hidden');

var i = 0;
var j;

// Switching Of Players

var switchPlayer = function () {
  document.getElementById(`current--${i}`).textContent = score[i];
  document.getElementById(`score--${i}`).textContent = score[i];
  document
    .getElementsByClassName(`player--${i}`)[0]
    .classList.remove('player--active');
  i = i === 0 ? 1 : 0;
  document
    .getElementsByClassName(`player--${i}`)[0]
    .classList.add('player--active');
};

// Declaring Winners

var winner = function () {
  document.querySelector(`.player--${i}`).classList.add('player--winner');
  document.querySelector(`.player--${i}`).classList.remove('player--active');
  dice.classList.add('hidden');
  j = i;
  j = j === 0 ? 1 : 0;
  document.getElementById(`current--${j}`).textContent = 0;
  document.getElementById(`score--${j}`).textContent = 0;
};

// Rolling of Dice

document.querySelector('.btn--roll').addEventListener('click', function () {
  dice.classList.remove('hidden');
  var randomNumber = Math.trunc(Math.random() * 6) + 1;
  var imgSource = 'dice-' + randomNumber + '.png';
  dice.src = imgSource;

  if (score[i] < 20) {
    if (randomNumber !== 1) {
      score[i] = score[i] + randomNumber;
      document.getElementById(`current--${i}`).textContent = score[i];
    } else {
      score[i] = 0;
      switchPlayer();
    }
  } else {
    winner();
    document.getElementById(`score--${i}`).textContent = score[i];
  }
});

// Holding the score

document.querySelector('.btn--hold').addEventListener('click', function () {
  document.getElementById(`score--${i}`).textContent = score[i];
  if (score[i] >= 20) {
    winner();
  } else {
    switchPlayer();
  }
});

// New Game

function reload() {
  reload = location.reload();
}

document.querySelector('.btn--new').addEventListener('click', reload, false);
