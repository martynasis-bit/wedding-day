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

// Borat nuotraukos rodymas / slėpimas
(function () {
  var boratToggle = document.getElementById('boratToggle');
  var boratWrapper = document.getElementById('boratWrapper');

  if (!boratToggle || !boratWrapper) return;

  boratToggle.addEventListener('click', function () {
    var isOpen = boratWrapper.classList.toggle('open');
    boratToggle.textContent = isOpen
      ? '🙈 Slėpti'
      : 'Paspausk čia jei nori pamatyti ką nors ypatingo 👀';
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

// Vakarienės pasirinkimo siuntimas į Google Forms (kaupiama Google Sheets lentelėje)
(function () {
  var form = document.getElementById('mealForm');
  var successMsg = document.getElementById('mealSuccess');
  if (!form) return;

  var FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZhVO3Q7Esj4dyNhjVXq75fLXZbJiSS2u4w_uZWarHTJJ-2g/formResponse';
  var ENTRY_NAME = 'entry.1446848440';
  var ENTRY_MEAL = 'entry.108847326';
  var ENTRY_ACCOMMODATION = 'entry.1524452909';

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('guestName').value.trim();
    var meal = document.getElementById('mealChoice').value;
    var accommodation = document.getElementById('accommodation').value;

    var params = new URLSearchParams();
    params.append(ENTRY_NAME, name);
    params.append(ENTRY_MEAL, meal);
    params.append(ENTRY_ACCOMMODATION, accommodation);

    fetch(FORM_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    }).finally(function () {
      form.reset();
      if (successMsg) successMsg.classList.add('visible');
    });
  });
})();
