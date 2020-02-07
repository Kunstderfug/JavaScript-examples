/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

let dice1 = document.querySelector("#dice1");
dice1.style.display = "none";
let dice2 = document.querySelector("#dice2");
dice2.style.display = "none";

let player1Score = document.getElementById("score-0");
player1Score.textContent = "0";
let player2Score = document.getElementById("score-1");
player2Score.textContent = "0";
let player1Current = document.getElementById("current-0");
player1Current.textContent = "0";
let player2Current = document.getElementById("current-1");
player2Current.textContent = "0";

let activePlayer1Panel = document.querySelector(".player-0-panel");
let activePlayer2Panel = document.querySelector(".player-1-panel");
let btnRoll = document.querySelector(".btn-roll");

btnRoll.addEventListener("click", function() {
  //Add the random number
  let diceRoll1 = Math.floor(Math.random() * 6) + 1;
  let diceRoll2 = Math.floor(Math.random() * 6) + 1;

  // Display the result
  dice1.style.display = "block";
  dice2.style.display = "block";
  dice1.src = "dice-" + diceRoll1 + ".png";
  dice2.src = "dice-" + diceRoll2 + ".png";

  if (diceRoll1 === 1 || diceRoll2 === 1) {
    roundScore = 0; // Reset the current if the dice is 1
    if (activePlayer === 0) {
      player1Current.textContent = "0";
      activePlayer = 1;
      activePlayer2Panel.setAttribute("class", "player-1-panel active");
      activePlayer1Panel.setAttribute("class", "player-0-panel");
    } else {
      activePlayer = 0;
      player2Current.textContent = "0";
      activePlayer1Panel.setAttribute("class", "player-0-panel active");
      activePlayer2Panel.setAttribute("class", "player-1-panel");
    }
  } else {
    // Update the round score IF the rolled number is not 1
    let sum = diceRoll1 + diceRoll2;
    roundScore += sum;
    if (activePlayer === 0) {
      player1Current.textContent = roundScore;
    } else {
      player2Current.textContent = roundScore;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", addScore);

function addScore() {
  if (activePlayer === 0) {
    activePlayer = 1;
    scores[0] += roundScore;
    player1Score.textContent = scores[0];
    roundScore = 0;
    player1Current.textContent = "0";
    activePlayer2Panel.setAttribute("class", "player-1-panel active");
    activePlayer1Panel.setAttribute("class", "player-0-panel");
  } else {
    activePlayer = 0;
    scores[1] += roundScore;
    player2Score.textContent = scores[1];
    roundScore = 0;
    player2Current.textContent = "0";
    activePlayer1Panel.setAttribute("class", "player-0-panel active");
    activePlayer2Panel.setAttribute("class", "player-1-panel");
  }

  if (scores[0] >= 100) {
    player1Score.textContent = "Won " + scores[0];
    btnRoll.addEventListener("click", resetGame);
  } else if (scores[1] >= 100) {
    player2Score.textContent = "Won " + scores[1];
    btnRoll.addEventListener("click", resetGame);
  }
}

let resetButton = document.querySelector(".btn-new");
resetButton.addEventListener("click", resetGame);

function resetGame() {
  scores = [0, 0];
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  player1Current.textContent = "0";
  player2Current.textContent = "0";
  activePlayer = 0;
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  activePlayer1Panel.setAttribute("class", "player-0-panel active");
  activePlayer2Panel.setAttribute("class", "player-1-panel");
}
