// ======================================================
// WEDDING INFORMATION
// Dito mo papalitan ang final wedding details
// ======================================================

const wedding = {
  couple: {
    initials: "J&C",
    groom: "Jojie",
    bride: "Claudenne"
  },

  date: "2027-01-29T14:00:00+08:00",

  dateLabel: "January 29, 2027",

  rsvpDeadline: "January 15, 2027",

  venue: {
    name: "Grandiya’s Venue & Restaurant",
    address: "San Jose, Occidental Mindoro",
    map: "https://maps.app.goo.gl/T6kVCCbebvQtymKSA"
  },

  ceremony: {
    time: "2:00 PM",
    name: "The St. Joseph the Worker Cathedral",
    address: "San Jose, Occidental Mindoro",
    map: "https://maps.app.goo.gl/xW8ojbqtCAD7oQxW8"
  },

  reception: {
    time: "5:00 PM",
    name: "Grandiya’s Venue & Restaurant",
    address: "San Jose, Occidental Mindoro",
    map: "https://maps.app.goo.gl/T6kVCCbebvQtymKSA"
  },

  rsvpLink: "https://forms.google.com",

  entourage: [
    {
      title: "Parents of the Couple",

      people: [
        {
          name: "Bride's Parents",
          role: "Parents of the Bride"
        },
        {
          name: "Groom's Parents",
          role: "Parents of the Groom"
        }
      ]
    },

    {
      title: "Principal Sponsors",

      people: [
        {
          name: "Ninong Name 1 & Ninang Name 1",
          role: "Principal Sponsors"
        },
        {
          name: "Ninong Name 2 & Ninang Name 2",
          role: "Principal Sponsors"
        },
        {
          name: "Ninong Name 3 & Ninang Name 3",
          role: "Principal Sponsors"
        }
      ]
    },

    {
      title: "Best Man & Maid of Honor",

      people: [
        {
          name: "Best Man Name",
          role: "Best Man"
        },
        {
          name: "Maid of Honor Name",
          role: "Maid of Honor"
        }
      ]
    },

    {
      title: "Secondary Sponsors",

      people: [
        {
          name: "Candle Sponsors",
          role: "Candle"
        },
        {
          name: "Veil Sponsors",
          role: "Veil"
        },
        {
          name: "Cord Sponsors",
          role: "Cord"
        }
      ]
    },

    {
      title: "Little Entourage",

      people: [
        {
          name: "Ring Bearer Name",
          role: "Ring Bearer"
        },
        {
          name: "Coin Bearer Name",
          role: "Coin Bearer"
        },
        {
          name: "Bible Bearer Name",
          role: "Bible Bearer"
        },
        {
          name: "Flower Girls",
          role: "Flower Girls"
        }
      ]
    },

    {
      title: "Bridesmaids & Groomsmen",

      people: [
        {
          name: "Bridesmaid Names",
          role: "Bridesmaids"
        },
        {
          name: "Groomsmen Names",
          role: "Groomsmen"
        }
      ]
    }
  ]
};


// ======================================================
// WEBSITE ELEMENTS
// ======================================================

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  document.querySelectorAll(selector);

const envelope = $("#envelope");
const intro = $("#intro");
const mainContent = $("#mainContent");

const sealButton = $("#seal");
const enterSiteButton = $("#enterSite");
const skipIntroButton = $("#skipIntro");

const music = $("#bgMusic");
const musicToggle = $("#musicToggle");

let opening = false;


// ======================================================
// WEDDING DETAILS
// ======================================================

function populateDetails() {
  $$("[data-wedding-date-label]").forEach((element) => {
    element.textContent = wedding.dateLabel;
  });

  $("[data-venue-name]").textContent =
    wedding.venue.name;

  $("[data-venue-address]").textContent =
    wedding.venue.address;

  $("[data-map-link]").href =
    wedding.venue.map;


  $("[data-ceremony-time]").textContent =
    wedding.ceremony.time;

  $("[data-ceremony-name]").textContent =
    wedding.ceremony.name;

  $("[data-ceremony-address]").textContent =
    wedding.ceremony.address;

  $("[data-ceremony-map]").href =
    wedding.ceremony.map;


  $("[data-reception-time]").textContent =
    wedding.reception.time;

  $("[data-reception-name]").textContent =
    wedding.reception.name;

  $("[data-reception-address]").textContent =
    wedding.reception.address;

  $("[data-reception-map]").href =
    wedding.reception.map;


  $("[data-rsvp-deadline]").textContent =
    wedding.rsvpDeadline;

  $("#rsvpButton").href =
    wedding.rsvpLink;


  const weddingDate =
    new Date(wedding.date);


  $("[data-wedding-day]").textContent =
    weddingDate
      .toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "Asia/Manila"
      })
      .toUpperCase();


  $("[data-wedding-date-number]").textContent =
    weddingDate.toLocaleDateString("en-US", {
      day: "numeric",
      timeZone: "Asia/Manila"
    });


  $("[data-wedding-month-year]").textContent =
    weddingDate
      .toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "Asia/Manila"
      })
      .toUpperCase();


  $("#entourageList").innerHTML =
    wedding.entourage
      .map((group) => {
        return `
          <div class="entourage-group reveal">

            <h3>${group.title}</h3>

            <div class="name-columns">

              ${group.people
                .map((person) => {
                  return `
                    <div>
                      <strong>${person.name}</strong>
                      <span>${person.role}</span>
                    </div>
                  `;
                })
                .join("")}

            </div>

          </div>
        `;
      })
      .join("");
}


