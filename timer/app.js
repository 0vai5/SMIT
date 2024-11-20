var timer = document.getElementById("timer");

var duration = parseInt(prompt("Enter the duration in minutes"));

if (duration == 1) {
  timer.innerHTML = `00: 59`;
} else {
  timer.innerHTML = `${duration} : 00`;
}

var timerInterval;

function startTimer() {
  var seconds = 59;
  var minutes = duration === 1 ? "0" : duration;

  timerInterval = setInterval(() => {
    if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }

    timer.innerHTML = `${minutes < 10 ? "0" + minutes : minutes} : ${
      seconds < 10 ? "0" + seconds : seconds
    }`;

    if (minutes === 0 && seconds === 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
  }, 1000);
}
