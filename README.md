# Завдання 1. Таймер зворотного відліку

**Файли:** `1-timer.html`, `1-timer.js`

Реалізуй таймер, який відраховує час до обраної дати. Може використовуватись у блогах, магазинах, під час реєстрації або обслуговування сайту.

🎥 Подивись [демо таймера](#)

---

## 🔧 Інтерфейс

```html
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
```

---

## 📅 Вибір дати — Flatpickr

Підключи бібліотеку:

```js
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
```

Ініціалізуй:

```js
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
```

### ✅ Валідація дати

- Якщо обрано **минулу** дату — `iziToast` з повідомленням `"Please choose a date in the future"` і кнопка **Start** вимикається.
- Якщо обрано **майбутнє** значення — кнопка **Start** активується.
- При зміні дати на невалідну — кнопка має знову стати неактивною.

---

## ⏱ Старт таймера

При натисканні на кнопку:

- Запускається відлік раз на секунду.
- Рахується час до обраної дати.
- Інтерфейс оновлюється: `дні : години : хвилини : секунди`
- Таймер **зупиняється**, коли час вичерпано.
- Після старту інпут і кнопка стають **неактивними**.
- Після завершення: інпут — активний, кнопка — неактивна.

---

## 🔢 Підрахунок часу

Готова функція:

```js
function convertMs(ms) {
  const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
```

Форматуємо двозначні числа:

```js
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
```

---

## 🔔 iziToast — повідомлення

Підключення:

```js
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
```

Використовуй замість `window.alert` для зручного UI.

---
 
