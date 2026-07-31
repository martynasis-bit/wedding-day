// Atgalinė laiko skaičiuoklė iki vestuvių
(function () {
  var weddingDate = new Date('2027-03-10T12:00:00');

  var daysEl = document.getElementById('cd-days');
  var hoursEl = document.getElementById('cd-hours');
  var minutesEl = document.getElementById('cd-minutes');
  var secondsEl = document.getElementById('cd-seconds');

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function updateCountdown() {
    var now = new Date();
    var diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// Mobiliojo meniu perjungimas
(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Žemėlapio rodymas / slėpimas
(function () {
  var mapToggle = document.getElementById('mapToggle');
  var mapWrapper = document.getElementById('mapWrapper');

  if (!mapToggle || !mapWrapper) return;

  mapToggle.addEventListener('click', function () {
    var isOpen = mapWrapper.classList.toggle('open');
    mapToggle.textContent = isOpen ? 'Slėpti žemėlapį 🙈' : 'Rodyk žemėlapį 🗺️';
  });
})();

// Vakarienės pasirinkimo siuntimas el. paštu
(function () {
  var form = document.getElementById('mealForm');
  if (!form) return;

  var RECIPIENT_EMAIL = 'martynasis@atlantisgames.lt';

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('guestName').value.trim();
    var meal = document.getElementById('mealChoice').value;

    var subject = 'Vakarienės pasirinkimas: ' + name;
    var body = 'Vardas: ' + name + '\nVakarienė: ' + meal;

    var mailtoLink = 'mailto:' + RECIPIENT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailtoLink;
  });
})();
