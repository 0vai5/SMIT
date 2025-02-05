import { getQuiz } from "../../utils/quizActions.js";
import { createScore } from "../../utils/scoreActions.js";
const questionText = document.querySelector("#question");
const optionsContainer = document.querySelector("#optionsContainer");
const quizContainer = document.querySelector(".quiz-container")
const resultContainer = document.querySelector(".result");
let questions = [];
let score = 0;
let index = 0;
let wrongAnswers = 0;
let quizName = "";
const { uid } = JSON.parse(localStorage.getItem("user"));

const checkQuiz = async () => {
  const quizID = JSON.parse(sessionStorage.getItem("quizID"));

  if (!quizID) {
    window.location.replace("../dashboard/dashboard.html");
  }

  const response = await getQuiz(quizID);

  return response;
};

checkQuiz()
  .then((response) => {
    questions = response.questions;
    quizName = response.quizTitle;
    renderQuestion();
  })
  .catch((err) => {
    console.log(err);
  });

const renderQuestion = () => {
  if (index < questions.length) {
    const question = questions[index];
    questionText.innerHTML = question.question;
    optionsContainer.innerHTML = "";

    var options = question.options;
    for (var key in options) {
      optionsContainer.innerHTML += `
        <button class="option" id="${key}" onclick="checkAnswer(this)">${options[key]}</button>
        `;
    }
  }
};

const nextQuestion = () => {
  if (index < questions.length - 1) {
    index++;
    renderQuestion();
  } else {
    submitHandler()
  }
}

const submitHandler = async () => {

  const scoreObj = {
    quizName,
    score,
    wrongAnswers,
    totalQuestions: questions.length,
    userID: uid,
    quizID: JSON.parse(sessionStorage.getItem("quizID")),
    percentage: (score / questions.length) * 100
  }

  const response = await createScore(scoreObj);

  if (response) {
    alert("Successfully Created Score");
    window.location.replace("../my-quizzes/my-quizzes.html");
  } else {
    alert("Score already exists");
  }




  quizContainer.style.display = "none";
  resultContainer.style.display = "block"
  resultContainer.innerHTML = `
    <div class="result">

    <h2>Result</h2>
    <p>Total Questions: ${questions.length}</p>
    <p>Correct Answers: ${score}</p>
    <p>Wrong Answers: ${wrongAnswers}</p>
    <p>Percentage: ${(score / questions.length) * 100}%</p>
    </div>
  `




}

const checkAnswer = (elem) => {
  const question = questions[index];
  const correctAnswer = question.correctAnswer;
  const selectedAnswer = elem.innerHTML;

  if (correctAnswer === selectedAnswer) {
    score++;
    elem.style.backgroundColor = "green";
  } else {
    wrongAnswers++;
    elem.style.backgroundColor = "red";
    for (let i = 0; i < optionsContainer.children.length; i++) {
      if (optionsContainer.children[i].innerHTML === correctAnswer) {
        optionsContainer.children[i].style.backgroundColor = "green";
      }
    }
  }
}

window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;
window.addEventListener("load", renderQuestion);
window.renderQuestion = renderQuestion;
window.submitHandler = submitHandler;
