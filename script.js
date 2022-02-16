const timerMinutes = document.querySelector("#timer-minutes");
const timerSeconds = document.querySelector("#timer-seconds");

const startButton = document.querySelector("#startBtn");

const background = document.querySelector("body");

startButton.addEventListener("click", startTimer);

// Time in minutes. Can be inputted in later version
const workTimeInMinutes = 1; // Default 25
const shortBreakTimeInMinutes = 2; // Default 3
const longBreakTimeInMinutes = 3; // Default 30

// Make seconds from the times.
const workTimeInSeconds = workTimeInMinutes * 60;
const shortBreakTimeInSeconds = shortBreakTimeInMinutes * 60;
const longBreakTimeInSeconds = longBreakTimeInMinutes * 60;

const defaultWorkTimes = 3; // 3 work timers before a long break
let currentWorkTime;
let currentlyWorking = 0;

var currentTime = workTimeInSeconds;
var currentTime = 5;

let timeInterval;

function updateTimer() {
  if (currentTime >= 0) {
    timerMinutes.textContent = addLeadingZero(Math.floor(currentTime / 60));
    timerSeconds.textContent = addLeadingZero(currentTime % 60);
    currentTime--;
  } else {
    console.log("Tijd is om. Tijd voor iets nieuws!");
    clearInterval(timeInterval);

    console.log("currentWorkTime: " + currentWorkTime);
    if (currentWorkTime > 0 && currentlyWorking == 1) {
      startShortBreak();
    } else if ((currentWorkTime = 0 && currentlyWorking == 1)) {
      startLongBreak();
    } else {
      startWorking();
    }
    //alert("Timer gestopt!");
  }
}

function startTimer() {
  console.log("START TIMER!");
  //currentTime = workTimeInSeconds;
  currentlyWorking = 1;
  currentWorkTime = defaultWorkTimes;
  timeInterval = window.setInterval(updateTimer, 1000);
}

function addLeadingZero(number) {
  number = number.toString();
  while (number.length < 2) number = "0" + number;
  return number;
}

function changeBackground() {
  background.style.backgroundColor = "#00FF00";
}

function startShortBreak() {
  console.log("Short break");
  background.style.backgroundColor = "#00FF00";
  currentlyWorking = 0;
  currentTime = 5;
  timeInterval = window.setInterval(updateTimer, 1000);
}

function startWorking() {
  currentWorkTime--;
  console.log("Working!");
  background.style.backgroundColor = "#FF0000";
  currentlyWorking = 1;
  currentTime = 5;
  timeInterval = window.setInterval(updateTimer, 1000);
}
