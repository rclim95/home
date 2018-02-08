import "./sass/main.scss";
import qrCode from "./assets/qr-code.svg";

const MIN_TIME = 500;
const MAX_TIME = 2000;
let progress = 0;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function incrementProgress() {
    if (progress === 100) {
        window.location.href = "https://www.youtube.com/watch?v=bn3jHugG78U&t=405";
        return;
    }

    document.querySelector(".progress .value").innerText = progress;
    progress++;
    setTimeout(incrementProgress, getRandomNumber(MIN_TIME, MAX_TIME));
}

let qrCodeImage = document.querySelector("#qr-code");
qrCodeImage.src = qrCode;
setTimeout(incrementProgress, getRandomNumber(MIN_TIME, MAX_TIME));