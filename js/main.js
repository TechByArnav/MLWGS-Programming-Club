/* ==========================================================================
   MLWGS Programming Club — Interactions & Motion
   Skills applied: bencho-micro-interactions, impeccable, unslop
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmoothScroll();
  initActiveNav();
  initFormEnhancements();
  initEntranceAnimation();
});

// ── Mobile navigation (spring-like toggle via CSS) ──
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Smooth scroll for anchor links ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Highlight active nav link based on current page ──
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const pages = {
    'index.html': 'index',
    'about.html': 'about',
    'dragonshack.html': 'dragonshack',
    'contact.html': 'contact',
  };

  const currentKey = pages[currentPath] || 'index';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentKey)) {
      link.classList.add('active');
    }
  });
}

// ── Contact form enhancements ──
function initFormEnhancements() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate send with spring-timed feedback
    setTimeout(() => {
      btn.textContent = 'Sent!';
      btn.style.backgroundColor = 'var(--brand-success)';
      btn.style.color = '#ffffff';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        form.reset();
      }, 1500);
    }, 800);
  });
}

// ── Entrance animation for page content ──
function initEntranceAnimation() {
  const main = document.querySelector('main');
  if (!main) return;

  // Subtle fade-in for the main content on load
  main.style.opacity = '0';
  main.style.transform = 'translateY(8px)';
  main.style.transition = 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)';

  requestAnimationFrame(() => {
    main.style.opacity = '1';
    main.style.transform = 'translateY(0)';
  });
}