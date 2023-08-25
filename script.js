// Selecting elements from the DOM
const ongoingTime = document.querySelector("#ongoingTime");
const selectMenu = document.querySelectorAll("select");
const setAlarmButton = document.querySelector("button");
const content = document.querySelector(".content");
const alarmContainer = document.querySelector(".alarm-container");
const allAlarm = document.querySelector(".allAlarm");

// Initializing variables
let alarmTime;
let isAlarmSet = false;
let ringtone = new Audio("./assets/Believer.mp3");

// Populating hour options in the dropdown
for (let i = 12; i > 0; i--) {
    let paddedValue;
    if (i < 10) {
        paddedValue = "0" + i;
    } else {
        paddedValue = i;
    }
    let option = `<option value="${paddedValue}">${paddedValue} </option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populating minute options in the dropdown
for (let i = 59; i >= 0; i--) {
    let paddedValue;
    if (i < 10) {
        paddedValue = "0" + i;
    } else {
        paddedValue = i;
    }
    let option = `<option value="${paddedValue}">${paddedValue} </option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populating AM/PM options in the dropdown
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm} </option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Update time every second
setInterval(() => {
    // Getting current hour, minutes, and seconds
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    // If hour value is 0, set this value to 12
    if (h === 0) {
        h = 12;
    } else {
        h = h;
    }

    // Adding leading zeros to hour, minutes, and seconds
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    ongoingTime.innerText = `${h}:${m}:${s} ${ampm}`;

    // Check if it's time for the alarm to ring
    if (alarmTime == `${h}:${m}:${ampm}`) {
        // Play the ringtone and add visual effect
        ringtone.play();
        ringtone.loop = true;
        document.getElementById("titleImage").classList.add("shake");

        // Stop the ringtone after 1 minute, remove effects, and reset alarms
        setTimeout(() => {
            ringtone.pause();
            ringtone.currentTime = 0; // Reset the audio playback to the beginning
            ringtone.loop = false;
            isAlarmSet = false; // Reset the alarm status
            for (let i = 0; i < selectMenu.length; i++) {
                selectMenu[i].disabled = false;
            }
            setAlarmButton.innerText = "Set Alarm";
            allAlarm.innerHTML = "";
            alarmTime = "";
            document.getElementById("titleImage").classList.remove("shake");
        }, 60000);
    }
}, 1000);

// Function to set or clear the alarm
function setAlarm() {
    if (isAlarmSet) {
        // Clear the alarm
        isAlarmSet = false; // Reset the alarm status
        alarmTime = ""; // Clear the alarm time
        ringtone.pause();
        ringtone.loop = false;
        allAlarm.innerHTML = ""; // Clear the alarm message
        ringtone.currentTime = 0; // Reset the audio playback to the beginning
        document.getElementById("titleImage").classList.remove("shake");
        for (let i = 0; i < selectMenu.length; i++) {
            selectMenu[i].disabled = false; // Enable dropdowns
        }
        setAlarmButton.innerText = "Set Alarm";
    } else {
        // Set the alarm
        let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;

        if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
            return alert("Please Select a Valid Time to Set Alarm!");
        }

        isAlarmSet = true; // Set the alarm status
        alarmTime = time; // Set the alarm time
        allAlarm.innerHTML = `<p> Alarm Set to : ${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} </p>`;
        for (let i = 0; i < selectMenu.length; i++) {
            selectMenu[i].disabled = true; // Disable dropdowns
        }
        setAlarmButton.innerText = "Clear Alarm";
    }
}

// Event listener for the Set Alarm button
setAlarmButton.addEventListener('click', setAlarm);
