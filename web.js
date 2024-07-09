function logout() {
    setTimeout(() => {
        window.location.href = "/index.html"
    }, 2000)
}

const time = document.querySelector('#time');
const date = document.querySelector('#date');
const day = document.querySelector('#day');

setInterval(() => {
    let currentTime = new Date();

    let hours = currentTime.getHours();
    let mins = currentTime.getMinutes();
    let secs = currentTime.getSeconds();
    let period = "AM"

    if (hours > 12) {
        period = "PM"
        hours = hours - 12
    }
    if (hours < 10) {
        hours = "0" + hours
    }
    if (mins < 10) {
        mins = "0" + mins
    }
    if (secs < 10) {
        secs = "0" + secs
    }

    time.textContent = hours + " : " + mins + " : " + secs + " " + period;
});

let rightNow = new Date();
let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let today = rightNow.getDate();
let month = rightNow.getMonth();
let year = rightNow.getFullYear();
let days = rightNow.getDay();

if (today < 10) {
    today = "0" + today
}

date.textContent = today + " " + monthName[month] + " " + year;
day.textContent = dayName[days];