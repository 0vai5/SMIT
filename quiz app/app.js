var questions = [
  {
    question: "What is the capital of France?",
    options: {
      a: "London",
      b: "Berlin",
      c: "Madrid",
      d: "Paris",
    },
    correctAnswer: "d",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: {
      a: "Kangchenjunga",
      b: "Mount Everest",
      c: "K2",
      d: "Lhotse",
    },
    correctAnswer: "b",
  },
  {
    question: "What is the largest mammal in the world?",
    options: {
      a: "Elephant",
      b: "Giraffe",
      c: "Blue Whale",
      d: "Hippopotamus",
    },
    correctAnswer: "c",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: {
      a: "Earth",
      b: "Jupiter",
      c: "Saturn",
      d: "Neptune",
    },
    correctAnswer: "b",
  },
  {
    question: "What is the smallest country in the world?",
    options: {
      a: "Monaco",
      b: "Tuvalu",
      c: "Vatican City",
      d: "Nauru",
    },
    correctAnswer: "c",
  },
  {
    question: "What is the capital of Australia?",
    options: {
      a: "Sydney",
      b: "Melbourne",
      c: "Brisbane",
      d: "Canberra",
    },
    correctAnswer: "d",
  },
  {
    question: "What is the largest ocean in the world?",
    options: {
      a: "Indian Ocean",
      b: "Atlantic Ocean",
      c: "Pacific Ocean",
      d: "Arctic Ocean",
    },
    correctAnswer: "c",
  },
  {
    question: "What is the largest desert in the world?",
    options: {
      a: "Sahara",
      b: "Gobi",
      c: "Arabian",
      d: "Antarctica",
    },
    correctAnswer: "d",
  },
  {
    question: "What is the largest river in the world?",
    options: {
      a: "Yangtze",
      b: "Amazon",
      c: "Nile",
      d: "Mississippi",
    },
    correctAnswer: "b",
  },
  {
    question: "What is the largest island in the world?",
    options: {
      a: "Madagascar",
      b: "New Guinea",
      c: "Greenland",
      d: "Borneo",
    },
    correctAnswer: "c",
  },
];

var quizContainer = document.getElementById("quizConatainer");
var question = document.getElementById("question");
var optionsContainer = document.getElementById("optionsContainer");
var index = 0;
var correctAnswers = 0;
var wrongAnswers = 0;

function renderUI() {
  var questionText = questions[index].question;
  question.innerHTML = questionText;
  var options = questions[index].options;
  optionsContainer.innerHTML = "";
  for (var key in options) {
    optionsContainer.innerHTML += `
        <button class="option" id="${key}" onclick="checkAnswer(this)">${options[key]}</button>
        `;
  }
}

function checkAnswer(elem) {
  var correctAnswer = questions[index].correctAnswer;
  var userAnswer = elem.id;
  var allOptions = optionsContainer.children;
  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].style.pointerEvents = "none";
  }
  if (correctAnswer === userAnswer) {
    elem.style.backgroundColor = "green";
    correctAnswers++;
  } else {
    elem.style.backgroundColor = "red";
    wrongAnswers++;
    for (let i = 0; i < allOptions.length; i++) {
      if (allOptions[i].id === correctAnswer) {
        allOptions[i].style.backgroundColor = "green";
      }
    }
  }
}

function nextQuestion() {
  if (index < questions.length - 1) {
    index++;
    renderUI();
  } else {
    quizContainer.innerHTML = `
      <h1>Quiz Completed</h1>
      <h2>Correct Answers: ${correctAnswers}</h2>
      <h2>Wrong Answers: ${wrongAnswers}</h2>
      <button class="submit-btn" onclick="restartQuiz()">Restart Quiz</button>
    `;
  }
}

function restartQuiz() {
  window.location.reload();
}
