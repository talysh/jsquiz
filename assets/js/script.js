// HTML elements
// Navigation bar elements
var highscoresLink = document.getElementById("highscores");
var remainingTimeLabel = document.getElementById("number-of-secs");


// Question 
var questionField = document.getElementById("question");
var answersContainer = document.getElementById("answers");
var answerA = document.getElementById("answerA");
var answerB = document.getElementById("answerB");
var answerC = document.getElementById("answerC");
var answerD = document.getElementById("answerD");


var startButton = document.getElementById("start-button");
var welcomeScreen = document.getElementById("welcome-screen");
var quizSection = document.getElementById("quiz-section");


var modalHighScores = document.getElementById("highscores-display");
var clearHighScoresButton = document.getElementById("clear-highscores");
var userScoreOutput = document.getElementById("user-score");

// Time
var interval;
var secondsLeft = 60;

var userChoice;
var questionNumber = 0;
var score = 0;

var highScoresArray = [
    { name: "Taleh", score: 100 },
    { name: "John", score: 10 },
    { name: "Smith", score: 0 },
];

// An array of question objects 

var questionSet = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers",],
        correctChoice: "c",
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets",],
        correctChoice: "c",
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above",],
        correctChoice: "d",
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis",],
        correctChoice: "c",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console log",],
        correctChoice: "d",
    },
]

//Display a single question out of the whole set

function displayQuestion(question) {
    questionField.textContent = question.question;
    answerA.textContent = question.answers[0];
    answerB.textContent = question.answers[1];
    answerC.textContent = question.answers[2];
    answerD.textContent = question.answers[3];

    // answerA.classList.remove("mouse-over");
    // answerB.classList.remove("mouse-over");
    // answerC.classList.remove("mouse-over");
    // answerD.classList.remove("mouse-over");

}

// Display time in navigation bar
function displayTime() {
    remainingTimeLabel.textContent = secondsLeft;
}

// Start the quiz
function startQuiz() {
    displayQuestion(questionSet[questionNumber]);
    interval = setInterval(function () {
        displayTime();
        secondsLeft--;
        if (secondsLeft <= 0) {
            submitScore();
        }
    }, 1000);

    localStorage.setItem("highscore", JSON.stringify(highScoresArray));
}

// Display highscores inside the modal
function displayHighscores() {
    var highScoreDiv = document.createElement("div");

    var highScore = JSON.parse(localStorage.getItem('highscore'));
    for (var i = 0; i < highScore.length; i++) {
        var paragraph = document.createElement("p");
        paragraph.textContent = (i + 1) + ". Name: " + highScore[i].name + " Score: " + highScore[i].score;
        highScoreDiv.appendChild(paragraph);
    }

    modalHighScores.innerHTML = highScoreDiv.innerHTML;

}

// Clear highscores from the highscores display
function clearHighScores() {
    localStorage.setItem('highscore', JSON.stringify({ name: "", score: 0 }));
    displayHighscores();
}


function submitScore() {
    clearInterval(interval);
    secondsLeft = 0;
    displayTime();
    quizSection.classList.add("display-off")
    userScoreOutput.textContent = "Your score is " + score;
    $("#enter-highscore").modal("show");
}

// Handle the answer that user picks from multiple choice options

function handleClick() {

    checkAnswer(questionSet[questionNumber]);
    questionNumber++;
    if (questionNumber < questionSet.length) {
        displayQuestion(questionSet[questionNumber])
    } else {
        submitScore();
    }
}

// Check if user input is correct, deduct 10 seconds if not.

function checkAnswer(question) {
    if (userChoice === question.correctChoice) {
        score++;
    } else {
        if ((secondsLeft - 10) > 0) {
            secondsLeft -= 10;
            displayTime();
        } else {
            submitScore();
        }

    }

}


// Event listeners
// ===============
// Take user answer on multiplce choice question

answerA.addEventListener("click", function () {
    userChoice = "a";
    handleClick();

});

answerB.addEventListener("click", function () {
    userChoice = "b";
    handleClick();


});

answerC.addEventListener("click", function () {
    userChoice = "c";
    handleClick();

});

answerD.addEventListener("click", function () {
    userChoice = "d";
    handleClick();

});

highscoresLink.addEventListener("click", function (event) {
    displayHighscores();
});

// Once the Start quiz button pressed, hide the welcome screen, show the first question and start the quiz

startButton.addEventListener("click", function () {
    welcomeScreen.classList.add("display-off");
    quizSection.classList.remove("display-off");
    startQuiz();
});



// Clear highscores from the highscores screen
clearHighScoresButton.addEventListener("click", function () {
    clearHighScores();
});

// Highlight a multiple choice answer on hover

answersContainer.addEventListener("mouseover", function (event) {
    var hoveringOver = event.target;
    if (hoveringOver.matches("button")) {
        hoveringOver.classList.add("mouse-over");
    }

})

answersContainer.addEventListener("mouseout", function (event) {
    var hoveringOver = event.target;
    hoveringOver.classList.remove("mouse-over");
})