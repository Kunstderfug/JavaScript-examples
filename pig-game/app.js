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

document.querySelector(".dice").style.display = "none";

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

function changeActivePlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
    activePlayer2Panel.setAttribute("class", "player-1-panel active");
    activePlayer1Panel.setAttribute("class", "player-0-panel");
  } else {
    activePlayer = 0;
    activePlayer1Panel.setAttribute("class", "player-0-panel active");
    activePlayer2Panel.setAttribute("class", "player-1-panel");
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
  document.querySelector(".dice").style.display = "none";
  activePlayer1Panel.setAttribute("class", "player-0-panel active");
  activePlayer2Panel.setAttribute("class", "player-1-panel");
}

document.querySelector(".btn-roll").addEventListener("click", function() {
  //Add the random number
  let dice = Math.floor(Math.random() * 6) + 1;

  // Display the result
  let diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  if (dice === 1) {
    if (activePlayer === 0) {
      // Reset the current if the dice is 1
      player1Score.textContent = "0";
      activePlayer = 1;
      scores[0] = 0;
      player1Current.textContent = scores[0];
      activePlayer2Panel.setAttribute("class", "player-1-panel active");
      activePlayer1Panel.setAttribute("class", "player-0-panel");
    } else {
      // Update the round score IF the rolled number is not 1
      player2Score.textContent = "0";
      activePlayer = 0;
      scores[1] = 0;
      player2Current.textContent = scores[1];
      activePlayer1Panel.setAttribute("class", "player-0-panel active");
      activePlayer2Panel.setAttribute("class", "player-1-panel");
    }
  } else if (activePlayer === 0 && dice !== 1) {
    player1Score.textContent = dice;
    scores[0] += dice;
    player1Current.textContent = scores[0];
  } else {
    player2Score.textContent = dice;
    scores[1] += dice;
    player2Current.textContent = scores[1];
  }

  if (scores[0] >= 100) {
    player1Score.textContent = "Player One Won";
  } else if (scores[1] >= 100) {
    player2Score.textContent = "Player Two Won";
  }
});

document
  .querySelector(".btn-hold")
  .addEventListener("click", changeActivePlayer);
