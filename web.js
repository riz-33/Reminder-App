function logout() {
    setTimeout(() => {
        window.location.href = "/index.html"
    }, 2000)
}

// let hrs = document.getElementById('hour');
// let min = document.getElementById('min');
// let sec = document.getElementById('sec');
// let date = document.getElementById('date');
// let month = document.getElementById('month');
// let year = document.getElementById('year');
// let day = document.getElementById('day');
// let period = document.getElementById('period');

// console.log(year)

// setInterval(() => {
//     let currentTime = new Date();

//     hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
//     min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
//     sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
// }, 1000)

// let rightNow = new Date();
// let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// period.innerHTML = (rightNow.getHours() >= 12 ? "PM" : "AM");
// date.innerHTML = (rightNow.getDate() < 10 ? "0" : "") + rightNow.getDate();
// month.innerHTML = monthName[rightNow.getMonth()];
// year.innerHTML = rightNow.getFullYear();
// day.innerHTML = dayName[rightNow.getDay()];


const time = document.querySelector('#time');
// const date = document.querySelector('#date');
// const day = document.querySelector('#day');

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

// let rightNow = new Date();

// let today = rightNow.getDate();
// let month = rightNow.getMonth();
// let year = rightNow.getFullYear();

// date.textContent = today + month + year;

// let day = currentTime.getDay();