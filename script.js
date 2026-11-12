const openingScreen = document.getElementById("openingScreen");
const mainInvitation = document.getElementById("mainInvitation");

const sealButton = document.getElementById("sealButton");
const skipButton = document.getElementById("skipButton");

const weddingMusic = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

let invitationHasOpened = false;
let musicWasPlayingBeforeTabChange = false;

/* =========================================================
   OPEN INVITATION
   ========================================================= */

function openInvitation(shouldPlayMusic = true) {
    if (invitationHasOpened) {
        return;
    }

    invitationHasOpened = true;

    /*
      Starts the ribbon removal and door-opening animation.
    */
    openingScreen.classList.add("is-open");

    /*
      Reveals the invitation underneath the doors.
    */
    mainInvitation.classList.add("is-visible");
    mainInvitation.setAttribute("aria-hidden", "false");

    document.body.classList.remove("page-locked");

    musicButton.classList.add("is-visible");

    if (shouldPlayMusic) {
        playWeddingMusic();
    }

    /*
      Shows the names while the doors are opening.
    */
    window.setTimeout(() => {
        const heroContent = document.querySelector(
            ".hero-section .reveal"
        );

        if (heroContent) {
            heroContent.classList.add("is-visible");
        }
    }, 700);
}

/* =========================================================
   MUSIC
   ========================================================= */

function playWeddingMusic() {
    weddingMusic.volume = 0.55;

    const playPromise = weddingMusic.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                musicButton.classList.add("is-playing");

                musicButton.setAttribute(
                    "aria-label",
                    "Pause wedding music"
                );
            })
            .catch(() => {
                /*
                  Some browsers can still block playback.
                  The floating button remains available.
                */
                musicButton.classList.remove("is-playing");

                musicButton.setAttribute(
                    "aria-label",
                    "Play wedding music"
                );
            });
    }
}

function pauseWeddingMusic() {
    weddingMusic.pause();

    musicButton.classList.remove("is-playing");

    musicButton.setAttribute(
        "aria-label",
        "Play wedding music"
    );
}

function toggleWeddingMusic() {
    if (weddingMusic.paused) {
        playWeddingMusic();
    } else {
        pauseWeddingMusic();
    }
}

/* =========================================================
   OPENING BUTTON EVENTS
   ========================================================= */

sealButton.addEventListener("click", () => {
    openInvitation(true);
});

skipButton.addEventListener("click", () => {
    openInvitation(false);
});

musicButton.addEventListener("click", toggleWeddingMusic);

/* =========================================================
   PAUSE MUSIC WHEN GUEST LEAVES THE TAB
   ========================================================= */

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        musicWasPlayingBeforeTabChange = !weddingMusic.paused;

        if (musicWasPlayingBeforeTabChange) {
            pauseWeddingMusic();
        }
    }
});

/* =========================================================
   COUNTDOWN
   ========================================================= */

const countdownElement = document.querySelector(".countdown");

const weddingDate = new Date(
    countdownElement.dataset.date
).getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
    const currentTime = new Date().getTime();
    const remainingTime = weddingDate - currentTime;

    if (remainingTime <= 0) {
        countdownElement.innerHTML = `
            <div class="countdown-box wedding-day-message">
                <strong>Today</strong>
                <span>Our forever begins</span>
            </div>
        `;

        return;
    }

    const days = Math.floor(
        remainingTime / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (
            remainingTime %
            (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (
            remainingTime %
            (1000 * 60 * 60)
        ) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (
            remainingTime %
            (1000 * 60)
        ) /
        1000
    );

    daysElement.textContent = String(days).padStart(3, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

window.setInterval(updateCountdown, 1000);

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");

                /*
                  Stops observing the section after it appears.
                  This prevents the animation from repeating.
                */
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }

        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

sealButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openInvitation(true);
    }
});

/* =========================================================
   HANDLE IMAGE LOADING
   ========================================================= */

document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
        /*
          Adds a class when an image filename is missing.
          The card remains readable instead of collapsing.
        */
        image.parentElement.classList.add("image-not-found");
    });
});
