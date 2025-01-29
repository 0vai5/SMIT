const quizContainer = document.querySelector(".quizzes-container");
import { getAllQuizzes, toggleAvailability } from "../../utils/quizActions.js";

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
              <button class="btn ${
                quiz.available ? "btn-primary" : "btn-danger"
              }" onclick="toggleAvailabilityAction('${quiz.id}')" }>${
      quiz.available ? "Active" : "Not Active"
    }</a>
            </div>
          </div>
        </div>
        `;
  });
};

const toggleAvailabilityAction = async (quizId) => {
  const response = await toggleAvailability(quizId);
  if (response) alert("Quiz availability toggled successfully");
  renderQuizzes();
};

window.addEventListener("load", renderQuizzes);

window.toggleAvailabilityAction = toggleAvailabilityAction;
