// References
const timerDiv = document.querySelector("#timer");
const statusField = document.querySelector("#status");
const startButton = document.querySelector("#startBtn");
const markers = document.querySelectorAll(".marker");

// Eventlisteners
startButton.addEventListener("click", startTimer);

// Styling variables
const workColor = "#FF6347";
const breakColor = "#7FFFD4";

// Time in minutes. Can be inputted in later version
const workTimeInMinutes = 0.05; // Default 25
const shortBreakTimeInMinutes = 0.1; // Default 3
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
    clearInterval(timeInterval);
    currentSequence--;

    if (currentSequence > 0) {
      updateStatusField();
      if (currentSequence % 2 == 0) {
        startWorking();
      } else {
        startShortBreak();
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
  currentSequence = defaultSequence;
  updateStatusField();
  console.log("START TIMER!");
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
  currentTime = shortBreakTimeInSeconds;
  var temp = defaultSequence - currentSequence;
  console.log("startShortBreak(): defaultSequence - currentSequence: " + temp);
  //   if (defaultSequence - currentSequence == 1) {
  //     currentTime = longBreakTimeInSeconds;
  //   }
  console.log(
    "currentSequence: " +
      sequenceNames[currentSequence] +
      " (" +
      currentSequence +
      ")"
  );
  timeInterval = window.setInterval(updateTimer, 1000);
}

function startWorking() {
  currentWorkTime--;
  console.log(
    "currentSequence: " +
      sequenceNames[currentSequence] +
      " (" +
      currentSequence +
      ")"
  );
  console.log("Working!");
  currentlyWorking = 1;
  currentTime = workTimeInSeconds;
  timeInterval = window.setInterval(updateTimer, 1000);
}

function updateStatusField() {
  // Kies een bericht uit een array van berichten
  // De gekozen array is afhankelijk van of we werken of pauze houden

  var i = defaultSequence - currentSequence;
  console.log("updateStatusField(): defaultSequence - currentSequence: " + i);
  markers[i].style.backgroundColor = "#FF00FF";
  if (i >= 1) {
    markers[i - 1].style.backgroundColor = "#FF0000";
  }

  if (currentSequence % 2 == 0) {
    newStatus =
      statusMessageWork[Math.floor(Math.random() * statusMessageWork.length)];
    document.body.style.backgroundColor = workColor;
  } else {
    newStatus =
      statusMessageBreak[Math.floor(Math.random() * statusMessageBreak.length)];
    document.body.style.backgroundColor = breakColor;
  }

  statusField.textContent = newStatus;
}
