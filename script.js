const messageContainer = document.getElementById("d-day-message");
const container = document.getElementById("d-day-container");
const savedTime = localStorage.getItem("savedTime");
const intervalIdArr = [];

container.style.display = "none";
messageContainer.textContent = "D-Day를 입력해 주세요.";

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

  return dateFormat;

  //console.log(inputYear, inputMonth, inputDate);
};

const counterMaker = function () {
  const targetDateInput = dateFormMaker();

  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;

  if (remaining <= 0) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();

    return;
  } else if (isNaN(remaining)) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3> 유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();

    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining),
  };

  const documentObj = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    min: document.getElementById("min"),
    sec: document.getElementById("sec"),
  };

  const timeKeys = Object.keys(remainingObj);
  const docKeys = Object.keys(documentObj);

  let i = 0;
  for (let key in documentObj) {
    documentObj[key].textContent = remainingObj[timeKeys[i]];
    i++;
  }
};

const starter = function (targetDateInput) {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker;
  }

  localStorage.setItem("savedTime", targetDateInput);
  console.log(savedTime);
  container.style.display = "flex";
  messageContainer.style.display = "none";
  counterMaker();
  const intervalId = setInterval(counterMaker, 1000);
  intervalIdArr.push(intervalId);
  console.log(intervalIdArr);
};

const setClearInterval = function () {
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = '<h3>"D-Day를 입력해 주세요.</h3>';
  messageContainer.style.display = "flex";
  localStorage.removeItem("savedTime");
  setClearInterval();
};

if (savedTime) {
  container.style.display = "flex";
  counterMaker.dateFormMaker = savedTime;
  counterMaker();
} else {
  console.log("data is Null");
}
