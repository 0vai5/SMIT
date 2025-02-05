import { getAllQuizzes, getAllAttemptedQuizzes } from "../../utils/quizActions.js";
import { logoutAction } from "../../utils/authActions.js"
import { isAuthenticatedUser } from "../../utils/utils.js";
const quizzesContainer = document.querySelector(".quizzes-container");

const {uid} = JSON.parse(localStorage.getItem('user'));
const renderQuizzes = async () => {
  const response = await getAllQuizzes();
  const attempted = await getAllAttemptedQuizzes(uid);

  console.log(response, "response");


  

  if(response.length > 0) {
    quizzesContainer.innerHTML = "";
    response.forEach((quiz, index) => {
      if (quiz.available) {
        quizzesContainer.innerHTML += `
                   <div class="col-sm-6 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${quiz.quizTitle}</h5>
                <p class="card-text fw-bold">
                  ${quiz.quizCategory}
                </p>
  
                <p>${quiz.questions.length} Questions</p>
  
                ${attempted[index].quizID == quiz.id ? `<a class="btn btn-primary" href="../my-quizzes/my-quizzes.html">View Result</a>` : `<button onclick="shifter('${quiz.id}')" class='btn btn-primary'>Attempt Quiz</button>`}
                
              </div>
            </div>
          </div>
              `
      }
    })
  }

  

};



const logoutHandler = async () => {
  const response = await logoutAction()
};

const shifter = async (quizID) => {
  sessionStorage.setItem('quizID', JSON.stringify(quizID));
  window.location.replace('../attempt-quiz/attempt-quiz.html')
};



window.logoutHandler = logoutHandler
window.shifter = shifter
window.addEventListener('load', renderQuizzes);
window.addEventListener("load", isAuthenticatedUser);