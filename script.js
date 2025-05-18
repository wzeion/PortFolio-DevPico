function hamburg() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0)"; // Slide in the dropdown
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-100%)"; // Slide out the dropdown
}


// Typewriter Effect
const texts = ["DEVELOPER", "STUDENT", "YOUTUBER"];
let speed = 100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let charIndex = 0;

function toggleExpand() {
    const area = document.getElementById("expandable");
    area.classList.toggle("expanded");
}

function typeWriter() {
    if (charIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.onload = typeWriter;

