/* =========================================================
   XAMO SPECIAL LINK
   JAVASCRIPT
========================================================= */


/* =========================================================
   MUSIC PLAYER
========================================================= */

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");

const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");

const musicCard = document.querySelector(".music-card");


/* Format Time */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}


/* Play / Pause */

playButton.addEventListener("click", async () => {

    if (audio.paused) {

        try {

            await audio.play();

            musicCard.classList.add("playing");

            playButton.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        } catch (error) {

            console.log("Music could not start:", error);

        }

    } else {

        audio.pause();

        musicCard.classList.remove("playing");

        playButton.innerHTML =
            '<i class="fa-solid fa-play"></i>';
    }

});


/* Duration */

audio.addEventListener("loadedmetadata", () => {

    durationElement.textContent =
        formatTime(audio.duration);

});


/* Progress */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.style.width = `${percentage}%`;

    currentTimeElement.textContent =
        formatTime(audio.currentTime);
});


/* Click Progress */

progressContainer.addEventListener("click", (event) => {

    if (!audio.duration) return;

    const rect =
        progressContainer.getBoundingClientRect();

    const clickPosition =
        event.clientX - rect.left;

    const percentage =
        clickPosition / rect.width;

    audio.currentTime =
        percentage * audio.duration;
});


/* Music End */

audio.addEventListener("ended", () => {

    musicCard.classList.remove("playing");

    playButton.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    progress.style.width = "0%";

});


/* =========================================================
   RIPPLE EFFECT
========================================================= */

document.addEventListener("click", (event) => {

    const ripple =
        document.createElement("div");

    ripple.className = "ripple";

    ripple.style.left =
        `${event.clientX}px`;

    ripple.style.top =
        `${event.clientY}px`;

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 700);

});


/* =========================================================
   SOCIAL LINK CLICK
========================================================= */

document.querySelectorAll(".social-card")
.forEach(card => {

    card.addEventListener("click", () => {

        card.style.transform =
            "scale(.97)";

        setTimeout(() => {

            card.style.transform = "";

        }, 150);

    });

});


/* =========================================================
   PARALLAX BACKGROUND
========================================================= */

document.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - .5) * 20;

    const y =
        (event.clientY / window.innerHeight - .5) * 20;

    document.querySelector(".orb-1").style.transform =
        `translate(${x}px, ${y}px)`;

    document.querySelector(".orb-2").style.transform =
        `translate(${-x}px, ${-y}px)`;

});


/* =========================================================
   IMAGE ERROR
========================================================= */

const profileImage =
    document.querySelector(".profile-image img");

profileImage.addEventListener("error", () => {

    profileImage.style.display = "none";

    document.querySelector(".profile-image")
        .innerHTML =
        '<i class="fa-solid fa-user" style="font-size:45px;color:#d4af37;display:grid;place-items:center;height:100%;"></i>';

});


/* =========================================================
   PREVENT MUSIC FROM AUTOPLAYING
   Browser-friendly approach
========================================================= */

audio.volume = 0.65;


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});