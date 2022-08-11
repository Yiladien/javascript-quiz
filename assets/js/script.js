// Question variables
var questionCounter = 0;
var questionUsed = [];
var questionNumber = 0;

// High score variables
var score = 0;
var maxHighScorelist = 10;
var highScoreList = [];

// Timers
var timerEl = document.getElementById("countdown");
const timeLeftConst = 60;
var timeLeft = timeLeftConst;
var timeoutDelay = 1500;

var quizQuestionEl = document.getElementById("quiz-question");
var quizParagraphEl = document.getElementById("quiz-paragraph");
var quizAnswersEl = document.getElementById("answer-list");
var quizStartBtnEl = document.getElementById("start");
var quizHighScoreBtnEl = document.getElementById("high-score-btn");
var quizFeedbackEl = document.getElementById("quiz-feedback");
var quizSectionEl = document.getElementById("quiz-section");
var formSectionEl = document.getElementById("highScoreFormSection");
var highScorePageBtnsEl = document.getElementById("highScorePageBtns");
var highScoreContainer = document.getElementById("highScoreContainer");

//countdown timer
function countdown() {
  timerEl.textContent = "Time: " + timeLeft + "s";
  timeLeft--;
  var timeInterval = setInterval(function () {
    if (timeLeft <= 0) {
      timeLeft = 0;
      timerEl.textContent = "";
      clearInterval(timeInterval);
      clearQuestions();
    }
    timerEl.textContent = "Time: " + timeLeft + "s";
    timeLeft--;
  }, 1000);
}

// Starts timer and first question
var quizStart = function (event) {
  var targetEl = event.target;
  console.log(targetEl);

  if (targetEl.matches("#start")) {
    questionCounter = 0;
    questionUsed = [];
    questionNumber = 0;

    // High score variables
    score = 0;

    // Timers
    timeLeft = timeLeftConst;
    countdown();
    getQuestion();
  } else {
    return false;
  }
};

function getQuestion() {
  // selects random number to match the position in array based on size of array
  questionNumber = Math.floor(Math.random() * questionNumberList.length);
  // creates temporary array to hold new array after removing the random number from the list
  var updatedQuestionNumberList = [];

  // cycles through old array and adds remaining question number into new array
  for (var j = 0; j < questionNumberList.length; j++) {
    if (questionNumberList[j] !== questionNumber) {
      updatedQuestionNumberList.push(questionNumberList[j]);
    }
  }

  // updates array after removing the question to be used
  questionNumberList = updatedQuestionNumberList;

  // provides number to correspond to array position in question object array
  displayQuestion();
}

function displayQuestion() {
  var quizStartBtnEl = document.getElementById("start");
  if (quizStartBtnEl) {
    quizStartBtnEl.remove();
  }
  var quizQuestionEl = document.getElementById("quiz-question");
  quizQuestionEl.textContent = quizQuestions[questionNumber].question;
  quizQuestionEl.setAttribute("data-question", questionNumber);
  quizQuestionEl.setAttribute("class", "question");

  var quizParagraphEl = document.getElementById("quiz-paragraph");
  quizParagraphEl.textContent = "";

  var quizChoicesEl = document.createElement("ul");
  quizChoicesEl.id = "quiz-choices";

  var quizFeedbackEl = document.getElementById("quiz-feedback");

  for (var i = 0; i < quizQuestions[questionNumber].choices.length; i++) {
    var buttonContainerEl = document.createElement("li");

    var questionButtonEl = document.createElement("button");
    questionButtonEl.textContent = quizQuestions[questionNumber].choices[i];
    questionButtonEl.className = "btn quiz-btn";
    questionButtonEl.setAttribute("type", "button");
    questionButtonEl.setAttribute(
      "data-response",
      quizQuestions[questionNumber].choices[i]
    );
    buttonContainerEl.appendChild(questionButtonEl);
    quizChoicesEl.appendChild(buttonContainerEl);
    quizAnswersEl.appendChild(quizChoicesEl);
  }

  quizFeedbackEl.className = "feedbackSection";
}

function userAnswers(event) {
  var targetEl = event.target;
  console.log(targetEl);

  if (targetEl.matches(".quiz-btn")) {
    var userAnswer = targetEl.getAttribute("data-response");
    answerTest(userAnswer);
  } else {
    return false;
  }
}

function answerTest(userAnswer) {
  var quizFeedbackResponseEl = document.createElement("p");
  quizFeedbackResponseEl.className = "feedbackResponse";
  var quizQuestionEl = document.getElementById("quiz-question");
  if (
    userAnswer.toLowerCase() ===
    quizQuestions[questionNumber].answer.toLowerCase()
  ) {
    score++;
    quizFeedbackResponseEl.textContent = "Correct!";
  } else {
    timeLeft = timeLeft - 10;

    quizFeedbackResponseEl.textContent =
      "Incorrect! The correct answer is: " +
      quizQuestions[questionNumber].answer;
  }

  quizFeedbackEl.appendChild(quizFeedbackResponseEl);
  var pauseTime = setTimeout(clearQuestions, timeoutDelay);
}

