//main sections
var quizStartSection = document.querySelector("#quiz-start-section");
var questionFormat = document.querySelector("#question-format");
var allDone = document.querySelector("#all-done");
var highScore = document.querySelector("#high-scores");

//question format parts
var question = document.querySelector("#question");
var answer1 = document.querySelector("#ans1");
var answer2 = document.querySelector("#ans2");
var answer3 = document.querySelector("#ans3");
var answer4 = document.querySelector("#ans4");


//buttons
var startQuizBtn = document.querySelector("#start-quiz-btn");
var submitInitial = document.querySelector(".submit");



//keep track
var highscorelist = document.querySelector("#high-score-list");
var high;
var initial;
var initialsList = [];
var check = document.querySelector("#check");
var time = 70;
var questionNum = 0;
var questioninfo = [
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
    quizStartSection.style.display = "none";

    populateQuestionFormat();

    questionFormat.style.display = "block";
}

var checkanswer = function(event) {
    var answer = event.target;
    if (answer.innerHTML === questioninfo[questionNum][5] || answer.querySelector('li').innerHTML === questioninfo[questionNum][5]) {
        check.innerHTML = "Correct!";
    }
    else if (answer.querySelector('button')) {
        return;
    }
    else {
        check.innerHTML = "Wrong!";
        time -= 10;
    }

    questionNum += 1;
    if (questionNum < 5) {
        populateQuestionFormat();
    }
    else {
        questionFormat.style.display = "none";
        allDone.style.display = "block";
        document.querySelector("#final-score-display").innerHTML = "Your final score is " + time + ".";
    }
};


var populateQuestionFormat = function() {
    question.innerHTML = questioninfo[questionNum][0];
    answer1.innerHTML = questioninfo[questionNum][1];
    answer2.innerHTML = questioninfo[questionNum][2];
    answer3.innerHTML = questioninfo[questionNum][3];
    answer4.innerHTML = questioninfo[questionNum][4];
}

var storeHighScore = function() {
    initial = document.querySelector("input[name='initial']").value;
    allDone.style.display = "none";
    highScore.style.display = "block";
    console.log(initial);
    loadInitials();
}

var loadInitials = function() {
    initialsList = localStorage.getItem("initials");
    
    if (initialsList) {
        initialsList = JSON.parse(initialsList);
        initialsList.push(initial);
    }
    else {
        initialsList = [initial];
    }
    
    localStorage.setItem("initials", JSON.stringify(initialsList));

    for (var i = 0; i < initialsList.length; i++) {
        var highscore = document.createElement("li");
        highscore.innerHTML = initialsList[i];
        highscorelist.appendChild(highscore);
    }
}


startQuizBtn.addEventListener("click", startQuiz);
questionFormat.addEventListener("click", checkanswer);
submitInitial.addEventListener("click", storeHighScore);
