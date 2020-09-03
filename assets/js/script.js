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
var submitScoreButton = document.getElementById("submit-score");

// Time
var interval;


var secondsLeft = 60;
var userChoice;
var questionNumber = 0;
var score = 0;

var highScoresArray = [];

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

function resetGame() {
    secondsLeft = 60;
    userChoice;
    questionNumber = 0;
    score = 0;
}
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


// Start the quiz
function startQuiz() {
    resetGame();
    displayQuestion(questionSet[questionNumber]);
    interval = setInterval(function () {
        displayTime();
        secondsLeft--;
        if (secondsLeft <= 0) {
            endQuiz();
        }
    }, 1000);

}

// End the quiz
function endQuiz() {
    score = score + secondsLeft;
    clearInterval(interval);
    secondsLeft = 0;
    displayTime();
    $("#quiz-section").hide();
    $("#welcome-screen").show();
    userScoreOutput.textContent = "Your score is " + score;
    $("#enter-score").modal("show");
}


// Display highscores inside the modal
function displayHighscores() {

    var highScore = getHighScoreFromLocalDrive();

    if (highScore == null) {
        modalHighScores.innerHTML = "No high scores yet!";
    } else {
        var highScoreDiv = document.createElement("div");
        for (var i = 0; i < highScore.length && i < 5; i++) {
            var paragraph = document.createElement("p");
            paragraph.textContent = (i + 1) + ". Name: " + highScore[i].name + " Score: " + highScore[i].score;
            highScoreDiv.appendChild(paragraph);
        }
        modalHighScores.innerHTML = highScoreDiv.innerHTML;
    }


}

// Clear highscores from the highscores display
function clearHighScores() {
    localStorage.clear();
    displayHighscores();
}


// Display time in navigation bar
function displayTime() {
    remainingTimeLabel.textContent = secondsLeft;
}

// Retrieve highscore list from localdrive
function getHighScoreFromLocalDrive() {
    return JSON.parse(localStorage.getItem('highscore'));
}


// Handle the answer that user picks from multiple choice options
function handleClick() {

    checkAnswer(questionSet[questionNumber]);
    questionNumber++;
    if (questionNumber < questionSet.length) {
        displayQuestion(questionSet[questionNumber])
    } else {
        endQuiz();
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
            endQuiz();
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
    $("#welcome-screen").hide();
    $("#quiz-section").show();
    startQuiz();
});



// Submit score 
submitScoreButton.addEventListener("click", function () {

    var highScore = getHighScoreFromLocalDrive();
    var highScoreUnchanged = true;

    // If user did not input a name, set the name as NoName
    var name = $("#initials").val();
    if (name.trim() === "") {
        name = "NoName";
    }

    // Automaticall add score to highscore, if no previous scores
    var i = 0;
    if (highScore === null) {
        highScore = [{ "name": name, "score": score }];
    } else {

        // If user score is bigger than any high score on the board, insert user score at that spot
        while (i < 5 && i < highScore.length && highScoreUnchanged) {
            if (score > highScore[i].score) {
                highScore.splice(i, 0, { "name": name, "score": score })
                highScoreUnchanged = false;
            }
            i++;
        }

        // If there are less than 5 highscores, add user score to high score list
        if (i < 5 && highScoreUnchanged) {
            highScore.push({ "name": name, "score": score });
        }
    }

    localStorage.setItem("highscore", JSON.stringify(highScore));
    $("#enter-score").modal("hide");
    displayHighscores();
    $("#highscores-modal").modal("show");

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