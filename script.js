// References
const timerDiv = document.querySelector("#timer");
const statusField = document.querySelector("#status");
const startButton = document.querySelector("#startBtn");
const background = document.querySelector("body");

// Eventlisteners
startButton.addEventListener("click", startTimer);

// Styling variables
const workColor = "#FF6347";
const breakColor = "#7FFFD4";

// Time in minutes. Can be inputted in later version
const workTimeInMinutes = 2; // Default 25
const shortBreakTimeInMinutes = 1; // Default 3
const longBreakTimeInMinutes = 3; // Default 30

// Make seconds from the times.
const workTimeInSeconds = workTimeInMinutes * 60;
const shortBreakTimeInSeconds = shortBreakTimeInMinutes * 60;
const longBreakTimeInSeconds = longBreakTimeInMinutes * 60;

const defaultSequence = 8;
let currentSequence = defaultSequence;
const sequenceNames = [
  "End",
  "Long Break!",
  "Work 4",
  "Short Break 3",
  "Work 3",
  "Short Break 2",
  "Work 2",
  "Short Break 1",
  "Work 1",
];

var currentTime = workTimeInSeconds;

let timeInterval;

function updateTimer() {
  if (currentTime >= 0) {
    timerDiv.textContent =
      addLeadingZero(Math.floor(currentTime / 60)) +
      " : " +
      addLeadingZero(currentTime % 60);
    currentTime--;
  } else {
    console.log("===========================================");
    clearInterval(timeInterval);

    if (currentSequence > 1) {
      if (currentSequence % 2 == 0) {
        console.log("Even currentSequence --> Dus naar break gaan nu");
        startShortBreak();
      } else {
        console.log("ONeven currentSequence --> Dus nu gaan werken");
        startWorking();
      }
    } else {
      console.log("EINDE TIMER! START MAAR OPNIEUW!");
      clearInterval(timeInterval);
      //startTimer();
    }
  }
}

function startTimer() {
  startButton.disabled = true;
  startButton.textContent = "Pause Timer";
  statusField.textContent = "Let's start working!";
  console.log("START TIMER!");
  currentSequence = defaultSequence;
  console.log(
    "currentSequence: " +
      sequenceNames[currentSequence] +
      " (" +
      currentSequence +
      ")"
  );
  currentlyWorking = 1;
  currentWorkTime = workTimeInSeconds;
  timeInterval = window.setInterval(updateTimer, 1000);
}

function addLeadingZero(number) {
  number = number.toString();
  while (number.length < 2) number = "0" + number;
  return number;
}

function startShortBreak() {
  statusField.textContent = "Time for a break!";
  console.log("Short break");
  background.style.backgroundColor = breakColor;
  currentSequence--;
  console.log(
    "currentSequence: " +
      sequenceNames[currentSequence] +
      " (" +
      currentSequence +
      ")"
  );
  currentTime = shortBreakTimeInSeconds;
  timeInterval = window.setInterval(updateTimer, 1000);
}

function startWorking() {
  statusField.textContent = "Focus on the task!";
  currentWorkTime--;
  currentSequence--;
  console.log(
    "currentSequence: " +
      sequenceNames[currentSequence] +
      " (" +
      currentSequence +
      ")"
  );
  console.log("Working!");
  background.style.backgroundColor = workColor;
  currentlyWorking = 1;
  currentTime = workTimeInSeconds;
  timeInterval = window.setInterval(updateTimer, 1000);
}
