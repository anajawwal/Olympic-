let paddle = document.getElementById("paddle");
let ball = document.getElementById("ball");
let gameArea = document.querySelector(".game-area");
let scoreBoard = document.getElementById("scoreBoard");
let gameOverScreen = document.getElementById("gameOver");
let finalScore = document.getElementById("finalScore");

let paddleWidth = paddle.offsetWidth;
let paddleHeight = paddle.offsetHeight;
let ballDiameter = ball.offsetWidth;

let ballX = gameArea.clientWidth / 2 - ballDiameter / 2;
let ballY = gameArea.clientHeight / 2 - ballDiameter / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddleX = gameArea.clientWidth / 2 - paddleWidth / 2;
let score = 0;
let isGameOver = false;
let intervalId;

let hitSound = new Audio('hit-sound.wav');
let gameOverSound = new Audio('game-over-sound.mp3');

document.addEventListener("touchmove", movePaddleTouch);

function movePaddleTouch(event) {
    if (isGameOver) return;

    let touch = event.touches[0];
    let gameAreaPos = gameArea.getBoundingClientRect();
    paddleX = touch.clientX - gameAreaPos.left - paddleWidth / 2;

    if (paddleX < 0) paddleX = 0;
    if (paddleX > gameArea.clientWidth - paddleWidth) paddleX = gameArea.clientWidth - paddleWidth;

    paddle.style.left = paddleX + "px";
}

function moveBall() {
    if (isGameOver) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // ارتداد الكرة عند حدود اللوح
    if (ballX <= 0 || ballX >= gameArea.clientWidth - ballDiameter) {
        ballSpeedX *= -1;
    }

    if (ballY <= 0) {
        ballSpeedY *= -1;
    }

    if (ballY + ballDiameter >= gameArea.clientHeight - paddleHeight) {
        let paddleLeft = paddleX;
        let paddleRight = paddleX + paddleWidth;
        let paddleTop = gameArea.clientHeight - paddleHeight;

        if (ballX + ballDiameter >= paddleLeft && ballX <= paddleRight) {
            // ارتداد الكرة عند اللوح
            ballSpeedY *= -1;
            score++;
            scoreBoard.textContent = "النقاط: " + score;
            hitSound.play();

            // زيادة الصعوبة مع مرور الوقت
            if (score % 5 === 0) {
                ballSpeedX *= 1.1;
                ballSpeedY *= 1.1;
            }
        } else {
            gameOver();
        }
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function gameOver() {
    isGameOver = true;
    clearInterval(intervalId);
    gameOverSound.play();
    finalScore.textContent = "نقاطك: " + score;

    // رسالة حسب عدد النقاط
    if (score < 20) {
        finalScore.textContent += " 😃 شد حيلك ";
    } else if (score >= 20 && score <= 40) {
        finalScore.textContent += " 🚀 وحش ";
    } else {
        finalScore.textContent += " 🏆 جدع ";
    }

    gameOverScreen.style.display = "flex";
}

function restartGame() {
    isGameOver = false;
    ballX = gameArea.clientWidth / 2 - ballDiameter / 2;
    ballY = gameArea.clientHeight / 2 - ballDiameter / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
    score = 0;
    scoreBoard.textContent = "النقاط: " + score;
    gameOverScreen.style.display = "none";
    intervalId = setInterval(moveBall, 10);
}

function startGame() {
    isGameOver = false;
    ballX = gameArea.clientWidth / 2 - ballDiameter / 2;
    ballY = gameArea.clientHeight / 2 - ballDiameter / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
    score = 0;
    scoreBoard.textContent = "النقاط: " + score;
    gameOverScreen.style.display = "none";
    intervalId = setInterval(moveBall, 10);
}
function goToHomePage() {
    location.href = "index.html"; // تغيير "index.html" إلى الصفحة الرئيسية الصحيحة
}
startGame();
