// HTML elements
var highscoresLink = document.getElementById("highscores");
var remainingTimeLabel = document.getElementById("number-of-secs");
var questionField = document.getElementById("question");
var answerA = document.getElementById("answerA");
var answerB = document.getElementById("answerB");
var answerC = document.getElementById("answerC");
var answerD = document.getElementById("answerD");
var answersContainer = document.getElementById("answers");

var userChoice;
var questionNumber = 0;
var score = 0;

var interval;
var secondsLeft = 75;

var highscores = [];

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
    answerB.textContent = question.answers[1]
    answerC.textContent = question.answers[2]
    answerD.textContent = question.answers[3]
}

// Check if user input is correct

function checkAnswer(question) {
    if (userChoice === question.correctChoice) {
        score++;
    } else {
        if ((secondsLeft - 10) > 0) {
            secondsLeft -= 10;
        } else {
            alert("you ran out of time");
            secondsLeft = 0;
        }

    }

}

// What to do once user choice is made

function handleClick() {

    checkAnswer(questionSet[questionNumber]);
    questionNumber++;
    if (questionNumber < questionSet.length) {
        displayQuestion(questionSet[questionNumber])
    } else {
        alert(score);
        alert("You have come to end")
        clearInterval(interval);
        questionNumber = 0;
        startQuiz();
    }
}



function startQuiz() {
    displayQuestion(questionSet[questionNumber]);
    interval = setInterval(function () {
        remainingTimeLabel.textContent = secondsLeft;
        secondsLeft--;
        if (secondsLeft < 0) {
            clearInterval(interval);
        }
    }, 1000);

}

startQuiz();



// Event listeners

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



answersContainer.addEventListener("mouseover", function (event) {
    var hoveringOver = event.target;
    if (hoveringOver.matches("p")) {
        hoveringOver.classList.add("mouse-over");
    }

})

answersContainer.addEventListener("mouseout", function (event) {
    var hoveringOver = event.target;
    hoveringOver.classList.remove("mouse-over");
})