/* ═══════════════════════════════════════════
   TIMELESS TAVERN — Particle System
   Floating embers / ethereal wisps
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // Respect reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var MAX_PARTICLES = 40;

  // Particle colors — warm embers and cool wisps
  var colors = [
    { r: 192, g: 57, b: 43 },   // crimson
    { r: 231, g: 76, b: 60 },   // ember
    { r: 201, g: 168, b: 76 },  // gold
    { r: 232, g: 200, b: 122 }, // amber
    { r: 107, g: 79, b: 160 },  // violet wisp
  ];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 10 + Math.random() * 50;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedY = -(Math.random() * 0.4 + 0.15);
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = 0;
    this.maxOpacity = Math.random() * 0.5 + 0.15;
    this.fadeIn = true;
    this.fadeSpeed = Math.random() * 0.005 + 0.002;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.02 + 0.005;
    this.wobbleAmount = Math.random() * 0.5 + 0.2;

    var c = colors[Math.floor(Math.random() * colors.length)];
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
  };

  Particle.prototype.update = function () {
    this.wobble += this.wobbleSpeed;
    this.x += this.speedX + Math.sin(this.wobble) * this.wobbleAmount;
    this.y += this.speedY;

    if (this.fadeIn) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= this.maxOpacity) {
        this.opacity = this.maxOpacity;
        this.fadeIn = false;
      }
    }

    // Fade out as it rises past 30% of screen
    if (this.y < canvas.height * 0.3) {
      this.opacity -= this.fadeSpeed * 1.5;
    }

    // Reset when invisible or off-screen
    if (this.opacity <= 0 || this.y < -20) {
      this.reset();
    }
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.opacity + ')';
    ctx.fill();

    // Glow effect
    if (this.size > 1.2) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.opacity * 0.15) + ')';
      ctx.fill();
    }
  };

  // Initialize particles
  function init() {
    resize();
    particles = [];
    for (var i = 0; i < MAX_PARTICLES; i++) {
      var p = new Particle();
      // Stagger initial positions so they don't all start at bottom
      p.y = Math.random() * canvas.height;
      p.opacity = Math.random() * p.maxOpacity;
      p.fadeIn = false;
      particles.push(p);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  // Handle resize
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  });

  init();
  animate();

})();
