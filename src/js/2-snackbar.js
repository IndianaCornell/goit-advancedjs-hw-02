import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = event.target.elements.delay.value;
  const stateInput = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput === 'fulfilled') {
        resolve(delayInput);
      } else {
        reject(delayInput);
      }
    }, delayInput);
  });

  promise
    .then(delayInput => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delayInput}ms`,
      });
    })
    .catch(delayInput => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delayInput}ms`,
      });
    });
});
