const opening = document.getElementById('opening');
const invitation = document.getElementById('invitation');
const sealButton = document.getElementById('sealButton');
const skipButton = document.getElementById('skipButton');
const music = document.getElementById('weddingMusic');
const musicButton = document.getElementById('musicButton');
let invitationOpened = false;

function openInvitation(playMusic = true) {
  if (invitationOpened) return;
  invitationOpened = true;
  opening.classList.add('opened');
  invitation.classList.add('visible');
  invitation.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('locked');
  musicButton.classList.add('show');

  if (playMusic) {
    music.volume = 0.55;
    music.play().then(() => {
      musicButton.classList.add('playing');
      musicButton.setAttribute('aria-label', 'Pause music');
    }).catch(() => {
      musicButton.classList.remove('playing');
      musicButton.setAttribute('aria-label', 'Play music');
    });
  }

  setTimeout(() => document.querySelector('.hero .reveal')?.classList.add('in-view'), 700);
}

sealButton.addEventListener('click', () => openInvitation(true));
skipButton.addEventListener('click', () => openInvitation(false));

musicButton.addEventListener('click', () => {
  if (music.paused) {
    music.play().then(() => {
      musicButton.classList.add('playing');
      musicButton.setAttribute('aria-label', 'Pause music');
    });
  } else {
    music.pause();
    musicButton.classList.remove('playing');
    musicButton.setAttribute('aria-label', 'Play music');
  }
});

// Pause music when the page/tab is left. Browsers also stop page audio when the page is closed.
document.addEventListener('visibilitychange', () => {
  if (document.hidden && !music.paused) {
    music.pause();
    musicButton.classList.remove('playing');
  }
});

const weddingDate = new Date(document.querySelector('.countdown').dataset.date).getTime();
function updateCountdown() {
  const distance = weddingDate - Date.now();
  if (distance <= 0) {
    document.querySelector('.countdown').innerHTML = '<div style="grid-column:1/-1"><strong>Today</strong><span>Our forever begins</span></div>';
    return;
  }
  document.getElementById('days').textContent = String(Math.floor(distance / 86400000)).padStart(3, '0');
  document.getElementById('hours').textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
  document.getElementById('seconds').textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
