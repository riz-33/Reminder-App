function logout() {
    setTimeout(() => {
        window.location.href = "/index.html"
    }, 2000)
}

let hrs = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let date = document.getElementById('date');
let month = document.getElementById('month');
let year = document.getElementById('year');

console.log (year)

setInterval(() => {
    let currentTime = new Date();

    hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000)

let rightNow = new Date();

date.innerHTML = (rightNow.getDate() < 10 ? "0" : "") + rightNow.getDate();
month.innerHTML = (rightNow.getMonth() < 10 ? "0" : "") + rightNow.getMonth();
year.innerHTML = (rightNow.getFullYear() < 10 ? "0" : "") + rightNow.getFullYear();