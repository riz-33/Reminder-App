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

let selectedDate = new Date();

function getPrayerTimes() {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    let apiUrl = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=24.8607&longitude=67.0011&method=1&school=1`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayPrayerTimes(data.data.timings);
            // displayDate(data.data.date.gregorian);
            // displayIslamicDate(data.data.date.hijri);
            document.getElementById('selectedDate').textContent = selectedDate.toDateString();
        })
        .catch(error => console.error("Error fetching prayer times:", error));
}

// function displayDate(gregorianDate) {
//     const day = gregorianDate.day;
//     const month = gregorianDate.month.en;
//     const year = gregorianDate.year;
//     const weekday = gregorianDate.weekday.en;
//     const formattedDate = `${day} ${month} ${year}`;
//     const formattedDay = weekday;

//     document.getElementById('date').textContent = formattedDate;
//     document.getElementById('day').textContent = formattedDay;
// }

// function displayIslamicDate(hijriDate) {
//     const day = hijriDate.day;
//     const month = hijriDate.month.en;
//     const year = hijriDate.year;
//     const formattedDate = `${day} ${month} ${year}`;

//     document.getElementById('hijriDate').textContent = formattedDate;
// }

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

function onDateChange() {
    const dateInput = document.getElementById('dateInput').value;
    selectedDate = new Date(dateInput);
    getPrayerTimes();
}

function navigateDate(days) {
    selectedDate.setDate(selectedDate.getDate() + days);
    document.getElementById('dateInput').value = selectedDate.toISOString().split('T')[0];
    getPrayerTimes();
    updateIslamicDate();
}

// function updateCurrentDate() {
//     const currentDate = new Date().toLocaleDateString('en-GB', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric',
//     });
//     document.getElementById('date').textContent = currentDate;
// }

function updateCurrentDay() {
    const currentDay = new Date().toLocaleDateString('en-GB', {
        weekday: 'long'
    });
    document.getElementById('day').textContent = currentDay;
}

function updateIslamicDate() {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    fetch(`https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.hijri) {
                const hijriDate = data.data.hijri;
                const islamicDateStr = `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year}`;
                document.getElementById('hijriDate').textContent = islamicDateStr;
            } else {
                document.getElementById('hijriDate').textContent = 'Error fetching Islamic date';
            }
        })
        .catch(error => {
            console.error("Error fetching Islamic date:", error);
            document.getElementById('hijriDate').textContent = 'Error fetching Islamic date';
        });
}

window.onload = function () {
    // updateCurrentDate();
    updateCurrentDay()
    updateIslamicDate()
    getPrayerTimes();
}