var quizStartSection = document.querySelector("#quiz-start-section");
var questionFormat = document.querySelector("#question-format");
var allDone = document.querySelector("#all-done");
var highScore = document.querySelector("#high-scores");


var startQuizBtn = document.querySelector("#start-quiz-btn");


var questions = [
    ["Commonly used data types Do Not Include:", "strings", "booleans", "alerts", "numbers", "alerts"],
    ["The condition in an if / else statement is enclosed with ______.", "quotes", "curly brackets", "parenthesis", "square brackets", "curly brackets"],
    ["Arrays in JavaScript can be used to store_____.", "numbers and strings", "other arrays", "booleans", "all of the above", "all of the above"],
    ["String values must be enclosed within _____ when being assigned to variables.", "commas", "curly brackets", "quotes", "parenthesis", "quotes"],
    ["A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash", "for loops", "console.log", "console.log"]
];


//hide all sections except Start quiz section.
questionFormat.style.display = "none";
allDone.style.display = "none";
highScore.style.display = "none";



//hide start quiz section and display queston format section.
var startQuiz = function() {

}





startQuizBtn.addEventListener("click", startQuiz);