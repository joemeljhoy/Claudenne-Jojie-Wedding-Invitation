// EDIT THIS SECTION ONLY. Replace the sample details with the final wedding information.
const wedding = {
  couple: { initials: "C&J", bride: "Claudine", groom: "Jojie" },
  date: "2027-12-27T14:00:00+08:00",
  dateLabel: "January 29, 2027",
  rsvpDeadline: "January 29, 2027",
  venue: { name: "The Garden Pavilion", address: "Puerto Galera, Oriental Mindoro", map: "https://maps.google.com" },
  ceremony: { time: "2:00 PM", name: "San Isidro Parish Church", address: "Puerto Galera, Oriental Mindoro", map: "https://maps.google.com" },
  reception: { time: "5:00 PM", name: "The Garden Pavilion", address: "Puerto Galera, Oriental Mindoro", map: "https://maps.google.com" },
  rsvpLink: "https://forms.google.com",
  entourage: [
    { title: "Parents of the Couple", people: [{name:"Mr. & Mrs. Bride's Parents", role:"Parents of the Bride"},{name:"Mr. & Mrs. Groom's Parents", role:"Parents of the Groom"}] },
    { title: "Principal Sponsors", people: [{name:"Ninong Name 1 & Ninang Name 1", role:"Principal Sponsors"},{name:"Ninong Name 2 & Ninang Name 2", role:"Principal Sponsors"},{name:"Ninong Name 3 & Ninang Name 3", role:"Principal Sponsors"}] },
    { title: "Best Man & Maid of Honor", people: [{name:"Best Man Name", role:"Best Man"},{name:"Maid of Honor Name", role:"Maid of Honor"}] },
    { title: "Secondary Sponsors", people: [{name:"Candle Sponsors", role:"Candle"},{name:"Veil Sponsors", role:"Veil"},{name:"Cord Sponsors", role:"Cord"}] },
    { title: "Little Entourage", people: [{name:"Ring Bearer Name", role:"Ring Bearer"},{name:"Coin Bearer Name", role:"Coin Bearer"},{name:"Bible Bearer Name", role:"Bible Bearer"},{name:"Flower Girls", role:"Flower Girls"}] },
    { title: "Bridesmaids & Groomsmen", people: [{name:"Bridesmaid Names", role:"Bridesmaids"},{name:"Groomsmen Names", role:"Groomsmen"}] }
  ]
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const envelope = $("#envelope");
const intro = $("#intro");
const mainContent = $("#mainContent");
let opening = false;

function populateDetails(){
  $$('[data-wedding-date-label]').forEach(el=>el.textContent=wedding.dateLabel);
  $('[data-venue-name]').textContent=wedding.venue.name;
  $('[data-venue-address]').textContent=wedding.venue.address;
  $('[data-map-link]').href=wedding.venue.map;
  $('[data-ceremony-time]').textContent=wedding.ceremony.time;
  $('[data-ceremony-name]').textContent=wedding.ceremony.name;
  $('[data-ceremony-address]').textContent=wedding.ceremony.address;
  $('[data-ceremony-map]').href=wedding.ceremony.map;
  $('[data-reception-time]').textContent=wedding.reception.time;
  $('[data-reception-name]').textContent=wedding.reception.name;
  $('[data-reception-address]').textContent=wedding.reception.address;
  $('[data-reception-map]').href=wedding.reception.map;
  $('[data-rsvp-deadline]').textContent=wedding.rsvpDeadline;
  $('#rsvpButton').href=wedding.rsvpLink;
  const d=new Date(wedding.date);
  $('[data-wedding-day]').textContent=d.toLocaleDateString('en-US',{weekday:'long'}).toUpperCase();
  $('[data-wedding-date-number]').textContent=d.getDate();
  $('[data-wedding-month-year]').textContent=d.toLocaleDateString('en-US',{month:'long',year:'numeric'}).toUpperCase();
  $('#entourageList').innerHTML=wedding.entourage.map(group=>`<div class="entourage-group reveal"><h3>${group.title}</h3><div class="name-columns">${group.people.map(p=>`<div><strong>${p.name}</strong><span>${p.role}</span></div>`).join('')}</div></div>`).join('');
}

function finishIntro(){
  intro.classList.add('hidden');
  mainContent.classList.add('visible');
  mainContent.setAttribute('aria-hidden','false');
  document.body.classList.remove('intro-locked');
  setTimeout(()=>intro.remove(),1100);
  observeReveals();
}
function openEnvelope(){
  if(opening)return; opening=true;
  envelope.classList.add('releasing');
  setTimeout(()=>envelope.classList.add('open'),650);
  setTimeout(()=>$('#enterSite').focus(),1750);
}
$('#seal').addEventListener('click',openEnvelope);
$('#enterSite').addEventListener('click',finishIntro);
$('#skipIntro').addEventListener('click',finishIntro);

function updateCountdown(){
  const diff=new Date(wedding.date)-new Date();
  const safe=Math.max(0,diff);
  $('#days').textContent=String(Math.floor(safe/86400000)).padStart(3,'0');
  $('#hours').textContent=String(Math.floor(safe/3600000)%24).padStart(2,'0');
  $('#minutes').textContent=String(Math.floor(safe/60000)%60).padStart(2,'0');
  $('#seconds').textContent=String(Math.floor(safe/1000)%60).padStart(2,'0');
}
function observeReveals(){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.14});
  $$('.reveal').forEach(el=>observer.observe(el));
}
const music=$('#bgMusic');
$('#musicToggle').addEventListener('click',async()=>{
  if(music.paused){try{await music.play();$('#musicToggle').classList.add('playing');$('#musicToggle').textContent='♫'}catch(e){alert('Add your music file as assets/music.mp3 first.')}}
  else{music.pause();$('#musicToggle').classList.remove('playing');$('#musicToggle').textContent='♪'}
});
populateDetails();updateCountdown();setInterval(updateCountdown,1000);
