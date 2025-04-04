let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime = 0;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function updateDisplay() {
    const currentTime = isRunning ? Date.now() - startTime + elapsedTime : elapsedTime;
    display.textContent = formatTime(currentTime);
}

startButton.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
});

pauseButton.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
    }
});

resetButton.addEventListener("click", () => {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00";
    lapsList.innerHTML = "";
});

lapButton.addEventListener("click", () => {
    if (isRunning) {
        const li = document.createElement("li");
        li.textContent = display.textContent;
        lapsList.appendChild(li);
    }
});
