/* ================================ */
/*           DECLARATIONS           */
/* ================================ */
// References
const timerDiv = document.querySelector("#timer");
const statusField = document.querySelector("#status");
const startButton = document.querySelector("#startBtn");
const markers = document.querySelectorAll(".marker");

// Eventlisteners
startButton.addEventListener("click", toggleTimer);

// Styling variables
const workColor = "#FF6347";
const breakColor = "#7FFFD4";

// Time in minutes. Can be inputted in later version
const workTimeInMinutes = 0.1; // Default 25
const shortBreakTimeInMinutes = 0.05; // Default 3
const longBreakTimeInMinutes = 0.2; // Default 30

// Make seconds from the times.
const workTimeInSeconds = workTimeInMinutes * 60;
const shortBreakTimeInSeconds = shortBreakTimeInMinutes * 60;
const longBreakTimeInSeconds = longBreakTimeInMinutes * 60;

// By default there are 8 sequences
const defaultNumberOfSequences = 8;

// Create variables
let newStatusMessage;
let currentSequence;
let currentTime;
let timeInterval;
let timerRunning = false;
let hasStarted = false;

// Array met status-berichten
const statusMessageWork = [
  "Focus on the task!",
  "Time to work!",
  "Hard work pays off",
  "Go go go!",
];
const statusMessageBreak = [
  "Time to relax",
  "Have a break",
  "Time for a short walk",
];

/* ================================ */
/*             FUNCIONS             */
/* ================================ */

// Ik vind het er mooier uit zien als getallen een voorloopnul hebben
function addLeadingZero(number) {
  number = number.toString();
  while (number.length < 2) number = "0" + number;
  return number;
}

function updateTimer() {
  if (currentTime >= 0) {
    timerDiv.textContent = formatTimer();
    currentTime--;
  } else {
    currentSequence--;

    if (currentSequence > 0) {
      updateVisuals();
      if (currentSequence % 2 == 0) {
        setNewTime(workTimeInSeconds);
      } else {
        startBreak();
      }
    } else {
      resetTimer();
    }
  }
}

function formatTimer() {
  return (
    addLeadingZero(Math.floor(currentTime / 60)) +
    " : " +
    addLeadingZero(currentTime % 60)
  );
}

function toggleTimer() {
  if (hasStarted) {
    if (!timerRunning) {
      startTimer();
    } else {
      stopTimer();
    }
    changeButton();
  } else {
    resetTimer();
  }
  changeButton();
}

function stopTimer() {
  timerRunning = false;
  clearInterval(timeInterval);
}

function startTimer() {
  timerRunning = true;
  timeInterval = window.setInterval(updateTimer, 1000);
}

function resetTimer() {
  clearInterval(timeInterval);
  hasStarted = true;
  resetMarkerStyles();
  currentSequence = defaultNumberOfSequences;
  currentWorkTime = workTimeInSeconds;
  currentTime = workTimeInSeconds;
  updateVisuals();
  startTimer();
}

function resetMarkerStyles() {
  markers.forEach((element) => {
    element.classList.remove("busy");
    element.classList.remove("done");
  });
}

function changeButton() {
  if (timerRunning) {
    // timerRunning = true;
    startButton.textContent = "Pause Timer";
    return;
  }
  //   timerRunning = false;
  startButton.textContent = "Start Timer";
}

function setNewTime(newTime) {
  currentTime = newTime;
}

function startBreak() {
  if (currentSequence == 1) {
    setNewTime(longBreakTimeInSeconds);
    return;
  }
  setNewTime(shortBreakTimeInSeconds);
}

function updateVisuals() {
  markers[defaultNumberOfSequences - currentSequence].classList.add("busy");
  if (defaultNumberOfSequences - currentSequence >= 1) {
    markers[defaultNumberOfSequences - currentSequence - 1].classList.add(
      "done"
    );
  }

  statusField.textContent = getNewStatusMessage();
  document.body.style.backgroundColor = getNewBackgroundColor();
}
function getNewStatusMessage() {
  if (currentSequence % 2 == 0) {
    newStatusMessage =
      statusMessageWork[Math.floor(Math.random() * statusMessageWork.length)];
    return newStatusMessage;
  }

  newStatusMessage =
    statusMessageBreak[Math.floor(Math.random() * statusMessageBreak.length)];
  return newStatusMessage;
}

function getNewBackgroundColor() {
  if (currentSequence % 2 == 0) {
    return workColor;
  }
  return breakColor;
}
