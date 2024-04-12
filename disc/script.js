const body = document.querySelector('body');
const currentTimeH2 = document.querySelector('#current-time-heading');
const setHours = document.querySelector('#hours');
const setMinutes = document.querySelector('#minutes');
const setAmPm = document.querySelector('#am-pm');
const btn = document.querySelector('#set-time-btn');
const responseDiv = document.querySelector('#response-div');

// --------------------- code to update the current time -------------------

function getCurrentTime() {
    let currentTime = new Date();

    // Get the current hours, minutes, and seconds
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    // Determine AM or PM
    let meridiem = "AM";
    if (hours > 12) {
        hours -= 12;
        meridiem = "PM";
    }

    // Adjust hour 0 to 12
    if (hours === 0) {
        hours = 12;
    }

    // Display the current time in AM/PM format
    currentTimeH2.innerHTML = `${hours}:${minutes}:${seconds} ${meridiem}`;
}

// Call the getCurrentTime function to start updating the time immediately
getCurrentTime();

// Set up a timer to call getCurrentTime every second
setInterval(getCurrentTime, 1000);

// --------------------------------- current time setup ends -----------------------


// function to set alarm
function setAlarm() {
    let hours = setHours.value; // Convert input value to a number
    let minutes = setMinutes.value;
    let amPM = setAmPm.value;

    if (hours === '' || minutes === '' || amPM === '') {
        // If any of the inputs are not valid, return without setting the alarm
        return;
    }
    else {
        console.log(hours, minutes, amPM);

        // Convert hours to 24-hour format if PM is selected
        if (amPM === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amPM === 'AM' && hours === 12) {
            // Handle special case: 12 AM should be 0 hours in 24-hour format
            hours = 0;
        }

        // Create a new Date object with today's date and the specified time
        const alarmTime = new Date();
        alarmTime.setHours(hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0); // Optionally, you can set seconds to 0 if you don't want to include seconds

        // Calculate the time difference between the alarm time and the current time
        const timeDiff = alarmTime.getTime() - Date.now();

        // show response for time set successfully
        if (responseDiv.classList.contains('hidden')) {
            responseDiv.classList.remove('hidden');
            setTimeout(() => {
                responseDiv.classList.add('hidden');
            }, 3000);
        }


        // Set a timeout to trigger the alarm
        setTimeout(() => {
            const song = new Audio('alarm-tone.mp3');
            song.play();

        }, timeDiff);
    }
}



// set alarm on the button click
btn.addEventListener('click', () => {
    setAlarm();
})



