let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'
];
let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();

function fetchPrayerTimes(month, year) {
    fetch(`https://api.aladhan.com/v1/calendar?latitude=24.8607&longitude=67.0011&method=1&school=1&month=${month}&year=${year}`)
        .then(response => response.json())
        .then(data => renderCalendar(data.data))
        .catch(error => console.error('Error fetching prayer times:', error));
}

function renderCalendar(prayerData) {
    const month = document.getElementById ('month');
    month.innerHTML = monthName[currentMonth - 1] + " " + currentYear;
    const daysElement = document.getElementById('days');
    daysElement.innerHTML = ''; // Clear existing days

    prayerData.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `
      <div>${day.date.readable}</div>
      <div>Fajr: ${day.timings.Fajr}</div>
      <div>Sunrise: ${day.timings.Sunrise}</div>
      <div>Dhuhr: ${day.timings.Dhuhr}</div>
      <div>Asr: ${day.timings.Asr}</div>
      <div>Maghrib: ${day.timings.Maghrib}</div>
      <div>Isha: ${day.timings.Isha}</div>
    `;
        daysElement.appendChild(dayElement);
    });
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

// Initial call to populate calendar
fetchPrayerTimes(currentMonth, currentYear);
