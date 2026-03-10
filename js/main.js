/* ═══════════════════════════════════════════
   TIMELESS TAVERN — Core JavaScript
   Navigation, Clock, Scroll Effects, FAQ
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Clock & Time Display ───
  const clockEl = document.getElementById('clock');
  const dateEl = document.getElementById('date-display');
  const flavorEl = document.getElementById('time-flavor');

  const flavorTexts = {
    night: [
      'The candles burn low...',
      'Shadows dance upon the walls...',
      'The midnight hour draws near...',
      'Only the brave wander at this hour...',
    ],
    dawn: [
      'A new tale begins with the dawn...',
      'The morning mist parts slowly...',
      'First light touches the Tavern...',
    ],
    day: [
      'The Tavern doors stand open...',
      'Travelers come and go...',
      'Stories are shared over warm drinks...',
      'The quill awaits your hand...',
    ],
    evening: [
      'The hearth crackles warmly...',
      'Evening settles over the Tavern...',
      'Gather close — the stories grow richer...',
      'Lanterns flicker in the fading light...',
    ],
  };

  function getTimePeriod(hour) {
    if (hour >= 0 && hour < 5) return 'night';
    if (hour >= 5 && hour < 10) return 'dawn';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  }

  function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = h + ':' + m + ':' + s;

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    dateEl.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
  }

  function updateFlavor() {
    var period = getTimePeriod(new Date().getHours());
    var texts = flavorTexts[period];
    var text = texts[Math.floor(Math.random() * texts.length)];
    flavorEl.textContent = text;
  }

  updateClock();
  updateFlavor();
  setInterval(updateClock, 1000);
  setInterval(updateFlavor, 30000);

  // ─── Sticky Navigation ───
  var stickyNav = document.getElementById('sticky-nav');
  var hero = document.getElementById('hero');
  var navLinks = stickyNav.querySelectorAll('a');
  var sections = document.querySelectorAll('.section[id]');

  function updateStickyNav() {
    var heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      stickyNav.classList.add('visible');
    } else {
      stickyNav.classList.remove('visible');
    }

    // Highlight active section
    var scrollPos = window.scrollY + 120;
    var activeId = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        activeId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateStickyNav, { passive: true });
  updateStickyNav();

  // ─── Scroll Reveal (IntersectionObserver) ───
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ─── Sound Toggle ───
  var soundToggle = document.getElementById('sound-toggle');
  var soundIcon = document.getElementById('sound-icon');
  var soundActive = false;

  // Check localStorage for preference
  try {
    soundActive = localStorage.getItem('tt_sound') === 'on';
  } catch (e) { /* ignore */ }

  function updateSoundUI() {
    if (soundActive) {
      soundToggle.classList.add('active');
      soundIcon.innerHTML = '&#9835;';
      soundToggle.title = 'Sound on (click to mute)';
    } else {
      soundToggle.classList.remove('active');
      soundIcon.innerHTML = '&#9834;';
      soundToggle.title = 'Sound off (click for ambience)';
    }
  }

  soundToggle.addEventListener('click', function () {
    soundActive = !soundActive;
    try {
      localStorage.setItem('tt_sound', soundActive ? 'on' : 'off');
    } catch (e) { /* ignore */ }
    updateSoundUI();
    // Audio playback would go here when audio files are added
    // For now, the toggle is purely visual
  });

  updateSoundUI();

  // ─── Character Showcase Tabs ───
  var charCards = document.querySelectorAll('.char-card');
  charCards.forEach(function (card) {
    card.addEventListener('click', function () {
      if (card.classList.contains('active')) return;
      charCards.forEach(function (c) { c.classList.remove('active'); });
      card.classList.add('active');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    });
  });

})();

// ─── FAQ Accordion (global, called from onclick) ───
function toggleFaq(questionEl) {
  var item = questionEl.parentElement;
  var isOpen = item.classList.contains('open');

  // Close all others
  document.querySelectorAll('.faq-item.open').forEach(function (el) {
    el.classList.remove('open');
  });

  // Toggle clicked
  if (!isOpen) {
    item.classList.add('open');
  }
}