function clearQuestions() {
  var quizChoicesEl = document.getElementById("quiz-choices");
  var quizFeedbackEl = document.getElementById("quiz-feedback");
  var quizFeedbackResponseEl = document.querySelector(".feedbackResponse");
  var quizQuestionEl = document.getElementById("quiz-question");
  quizFeedbackEl.removeAttribute("class");
  if (quizChoicesEl) {
    quizChoicesEl.remove();
  }
  if (quizFeedbackResponseEl) {
    quizFeedbackResponseEl.remove();
  }

  if (timeLeft <= 0) {
    timerEl.textContent = "";
    quizQuestionEl.removeAttribute("class");
    endGame();
  } else {
    getQuestion();
  }
}

function endGame() {
  var quizQuestionEl = document.getElementById("quiz-question");
  quizQuestionEl.textContent = "Time is up!";
  var quizParagraphEl = document.getElementById("quiz-paragraph");
  quizParagraphEl.textContent = "Your final score is " + score + ".";

  // pulling high score list from localStorage
  var highScoreList = [];
  highScoreList = localStorage.getItem("jsQuizHighScores");

  // Checking if localStorage returns NULL
  if (!highScoreList) {
    highScoreList = [];
  } else {
    highScoreList = JSON.parse(highScoreList);
  }

  var winnerTest = false;
  // determine if high score was obtained
  if (!highScoreList || highScoreList.length === 0) {
    quizParagraphEl.textContent =
      "Your final score is " + score + ". A new high score!";
    winnerTest = true;
  } else {
    for (var i = 0; i < highScoreList.length; i++) {
      if (score >= parseInt(highScoreList[i].score)) {
        i = highScoreList.length;
        quizParagraphEl.textContent =
          "Your final score is " + score + ". A new high score!";
        winnerTest = true;
        // prompt user to enter in initials
      }
    }
  }

  if (winnerTest) {
    highScoreForm(highScoreList);
  } else {
    gameRestart();
  }
}

function highScoreForm(highScoreList) {
  var formCheck = document.querySelector("input");
  console.log(formCheck);
  if (!formCheck) {
    var formEl = document.createElement("input");
    formEl.class = "highScoreFormEl";
    formEl.id = "highScoreFormEl";
    formEl.setAttribute("name", "initials");
    formEl.setAttribute("type", "text");
    formEl.setAttribute("placeholder", "Enter Initials");
    formSectionEl.appendChild(formEl);

    var submitButtonEl = document.createElement("button");
    submitButtonEl.textContent = "Submit";
    submitButtonEl.className = "btn";
    submitButtonEl.id = "submit-btn";
    submitButtonEl.setAttribute("type", "submit");
    formSectionEl.appendChild(submitButtonEl);
  }
}

var initialsFormEvent = function (event) {
  event.preventDefault();
  var formEl = document.getElementById("highScoreFormEl");

  var userInitials = formEl.value;
  if (userInitials === "") {
    alert("Please enter initials and submit!");
    return false;
  }

  updateHighScore(formEl.value, highScoreList);
};

function updateHighScore(newScoreUser, highScoreList) {
  var newEntry = {
    initials: newScoreUser,
    score: score
  };
  var highScoreList = [];
  highScoreList = localStorage.getItem("jsQuizHighScores");
  if (!highScoreList) {
    highScoreList = [];
  } else {
    highScoreList = JSON.parse(highScoreList);
  }

  highScoreList.push(newEntry);

  //   var tempNewList = [];
  //   if (highScoreList.length === 0 || !highScoreList) {
  //     highScoreList.push(newEntry);
  //   } else {
  //     for (var i = 0; i < highScoreList.length; i++) {
  //       if (score >= parseInt(highScoreList[i].score)) {
  //         var scorePosition = i;
  //         i = highScoreList.length;
  //         for (var j = 0; j < highScoreList.length; j++) {
  //           if (j === scorePosition) {
  //             tempNewList.push(newEntry);
  //           }
  //           tempNewList.push(highScoreList[j]);
  //         }
  //       }
  //     }
  //     highScoreList = tempNewList;
  //   }

  localStorage.setItem("jsQuizHighScores", JSON.stringify(highScoreList));
  highScorePage();
}

var highScorePageHandler = function (event) {
  var targetEl = event.target;
  console.log(targetEl);

  if (!targetEl.matches("#high-score-btn")) {
    return false;
  }
  highScorePage();
};

