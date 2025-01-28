import { logoutAction } from "../../utils/authActions.js";
import { createQuiz } from "../../utils/quizActions.js";
const quizTitle = document.querySelector("#quiz-title");
const quizCategory = document.querySelector("#quiz-category");
const quizLabel = document.querySelector("#quiz-label");
const questionText = document.querySelector("#question-text");
const correctAnswer = document.querySelector("#correct-answer");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");

const logoutHandler = () => logoutAction();

const questions = [];
let questionCounter = 0;

const addQuestion = () => {
  if (
    !questionText.value ||
    !correctAnswer.value ||
    !option1.value ||
    !option2.value ||
    !option3.value ||
    !option4.value
  ) {
    alert("Please fill all fields");
    return;
  }

  const question = {
    question: questionText.value,
    correctAnswer: correctAnswer.value,
    options: [option1.value, option2.value, option3.value, option4.value],
  };

  console.log(question, "question");

  questions.push(question);
  questionCounter++;

  questionText.value = "";
  correctAnswer.value = "";
  option1.value = "";
  option2.value = "";
  option3.value = "";
  option4.value = "";

  console.log(questions, "questions");
};

const createQuizHandler = async (btn) => {
  btn.innerHTML = "Creating Quiz...";
  btn.disabled = true;

  if (
    !quizTitle.value ||
    !quizCategory.value ||
    !quizLabel.value ||
    questions.length <= 0
  ) {
    alert("All Fields Are Required");
    btn.innerHTML = "Create Quiz";
    btn.disabled = false;
    return;
  }

  const labels = quizLabel.value.split(" ");

  const quizObj = {
    quizTitle: quizTitle.value,
    quizCategory: quizCategory.value,
    label: labels,
    questions,
    available: false,
  };

  console.log(quizObj, "quizObj");

  const quiz = await createQuiz(quizObj);

  if (quiz) {
    btn.innerHTML = "Create Quiz";
    btn.disabled = false;
    alert("Successfully Created Quiz");
    window.location.replace("../dashboard/dashboard.html");
  } else {
    alert("Error creating Quiz");
  }
};

window.createQuizHandler = createQuizHandler;
window.addQuestion = addQuestion;
window.logoutHandler = logoutHandler;
