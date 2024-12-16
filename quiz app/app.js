const questions = [
  {
    question: "What does `toUpperCase()` do to a string?",
    options: {
      a: "Converts all letters to lowercase",
      b: "Converts all letters to uppercase",
      c: "Reverses the string",
      d: "Removes spaces from the string",
    },
    correctAnswer: "b",
  },
  {
    question: "Which method returns the number of characters in a string?",
    options: {
      a: "length",
      b: "size",
      c: "count",
      d: "charCount",
    },
    correctAnswer: "a",
  },
  {
    question: "How do you find the index of a character in a string?",
    options: {
      a: "charIndex()",
      b: "indexOf()",
      c: "find()",
      d: "getIndex()",
    },
    correctAnswer: "b",
  },
  {
    question: "What does `Math.round(4.7)` return?",
    options: {
      a: "4",
      b: "4.7",
      c: "5",
      d: "Error",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which method generates a random number between 0 (inclusive) and 1 (exclusive)?",
    options: {
      a: "Math.random()",
      b: "Math.rand()",
      c: "generateRandom()",
      d: "random()",
    },
    correctAnswer: "a",
  },
  {
    question: "Which method converts a string to a number?",
    options: {
      a: "parseInt()",
      b: "toNumber()",
      c: "StringToNumber()",
      d: "convert()",
    },
    correctAnswer: "a",
  },
  {
    question: "How do you set a fixed number of decimals for a number?",
    options: {
      a: "Math.decimals()",
      b: "toFixed()",
      c: "round()",
      d: "setDecimals()",
    },
    correctAnswer: "b",
  },
  {
    question: "What does `new Date()` return?",
    options: {
      a: "The current date and time",
      b: "An empty date object",
      c: "The year only",
      d: "The time only",
    },
    correctAnswer: "a",
  },
  {
    question: "Which method extracts the year from a date object?",
    options: {
      a: "getYear()",
      b: "getFullYear()",
      c: "getDate()",
      d: "getMonth()",
    },
    correctAnswer: "b",
  },
  {
    question:
      "What is the default value returned by a function that has no `return` statement?",
    options: {
      a: "undefined",
      b: "null",
      c: "0",
      d: "An empty string",
    },
    correctAnswer: "a",
  },
  {
    question: "Which keyword declares a local variable?",
    options: {
      a: "var",
      b: "local",
      c: "let",
      d: "Both var and let",
    },
    correctAnswer: "d",
  },
  {
    question: "How do you specify a case in a `switch` statement?",
    options: {
      a: "if",
      b: "case",
      c: "switchCase",
      d: "when",
    },
    correctAnswer: "b",
  },
  {
    question: "Which loop guarantees that the code runs at least once?",
    options: {
      a: "for loop",
      b: "while loop",
      c: "do...while loop",
      d: "nested loop",
    },
    correctAnswer: "c",
  },
  {
    question: "Which event occurs when a user clicks on an element?",
    options: {
      a: "onMouse",
      b: "onClick",
      c: "onButton",
      d: "onHover",
    },
    correctAnswer: "b",
  },
  {
    question: "What does `document.getElementById()` do?",
    options: {
      a: "Finds all elements with a specific tag",
      b: "Finds an element by its class",
      c: "Finds an element by its ID",
      d: "Finds elements by their name",
    },
    correctAnswer: "c",
  },
  {
    question: "How do you change the text of a paragraph in JavaScript?",
    options: {
      a: "paragraph.text = 'New Text'",
      b: "paragraph.innerHTML = 'New Text'",
      c: "paragraph.setText('New Text')",
      d: "paragraph.value = 'New Text'",
    },
    correctAnswer: "b",
  },
  {
    question: "How do you generate a unique ID for a new DOM element?",
    options: {
      a: "generateID()",
      b: "setAttribute('id', 'uniqueID')",
      c: "createID()",
      d: "newElement.id('uniqueID')",
    },
    correctAnswer: "b",
  },
  {
    question: "Which property retrieves or sets the value of an input field?",
    options: {
      a: "value",
      b: "innerText",
      c: "content",
      d: "textContent",
    },
    correctAnswer: "a",
  },
  {
    question: "How do you target all elements with a specific tag name?",
    options: {
      a: "document.querySelectorAll()",
      b: "document.getElementsByTagName()",
      c: "document.getTag()",
      d: "document.getAllTags()",
    },
    correctAnswer: "b",
  },
  {
    question: "What does `appendChild()` do in the DOM?",
    options: {
      a: "Adds a new child node to an element",
      b: "Removes a child node from an element",
      c: "Inserts a new element before another element",
      d: "Replaces an element with a new element",
    },
    correctAnswer: "a",
  },
  // Add 20 more similar questions covering the remaining topics!
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
    elem.style.color = "white";
    correctAnswers++;
  } else {
    elem.style.color = "white";
    elem.style.backgroundColor = "red";
    wrongAnswers++;
    for (let i = 0; i < allOptions.length; i++) {
      if (allOptions[i].id === correctAnswer) {
        allOptions[i].style.backgroundColor = "green";
        elem.style.color = "white";
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
