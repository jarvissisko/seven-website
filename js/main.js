/* Seven Website — Scripts */

// ── Theme toggle ──────────────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function updateNavBg() {
  const isLight = html.getAttribute('data-theme') === 'light';
  nav.style.background = window.scrollY > 20
    ? (isLight ? 'rgba(248,249,250,0.97)' : 'rgba(5,9,7,0.95)')
    : (isLight ? 'rgba(248,249,250,0.9)' : 'rgba(5,9,7,0.85)');
}

function setTheme(t) {
  html.setAttribute('data-theme', t);
  themeIcon.innerHTML = t === 'dark' ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  try { localStorage.setItem('seven-theme', t); } catch(e) {}
  updateNavBg();
}

// Init from storage
try {
  const saved = localStorage.getItem('seven-theme');
  if (saved) setTheme(saved);
} catch(e) {}

themeBtn.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Mobile theme toggle
const mobileThemeBtn = document.getElementById('mobileThemeToggle');
if (mobileThemeBtn) {
  mobileThemeBtn.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// ── Intersection Observer for fade-up ─────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Active nav link ───────────────────────────────────────────
const sections = document.querySelectorAll('section[id], div[id="top"]');
const navLinks = document.querySelectorAll('.nav-links a');

const linkMap = {};
navLinks.forEach(a => {
  const id = a.getAttribute('href').replace('#', '');
  linkMap[id] = a;
});

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => a.removeAttribute('style'));
      if (linkMap[id]) {
        linkMap[id].style.color = 'var(--accent)';
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

// ── Nav background on scroll ──────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  updateNavBg();
}, { passive: true });

// ── Mobile menu toggle ──────────────────────────────────────
const menuBtn = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    });
  });
}


// ── Boot sequence — fire once when hero enters view ───────────
const bootStrip = document.getElementById('bootStrip');
if (bootStrip) {
  const bootObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bootStrip.classList.add('run');
        bootObserver.unobserve(bootStrip);
      }
    });
  }, { threshold: 0.5 });
  bootObserver.observe(bootStrip);
}


// ── RF telemetry cycling — values flash before settling ──────
function cycleValues() {
  document.querySelectorAll('.rf-cycle').forEach(el => {
    const values = el.dataset.values.split(',');
    const suffix = el.dataset.suffix;
    el.textContent = values[0] + suffix;
    let i = 1;
    const interval = setInterval(() => {
      el.textContent = values[i] + suffix;
      i++;
      if (i >= values.length) {
        clearInterval(interval);
      }
    }, 2000);
  });
}

// Fire the cycling after boot sequence reaches the online state (~2.8s)
const bootEl = document.getElementById('bootStrip');
if (bootEl) {
  const cycleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(cycleValues, 2000);
        cycleObserver.unobserve(bootEl);
      }
    });
  }, { threshold: 0.5 });
  cycleObserver.observe(bootEl);
}
