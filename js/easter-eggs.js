/* ═══════════════════════════════════════════
   TIMELESS TAVERN — Easter Eggs
   Hidden interactions for the curious
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Console ASCII Art ───
  var art = [
    '%c',
    '  ╔══════════════════════════════════╗',
    '  ║                                  ║',
    '  ║      ⚔  TIMELESS TAVERN  ⚔      ║',
    '  ║                                  ║',
    '  ║   "Step into the story."         ║',
    '  ║                                  ║',
    '  ║   You found the developer        ║',
    '  ║   console. Curious one,          ║',
    '  ║   aren\'t you?                    ║',
    '  ║                                  ║',
    '  ║   Hint: there are secrets        ║',
    '  ║   hidden on this page...         ║',
    '  ║                                  ║',
    '  ╚══════════════════════════════════╝',
    '',
  ].join('\n');

  try {
    console.log(art, 'color: #c0392b; font-family: monospace; font-size: 12px;');
  } catch (e) { /* ignore */ }

  // ─── Konami Code ───
  // ↑ ↑ ↓ ↓ ← → ← → B A
  var konamiSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
  ];
  var konamiIndex = 0;

  document.addEventListener('keydown', function (e) {
    if (e.code === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        triggerEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerEasterEgg() {
    var overlay = document.getElementById('easter-egg-overlay');
    if (!overlay) return;

    overlay.classList.add('active');

    // Flash effect on body
    document.body.style.transition = 'background 0.1s';
    document.body.style.background = 'rgba(107, 79, 160, 0.3)';
    setTimeout(function () {
      document.body.style.background = '';
    }, 150);

    // Auto-close after 4 seconds
    setTimeout(function () {
      overlay.classList.remove('active');
    }, 4000);

    // Also close on click
    overlay.addEventListener('click', function handler() {
      overlay.classList.remove('active');
      overlay.removeEventListener('click', handler);
    });
  }

  // ─── Title Rapid Click Secret ───
  var heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    var clickCount = 0;
    var clickTimer = null;

    heroTitle.addEventListener('click', function () {
      clickCount++;
      clearTimeout(clickTimer);

      clickTimer = setTimeout(function () {
        clickCount = 0;
      }, 2000);

      if (clickCount >= 7) {
        clickCount = 0;
        clearTimeout(clickTimer);

        // Glitch effect on the title
        var originalText = heroTitle.textContent;
        var glitchChars = '&#$@!%*';
        var iterations = 0;

        var glitch = setInterval(function () {
          heroTitle.textContent = originalText
            .split('')
            .map(function (char, idx) {
              if (idx < iterations) return originalText[idx];
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
          iterations += 1;
          if (iterations > originalText.length) {
            clearInterval(glitch);
            heroTitle.textContent = originalText;

            // Show secret message briefly
            var tagline = document.querySelector('.hero-tagline');
            if (tagline) {
              var originalTagline = tagline.textContent;
              tagline.textContent = 'The walls have eyes... and the stories have teeth.';
              tagline.style.color = '#9b79d0';
              setTimeout(function () {
                tagline.textContent = originalTagline;
                tagline.style.color = '';
              }, 3000);
            }
          }
        }, 40);
      }
    });

    heroTitle.style.cursor = 'default';
  }

})();
