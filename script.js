const timerMinutes = document.querySelector("#timer-minutes");
const timerSeconds = document.querySelector("#timer-seconds");

const startButton = document.querySelector("#startBtn");

startButton.addEventListener("click", startTimer);

// Time in minutes. Can be inputted in later version
const workTimeInMinutes = 2; // Default 25
const shortBreakTimeInMinutes = 1; // Default 3
const longBreakTimeInMinutes = 3; // Default 30

// Make seconds from the times.
const workTimeInSeconds = workTimeInMinutes * 60;
const shortBreakTimeInSeconds = shortBreakTimeInMinutes * 60;
const longBreakTimeInSeconds = longBreakTimeInMinutes * 60;

if (timerRunning) {
  window.setInterval(updateTimer, 1000);
}

var currentTime = workTimeInSeconds;

function updateTimer() {
  currentTime--;
  timerMinutes.textContent = addLeadingZero(Math.floor(currentTime / 60));
  timerSeconds.textContent = addLeadingZero(currentTime % 60);
}

function startTimer() {
  console.log("START TIMER!");
  currentTime = workTimeInSeconds;
  timerRunning = true;
  if (timerRunning) {
    window.setInterval(updateTimer, 1000);
  }
}

function addLeadingZero(number) {
  number = number.toString();
  while (number.length < 2) number = "0" + number;
  return number;
}
