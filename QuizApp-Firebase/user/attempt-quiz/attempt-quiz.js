import { getQuiz } from "../../utils/quizActions.js";
const questionText = document.querySelector("#question");
const optionsContainer = document.querySelector("#optionsContainer");

let questions = [];
let score = 0;
let index = 0;
let wrongAnswers = 0;
let totalQuestions = questions.length;
let quizName = "";

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
    totalQuestions = questions.length;
    renderQuestion();
  })
  .catch((err) => {
    console.log(err);
  });

const renderQuestion = () => {
  const question = questions[index];
  questionText.innerHTML = question.question;
  optionsContainer.innerHTML = "";

  var options = questions[index].options;
  optionsContainer.innerHTML = "";
  for (var key in options) {
    optionsContainer.innerHTML += `
        <button class="option" id="${key}" onclick="checkAnswer(this)">${options[key]}</button>
        `;
  }
};

window.addEventListener("load", renderQuestion());
