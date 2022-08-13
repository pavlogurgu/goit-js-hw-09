function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");

btnStop.setAttribute("disabled", "disabled")
let timerId = null;

btnStart.addEventListener("click", () => {
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    btnStart.setAttribute("disabled", "disabled")
    btnStop.removeAttribute("disabled", "disabled")
    document.body.style.backgroundColor = color;
    colorText.textContent = color;
  }, 1000);
});

btnStop.addEventListener("click", () => {
  clearInterval(timerId);
  btnStart.removeAttribute("disabled", "disabled")
  btnStop.setAttribute("disabled", "disabled")
});