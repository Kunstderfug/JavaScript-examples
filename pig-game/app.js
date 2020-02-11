/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Game variables
let scores, roundScore, activePlayer, isGamePlaying;

let dice0 = document.getElementById("dice-0");
let dice1 = document.getElementById("dice-1");
let dice2 = document.getElementById("dice-2");

let currentScore = document.getElementById("current-" + activePlayer);

let rollDice = document.querySelector(".btn-roll");

let winningScore = 100;

// Initial setup
function gameStart() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Hides the initial settings window
  document.querySelector(".num-dice").classList.add("hidden");
  isGamePlaying = true;

  // Winning score setup
  winningScore = Number(document.getElementById("winningScore").value);
  winningScore !== 0 ? (winningScore = winningScore) : (winningScore = 100);
  if (oneDice) {
    console.log("one-dice game, " + winningScore);
  } else {
    console.log("two-dice game, " + winningScore);
  }
}

// Choice of one or two dices
let oneDice = false;

document.getElementById("1-dice").addEventListener("click", function() {
  oneDice = true;
  gameStart();
});

let twoDice = document.getElementById("2-dice");
twoDice.addEventListener("click", gameStart);

// Start the game by rolling the dice
rollDice.addEventListener("click", rollDiceFunction);

function rollDiceFunction() {
  if (oneDice) {
    // console.log("you started the game with one dice");
    let diceZero = Math.floor(Math.random() * 6 + 1);
    dice0.src = "dice-" + diceZero + ".png";
    dice0.classList.remove("hidden");
    roundScore += diceZero;
    currentScore.textContent = roundScore;
  } else {
    // console.log("you started the game with two dices");
    let diceOne = Math.floor(Math.random() * 6 + 1);
    let diceTwo = Math.floor(Math.random() * 6 + 1);
    let sum = diceOne + diceTwo;
    dice1.src = "dice-" + diceOne + ".png";
    dice2.src = "dice-" + diceTwo + ".png";
    dice1.classList.remove("hidden");
    dice2.classList.remove("hidden");
    roundScore += sum;
    currentScore.textContent = roundScore;
  }
}

let newGame = document.querySelector(".btn-new");
newGame.addEventListener("click", resetGame);

function resetGame() {
  document.querySelector(".num-dice").classList.remove("hidden");
  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
  dice2.classList.add("hidden");
  oneDice = false;
}
