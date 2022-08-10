var questionCounter = 0;

// Timer
var timerEl = document.getElementById("countdown");

var quizQuestionEl = document.querySelector("quiz-question");
var quizParagraphEl = document.querySelector("quiz-paragraph");

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

countdown();
