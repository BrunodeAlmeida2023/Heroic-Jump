const batman = document.querySelector('.batman');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');

const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

let score = 0;
let scoreMaxValue = 0;
const scoreElement = document.querySelector('.score');
const scoreMax = document.querySelector('.scoremax');
let scoreInterval;
let gameLoop;

const increaseScore = () => {
    score += 1;
    scoreElement.innerText = 'Score: ' + score;
}

const startGame = () => {
    score = 0;
    scoreElement.innerText = 'Score: ' + score;
    scoreInterval = setInterval(increaseScore, 150);
}

const stopScore = () => {
    clearInterval(scoreInterval);
    if (score > scoreMaxValue) {
        scoreMaxValue = score;
        scoreMax.innerText = 'Score Max: ' + scoreMaxValue;
    }
}

const jump = () => {
    batman.classList.add('jump');

    setTimeout(() => {
        batman.classList.remove('jump');
    }, 600);
}

const startGameLoop = () => {
    stopScore();
    startGame();

    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const batmanPosition = +window.getComputedStyle(batman).bottom.replace('px', '');
        const cloudPosition = cloud.offsetLeft;

        if (pipePosition <= 105 && pipePosition > 0 && batmanPosition < 100) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            batman.style.animation = 'none';
            batman.style.bottom = `${batmanPosition}px`;

            batman.src = '/assets/imgs/caveira-game-over.png';
            batman.style.width = '15vh';
            batman.style.marginLeft = '35px';

            cloud.style.animation = 'none';
            cloud.style.left = `${cloudPosition}px`;

            gameOver.style.visibility = 'visible';

            stopScore();
            clearInterval(gameLoop);
        }
    }, 10);
}

const restart = () => {
    stopScore();
    clearInterval(gameLoop);
    gameOver.style.visibility = 'hidden';

    pipe.style.animation = 'pipe-animations 1.5s infinite linear';
    pipe.style.left = '';

    batman.src = '/assets/imgs/batman.gif';
    batman.style.width = '35vh';
    batman.style.bottom = '0px';
    batman.style.marginLeft = '';
    batman.style.animation = '';

    cloud.style.animation = 'cloud 20s infinite linear';
    cloud.style.left = '';

    startGameLoop();
}

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

restartButton.addEventListener('click', restart);

startGameLoop();
