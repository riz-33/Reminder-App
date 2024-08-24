let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'
];
let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();

function fetchPrayerTimes(month, year) {
    fetch(`https://api.aladhan.com/v1/calendar?latitude=24.8607&longitude=67.0011&method=1&school=1&month=${month}&year=${year}`)
        .then(response => response.json())
        .then(data => renderTable(data.data))
        .catch(error => console.error('Error fetching prayer times:', error));
}

function renderTable(prayerData) {
    month.innerHTML = monthName[currentMonth - 1] + " " + currentYear;
    const tbody = document.getElementById('namaz-tbody');
    tbody.innerHTML = '';

    prayerData.forEach(day => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${day.date.readable}</td>
            <td>${convertTo12Hour(day.timings.Fajr)}</td>
            <td>${convertTo12Hour(day.timings.Dhuhr)}</td>
            <td>${convertTo12Hour(day.timings.Asr)}</td>
            <td>${convertTo12Hour(day.timings.Maghrib)}</td>
            <td>${convertTo12Hour(day.timings.Isha)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function convertTo12Hour(time) {
    let cleanTime = time.replace(/ *\([^)]*\) */g, ""); 
    let [hours, minutes] = cleanTime.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    if (hours < 10) {
        hours = "0" + hours;
    }
    return `${hours} : ${minutes} ${ampm}`;
}

function previousMonth() {
    if (currentMonth === 1) {
        currentMonth = 12;
        currentYear -= 1;
    } else {
        currentMonth -= 1;
    }
    fetchPrayerTimes(currentMonth, currentYear);
}

function nextMonth() {
    if (currentMonth === 12) {
        currentMonth = 1;
        currentYear += 1;
    } else {
        currentMonth += 1;
    }
    fetchPrayerTimes(currentMonth, currentYear);
}

fetchPrayerTimes(currentMonth, currentYear);