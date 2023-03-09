
const throttle = require('lodash.throttle');

const feedBackObj = {};

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('.feedback-form input');
const messageEl = document.querySelector('.feedback-form textarea');

const FEEDBACK_FORM_KEY = "feedback-form-state";

formEl.addEventListener('input', throttle(handleFormInput, 500));
formEl.addEventListener('submit', handleFormSubmit);

updateForm();

function handleFormSubmit(evt) {
    evt.preventDefault();

    console.log("Email: ", emailEl.value);
    console.log("Message: ", messageEl.value);

    evt.currentTarget.reset();
    localStorage.removeItem(FEEDBACK_FORM_KEY);
}

function handleFormInput(evt) {
    createFeedbackObj(evt);
    saveFeedbackOdj(feedBackObj);
}

function createFeedbackObj(evt) {
    feedBackObj[evt.target.name] = evt.target.value;
};

function saveFeedbackOdj(obj) {
    localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(obj));
}

function updateForm() {
    if (localStorage.getItem(FEEDBACK_FORM_KEY)) {
        const savedFeedbackObj = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY));
        emailEl.value = savedFeedbackObj.email;
        messageEl.value = savedFeedbackObj.message;
    }
}

