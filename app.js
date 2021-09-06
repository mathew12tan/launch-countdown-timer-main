let timerContainer = document.querySelector(".timer-container");
const timeArray = ["days", "hours", "minutes", "seconds"];

function createTimer(timeArray) {
  let displayTimer = timeArray.map(function (item) {
    return `<div class="timer">
              <div class="card">
                <div class="card-top"><span class="next"></span></div>
                <div class="card-bottom"><span class="prev"></span></div>
              </div>
              <div class="card-flip">
                <div class="card-flip-front"><span class="prev"></span></div>
                <div class="card-flip-back"><span class="next"></span></div>
              </div>
              <p>${item}</p>
          </div>`
  });
  displayTimer = displayTimer.join("");
  timerContainer.innerHTML = displayTimer;
}

let timers = [];
window.addEventListener("DOMContentLoaded", function () {
  createTimer(timeArray);
  timers = document.querySelectorAll(".timer");
})

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();
let currentSecond = currentDate.getSeconds();

const futureDate = new Date(currentYear, currentMonth, currentDay + 1, currentHour + 0,
  currentMinute + 0, currentSecond + 5);

const launchBtn = document.querySelector(".launch-btn");

const flipSound = new Audio("./sound/flip.mp3");
flipSound.playbackRate = 1.3;
const soundCheck = document.querySelector("#sound");
const animationCheck = document.querySelector("#animation");

function format(item) {
  item < 10 ? (item = `0${item}`) : item;
  return item;
}

function getRemainingTime() {
  const futureTime = futureDate.getTime();
  const today = new Date().getTime();
  const remainingTime = futureTime - today;

  let oneDay = 24 * 60 * 60 * 1000;
  let oneHour = 60 * 60 * 1000;
  let oneMin = 60 * 1000;
  let oneSec = 1000;

  let dayLeft = Math.floor(remainingTime / oneDay);
  let hourLeft = Math.floor((remainingTime % oneDay) / oneHour);
  let minLeft = Math.floor((remainingTime % oneHour) / oneMin);
  let secLeft = Math.floor((remainingTime % oneMin) / oneSec);

  const values = [dayLeft, hourLeft, minLeft, secLeft];

  timers.forEach((timer, index) => {
    let initialValue = parseInt(timer.querySelector(".next").textContent);
    let card = timer.querySelector(".card-flip");
    let nexts = timer.querySelectorAll(".next");
    let prevs = timer.querySelectorAll(".prev");

    if (initialValue !== values[index]) {
      animationCheck.checked == true ? card.classList.add("card-flipping") : card.classList.remove("card-flipping");
      soundCheck.checked == true ? flipSound.play() : flipSound.pause();

      nexts.forEach(element => {
        element.textContent = format(values[index]);
      });
      setTimeout(function () {
        prevs.forEach(element => {
          element.textContent = format(values[index]);
        }); card.classList.remove("card-flipping");
      }, 500)
    }
  });

  if (remainingTime < 1000) {
    clearInterval(countdown);
    setTimeout(function () {
      document.querySelector(".heading").textContent = "Yay, we've launched!";
      launchBtn.style.display = "block";
      launchBtn.addEventListener("click", function () {
        window.location.href = "https://github.com/mathew12tan?tab=repositories";
      })
    }, 1500)
  }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();