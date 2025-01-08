let score = 0;
let timeLeft = 30;
let gameTimer;
let moleTimer;
let activeHole = null;

const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('timeLeft');
const holes = document.querySelectorAll('.hole');
const startButton = document.getElementById('startButton');

// Function to randomly select a hole
function randomHole() {
    return holes[Math.floor(Math.random() * holes.length)];
}

// Function to pop up a hamster
function popUpHamster() {
    if (activeHole) {
        activeHole.querySelector('.hamster').classList.remove('up');
    }
    activeHole = randomHole();
    const hamster = activeHole.querySelector('.hamster');
    hamster.classList.add('up');

    // Hide the hamster after 1 second
    setTimeout(() => {
        hamster.classList.remove('up');
    }, 1000);
}

// Function to handle clicks on the hamster
holes.forEach(hole => {
    hole.addEventListener('click', () => {
        const hamster = hole.querySelector('.hamster');
        if (hamster.classList.contains('up')) {
            score++;
            scoreElement.textContent = score;
            hamster.classList.remove('up');
        }
    });
});

// Start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    timeLeftElement.textContent = timeLeft;

    startButton.disabled = true;

    gameTimer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            clearInterval(moleTimer);
            alert(`Game Over! Your final score is: ${score}`);
            startButton.disabled = false;
        }
    }, 1000);

    moleTimer = setInterval(popUpHamster, 800);
}

// Attach the start button event
startButton.addEventListener('click', startGame);