import { getAllQuizzes } from "../../utils/quizActions.js";
import {logoutAction} from "../../utils/authActions.js"
const quizzesContainer = document.querySelector(".quizzes-container");

const renderQuizzes = async () => {
    const response = await getAllQuizzes();

    console.log(response, "response");


    quizzesContainer.innerHTML = "";

    response.forEach(quiz => {
        if(quiz.available) {
            quizzesContainer.innerHTML += `
                 <div class="col-sm-6 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${quiz.quizTitle}</h5>
              <p class="card-text fw-bold">
                ${quiz.quizCategory}
              </p>

              <p>${quiz.questions.length} Questions</p>
              <<button onclick="shifter('${quiz.id}')" class='btn btn-primary'>Attempt Quiz</button>
            </div>
          </div>
        </div>
            `
        }
    })

};

const logoutHandler = async () => {
  const response = await logoutAction()
};

const shifter = async (quizID) => {
  sessionStorage.setItem('quizID',JSON.stringify(quizID));
  window.location.replace('../attempt-quiz/attempt-quiz.html')
};



window.logoutHandler = logoutHandler
window.shifter = shifter
window.addEventListener('load', renderQuizzes)