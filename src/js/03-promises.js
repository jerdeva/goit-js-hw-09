import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const button = document.querySelector('button');

let delayInput = document.querySelector('[name = "delay"]');
let stepInput = document.querySelector('[name = "step"]');
let amountInput = document.querySelector('[name = "amount"]');

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();

  let delay = Number(delayInput.value);
  let step = Number(stepInput.value);
  let amount = Number(amountInput.value);

  for (let index = 0; index < amount; index++) {
    let position = index + 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
