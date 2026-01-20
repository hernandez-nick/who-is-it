/*-------------- Constants -------------*/
const startSound = new Audio("audio/start.wav");
const correctSound = new Audio("audio/correct.wav");
const wrongSound = new Audio("audio/wrong.wav");


/*---------- Variables (state) ---------*/
let score;
let level;
let selectedCategory;
let gameQuestions = [];

/*----- Cached Element References  -----*/
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const categoryBtns = document.querySelectorAll(".category-btn");
const submitBtn = document.getElementById("submit-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const chooseCategoryBtn = document.getElementById("choose-category-btn");

const gameImage = document.getElementById("game-image");
const answerInput = document.getElementById("answer-input");
const levelDisplay = document.getElementById("level");
const scoreDisplay = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const finalScoreEl = document.getElementById("final-score");



/*-------------- Functions -------------*/
function init() {
    score = 0;
    level = 1;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    startSound.loop = true;
    startSound.play();
    displayQuestion();
}

function handleCategorySelection(event) {
    selectedCategory = event.target.dataset.category;
    console.log(`Selected category: ${selectedCategory}`);
    

    const categoryKey = selectedCategory.toLowerCase();
    if (gameData[categoryKey]) {
        gameQuestions = shuffleArray(gameData[categoryKey]).slice(0, 20);
    } else {
        console.error(`No data found for category: ${selectedCategory}`);
        gameQuestions = [];
    }
    
    init();
}

function displayQuestion() {
    const currentQuestion = gameQuestions[level - 1];
    
    gameImage.src = currentQuestion.src;
    gameImage.alt = `Level ${level}`;

    levelDisplay.textContent = level;
    scoreDisplay.textContent = score;

    answerInput.value = "";
    feedbackEl.textContent = "";
    answerInput.focus();
}

function handleSubmit() {
    const playerGuess = answerInput.value.trim().toLowerCase();
    const currentQuestion = gameQuestions[level - 1];
    const correctAnswer = currentQuestion.answer.toLowerCase();

    if (playerGuess === "") {
        feedbackEl.textContent = "Please enter your answer!";
        return;
    }

    checkAnswer(playerGuess, correctAnswer, currentQuestion.answer);
}

function checkAnswer(playerGuess, correctAnswer, displayAnswer) {
    if (playerGuess === correctAnswer) {
        correctSound.play();
        score++;
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";

    } else {
        wrongSound.play();
        feedbackEl.textContent = `Wrong! It was: ${displayAnswer}`;
        feedbackEl.style.color = "red";
    }

    setTimeout(() => {
        if (level >= 20) {endGame();
        } else {
            level++;
            displayQuestion();
        }
    }, 2000);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function endGame() {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScoreEl.textContent = `Your final score is: ${score}/20`;
}

function resetGame() {
    score = 0;
    level = 1;
    const categoryKey = selectedCategory.toLowerCase();
    gameQuestions = shuffleArray(gameData[categoryKey]).slice(0, 20);
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    displayQuestion();
}

function chooseCategory() {
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}

/*----------- Event Listeners ----------*/
categoryBtns.forEach(btn => {
    btn.addEventListener("click", handleCategorySelection);
});

submitBtn.addEventListener("click", handleSubmit);

answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        handleSubmit();
    }
});

playAgainBtn.addEventListener("click", resetGame);
chooseCategoryBtn.addEventListener("click", chooseCategory);