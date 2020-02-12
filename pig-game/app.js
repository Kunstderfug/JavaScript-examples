/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Game variables
let scores, roundScore, activePlayer, isGamePlaying;

let dice0 = document.getElementById('dice-0');
let dice1 = document.getElementById('dice-1');
let dice2 = document.getElementById('dice-2');

let rollDice = document.querySelector('.btn-roll');
let hold = document.querySelector('.btn-hold');

let winningScore = 100;

let history = [];

// Initial setup
function gameStart() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  //Hides the initial settings window
  document.querySelector('.num-dice').classList.add('hidden');
  isGamePlaying = true;

  // Winning score setup
  winningScore = Number(document.getElementById('winningScore').value);
  winningScore !== 0 ? (winningScore = winningScore) : (winningScore = 100);
  if (oneDice) {
    console.log('one-dice game, ' + winningScore);
  } else {
    console.log('two-dice game, ' + winningScore);
  }
}

// Choice of one or two dices
let oneDice = false;

document.getElementById('1-dice').addEventListener('click', function() {
  oneDice = true;
  gameStart();
});

let twoDice = document.getElementById('2-dice');
twoDice.addEventListener('click', gameStart);

// Start the game by rolling the dice
rollDice.addEventListener('click', rollDiceFunction);

function rollDiceFunction() {
  if (isGamePlaying) {
    let currentScore = document.getElementById('current-' + activePlayer);
    if (oneDice) {
      // console.log("you started the game with one dice");
      let diceZero = Math.floor(Math.random() * 6 + 1);
      dice0.src = 'dice-' + diceZero + '.png';
      dice0.classList.remove('hidden');
      if (diceZero === 1) {
        roundScore = 0;
        currentScore.textContent = roundScore;
        history = [];
        nextPlayer();
      } else {
        roundScore += diceZero;
        currentScore.textContent = roundScore;
        history.push(diceZero);
        console.log(history);
        if (
          history[history.length - 1] === 6 &&
          history[history.length - 2] === 6
        ) {
          alert('Six two times, Your score is 0');
          document.getElementById('score-' + activePlayer).textContent = '0';
          scores[activePlayer] = 0;
          nextPlayer();
        }
      }
    } else {
      // console.log("you started the game with two dices");
      let diceOne = Math.floor(Math.random() * 6 + 1);
      let diceTwo = Math.floor(Math.random() * 6 + 1);
      let sum = diceOne + diceTwo;
      dice1.src = 'dice-' + diceOne + '.png';
      dice2.src = 'dice-' + diceTwo + '.png';
      dice1.classList.remove('hidden');
      dice2.classList.remove('hidden');
      if (diceOne === 1 || diceTwo === 1) {
        roundScore = 0;
        currentScore.textContent = roundScore;
        nextPlayer();
      } else {
        roundScore += sum;
        currentScore.textContent = roundScore;
      }
    }
  }
}

// Hold button function, adds the current score to the total
hold.addEventListener('click', function() {
  if (isGamePlaying) {
    scores[activePlayer] += roundScore;
    let total = scores[activePlayer];
    document.getElementById('score-' + activePlayer).textContent = total;
    if (total >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'winner!';
      isGamePlaying = false;
      activePlayer = 0;
    } else {
      nextPlayer();
    }
  }
});

// Next player change
function nextPlayer() {
  document.getElementById('current-' + activePlayer).textContent = '0';
  roundScore = 0;
  history = [];
  if (activePlayer === 0) {
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
    activePlayer = 1;
  } else {
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    activePlayer = 0;
  }
}

let newGame = document.querySelector('.btn-new');
newGame.addEventListener('click', resetGame);

function resetGame() {
  document.querySelector('.num-dice').classList.remove('hidden');
  dice0.classList.add('hidden');
  dice1.classList.add('hidden');
  dice2.classList.add('hidden');
  oneDice = false;
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

document.getElementById('gamerules').addEventListener('click', function() {
  document.getElementById('explanation').classList.toggle('hidden');
});
