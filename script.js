'use strict';

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  inactivePlayer = inactivePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  inactivePlayer = 1;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--loser');
  player1El.classList.remove('player--loser');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  for (let i = 0; i < currentBox.length; i++) {
    currentBox[i].classList.remove('hidden');
    document.getElementById(`name--${i}`).textContent = `Player ${i + 1}`;
    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = scores[i];
  }
};

const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');
const player0El = document.querySelector('.player--0');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentBox = document.querySelectorAll('.current');

let scores, currentScore, activePlayer, inactivePlayer, playing;

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${inactivePlayer}`)
        .classList.add('player--loser');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = `WINNER!`;
      document.getElementById(`name--${inactivePlayer}`).textContent = `LOSER!`;
      diceEl.classList.add('hidden');
      for (let i = 0; i < currentBox.length; i++) {
        currentBox[i].classList.add('hidden');
      }
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
