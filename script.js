const WORK_MIN = 25;
const SHORT_BREAK_MIN = 5;
const LONG_BREAK_MIN = 20;

let reps = 0;
let timer = null;

const titleLabel = document.getElementById("title");
const timerDisplay = document.getElementById("timer");
const checkMarks = document.getElementById("checkMarks");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  timerDisplay.textContent =
    `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function startTimer() {
  // Prevent multiple countdowns if Start is clicked repeatedly.
  if (timer !== null) {
    return;
  }

  reps += 1;

  const workSec = WORK_MIN * 60;
  const shortBreakSec = SHORT_BREAK_MIN * 60;
  const longBreakSec = LONG_BREAK_MIN * 60;

  if (reps % 8 === 0) {
    titleLabel.textContent = "Break";
    titleLabel.style.color = "#e7305b";
    countDown(longBreakSec);
  } else if (reps % 2 === 0) {
    titleLabel.textContent = "Break";
    titleLabel.style.color = "#e2979c";
    countDown(shortBreakSec);
  } else {
    titleLabel.textContent = "Work";
    titleLabel.style.color = "#9bdeac";
    countDown(workSec);
  }
}

function countDown(count) {
  updateTimerDisplay(count);

  if (count > 0) {
    timer = setTimeout(() => {
      countDown(count - 1);
    }, 1000);
  } else {
    timer = null;

    // Match the Python app's automatic next-session behavior.
    updateCheckMarks();
    startTimer();
  }
}

function updateCheckMarks() {
  const workSessions = Math.floor(reps / 2);
  checkMarks.textContent = "✔".repeat(workSessions);
}

function resetTimer() {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }

  reps = 0;
  updateTimerDisplay(0);
  titleLabel.textContent = "Timer";
  titleLabel.style.color = "#9bdeac";
  checkMarks.textContent = "";
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

resetTimer();
