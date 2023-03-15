
const throttle = require('lodash.throttle');

let feedBackObj = {};

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('.feedback-form input');
const messageEl = document.querySelector('.feedback-form textarea');

const FEEDBACK_FORM_KEY = "feedback-form-state";

formEl.addEventListener('input', throttle(handleFormInput, 500));
formEl.addEventListener('submit', handleFormSubmit);

updateForm();

function handleFormSubmit(evt) {
    evt.preventDefault();

    if (emailEl.value === "" || messageEl.value === "") {
        return alert("Please fill in all the fields!");
    }

    console.log(feedBackObj);

    evt.currentTarget.reset();
    feedBackObj = {};
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
    const savedFeedbackObj = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY));

    if (savedFeedbackObj) {
        emailEl.value = savedFeedbackObj.email || "";
        feedBackObj.email = savedFeedbackObj.email || "";

        messageEl.value = savedFeedbackObj.message || "";
        feedBackObj.message = savedFeedbackObj.message || ""; 
    }    
}

