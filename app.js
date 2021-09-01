let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();
let currentSecond = currentDate.getSeconds();

const futureDate = new Date(currentYear, currentMonth, currentDay + 8, currentHour + 23,
  currentMinute + 0, currentSecond + 6);

const secondNexts = document.querySelectorAll(".secondNext");
const secondPrevs = document.querySelectorAll(".secondPrev");
const cardFlipSecond = document.querySelector(".card-flip-second");

const minuteNexts = document.querySelectorAll(".minuteNext");
const minutePrevs = document.querySelectorAll(".minutePrev");
const cardFlipminute = document.querySelector(".card-flip-minute");

const hourNexts = document.querySelectorAll(".hourNext");
const hourPrevs = document.querySelectorAll(".hourPrev");
const cardFliphour = document.querySelector(".card-flip-hour");

const dayNexts = document.querySelectorAll(".dayNext");
const dayPrevs = document.querySelectorAll(".dayPrev");
const cardFlipday = document.querySelector(".card-flip-day");

const flipSound = new Audio("./sound/page-flip-02.mp3");
flipSound.playbackRate = 1.3;
const soundCheck = document.querySelector("#sound");
const animationCheck = document.querySelector("#animation");

function format(item) {
  item < 10 ? (item = `0${item}`) : item;
  return item;
}

function renderCard(prevs, nexts, card, info) {

  animationCheck.checked == true? card.classList.add("card-flip-active"): card.classList.remove("card-flip-active");
  soundCheck.checked == true? flipSound.play(): flipSound.pause();

  nexts.forEach(element => {
    element.textContent = format(info);
  });
  setTimeout(function () {
    prevs.forEach(element => {
      element.textContent = format(info);
    });
  }, 470)
  card.addEventListener("animationend", function () {
    card.classList.remove("card-flip-active");
  })
}

function getRemainingTime() {
  let secondInitial = parseInt(document.querySelector(".secondNext").textContent);
  let minuteInitial = parseInt(document.querySelector(".minuteNext").textContent);
  let hourInitial = parseInt(document.querySelector(".hourNext").textContent);
  let dayInitial = parseInt(document.querySelector(".dayNext").textContent);

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

  if (secondInitial !== secLeft) {
    renderCard(secondPrevs, secondNexts, cardFlipSecond, secLeft);
  }
  if (minuteInitial !== minLeft) {
    renderCard(minutePrevs, minuteNexts, cardFlipminute, minLeft);
  }
  if (hourInitial !== hourLeft) {
    renderCard(hourPrevs, hourNexts, cardFliphour, hourLeft);
  }
  if (dayInitial !== dayLeft) {
    renderCard(dayPrevs, dayNexts, cardFlipday, dayLeft);
  }
}

let countdown = setInterval(getRemainingTime, 1000);


