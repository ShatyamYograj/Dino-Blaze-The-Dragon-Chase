let score = 0;
let cross = true;

const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);

    const dino = document.querySelector('.dino');

    if (e.keyCode === 38) { // Up arrow (jump)
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.keyCode === 39) { // Right arrow
        let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + "px";

        // Face right
        dino.classList.remove('face-left');
        dino.classList.add('face-right');
    }

    if (e.keyCode === 37) { // Left arrow
        let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";

        // Face left
        dino.classList.remove('face-right');
        dino.classList.add('face-left');
    }
};

setInterval(() => {
    const dino = document.querySelector('.dino');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');
    const scoreCont = document.getElementById('scoreCont');

    const dx = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    const dy = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));

    const ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));

    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle).getPropertyValue('animation-duration'));
            let newDur = Math.max(aniDur - 0.1, 1); // Minimum speed limit
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    }
}, 10);

function updateScore(score) {
    const scoreCont = document.getElementById('scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}
