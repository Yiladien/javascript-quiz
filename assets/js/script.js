var questionCounter = 0;
var questionUsed = [];
var questionNumber = 0;
var score = 0;

// Timer
var timerEl = document.getElementById("countdown");
var timeLeft = 10;

var quizQuestionEl = document.getElementById("quiz-question");
var quizParagraphEl = document.getElementById("quiz-paragraph");
var quizChoicesEl = document.getElementById("quiz-choices");
var quizAnswersEl = document.getElementById("answer-list");
var quizStartBtnEl = document.getElementById("start");
var quizHighScoreBtnEl = document.getElementById("high-score-btn");
var quizFeedbackEl = document.getElementById("quiz-feedback");

console.log(quizChoicesEl);

//countdown timer
function countdown() {
  timerEl.textContent = "Time: " + timeLeft + "s";
  timeLeft--;
  var timeInterval = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      clearQuestions();
    }
    timerEl.textContent = "Time: " + timeLeft + "s";
    timeLeft--;
  }, 1000);
}

var quizStart = function (event) {
  console.log("quizStart");
  countdown();

  getQuestion();
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
  console.log(updatedQuestionNumberList);
  console.log(questionNumberList);

  // provides number to correspond to array position in question object array
  displayQuestion();
}

function displayQuestion() {
  quizStartBtnEl.remove();
  quizQuestionEl.textContent = quizQuestions[questionNumber].question;
  quizQuestionEl.setAttribute("data-question", questionNumber);
  quizQuestionEl.setAttribute("class", "question");

  quizParagraphEl.textContent = "";

  var quizChoicesEl = document.createElement("ul");
  quizChoicesEl.id = "quiz-choices";

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
  console.log(quizQuestions[questionNumber].answer);
  var targetEl = event.target;
  console.log(targetEl);

  if (targetEl.matches(".quiz-btn")) {
    var userAnswer = targetEl.getAttribute("data-response");
    console.log(userAnswer);
    answerTest(userAnswer);
  } else {
    return false;
  }
}

function answerTest(userAnswer) {
  if (
    userAnswer.toLowerCase() ===
    quizQuestions[questionNumber].answer.toLowerCase()
  ) {
    score++;
    console.log(score);
    var quizFeedbackResponseEl = document.createElement("p");
    quizFeedbackResponseEl.textContent = "Correct!";
    quizFeedbackResponseEl.className = "feedbackResponse";
    quizFeedbackEl.appendChild(quizFeedbackResponseEl);
    console.log(quizFeedbackEl);
    var pauseTime = setTimeout(clearQuestions, 5000);
  } else {
    timeLeft = timeLeft - 10;
  }
}

function clearQuestions() {
  var quizChoicesEl = document.getElementById("quiz-choices");
  var quizFeedbackEl = document.getElementById("quiz-feedback");
  var quizFeedbackResponseEl = document.querySelector(".feedbackResponse");
  console.log(quizChoicesEl);
  quizChoicesEl.remove();
  quizFeedbackEl.removeAttribute("class");
  if (quizFeedbackResponseEl) {
    quizFeedbackResponseEl.remove();
  }

  if (timeLeft <= 0) {
    quizQuestionEl.removeAttribute("class");
    endGame();
  } else {
    getQuestion();
  }
}

function endGame() {
  quizQuestionEl.textContent = "Time is up! Your score is " + score + "!";
}

var highScore = function (event) {
  console.log("show score");
};

var quizQuestions = [
  {
    question: "What color is an apple?",
    answer: "Red",
    choices: ["Red", "Green", "Blue", "Orange"],
  },
  {
    question: "What is 2 + 2?",
    answer: "4",
    choices: ["1", "2", "3", "4"],
  },
  {
    question:
      "What shape is one side of a box with equal length, width, and height?",
    answer: "Square",
    choices: ["Circle", "Square", "Triangle", "Rectangle"],
  },
  {
    question: "What is the first day of the weekend?",
    answer: "Saturday",
    choices: ["Monday", "Saturday", "Sunday", "Tuesday"],
  },
  {
    question: "What month is Halloween?",
    answer: "October",
    choices: ["March", "November", "October", "January"],
  },
];

// Creating array to track questions used
var questionNumberList = [];
for (var i = 0; i < quizQuestions.length; i++) {
  questionNumberList[i] = i;
}

// Start Quiz Button
quizStartBtnEl.addEventListener("click", quizStart);

// High Score Button
quizHighScoreBtnEl.addEventListener("click", highScore);

// Quiz buttons
quizAnswersEl.addEventListener("click", userAnswers);
