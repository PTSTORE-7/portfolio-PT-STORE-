/* ════════════════════════════════════════════════
   PT STORE — script.js
   Requires: GSAP 3 + ScrollTrigger (loaded in HTML)
════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── GSAP INIT ─────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── PAGE FADE IN ──────────────────────────── */
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.4 });

  /* ── NAVBAR SCROLL ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── SMOOTH ANCHOR SCROLL ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── MOBILE MENU ───────────────────────────── */
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });

  document.querySelectorAll('.mob-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* ── HERO ENTRANCE ─────────────────────────── */
  var heroTl = gsap.timeline({ delay: 0.15 });
  heroTl
    .fromTo('.hero-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0)
    .fromTo('.word',
      { opacity: 0, y: 40, rotateX: -20 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' }, 0.2)
    .fromTo('.hero-desc',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.85)
    .fromTo('.hero-btns',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.05)
    .fromTo('.hero-right',
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, 0.4)
    .fromTo('.hero-stats',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.3);

  /* ── STAT COUNTERS ─────────────────────────── */
  var statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(animateCounter);
        obs.disconnect();
      }
    }, { threshold: 0.5 }).observe(statsSection);
  }

  /* ── SECTION HEADERS ───────────────────────── */
  gsap.utils.toArray('.sec-header').forEach(function (el) {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out'
      });
  });

  /* ── SERVICE CARDS ─────────────────────────── */
  gsap.utils.toArray('.srv-card').forEach(function (card, i) {
    gsap.fromTo(card,
      { opacity: 0, y: 56 },
      {
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.75, delay: i * 0.1, ease: 'power3.out'
      });

    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transition = 'transform .08s ease';
      card.style.transform  = 'perspective(900px) rotateX(' + (-y * 12) + 'deg) rotateY(' + (x * 12) + 'deg) translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform .5s ease';
      card.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ── TECH CLOUD PILLS ──────────────────────── */
  gsap.utils.toArray('.tc-pill').forEach(function (pill, i) {
    gsap.fromTo(pill,
      { opacity: 0, scale: 0.7 },
      {
        scrollTrigger: { trigger: '.tech-cloud', start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 1, scale: 1, duration: 0.5, delay: i * 0.045, ease: 'back.out(1.6)'
      });
  });

  /* ── SKILL BARS ────────────────────────────── */
  document.querySelectorAll('.sk-fill').forEach(function (bar) {
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) {
        bar.classList.add('animated');
        obs.disconnect();
      }
    }, { threshold: 0.3 }).observe(bar);
  });

  /* Skill cards entrance */
  gsap.utils.toArray('.sk-card').forEach(function (card, i) {
    gsap.fromTo(card,
      { opacity: 0, y: 52 },
      {
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out'
      });
  });

  /* Highlight cards */
  gsap.utils.toArray('.hl-card').forEach(function (card, i) {
    gsap.fromTo(card,
      { opacity: 0, y: 32 },
      {
        scrollTrigger: { trigger: '.hl-grid', start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.65, delay: i * 0.1, ease: 'power3.out'
      });
  });

  /* ── ABOUT SECTION ─────────────────────────── */
  gsap.fromTo('.about-left',
    { opacity: 0, x: -64 },
    {
      scrollTrigger: { trigger: '.about-grid', start: 'top 84%', toggleActions: 'play none none none' },
      opacity: 1, x: 0, duration: 0.9, ease: 'power3.out'
    });

  gsap.fromTo('.about-right',
    { opacity: 0, x: 64 },
    {
      scrollTrigger: { trigger: '.about-grid', start: 'top 84%', toggleActions: 'play none none none' },
      opacity: 1, x: 0, duration: 0.9, delay: 0.12, ease: 'power3.out'
    });

  gsap.fromTo('.float-award',
    { opacity: 0, y: 20, scale: 0.85 },
    {
      scrollTrigger: { trigger: '.about-grid', start: 'top 78%', toggleActions: 'play none none none' },
      opacity: 1, y: 0, scale: 1, duration: 0.65, delay: 0.5, ease: 'back.out(1.4)'
    });

  gsap.fromTo('.float-years',
    { opacity: 0, y: -20, scale: 0.85 },
    {
      scrollTrigger: { trigger: '.about-grid', start: 'top 78%', toggleActions: 'play none none none' },
      opacity: 1, y: 0, scale: 1, duration: 0.65, delay: 0.6, ease: 'back.out(1.4)'
    });

  gsap.utils.toArray('.feat').forEach(function (f, i) {
    gsap.fromTo(f,
      { opacity: 0, x: -20 },
      {
        scrollTrigger: { trigger: '.feat-grid', start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 0.5, delay: 0.3 + i * 0.1, ease: 'power3.out'
      });
  });

  /* ── PRICING CARDS ─────────────────────────── */
  gsap.utils.toArray('.price-card').forEach(function (card, i) {
    gsap.fromTo(card,
      { opacity: 0, y: 56 },
      {
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.75, delay: i * 0.15, ease: 'power3.out'
      });

    var isFeatured = card.classList.contains('featured');

    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      var scale = isFeatured ? ' scale(1.04)' : '';
      card.style.transition = 'transform .08s ease';
      card.style.transform  = 'perspective(800px) rotateX(' + (-y * 8) + 'deg) rotateY(' + (x * 8) + 'deg) translateY(-6px)' + scale;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform .5s ease';
      card.style.transform  = isFeatured ? 'scale(1.04) translateY(-6px)' : 'translateY(0)';
    });
  });

  /* ── TESTIMONIALS ──────────────────────────── */
  gsap.utils.toArray('.testi-card').forEach(function (card, i) {
    gsap.fromTo(card,
      { opacity: 0, y: 38 },
      {
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out'
      });
  });

  /* ── FOOTER ────────────────────────────────── */
  gsap.utils.toArray('.f-brand, .f-col').forEach(function (el, i) {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      {
        scrollTrigger: { trigger: '.footer-grid', start: 'top 92%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out'
      });
  });

  /* ── ORB AMBIENT FLOAT ─────────────────────── */
  gsap.to('.orb-1', { y: 60,  x: 30,  duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orb-2', { y: -50, x: -40, duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orb-3', { y: 30,  x: 20,  duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  /* ── AVATAR GLOW PULSE ─────────────────────── */
  gsap.to('.avatar-glow-outer', { scale: 1.08, opacity: 0.85, duration: 3,   repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.avatar-glow-inner', { scale: 1.12, opacity: 0.7,  duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });

});

/* ── COUNTER ANIMATION ──────────────────────────
   Runs when stat numbers enter the viewport.
────────────────────────────────────────────── */
function animateCounter(el) {
  var target = parseInt(el.dataset.target || '0', 10);
  gsap.to({ v: 0 }, {
    v: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate: function () {
      el.textContent = Math.floor(this.targets()[0].v);
    },
    onComplete: function () {
      el.textContent = target;
    }
  });
}
