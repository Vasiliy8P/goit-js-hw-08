import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const email = document.querySelector(".feedback-form input");
const textarea = document.querySelector(".feedback-form textarea");

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

let formData = {};
    
savedForm();

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.target.reset();
    console.log("formData:", formData);
    localStorage.removeItem('feedback-form-state');
    formData = {};
}

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function savedForm() {
    const savedFormInput = localStorage.getItem('feedback-form-state');
    const parsedSavedFormInput = JSON.parse(savedFormInput);
    if (parsedSavedFormInput) {
        if (parsedSavedFormInput.email) {
            email.value = parsedSavedFormInput.email;
            formData.email = parsedSavedFormInput.email;
        }
        if (parsedSavedFormInput.message) {
            textarea.value = parsedSavedFormInput.message;
            formData.message = parsedSavedFormInput.message;
        }
    }
}