// ======================================================
// MUSIC
// ======================================================

function updateMusicButton(isPlaying) {
  if (isPlaying) {
    musicToggle.classList.add("playing");
    musicToggle.textContent = "♫";

    musicToggle.setAttribute(
      "aria-label",
      "Pause background music"
    );
  } else {
    musicToggle.classList.remove("playing");
    musicToggle.textContent = "♪";

    musicToggle.setAttribute(
      "aria-label",
      "Play background music"
    );
  }
}


function startMusic() {
  if (!music) {
    return;
  }

  music.volume = 0.5;

  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        updateMusicButton(true);
      })
      .catch((error) => {
        console.log(
          "Music could not start:",
          error
        );

        updateMusicButton(false);
      });
  }
}


function stopMusic() {
  if (!music) {
    return;
  }

  music.pause();

  updateMusicButton(false);
}


// ======================================================
// ENVELOPE
// ======================================================

function openEnvelope() {
  if (opening) {
    return;
  }

  opening = true;

  // Start music when seal is tapped
  startMusic();

  // Remove ribbon and seal
  envelope.classList.add("releasing");

  // Open envelope
  window.setTimeout(() => {
    envelope.classList.add("open");
  }, 650);

  // Focus Open Invitation button
  window.setTimeout(() => {
    if (enterSiteButton) {
      enterSiteButton.focus();
    }
  }, 1750);
}


function finishIntro() {
  intro.classList.add("hidden");

  mainContent.classList.add("visible");

  mainContent.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.remove(
    "intro-locked"
  );

  window.setTimeout(() => {
    if (intro && intro.parentNode) {
      intro.remove();
    }
  }, 1100);

  observeReveals();
}


// ======================================================
// BUTTON EVENTS
// ======================================================

sealButton.addEventListener(
  "click",
  openEnvelope
);


enterSiteButton.addEventListener(
  "click",
  finishIntro
);


skipIntroButton.addEventListener(
  "click",
  () => {
    startMusic();
    finishIntro();
  }
);


musicToggle.addEventListener(
  "click",
  () => {
    if (music.paused) {
      startMusic();
    } else {
      stopMusic();
    }
  }
);


// ======================================================
// AUDIO EVENTS
// ======================================================

music.addEventListener(
  "play",
  () => {
    updateMusicButton(true);
  }
);


music.addEventListener(
  "pause",
  () => {
    updateMusicButton(false);
  }
);


music.addEventListener(
  "error",
  () => {
    console.log(
      "Music file could not be loaded. Check the exact MP3 filename."
    );

    updateMusicButton(false);
  }
);


// ======================================================
// COUNTDOWN
// ======================================================

function updateCountdown() {
  const weddingTime =
    new Date(wedding.date).getTime();

  const currentTime =
    new Date().getTime();

  const difference =
    Math.max(
      0,
      weddingTime - currentTime
    );

  const days =
    Math.floor(
      difference / 86400000
    );

  const hours =
    Math.floor(
      difference / 3600000
    ) % 24;

  const minutes =
    Math.floor(
      difference / 60000
    ) % 60;

  const seconds =
    Math.floor(
      difference / 1000
    ) % 60;


  $("#days").textContent =
    String(days).padStart(3, "0");

  $("#hours").textContent =
    String(hours).padStart(2, "0");

  $("#minutes").textContent =
    String(minutes).padStart(2, "0");

  $("#seconds").textContent =
    String(seconds).padStart(2, "0");
}


// ======================================================
// SCROLL REVEAL
// ======================================================

function observeReveals() {
  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "in-view"
            );
          }
        });
      },
      {
        threshold: 0.14
      }
    );

  $$(".reveal").forEach((element) => {
    observer.observe(element);
  });
}


// ======================================================
// STOP MUSIC WHEN LEAVING
// ======================================================

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      stopMusic();
    }
  }
);


window.addEventListener(
  "pagehide",
  stopMusic
);


window.addEventListener(
  "beforeunload",
  stopMusic
);


// ======================================================
// INITIALIZE
// ======================================================

populateDetails();

updateCountdown();

window.setInterval(
  updateCountdown,
  1000
);
