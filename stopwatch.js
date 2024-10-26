let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const lapTimes = document.getElementById('lapTimes');

function updateDisplay() {
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('milliseconds').textContent = String(milliseconds).padStart(2, '0');
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(() => {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            hours = Math.floor(difference / (1000 * 60 * 60));
            minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((difference % (1000 * 60)) / 1000);
            milliseconds = Math.floor((difference % 1000) / 10);
            updateDisplay();
        }, 10);
    }
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    hours = minutes = seconds = milliseconds = 0;
    difference = 0;
    lapTimes.innerHTML = '';
    updateDisplay();
}

function recordLap() {
    const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    const li = document.createElement('li');
    li.textContent = `Lap ${lapTimes.children.length + 1}: ${lapTime}`;
    lapTimes.appendChild(li);
}

function clearLaps() {
    lapTimes.innerHTML = '';
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
clearLapsBtn.addEventListener('click', clearLaps);
