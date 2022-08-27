import Notiflix from 'notiflix';

const formEL = document.querySelector('.form');
formEL.addEventListener('submit', submitForm);

const options = {
  clickToClose: true,
  useIcon: false,
  cssAnimationStyle: 'from-top',
};

function submitForm(e) {
  e.preventDefault();

  let delay = Number(e.target.elements.delay.value);
  let step = Number(e.target.elements.step.value);
  let amount = Number(e.target.elements.amount.value);

  for (let i = 0; i <= amount; i++) {
    createPromise(i, delay).then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, options);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, options);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, delay });
  } else {
      reject({ position, delay });
  }
    }, delay);
  })
}