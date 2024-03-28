//fullscreen
const fullScreen = document.getElementById("fullScreen");
const fullScreenExit = document.getElementById("fullScreen-exit");

fullScreen.addEventListener("click", () => {
  document.documentElement.requestFullscreen();
  fullScreen.style.display = "none";
  fullScreenExit.style.display = "block";
});

fullScreenExit.addEventListener("click", () => {
  document.exitFullscreen();
  fullScreen.style.display = "block";
  fullScreenExit.style.display = "none";
});

const tabs = document.querySelectorAll(".tab_btn");
const contents = document.querySelectorAll(".content");
const timeZone = document.getElementById("timeZone");
const timeZone24 = document.getElementById("timeZone24");
const ampm = document.getElementById("ampm");
let hour24 = localStorage.getItem("hour24") || 24;
timeZone24.textContent = hour24;

//tabs
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");

    contents.forEach((content) => content.classList.remove("active"));
    contents[index].classList.add("active");
  });
});

//clock
const hourElement1 = document.getElementById("hour1");
const hourElement2 = document.getElementById("hour2");
const minuteElement1 = document.getElementById("minute1");
const minuteElement2 = document.getElementById("minute2");
const secElement1 = document.getElementById("sec1");
const secElement2 = document.getElementById("sec2");

let hour = 0,
  min = 0,
  sec = 0;

const odometers = {
  hour1: new Odometer({ el: hourElement1 }),
  hour2: new Odometer({ el: hourElement2 }),

  minute1: new Odometer({ el: minuteElement1 }),
  minute2: new Odometer({ el: minuteElement2 }),

  sec1: new Odometer({ el: secElement1 }),
  sec2: new Odometer({ el: secElement2 }),

  timeZone24: new Odometer({ el: timeZone24, value: hour24 }),
};


let prevAmPm = ''; 
setInterval(() => {
  const date = new Date();
  let hour = date.getHours() % hour24;
  let min = date.getMinutes();
  let sec = date.getSeconds();

 let currentAmPm = '';

  if (hour24 == 12) {
    if (date.getHours() < 12) {
      currentAmPm = "AM";
    } else {
      currentAmPm = "PM";
    }
  }

  if (hour24 === 12) {
    hour = hour === 0 ? 12 : hour;
  }

if (currentAmPm !== prevAmPm) {
    ampm.innerHTML = currentAmPm;
    prevAmPm = currentAmPm;
  }
  const hour1 = Math.floor(hour / 10);
  const hour2 = hour % 10;

  const min1 = Math.floor(min / 10);
  const min2 = min % 10;

  const sec1 = Math.floor(sec / 10);
  const sec2 = sec % 10;

  odometers.hour1.update(hour1);
  odometers.hour2.update(hour2);

  odometers.minute1.update(min1);
  odometers.minute2.update(min2);

  odometers.sec1.update(sec1);
  odometers.sec2.update(sec2);
}, 1000);

//24hr button
timeZone.addEventListener("click", () => {
  if (hour24 === 24) {
    timeZone24.textContent = "12";
    localStorage.setItem("hour24", 12);
    hour24 = 12;
    ampm.style.display = "block";
  } else {
    hour24 = 24;
    localStorage.setItem("hour24", 24);
    timeZone24.textContent = "24";
    ampm.style.display = "none";
  }
});

//stopwatch
const stopHour = document.getElementById("stopHour");
const stopMin = document.getElementById("stopMin");
const stopSec = document.getElementById("stopSec");
const stopMilliSec = document.getElementById("stopMilliSec");
const stopBtn = document.getElementById("stopBtn");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let stopHourValue = 0,
  stopMinValue = 0,
  stopSecValue = 0,
  stopMilliSecValue = 0;

let interval;

const stopwatchOdometers = {
  stopHour: new Odometer({ el: stopHour, value: stopHourValue }),
  stopMin: new Odometer({ el: stopMin, value: stopMinValue }),
  stopSec: new Odometer({ el: stopSec, value: stopSecValue }),
};

startBtn.addEventListener("click", () => {
  stopBtn.style.display = "block";
  startBtn.style.display = "none";
  clearInterval(interval);
  interval = setInterval(() => {
    stopMilliSecValue++;

    if (stopMilliSecValue === 100) {
      stopMilliSecValue = 0;
      stopSecValue++;
    }
    if (stopSecValue === 60) {
      stopSecValue = 0;
      stopMinValue++;
    }
    if (stopMinValue === 60) {
      stopMinValue = 0;
      stopHourValue++;
    }

    stopwatchOdometers.stopHour.update(stopHourValue);

    stopwatchOdometers.stopMin.update(stopMinValue);

    stopwatchOdometers.stopSec.update(stopSecValue);

    stopMilliSec.textContent = stopMilliSecValue;
  }, 10);
});

stopBtn.addEventListener("click", () => {
  stopBtn.style.display = "none";
  startBtn.style.display = "block";
  clearInterval(interval);
  console.log("cleared");
});

restartBtn.addEventListener("click", () => {
  clearInterval(interval);
  stopMilliSecValue = 0;
  stopHourValue = 0;
  stopMinValue = 0;
  stopSecValue = 0;
  stopHour.textContent = "00";
  stopMin.textContent = "00";
  stopSec.textContent = "00";
  stopMilliSec.textContent = "00";
});
