const ongoingTime = document.querySelector("#ongoingTime");
const selectMenu = document.querySelectorAll("select");
const setAlarmButton = document.querySelector("button");
const content = document.querySelector(".content");
const alarmContainer = document.querySelector(".alarm-container");

let alarmTime;
let isAlarmSet = false;
let ringtone = new Audio("./assets/Believer.mp3");

for(let i = 12; i > 0 ; i--){
    // i = i < 10 ? "0" + i : i;
    let paddedValue;
    if (i < 10) {
        paddedValue = "0" + i;
    } else {
        paddedValue = i;
    }
    let option =  `<option value="${paddedValue}">${paddedValue} </option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}


for(let i = 59; i >= 0 ; i--){
    let paddedValue;
    if (i < 10) {
        paddedValue = "0" + i;
    } else {
        paddedValue = i;
    }
    let option =  `<option value="${paddedValue}">${paddedValue} </option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 2; i > 0 ; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option =  `<option value="${ampm}">${ampm} </option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(()=>{

    //getting hour, mins, secs
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if(h>=12){
        h = h -12;
        ampm = "PM";
    }

    //if hour value is 0 , set this value to 12
    if (h === 0) {
        h = 12;
    } else {
        h = h;
    }

// adding 0 before hr, min sec if this value is less than 10
// for hours
    if(h < 10){
        h = "0" + h;
    }else{
        h = h;
    }
// for minutes
    if(m < 10){
        m = "0" + m;
    }else{
        m = m;
    }
//for seconds
    if(s < 10){
        s = "0" + s;
    }else{
        s = s;
    }
    ongoingTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime == `${h}:${m}:${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
        document.getElementById("titleImage").classList.add("shake");

        setTimeout(() => {
            ringtone.pause();
            for(let i =0; i<selectMenu.length; i++){
                selectMenu[i].classList.remove("disable");
            }
            setAlarmButton.innerText = "Set Alarm";
            ringtone.currentTime = 0;
            document.getElementById("titleImage").classList.remove("shake");
        }, 6000);
    }

},1000);



function setAlarm(){
    console.log("setAlarm function called"); 
    console.log("isAlarmSet:", isAlarmSet);
    if(isAlarmSet){
        console.log("Clearing alarm"); 
        alarmTime = "";
        ringtone.pause();
    
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please Select a Valid Time to Set Alarm!");
    }

    isAlarmSet = true;
    console.log("isAlarmSetAfterTrue:" + isAlarmSet);
    alarmTime = time;
    console.log(alarmTime);
    for(let i =0; i<selectMenu.length; i++){
        selectMenu[i].classList.add("disable");
    }
    
    setAlarmButton.innerText = "Clear Alarm";
    
    
}

setAlarmButton.addEventListener('click', setAlarm);







