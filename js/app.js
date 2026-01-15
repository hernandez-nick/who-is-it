/*-------------- Constants -------------*/



/*---------- Variables (state) ---------*/
let score;
let level;
let selectedCategory;

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
const levelDisplay = document.getElementById("level-display");
const scoreDisplay = document.getElementById("score-display");
const feedbackEl = document.getElementById("feedback");
const finalScoreEl = document.getElementById("final-score");



/*-------------- Functions -------------*/


/*----------- Event Listeners ----------*/

