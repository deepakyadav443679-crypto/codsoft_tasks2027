// ================================
// NUMBER GUESSING GAME
// ================================


// Game Variables

let secretNumber;
let maxNumber;
let maxAttempts;

let attemptsUsed = 0;
let score = 100;

let gameOver = false;


// DOM Elements

const difficulty = document.getElementById("difficulty");

const rangeText = document.getElementById("rangeText");

const attemptsText =
    document.getElementById("attemptsText");

const scoreText =
    document.getElementById("scoreText");

const guessInput =
    document.getElementById("guessInput");

const guessBtn =
    document.getElementById("guessBtn");

const restartBtn =
    document.getElementById("restartBtn");

const statusBox =
    document.getElementById("statusBox");

const statusTitle =
    document.getElementById("statusTitle");

const statusMessage =
    document.getElementById("statusMessage");

const guessHistory =
    document.getElementById("guessHistory");

const guessCount =
    document.getElementById("guessCount");

const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");


// ================================
// START GAME
// ================================

function startGame() {

    attemptsUsed = 0;

    gameOver = false;

    score = 100;


    // Difficulty

    if (difficulty.value === "easy") {

        maxNumber = 50;

        maxAttempts = 8;

    }

    else if (difficulty.value === "medium") {

        maxNumber = 100;

        maxAttempts = 10;

    }

    else {

        maxNumber = 500;

        maxAttempts = 12;

    }


    // Random Number

    secretNumber =
        Math.floor(Math.random() * maxNumber) + 1;


    // Update UI

    rangeText.textContent =
        `1 - ${maxNumber}`;

    attemptsText.textContent =
        maxAttempts;

    scoreText.textContent =
        score;

    guessInput.min = 1;

    guessInput.max = maxNumber;

    guessInput.placeholder =
        `Enter number (1-${maxNumber})`;

    guessInput.value = "";

    guessInput.disabled = false;

    guessBtn.disabled = false;


    // Clear history

    guessHistory.innerHTML = `
        <span class="empty-history">
            Your guesses will appear here.
        </span>
    `;

    guessCount.textContent =
        "0 guesses";


    // Progress

    progressText.textContent =
        `0 / ${maxAttempts}`;

    progressFill.style.width = "0%";


    // Status

    setStatus(
        "💡",
        "Make Your Guess",
        `Enter a number between 1 and ${maxNumber}.`,
        ""
    );


    guessInput.focus();
}


// ================================
// STATUS FUNCTION
// ================================

function setStatus(
    icon,
    title,
    message,
    type
) {

    statusBox.className = "status-box";

    if (type !== "") {
        statusBox.classList.add(type);
    }

    statusBox.querySelector(".status-icon")
        .textContent = icon;

    statusTitle.textContent =
        title;

    statusMessage.textContent =
        message;
}


// ================================
// ADD GUESS TO HISTORY
// ================================

function addGuessToHistory(number) {

    const empty =
        guessHistory.querySelector(".empty-history");

    if (empty) {
        empty.remove();
    }


    const item =
        document.createElement("span");

    item.className =
        "guess-item";

    item.textContent =
        number;

    guessHistory.appendChild(item);


    guessCount.textContent =
        `${attemptsUsed} ${
            attemptsUsed === 1
                ? "guess"
                : "guesses"
        }`;
}


// ================================
// CHECK GUESS
// ================================

function checkGuess() {

    if (gameOver) {
        return;
    }


    const guess =
        Number(guessInput.value);


    // Empty input

    if (
        guessInput.value.trim() === ""
    ) {

        setStatus(
            "⚠️",
            "Enter a Number",
            "Please enter a number before submitting your guess.",
            "warning"
        );

        return;
    }


    // Range validation

    if (
        guess < 1 ||
        guess > maxNumber
    ) {

        setStatus(
            "⚠️",
            "Invalid Number",
            `Please enter a number between 1 and ${maxNumber}.`,
            "warning"
        );

        return;
    }


    // Increase attempts

    attemptsUsed++;


    // Add history

    addGuessToHistory(guess);


    // Update attempts

    const attemptsLeft =
        maxAttempts - attemptsUsed;

    attemptsText.textContent =
        attemptsLeft;


    // Progress

    const progress =
        (attemptsUsed / maxAttempts) * 100;

    progressFill.style.width =
        `${progress}%`;

    progressText.textContent =
        `${attemptsUsed} / ${maxAttempts}`;


    // Correct Answer

    if (guess === secretNumber) {

        gameOver = true;

        const bonus =
            attemptsLeft * 10;

        score += bonus;

        scoreText.textContent =
            score;


        setStatus(
            "🎉",
            "Correct Answer!",
            `Excellent! The secret number was ${secretNumber}. You guessed it in ${attemptsUsed} attempt${attemptsUsed > 1 ? "s" : ""}.`,
            "success"
        );


        guessInput.disabled = true;

        guessBtn.disabled = true;

        return;
    }


    // Calculate Score

    score -= 10;

    if (score < 0) {
        score = 0;
    }

    scoreText.textContent =
        score;


    // Too Low

    if (guess < secretNumber) {

        setStatus(
            "📉",
            "Too Low!",
            "Your guess is smaller than the secret number. Try a higher number.",
            "warning"
        );

    }


    // Too High

    else {

        setStatus(
            "📈",
            "Too High!",
            "Your guess is greater than the secret number. Try a lower number.",
            "warning"
        );

    }


    // Attempts Finished

    if (attemptsLeft === 0) {

        gameOver = true;


        setStatus(
            "❌",
            "Game Over",
            `You used all your attempts. The correct number was ${secretNumber}.`,
            "error"
        );


        guessInput.disabled = true;

        guessBtn.disabled = true;

    }


    // Clear input

    guessInput.value = "";

    guessInput.focus();
}


// ================================
// BUTTON EVENTS
// ================================

guessBtn.addEventListener(
    "click",
    checkGuess
);


restartBtn.addEventListener(
    "click",
    startGame
);


// ================================
// ENTER KEY
// ================================

guessInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            checkGuess();

        }

    }
);


// ================================
// CHANGE DIFFICULTY
// ================================

difficulty.addEventListener(
    "change",
    startGame
);


// ================================
// START GAME ON PAGE LOAD
// ================================

startGame();