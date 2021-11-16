//main sections
var quizStartSection = document.querySelector("#quiz-start-section");
var questionFormat = document.querySelector("#question-format");
var allDone = document.querySelector("#all-done");
var highScore = document.querySelector("#high-scores");
var header = document.querySelector("header");


//question format parts
var question = document.querySelector("#question");
var questionList = document.querySelector("#question-list")
var answer1 = document.querySelector("#ans1");
var answer2 = document.querySelector("#ans2");
var answer3 = document.querySelector("#ans3");
var answer4 = document.querySelector("#ans4");


//buttons
var startQuizBtn = document.querySelector("#start-quiz-btn");
var submitInitial = document.querySelector(".submit");
var goBackBtn = document.querySelector("#go-back");
var clearHighScores = document.querySelector("#clear-high-scores");
var viewHighScore = document.querySelector("#view-high-score");


//keep track
var highscorelist = document.querySelector("#high-score-list");
var check = document.querySelector("#check");
var currentTimeDisplay = document.querySelector("#current-time-display");

var clock;
var initial;
var initialsList = [];
var highScores = [];
var finaltime;
var time;
var questionNum = 0;
var questioninfo = [
    ["Commonly used data types Do Not Include:", "strings", "booleans", "alerts", "numbers", "alerts"],
    ["The condition in an if / else statement is enclosed with ______.", "quotes", "curly brackets", "parenthesis", "square brackets", "curly brackets"],
    ["Arrays in JavaScript can be used to store_____.", "numbers and strings", "other arrays", "booleans", "all of the above", "all of the above"],
    ["String values must be enclosed within _____ when being assigned to variables.", "commas", "curly brackets", "quotes", "parenthesis", "quotes"],
    ["A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash", "for loops", "console.log", "console.log"]
];





var displayStartQuizSection = function() {

    time = 70;
    currentTimeDisplay.innerHTML = "Time: " + time;

    quizStartSection.style.display = "block";
    header.style.display = "flex";
    questionFormat.style.display = "none";
    allDone.style.display = "none";
    highScore.style.display = "none";
    questionNum = 0;
}

//hide start quiz section and display queston format section.
var startQuiz = function() {
    quizStartSection.style.display = "none";

    populateQuestionFormat();

    questionFormat.style.display = "block";

    clock = setInterval(countDown, 1000);
}

var checkanswer = function(event) {
    var answer = event.target;
    console.log(answer.innerHTML);

    if (answer.innerHTML == questioninfo[questionNum][5] || answer.innerHTML == "<li>" + questioninfo[questionNum][5] + "</li>") {
        check.innerHTML = "Correct!";
    }
    else if (answer.querySelector('button')) {
        return;
    }
    else {
        check.innerHTML = "Wrong!";
        time -= 10;
        currentTimeDisplay.innerHTML = "Time: " + time;
    }

    questionNum += 1;
    if (questionNum < 5) {
        populateQuestionFormat();
    }
    else {
        displayAllDone();
    }
};

var populateQuestionFormat = function() {
    question.innerHTML = questioninfo[questionNum][0];
    answer1.innerHTML = "<li>" + questioninfo[questionNum][1] + "</li>";
    answer2.innerHTML = "<li>" + questioninfo[questionNum][2] + "</li>";
    answer3.innerHTML = "<li>" + questioninfo[questionNum][3] + "</li>";
    answer4.innerHTML = "<li>" + questioninfo[questionNum][4] + "</li>";
}

var displayHighScoresection = function() {

    while(highscorelist.lastElementChild) {
        highscorelist.querySelector("li").remove();
    }

    clearInterval(clock);
    
    quizStartSection.style.display = "none";
    header.style.display = "none";
    questionFormat.style.display = "none";
    allDone.style.display = "none";
    check.style.display = "none";
    highScore.style.display = "block";

    loadHighScores();
}

//Sorts and loads highscores.
var loadHighScores = function() {
    initial = document.querySelector("input[name='initial']").value;

    if (!initial && finaltime) {
        return;
    }
    if (!finaltime && initial) {
        return;
    }

    initialsList = getAddSetLocalStorage(initialsList, "initials", initial);
    highScores = getAddSetLocalStorage(highScores, "highkey", finaltime);
    document.querySelector("input[name='initial']").value = '';
    finaltime = '';
    
    if (initialsList) {
        //Sorts highscores form greatest to least.
        for (var i = 0; i < initialsList.length; i++) {
            for (var k = i + 1; k < initialsList.length; k++) {
                if (highScores[i] < highScores[k]) {
                    var x = highScores[i];
                    var y = initialsList[i];
                    highScores[i] = highScores[k];
                    initialsList[i] = initialsList[k];
                    highScores[k] = x;
                    initialsList[k] = y;
                }
            }
        }

        //Displays highscores
        for (var i = 0; i < initialsList.length; i++) {
            var displayScoreItem = document.createElement("li");
            displayScoreItem.innerHTML = initialsList[i] + " " + highScores[i];
            highscorelist.appendChild(displayScoreItem);
        }
    }
}

var getAddSetLocalStorage = function(itemList, key, item) {
    itemList = localStorage.getItem(key);

    if (!item && itemList) {
        itemList = JSON.parse(itemList);
    }
    else if(itemList) {
        itemList = JSON.parse(itemList);
        itemList.push(item);
    }
    else if (item) {
        itemList = [item];
    }

    if (itemList) {
        localStorage.setItem(key, JSON.stringify(itemList));

    return itemList;
    }
}

var displayAllDone = function() {
    questionFormat.style.display = "none";
    allDone.style.display = "block";
    clearInterval(clock);
    finaltime = time;
    if (!time || time < 0){
        finaltime = "0";
        time = 0;
        currentTimeDisplay.innerHTML = "Time: " + time;
    }
    document.querySelector("#final-score-display").innerHTML = "Your final score is " + time + ".";
}

var clearLocal = function() {
    localStorage.clear();
    highscorelist.innerHTML = "";
}

var countDown = function() {
    time--;
    currentTimeDisplay.innerHTML = "Time: " + time;
    if (time < 1) {
        clearInterval(clock);
        displayAllDone();
    }
}







displayStartQuizSection();

startQuizBtn.addEventListener("click", startQuiz);
questionList.addEventListener("click", checkanswer);
submitInitial.addEventListener("click", displayHighScoresection);
goBackBtn.addEventListener("click", displayStartQuizSection);
clearHighScores.addEventListener("click", clearLocal);
viewHighScore.addEventListener("click", displayHighScoresection);

