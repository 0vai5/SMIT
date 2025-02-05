import { logoutAction } from "../../utils/authActions.js";
import {getUserScores} from "../../utils/scoreActions.js"
import { isAuthenticatedUser } from "../../utils/utils.js";
const tableBody = document.querySelector("#tableBody");
const {uid} = JSON.parse(localStorage.getItem("user"));

const logoutHandler = async () => {
  const response = await logoutAction();
};

const getScoreHandler = async () => {
    const response = await getUserScores(uid);
  tableBody.innerHTML = "";
  
  if(response) {

    response.forEach((score, index) => {
      tableBody.innerHTML += `
      
        <tr>
              <td>${index + 1}</td>
              <td>${score.quizName}</td>
              <td>${score.totalQuestions}</td>
              <td>${score.score}</td>
              <td>${score.wrongAnswers}</td>
              <td>${score.percentage <= 40 ? `<p class="text-danger fw-bold">${score.percentage} %</p>` : `<p class="text-success fw-bold">${score.percentage} %</p>`}</td>
            </tr>
      `
    })
  } else {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">No scores available</td>
      </tr>
    `
  }
};



window.addEventListener('load', getScoreHandler);
window.logoutHandler = logoutHandler;
window.addEventListener("load", isAuthenticatedUser);
