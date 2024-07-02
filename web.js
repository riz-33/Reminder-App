let today = new Date ();

let currentHrs = today.getHours();

let currentMins = today.getMinutes();

let currentSecs = today.getSeconds();

console.log (currentHrs, currentMins, currentSecs);

function logout(){
    setTimeout(() => {
        window.location.href = "/index.html"
    }, 2000)
}