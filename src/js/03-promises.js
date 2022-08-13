import Notiflix from 'notiflix';

const form = document.querySelector(".form")
const { elements: { delay, step, amount } } = form;
form.addEventListener("submit", onSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  });}

  function onSubmit(event){
    event.preventDefault()
    let delayTime = Number(delay.value)
    for (let i = 1; i <= amount.value; i++) {
      createPromise(i, delayTime)
        .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
        delayTime += Number(step.value);
        }
      form.reset();
    }

