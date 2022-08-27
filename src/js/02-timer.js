import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  dateTimePicker: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),

  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
  refs.startBtn.addEventListener('click', timerStart);
  refs.startBtn.setAttribute('disabled', 'true');

let dateChoose = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateChoose = selectedDates[0].getTime();
    const dateCurrent = Date.now();
    const deltaTime = dateChoose - dateCurrent;

  if (deltaTime < 0) {
    Notiflix.Notify.info("Please choose a date in the future");
  } else {
    refs.startBtn.removeAttribute('disabled');
  }
  },
};

flatpickr(refs.dateTimePicker, options)

function updateTimer({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timerStart() {
  const timerId = setInterval(() => {
    updateTimer(convertMs(dateChoose - Date.now()));
  }, 1000);

  setTimeout(() => {
    clearInterval(timerId);
  }, dateChoose - Date.now());
};