function highScorePage() {
  //   quizHighScoreBtnEl.textContent = "";
  //   quizHighScoreBtnEl.removeAttribute("class");
  //   quizHighScoreBtnEl.class("hide");

  quizHighScoreBtnEl.remove();
  var quizQuestionEl = document.getElementById("quiz-question");
  var quizStartBtnEl = document.getElementById("start");
  if (quizStartBtnEl) {
    quizStartBtnEl.remove();
  }
  var submitButtonEl = document.getElementById("submit-btn");
  if (submitButtonEl) {
    submitButtonEl.remove();
  }
  var formEl = document.getElementById("highScoreFormEl");
  if (formEl) {
    formEl.remove();
  }
  // pulling high score list from localStorage
  var highScoreList = [];
  highScoreList = localStorage.getItem("jsQuizHighScores");
  // Checking if localStorage returns NULL
  if (!highScoreList) {
    highScoreList = [];
  } else {
    highScoreList = JSON.parse(highScoreList);
  }

  console.log(highScoreList[0]);
  quizQuestionEl.textContent = "High Scores";
  quizParagraphEl.textContent = "";

  console.log(highScoreList);

  if (highScoreList) {
    var quizChoicesEl = document.createElement("ul");
    quizChoicesEl.id = "score-ul";

    for (var i = 0; i < maxHighScorelist; i++) {
      var scoreEl = document.createElement("li");
      scoreEl.className = "score-li";
      scoreEl.textContent =
        i + ". " + highScoreList[i].initials + " - " + highScoreList[i].score;
      quizChoicesEl.appendChild(scoreEl);
    }
  }

  var goBackButtonEl = document.createElement("button");
  goBackButtonEl.textContent = "Go Back";
  goBackButtonEl.className = "btn";
  goBackButtonEl.id = "goBack-btn";
  goBackButtonEl.setAttribute("type", "button");
  highScorePageBtnsEl.appendChild(goBackButtonEl);

  var clearScoresButtonEl = document.createElement("button");
  clearScoresButtonEl.textContent = "Clear High Scores";
  clearScoresButtonEl.className = "btn";
  clearScoresButtonEl.id = "clearScore-btn";
  clearScoresButtonEl.setAttribute("type", "button");
  highScorePageBtnsEl.appendChild(clearScoresButtonEl);
}

function highScorePageHandler(event) {
  var targetEl = event.target;
  console.log(targetEl);

  if (targetEl.matches("#goBack-btn")) {
    gameRestart();
  } else if (targetEl.matches("#clearScore-btn")) {
    localStorage.clear();
    // localStorage.setItem("jsQuizHighScores", "");
  } else {
    return false;
  }
}

function gameRestart() {
  var goBackButtonEl = document.getElementById("goBack-btn");
  if (goBackButtonEl) {
    goBackButtonEl.remove();
  }
  var clearScoresButtonEl = document.getElementById("clearScore-btn");
  if (clearScoresButtonEl) {
    clearScoresButtonEl.remove();
  }
  var submitButtonEl = document.getElementById("submit-btn");
  if (submitButtonEl) {
    submitButtonEl.remove();
  }
  var formEl = document.getElementById("highScoreFormEl");
  if (formEl) {
    formEl.remove();
  }
  var quizHighScoreBtnEl = document.getElementById("high-score-btn");
  if (quizHighScoreBtnEl) {
    quizHighScoreBtnEl.remove();
  }

  highScoreContainer.innerHTML =
    "<button class='btn score-btn' id='high-score-btn' type='button'>View High Scores</button>";
  quizSectionEl.innerHTML =
    "<h2 id='quiz-question'>Coding Quiz Challenge</h2><p id='quiz-paragraph'>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p><button class='btn' id='start' type='button'>Start Quiz</button>";

  var questionNumberList = [];
  for (var i = 0; i < quizQuestions.length; i++) {
    questionNumberList[i] = i;
  }
}

var quizQuestions = [
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: "console.log",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
  },
  {
    question: "Commonly used data types DO Not include:",
    answer: "alerts",
    choices: ["strings", "booleans", "alerts", "numbers"],
  },
  {
    question:
      "The condition in an if/else statement is enclosed with _____.",
    answer: "parenthesis",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
  },
  {
    question: "Arrays in JavaScript can be used to store",
    answer: "all of the above",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
  },
  {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    answer: "quotes",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
  },
];

// Creating array to track questions used
var questionNumberList = [];
for (var i = 0; i < quizQuestions.length; i++) {
  questionNumberList[i] = i;
}

// Start Quiz Button
quizSectionEl.addEventListener("click", quizStart);

// High Score Button
highScoreContainer.addEventListener("click", highScorePageHandler);

// Quiz buttons
quizAnswersEl.addEventListener("click", userAnswers);

// Form Submit button
formSectionEl.addEventListener("submit", initialsFormEvent);

// High Score page buttons
highScorePageBtnsEl.addEventListener("click", highScorePageHandler);
