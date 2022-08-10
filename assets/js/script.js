var questionCounter = 0;
var questionUsed = [];

// Timer
var timerEl = document.getElementById("countdown");

var quizQuestionEl = document.getElementById("quiz-question");
var quizParagraphEl = document.getElementById("quiz-paragraph");
var quizChoicesEl = document.getElementById("quiz-choices");
var quizStartBtnEl = document.getElementById("start");
var quizHighScoreBtnEl = document.getElementById("high-score-btn");
var quizFeedbackEl = document.getElementById("quiz-feedback");

console.log(quizQuestionEl);

//countdown timer
function countdown() {
  var timeLeft = 10;

  var timeInterval = setInterval(function () {
    if (timeLeft === 0) {
      clearInterval(timeInterval);
    }
    timerEl.textContent = "Time: " + timeLeft + "s";
    timeLeft--;
  }, 1000);
}

var quizStart = function (event) {
  console.log("quizStart");
  console.log(quizQuestionEl);
  countdown();

  // Creating array to track questions used
  var questionNumberList = [];
  for (var i = 0; i < quizQuestions.length; i++) {
    questionNumberList[i] = i;
  }

  currentQuestion = getQuestion(questionNumberList);

  displayQuestion(currentQuestion);
};

function displayQuestion(currentQuestion) {
  quizStartBtnEl.remove();
  console.log(quizQuestionEl.value);
  console.log(quizQuestions[currentQuestion].question);
  quizQuestionEl.textContent = quizQuestions[currentQuestion].question;
  quizQuestionEl.setAttribute("data-question", currentQuestion);
  quizQuestionEl.setAttribute("class", "question");

  quizParagraphEl.textContent = "";

  for (var i = 0; i < quizQuestions[currentQuestion].choices.length; i++) {
    var buttonContainerEl = document.createElement("li");

    var questionButtonEl = document.createElement("button");
    questionButtonEl.textContent = quizQuestions[currentQuestion].choices[i];
    questionButtonEl.className = "btn quiz-btn";
    questionButtonEl.setAttribute("type", "button");
    questionButtonEl.setAttribute(
      "data-response",
      quizQuestions[currentQuestion].choices[i]
    );
    buttonContainerEl.appendChild(questionButtonEl);
    quizChoicesEl.appendChild(buttonContainerEl);
  }

  quizFeedbackEl.className = "feedbackSection";
}

function getQuestion(questionNumberList) {
  // NO REPEAT QUESTIONS METHOD 1
  //     var newQuestion = false
  //     while(newQuestion = false) {
  //     var questionNumber = Math.floor(Math.random() * quizQuestions.length);
  //   console.log(questionNumber);

  //   for (var i = 0; i < questionUsed.length, i++) {

  //     if (questionNumber === questionUsed[i]) {
  //         newQuestion = false;
  //         i=questionUsed.length;
  //     } else {
  //         newQuestion = true;
  //     }
  //   }

  // NO REPEAT QUESTIONS METHOD 2
  // selects random number to match the position in array based on size of array
  var questionNumber = Math.floor(Math.random() * questionNumberList.length);
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
  return (currentQuestion = questionNumber);
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

// Start Quiz Button
quizStartBtnEl.addEventListener("click", quizStart);

// High Score Button
quizHighScoreBtnEl.addEventListener("click", highScore);
