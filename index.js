"strict";
// all used classes from html.
const rules = document.querySelector(".rules");
const rules2 = document.querySelector(".close-rull");
const redImage = document.querySelector(".red-img");
const aboutRules = document.querySelector(".about-rules");
const closeRules = document.querySelector(".close");
const newGame = document.querySelector(".new-game");
const winnerMoon = document.querySelector(".winner-moon");
const moonWinNumber = document.querySelector(".moon-win-number");
const winnerEarth = document.querySelector(".winner-earth");
const earthWinNumber = document.querySelector(".earth-win-number");
const pickedCard = document.querySelector(".picked-card");
const rollCard = document.querySelector(".roll-card");
const rollCard2 = document.querySelector(".roll-card-2");
const saveCard = document.querySelector(".save-card");
const leftContainer = document.querySelector(".left-container");
const moonCard1 = document.querySelector(".moon-card-1");
const moonCard2 = document.querySelector(".moon-card-2");
const moonCard3 = document.querySelector(".moon-card-3");
const moonCard4 = document.querySelector(".moon-card-4");
const moonCard5 = document.querySelector(".moon-card-5");
const changePlayer = document.querySelector(".change-player");
const rightContainer = document.querySelector(".right-container");
const earthCard1 = document.querySelector(".earth-card-1");
const earthCard2 = document.querySelector(".earth-card-2");
const earthCard3 = document.querySelector(".earth-card-3");
const earthCard4 = document.querySelector(".earth-card-4");
const earthCard5 = document.querySelector(".earth-card-5");
const moonStart = document.querySelector(".moon-start");
const earthStart = document.querySelector(".earth-start");
const moonCheckingScore = document.querySelector(".moon-checking-score");
const earthCheckingScore = document.querySelector(".earth-checking-score");

// rulles button
rules.addEventListener("click", rullsfunc);
function rullsfunc() {
  if (rules.classList.contains("rules")) {
    aboutRules.style.display = "block";
    rules.classList.remove("rules");
  } else if (rules.classList.contains("close-rull")) {
    aboutRules.style.display = "none";
    rules2.classList.add("rules");
  }
}

closeRules.addEventListener("click", closefunc);
function closefunc() {
  aboutRules.style.display = "none";
  rules.classList.add("rules");
}

//random array function

function randomArr(arr) {
  const randomArray = Math.floor(Math.random() * arr.length);
  const item = arr[randomArray];
  return item;
}
moonCard1.value = 11;
moonCard2.value = 4;
moonCard3.value = 3;
moonCard4.value = 2;
moonCard5.value = 10;
changePlayer.value = 0;

const moonArr = [
  moonCard1,
  moonCard2,
  moonCard3,
  moonCard4,
  moonCard5,
  changePlayer,
];

earthCard1.value = 11;
earthCard2.value = 4;
earthCard3.value = 3;
earthCard4.value = 2;
earthCard5.value = 10;
changePlayer.value = 0;

const earthArr = [
  earthCard1,
  earthCard2,
  earthCard3,
  earthCard4,
  earthCard5,
  changePlayer,
];

//every button will stop working after you win
function winnerDetail() {
  saveCard.removeEventListener("click", saveMoon);
  rollCard.removeEventListener("click", rollmoon);
  rollCard2.removeEventListener("click", rollearth);
  saveCard.removeEventListener("click", saveEarth);
  rules.removeEventListener("click", rullsfunc);
}
// new game starting after winning
function afterWinningMoon() {
  saveCard.addEventListener("click", saveMoon);
  rollCard.addEventListener("click", rollmoon);
  rollCard2.removeEventListener("click", rollearth);
  saveCard.removeEventListener("click", saveEarth);
  rules.addEventListener("click", rullsfunc);
}
function afterWinningEarth() {
  rollCard2.addEventListener("click", rollearth);
  saveCard.addEventListener("click", saveEarth);
  saveCard.removeEventListener("click", saveMoon);
  rollCard.removeEventListener("click", rollmoon);
  rules.addEventListener("click", rullsfunc);
}

// saving points function for Moon
function saveMoon() {
  leftContainer.classList.remove("moon-start");
  rollCard.removeEventListener("click", rollmoon);
  rollCard2.addEventListener("click", rollearth);
  moonCheckingScore.value = sumMoon;
  moonCheckingScore.innerHTML = moonCheckingScore.value;
}
// saving points function for Earth
function saveEarth() {
  rightContainer.classList.remove("earth-start");
  rollCard2.removeEventListener("click", rollearth);
  rollCard.addEventListener("click", rollmoon);
  earthCheckingScore.value = sumEarth;
  earthCheckingScore.innerHTML = earthCheckingScore.value;
}
// Core program this code does everything
let sumMoon = 0;
let sumEarth = 0;
moonCheckingScore.innerHTML = 0;
earthCheckingScore.innerHTML = 0;
rollCard.addEventListener("click", rollmoon);
function rollmoon() {
  leftContainer.classList.add("moon-start");
  const moonResult = randomArr(moonArr);
  pickedCard.innerHTML = moonResult.innerHTML;
  pickedCard.value = moonResult.value;
  console.log(pickedCard.innerHTML);

  if (pickedCard.value > 0) {
    sumMoon += pickedCard.value;
    moonCheckingScore.value = sumMoon;
    console.log(sumMoon);
    moonCheckingScore.innerHTML = moonCheckingScore.value;
    saveCard.addEventListener("click", saveMoon);
    saveCard.removeEventListener("click", saveEarth);
    if (sumMoon >= 50) {
      winnerMoon.style.display = "block";
      moonWinNumber.innerHTML = sumMoon;
      winnerDetail();
    }
  } else {
    moonCheckingScore.innerHTML = 0;
    moonCheckingScore.value = 0;
    sumMoon = 0;
  }
  if (changePlayer.value == pickedCard.value) {
    rollCard2.addEventListener("click", rollearth);
    rollCard.removeEventListener("click", rollmoon);
    leftContainer.classList.remove("moon-start");
  }
}
function rollearth() {
  rightContainer.classList.add("earth-start");
  const earthResult = randomArr(earthArr);
  pickedCard.innerHTML = earthResult.innerHTML;
  pickedCard.value = earthResult.value;

  if (pickedCard.value > 0) {
    sumEarth += pickedCard.value;
    earthCheckingScore.value = sumEarth;
    earthCheckingScore.innerHTML = earthCheckingScore.value;
    saveCard.addEventListener("click", saveEarth);
    saveCard.removeEventListener("click", saveMoon);
    if (sumEarth >= 50) {
      winnerEarth.style.display = "block";
      earthWinNumber.innerHTML = sumEarth;
      winnerDetail();
    }
  } else {
    earthCheckingScore.innerHTML = 0;
    earthCheckingScore.value = 0;
    sumEarth = 0;
  }
  if (pickedCard.value == changePlayer.value) {
    rollCard.addEventListener("click", rollmoon);
    rollCard2.removeEventListener("click", rollearth);
    rightContainer.classList.remove("earth-start");
  }
}
// close button reset game to play again
newGame.addEventListener("click", newGameFunc);
function newGameFunc() {
  winnerMoon.style.display = "none";
  winnerEarth.style.display = "none";
  sumMoon = 0;
  sumEarth = 0;
  earthCheckingScore.innerHTML = 0;
  earthCheckingScore.value = 0;
  moonCheckingScore.value = 0;
  moonCheckingScore.innerHTML = 0;
  leftContainer.classList.remove("moon-start");
  rightContainer.classList.remove("earth-start");
  pickedCard.innerHTML = redImage.innerHTML;
  afterWinningEarth();
  afterWinningMoon();
}
