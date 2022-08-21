var throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(saveData, 500));
formEl.addEventListener('submit', submitForm);

const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');

const LOCALSTORAGE_KEY = "feedback-form-state";

let formData = {};
updateSavedData();

function saveData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
  updateSavedData();
}

function updateSavedData(e) {
  const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  // console.log(data);
  for (const elem in data) {
    if (data.hasOwnProperty(elem)) {
      inputEl.value = data.email  || '';
      textareaEl.value = data.message  || '';
    }
  }
}

function submitForm(e) {
  e.preventDefault();

  formData = {
    email: inputEl.value,
    message: textareaEl.value,
  };
  console.log(formData);
  localStorage.clear();
  formEl.reset();
}