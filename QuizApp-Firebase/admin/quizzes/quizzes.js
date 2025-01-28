const quizContainer = document.querySelector(".quizzes-container");
import { getAllQuizzes } from "../../utils/quizActions.js";

const renderQuizzes = async () => {
  const quizzes = await getAllQuizzes();
  quizContainer.innerHTML = "";

  quizzes.forEach((quiz) => {
    quizContainer.innerHTML = `
             <div class="col-sm-6 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${quiz.quizTitle}</h5>
              <p class="card-text fw-bold">
                ${quiz.quizCategory}
              </p>

              <p>${quiz.questions.length} Questions</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        `;
  });
};

window.addEventListener("load", renderQuizzes);
