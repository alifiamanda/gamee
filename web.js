const box = document.getElementById("box");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const statusEl = document.getElementById("status");
const gameArea = document.getElementById("gameArea");

let score = 0;
let timeLeft = 30; // detik
let gameRunning = false;
let moveInterval;
let countdownInterval;

function moveBox() {
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;
  const boxSize = 50;

  const maxX = areaWidth - boxSize;
  const maxY = areaHeight - boxSize;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  box.style.left = `${randomX}px`;
  box.style.top = `${randomY}px`;
}

function boxClicked() {
  if (!gameRunning) return;
  score++;
  scoreEl.textContent = score;
  moveBox(); // pindah kotak setiap kali diklik
}

function startGame() {
  score = 0;
  timeLeft = 30;
  gameRunning = true;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  statusEl.textContent = "";
  moveBox();

  box.style.display = "block";

  moveInterval = setInterval(moveBox, 1500); // pindah kotak tiap 1.5 detik
  countdownInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameRunning = false;
  clearInterval(moveInterval);
  clearInterval(countdownInterval);
  statusEl.textContent = `🛑 Waktu habis! Skor akhir: ${score}`;
  box.style.display = "none";
}

box.addEventListener("click", boxClicked);
