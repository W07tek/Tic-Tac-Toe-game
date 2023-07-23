const gameBoxes = document.querySelectorAll(".game-box");
const gameContainer = document.querySelector(".game-panel");
const resetBtn = document.querySelector(".reset-btn");
const whoseTurnBox = document.querySelector(".whose-turn-box");
const whoseTurnContent = whoseTurnBox.querySelector("i");
// results
const playerXWinsPanel = document.querySelector(".playerX-wins .score");
const playerOWinsPanel = document.querySelector(".playerO-wins .score");
const drawsPanel = document.querySelector(".draws .score");
let playerXWins = 0;
let playerOWins = 0;
let draws = 0;
let everyMoves = [];
let playerXMoves = [];
let playerOMoves = [];
let finishLinePosition;
let isWinner = false;
const resetGame = () => {
  gameContainer.innerHTML = `
    <div class="game-box"></div>
    <div class="game-box"></div>
    <div class="game-box"></div>
    <div class="game-box"></div>
    <div class="game-box"></div>
    <div class="game-box"></div>
    <div class="game-box"></div>
    <div class="game-box"></div>
    <div class="game-box"></div>
    `;
  const gameBoxes = document.querySelectorAll(".game-box");
  gameBoxes.forEach((box) => {
    box.addEventListener("click", () => playerMove(box));
  });
  playerXMoves = [];
  playerOMoves = [];
  const resultGameTitle = document.querySelector(".who-won");
  resultGameTitle.remove();
  isWinner = false;
};
resetBtn.addEventListener("click", resetGame);

let isXTurn = true;

const changeTunr = () => {
  isXTurn = !isXTurn;
  whoseTurnContent.className = `${
    isXTurn ? "cross fa-solid fa-xmark" : "circle fa-solid fa-o"
  }`;
};
const whoWon = (player) => {
  const box = document.createElement("div");
  const winner = document.createElement("span");
  winner.className = player;
  winner.textContent = player;
  const content = document.createElement("span");
  content.className = "winner-content";
  if (player) {
    content.textContent = "won!";
  } else {
    content.textContent = "draw!";
  }
  box.className = "who-won";
  box.appendChild(winner);
  box.appendChild(content);
  document.body.appendChild(box);
};
const gameDraw = () => {
  draws++;
  drawsPanel.textContent = draws;
  whoWon();
};

const createFinishLine = (isX) => {
  console.log("STWORZONE");
  const finishLine = document.createElement("div");
  finishLine.className = `finish-line position${finishLinePosition} ${
    isX ? "cross" : "circle"
  }`;
  gameContainer.appendChild(finishLine);
};
const winner = (isX) => {
  isWinner = true;
  const gameBoxes = document.querySelectorAll(".game-box");
  gameBoxes.forEach((box) => {
    box.classList.add("game-over");
  });
  if (isX) {
    console.log("wygrał X");
    playerXWins++;
    playerXWinsPanel.textContent = playerXWins;
    whoWon("X");
  } else {
    console.log("wygrał O");
    playerOWins++;
    playerOWinsPanel.textContent = playerOWins;
    whoWon("O");
  }
  createFinishLine(isX);
  // const gameBoxes = document.querySelectorAll('.game-box');
};

const validation = (playerMoves) => {
  if (
    playerMoves.includes(0) &&
    playerMoves.includes(4) &&
    playerMoves.includes(8)
  ) {
    finishLinePosition = 1;
    return true;
  } else if (
    playerMoves.includes(2) &&
    playerMoves.includes(4) &&
    playerMoves.includes(6)
  ) {
    finishLinePosition = 2;
    return true;
  } else if (
    playerMoves.includes(0) &&
    playerMoves.includes(1) &&
    playerMoves.includes(2)
  ) {
    finishLinePosition = 3;
    return true;
  } else if (
    playerMoves.includes(3) &&
    playerMoves.includes(4) &&
    playerMoves.includes(5)
  ) {
    finishLinePosition = 4;
    return true;
  } else if (
    playerMoves.includes(6) &&
    playerMoves.includes(7) &&
    playerMoves.includes(8)
  ) {
    finishLinePosition = 5;
    return true;
  } else if (
    playerMoves.includes(0) &&
    playerMoves.includes(3) &&
    playerMoves.includes(6)
  ) {
    finishLinePosition = 6;
    return true;
  } else if (
    playerMoves.includes(1) &&
    playerMoves.includes(4) &&
    playerMoves.includes(7)
  ) {
    finishLinePosition = 7;
    return true;
  } else if (
    playerMoves.includes(2) &&
    playerMoves.includes(5) &&
    playerMoves.includes(8)
  ) {
    finishLinePosition = 8;
    return true;
  }
};
const checkingPlayer = (playerMoves, isX) => {
  let playerWon = validation(playerMoves);
  if (playerWon) {
    winner(isX);
  }
};
const checkingResult = (isX) => {
  checkingPlayer(playerXMoves, isX);
  checkingPlayer(playerOMoves, isX);
};
const checkingMoves = (move, isX) => {
  if (isX) {
    playerXMoves.push(move);
  } else {
    playerOMoves.push(move);
  }
  /*   console.log(playerXMoves.length);
    console.log(playerOMoves.length); */
  if (playerXMoves.length > 2 || playerOMoves.length > 2) {
    checkingResult(isX);
  }
  console.log("isWIn");
  console.log(isWinner);
  console.log(!isWinner);
  if (
    (playerXMoves.length === 5 && playerOMoves.length === 4 && !isWinner) ||
    (playerOMoves.length === 5 && playerXMoves.length === 4 && !isWinner)
  ) {
    console.log("wlazłem");
    gameDraw();
  }
};

const addSymbol = (box, isX) => {
  const taken = box.querySelector("i");
  if (taken) return;
  const gameBoxes = document.querySelectorAll(".game-box");
  let playerMove = [...gameBoxes];
  playerMove = playerMove.indexOf(box);
  if (isX) {
    checkingMoves(playerMove, true);
  } else {
    checkingMoves(playerMove, false);
  }
  const symbol = document.createElement("i");
  symbol.className = `${
    isX
      ? "cross fa-solid fa-xmark move-cross"
      : "circle fa-solid fa-o move-circle"
  }`;
  box.appendChild(symbol);
  changeTunr();
};

const playerMove = (box) => {
  if (box.classList.contains("game-over")) {
    return;
  }
  if (isXTurn) {
    addSymbol(box, true);
  } else {
    addSymbol(box, false);
  }
};
// const gameBoxes = document.querySelectorAll('.game-box');
gameBoxes.forEach((box) => {
  box.addEventListener("click", () => playerMove(box));
});
