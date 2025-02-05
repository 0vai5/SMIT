import { logoutAction } from "../../utils/authActions.js";
import {getQuizScores, getQuizScoresByQuizID} from "../../utils/scoreActions.js"
import {getQuizList} from "../../utils/quizActions.js"
import { isAuthenticatedAdmin } from "../../utils/utils.js";
const tableBody = document.querySelector("#tableBody");
const quizFilter = document.querySelector("#quizFilter");
const {uid} = JSON.parse(localStorage.getItem("user"));

const logoutHandler = async () => {
  const response = await logoutAction();
};

const getScoreHandler = async () => {
    const response = await getQuizScores(uid);
  tableBody.innerHTML = "";
  
  if(response) {

    response.forEach((score, index) => {
      tableBody.innerHTML += `
      
        <tr>
              <td>${index + 1}</td>
              <td>${score.quizName}</td>
              <td>${score.userName}</td>
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

const getScoreOnChange = async (elem) => {

    if(elem.value === "all") {
        getScoreHandler();
    } else {
        const response = await getQuizScoresByQuizID(elem.value);
        if(response) {
            tableBody.innerHTML = "";
            response.forEach((score, index) => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${score.quizName}</td>
                        <td>${score.userName}</td>
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
    }

}

const getQuizListing = async () => {
    const response = await getQuizList();
   response.forEach(quiz => {
    quizFilter.innerHTML += `
      <option value="${quiz.id}">${quiz.name}</option>
    `
   });


};




window.addEventListener('load', getQuizListing);
window.addEventListener('load', getScoreHandler);
window.addEventListener('load', isAuthenticatedAdmin);
window.logoutHandler = logoutHandler;
window.getScoreOnChange = getScoreOnChange;
