function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log(body.style.backgroundColor);
  }, 1000);
    body.style.backgroundColor = getRandomHexColor();
    startBtn.setAttribute('disabled', 'true');
    stopBtn.removeAttribute('disabled');
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
   startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'true');
});