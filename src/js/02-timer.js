import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

startBtn.addEventListener("click", onStart)

let intervalId = null;
let selectedTime = null;

function onStart(){
    Notiflix.Notify.success('Timer started');
    Notiflix.Loading.hourglass('In progress', {
        backgroundColor: 'transparent',
        cssAnimationDuration: 500
      });
      Notiflix.Loading.remove(3000)
    let timeDelta = selectedTime - Date.now()
    intervalId = setInterval(() => {
        timeDelta -= 1000;
        if (timeDelta < 0){
            clearInterval(intervalId)
            return
        }
        const convertedTime = convertMs(timeDelta)
        dataDays.textContent = addLeadingZero(convertedTime.days);
        dataHours.textContent = addLeadingZero(convertedTime.hours);
        dataMinutes.textContent = addLeadingZero(convertedTime.minutes);
        dataSeconds.textContent = addLeadingZero(convertedTime.seconds);

        if (dataDays.textContent == '00' && dataHours.textContent == '00' && 
        dataMinutes.textContent == '00' && dataSeconds.textContent == '00'){
            Notiflix.Notify.success('Ding-Dong');
        }
    }, 1000) 
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()){
        startBtn.setAttribute("disabled","disabled")
        Notiflix.Notify.failure('Please choose a date in the future');
        } else{
            startBtn.removeAttribute("disabled")
            selectedTime = selectedDates[0];
            Notiflix.Notify.info('Your timer is ready to run');
        }
    },
  };

  flatpickr("#datetime-picker", options);
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
