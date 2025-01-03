import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    }
  },
};

flatpickr(calendar, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  calendar.disabled = true;

  let timeDifference = userSelectedDate - Date.now();

  daysSpan.textContent = addLeadingZero(convertMs(timeDifference).days);
  hoursSpan.textContent = addLeadingZero(convertMs(timeDifference).hours);
  minutesSpan.textContent = addLeadingZero(convertMs(timeDifference).minutes);
  secondsSpan.textContent = addLeadingZero(convertMs(timeDifference).seconds);

  const intervalId = setInterval(() => {
    timeDifference -= 1000;
    daysSpan.textContent = addLeadingZero(convertMs(timeDifference).days);
    hoursSpan.textContent = addLeadingZero(convertMs(timeDifference).hours);
    minutesSpan.textContent = addLeadingZero(convertMs(timeDifference).minutes);
    secondsSpan.textContent = addLeadingZero(convertMs(timeDifference).seconds);

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      daysSpan.textContent = '00';
      hoursSpan.textContent = '00';
      minutesSpan.textContent = '00';
      secondsSpan.textContent = '00';

      iziToast.success({
        title: 'Completed',
        message: 'The countdown has ended!',
      });

      clearInterval(intervalId);
      startBtn.disabled = false;
      calendar.disabled = false;
      return;
    }
  }, 1);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
