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
            document.getElementById('selectedDate').textContent = selectedDate.toDateString();
        })
        .catch(error => console.error("Error fetching prayer times:", error));
}

function displayPrayerTimes(timings) {
    function convertTo12Hour(time) {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        if (hours < 10) {
            hours = "0" + hours;
        }
        return `${hours} : ${minutes} ${ampm}`;
    }

    function getTimeComparable(time) {
        let [hours, minutes] = time.split(':');
        return parseInt(hours) * 60 + parseInt(minutes);
    }

    const currentTime = new Date();
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const prayerTimes = {
        'fajr': timings.Fajr,
        'sunrise': timings.Sunrise,
        'dhuhr': timings.Dhuhr,
        'asr': timings.Asr,
        'maghrib': timings.Maghrib,
        'isha': timings.Isha
    };

    let prayers = [];
    for (const [key, time] of Object.entries(prayerTimes)) {
        prayers.push({ id: key, time: getTimeComparable(time) });
    }

    for (const [key, time] of Object.entries(prayerTimes)) {
        const element = document.getElementById(key);
        element.textContent = convertTo12Hour(time);
        element.parentElement.classList.remove('current-prayer'); // Reset the highlight class
    }

    for (let i = 0; i < prayers.length; i++) {
        const currentPrayer = prayers[i];
        const nextPrayer = prayers[i + 1] || prayers[0];

        if (currentMinutes >= currentPrayer.time && currentMinutes < nextPrayer.time) {
            document.getElementById(currentPrayer.id).parentElement.classList.add('current-prayer');
            return;
        }
    }
    document.getElementById('isha').parentElement.classList.add('current-prayer');
}


function onDateChange() {
    const dateInput = document.getElementById('dateInput').value;
    selectedDate = new Date(dateInput);
    getPrayerTimes();
    updateIslamicDate();
}

function navigateDate(days) {
    selectedDate.setDate(selectedDate.getDate() + days);
    document.getElementById('dateInput').value = selectedDate.toISOString().split('T')[0];
    getPrayerTimes();
    updateIslamicDate();
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
    updateIslamicDate()
    getPrayerTimes();
}