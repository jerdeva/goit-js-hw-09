import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('button[data-start]');
startTimerBtn.disabled = true;

const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(new Date());

    if (selectedDates[0] < new Date()) {
      startTimerBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startTimerBtn.disabled = false;
      startTimerBtn.addEventListener('click', () => {
        chancheTimerValue(selectedDates[0]);
      });
    }
  },
});

function chancheTimerValue() {
  let timer = setInterval(() => {
    let countdown = new Date(input.value) - new Date();
    startTimerBtn.disabled = true;
    input.disabled = true;

    if (countdown >= 0) {
      let timerData = convertMs(countdown);
      timerValue.days.textContent = timerData.days;
      timerValue.hours.textContent = timerData.hours;
      timerValue.minutes.textContent = timerData.hours;
      timerValue.seconds.textContent = timerData.seconds;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, 0);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, 0);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, 0);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, 0);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
