const buttonStart = document.querySelector('.start');
const buttonStop = document.querySelector('.stop');
const bodyColor = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const handlerStart = () => {
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
};

function handlerStop() {
  clearInterval(timerId);
  console.log('Stop');
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}

buttonStart.addEventListener('click', handlerStart);
buttonStop.addEventListener('click', handlerStop);
