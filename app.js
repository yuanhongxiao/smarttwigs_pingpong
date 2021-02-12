// const mongoose = require('mongoose');
// const ejs = require('ejs');

const player1 = {
    name: document.querySelector("#p1Name"),
    score: 0,
    isServer: false,
    button: document.querySelector("#p1Button"),
    scoreDisplay: document.querySelector("#p1Score"),
}

const player2 = {
    name: document.querySelector("#p2Name"),
    score: 0,
    isServer: false,
    button: document.querySelector("#p2Button"),
    scoreDisplay: document.querySelector("#p2Score")
}

const startButton = document.querySelector("#start");
const terminateButton = document.querySelector("#terminate");
const scoreToWinSelect = document.querySelector("#scoreToWin");
let scoreToWin = 11;
let everyRound = 2;
let isGameover = false;

function reset() {
    isGameover = false;
    player1.score = player2.score = player1.scoreDisplay.textContent = player2.scoreDisplay.textContent = 0;
    player1.isServer = player2.isServer = false;
    player1.button.disabled = player2.button.disabled = terminateButton.disabled = false;
    player1.scoreDisplay.setAttribute("class", "");
    player2.scoreDisplay.setAttribute("class", "");
}

function Gameover() {
    isGameover = true;
    player1.button.disabled = player2.button.disabled = terminateButton.disabled = true;
}

function startGame() {
    reset();
    const rand = Math.random();
    if (rand < 0.5) {
        setServer(player1, player2);
    } else {
        setServer(player2, player1);
    }
}

function setServer(server, other) {
    server.isServer = true;
    server.scoreDisplay.classList.add("server");
    other.isServer = false;
    other.scoreDisplay.classList.remove("server");
}

function updateScore(player, opponent) {
    if (!isGameover) {
        player.score++;
        player.scoreDisplay.textContent = player.score;
        if (player.score >= scoreToWin && player.score - opponent.score >= 2) {
            isGameover = true;
            player.scoreDisplay.setAttribute("class", "");
            player.scoreDisplay.classList.add("winner");
            opponent.scoreDisplay.setAttribute("class", "");
            opponent.scoreDisplay.classList.add("loser");
            Gameover();
        }
        if ((player.score + opponent.score) % everyRound === 0) {
            if (player.isServer === true) {
                setServer(opponent, player);
            } else {
                setServer(player, opponent);
            }
        }
    }
}


player1.button.addEventListener("click", function () {
    updateScore(player1, player2);
})

player2.button.addEventListener("click", function () {
    updateScore(player2, player1);
})

startButton.addEventListener("click", function () {
    startGame();
})

terminateButton.addEventListener("click", function () {
    Gameover();
})

scoreToWinSelect.addEventListener("change", function () {
    scoreToWin = parseInt(this.value);
    everyRound = (scoreToWin === 11) ? 2 : 5;
    startGame();
})
