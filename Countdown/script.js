const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
let countsownTitle = "";
let countdownDate = "";
const today = new Date().toISOString().split("T")[0];
const showCount = document.getElementById("showCount");
let countdownValue = Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeElBtn = document.getElementById("complete-button");

dateEl.setAttribute("min", today);

countdownForm.addEventListener("submit", updateCountdown);

function updateCountdown(e){
	e.preventDefault();
	countdownTitle = e.srcElement[0].value;
	countdownDate = e.srcElement[1].value;
    countdownValue = new Date(countdownDate).getTime();
	console.log("Countdown value : " + countdownValue);
	savedCountdown = {
		title: countdownTitle,
		date: countdownDate,
	};
	updateDOM();
	console.log(savedCountdown);
	localStorage.setItem("countdown", JSON.stringify(savedCountdown));
}

function updateDOM(){
  countdownActive = setInterval(() => {
  	const now = new Date().getTime();
	const distance = countdownValue - now;
	console.log("This is distance: " + distance);
	const days = Math.floor(distance / day);
	const hours = Math.floor((distance % day) / hour);
	const minutes = Math.floor((distance % hour) / minute);
	const seconds = Math.floor((distance % minute) / second);
	console.log(days, hours, minutes, seconds);


    if(distance < 0){
    	clearInterval(countdownActive);
    	completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    	showCount.hidden = true;
        completeEl.hidden = false;
        inputContainer.hidden = true;
    
    }else{
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = days;
        timeElements[1].textContent = hours;
        timeElements[2].textContent = minutes;
        timeElements[3].textContent = seconds;
        completeEl.hidden = true;
        showCount.hidden = false;
        inputContainer.hidden = true;
    }

    
}, second);
}

countdownBtn.addEventListener("click", reset);

function reset(){
	//To switch the contents
	inputContainer.hidden = false;
	showCount.hidden = true;
	completeEl.hidden = true;
	clearInterval(countdownActive);
	countdownTitle = "";
	countdownDate = "";
	localStorage.removeItem("countdown");
}

completeElBtn.addEventListener("click", reset);


function restorePreviousCountdown(){
	//to get the countdown from local storage if it possible
	if(localStorage.getItem("countdown")){
		inputContainer.hidden = true;
		savedCountdown = JSON.parse(localStorage.getItem("countdown"));
		countdownTitle = savedCountdown.titlel
		countdownDate = savedCountdown.date;
		countdownValue = new Date(countdownDate).getTime();
		updateDOM();
	}
}

restorePreviousCountdown();
