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
const workTimeInMinutes = 1; // Default 25
const shortBreakTimeInMinutes = 1; // Default 3
const longBreakTimeInMinutes = 3; // Default 30

// Make seconds from the times.
const workTimeInSeconds = workTimeInMinutes * 60;
const shortBreakTimeInSeconds = shortBreakTimeInMinutes * 60;
const longBreakTimeInSeconds = longBreakTimeInMinutes * 60;

let newStatus;

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

// Array met status-berichten
const statusMessageWork = [
  "Focus on the task!",
  "Time to work!",
  "Hard work pays off",
];
const statusMessageBreak = ["Time to relax", "Have a break", "Walk around"];

/* ========== FUNCTIONS ========== */

// Ik vind het er mooier uit zien als getallen een voorloopnul hebben
function addLeadingZero(number) {
  number = number.toString();
  while (number.length < 2) number = "0" + number;
  return number;
}

function updateTimer() {
  if (currentTime >= 0) {
    timerDiv.textContent =
      addLeadingZero(Math.floor(currentTime / 60)) +
      " : " +
      addLeadingZero(currentTime % 60);
    currentTime--;
  } else {
    console.log("===========================================");
    // clearInterval(timeInterval);

    if (currentSequence > 1) {
      updateStatusField();
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

function startShortBreak() {
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

function updateStatusField() {
  // Kies een bericht uit een array van berichten
  // De gekozen array is afhankelijk van of we werken of pauze houden

  if (currentSequence % 2 == 0) {
    newStatus =
      statusMessageBreak[Math.floor(Math.random() * statusMessageBreak.length)];
  } else {
    newStatus =
      statusMessageWork[Math.floor(Math.random() * statusMessageWork.length)];
  }

  statusField.textContent = newStatus;
}
