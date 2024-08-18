const time = document.querySelector('#time');

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

const apiEndpoint = 'https://api.aladhan.com/v1/timingsByCity?city=Karachi&country=Pakistan&method=1&school=1';

async function getPrayerTimes() {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch prayer times');
        }
        const data = await response.json();
        console.log(data);
        displayPrayerTimes(data.data.timings);
        displayDate(data.data.date.gregorian);
        displayIslamicDate(data.data.date.hijri);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayDate(gregorianDate) {
    const day = gregorianDate.day;
    const month = gregorianDate.month.en;
    const year = gregorianDate.year;
    const weekday = gregorianDate.weekday.en;
    const formattedDate = `${day} ${month} ${year}`;
    const formattedDay = weekday;

    document.getElementById('date').textContent = formattedDate;
    document.getElementById('day').textContent = formattedDay;
}

function displayIslamicDate(hijriDate) {
    const day = hijriDate.day;
    const month = hijriDate.month.en;
    const year = hijriDate.year;
    const formattedDate = `${day} ${month} ${year}`;
    
    document.getElementById('hijriDate').textContent = formattedDate;
}

function displayPrayerTimes(timings) {
    function convertTo12Hour(time) {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        if (hours < 10) {
            hours = "0" + hours
        }
        return `${hours} : ${minutes} ${ampm}`;

    }

    document.getElementById('fajr').textContent = convertTo12Hour(timings.Fajr);
    document.getElementById('sunrise').textContent = convertTo12Hour(timings.Sunrise);
    document.getElementById('dhuhr').textContent = convertTo12Hour(timings.Dhuhr);
    document.getElementById('asr').textContent = convertTo12Hour(timings.Asr);
    document.getElementById('maghrib').textContent = convertTo12Hour(timings.Maghrib);
    document.getElementById('isha').textContent = convertTo12Hour(timings.Isha);
}

getPrayerTimes();

// const date = document.querySelector('#date');
// const day = document.querySelector('#day');

// let rightNow = new Date();
// let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
// let monthName = ["January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"]

// let today = rightNow.getDate();
// let month = rightNow.getMonth();
// let year = rightNow.getFullYear();
// let days = rightNow.getDay();

// if (today < 10) {
//     today = "0" + today
// }

// date.textContent = today + " " + monthName[month] + " " + year;
// day.textContent = dayName[days];

