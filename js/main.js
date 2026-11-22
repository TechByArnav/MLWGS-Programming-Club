/* ==========================================================================
   MLWGS Programming Club — Premium Design System
   (CSS already written above, this is the JS update)
   ========================================================================== */

// All previous init functions + new ones
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmoothScroll();
  initActiveNav();
  initScrollReveals();
  initFormEnhancements();
  initParallax();
  initParticleMotion();
  initTextScramble();
  initPageTransitions();
  initInteractiveParticles();
  initMagneticButtons();
  initThemeToggle();
  initScrollProgress();
  initBackToTop();
  initMobileMenuClose();
});

// ── Mobile navigation ──
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Close mobile menu on outside click ──
function initMobileMenuClose() {
  const navLinks = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');
  if (!navLinks || !toggle) return;

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
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

// ── Highlight active nav link ──
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

// ── Scroll reveal animations ──
function initScrollReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
}

// ── Contact form enhancement ──
function initFormEnhancements() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    // If mailto, let it proceed
    if (form.getAttribute('action') && form.getAttribute('action').startsWith('mailto:')) {
      return; // Let the browser handle mailto
    }
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Sent!';
      btn.style.background = '#00e639';
      btn.style.color = '#000';

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 1200);
    }, 700);
  });
}

// ── Parallax on hero (subtle) ──
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroContent = hero.querySelector('.hero-content');
  const heroGlow = hero.querySelector('.hero-glow');
  const heroParticles = hero.querySelector('.hero-particles');

  if (!heroContent) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        if (scrollY < heroHeight) {
          heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
          if (heroGlow) heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px)) scale(${1 + (scrollY / heroHeight) * 0.1})`;
          if (heroParticles) heroParticles.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ── Particle mouse interaction (existing particles) ──
function initParticleMotion() {
  const particles = document.querySelectorAll('.hero-particles span');
  if (!particles.length) return;

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    particles.forEach((p, i) => {
      const factor = (i + 1) * 3;
      p.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
    });
  }, { passive: true });
}

// ── Text Scramble Effect on Hero Title ──
function initTextScramble() {
  const heroTitle = document.querySelector('.hero h1');
  if (!heroTitle) return;

  const originalHTML = heroTitle.innerHTML;
  const lines = originalHTML.split('<br>');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~';
  
  const scrambledLines = lines.map((line) => {
    const text = line.replace(/<[^>]*>/g, '').trim();
    return text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  });

  heroTitle.innerHTML = scrambledLines.join('<br>');
  heroTitle.style.opacity = '1';
  heroTitle.style.transform = 'translateY(0)';

  let lineIndex = 0;
  let charIndex = 0;
  const revealSpeed = 30;

  function revealNext() {
    if (lineIndex >= lines.length) return;

    const targetLine = lines[lineIndex].replace(/<[^>]*>/g, '').trim();
    const currentLine = scrambledLines[lineIndex];

    if (charIndex < targetLine.length) {
      const newText = targetLine.substring(0, charIndex + 1) + 
        currentLine.substring(charIndex + 1).split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
      scrambledLines[lineIndex] = newText;
      heroTitle.innerHTML = scrambledLines.join('<br>');
      charIndex++;
      setTimeout(revealNext, revealSpeed);
    } else {
      scrambledLines[lineIndex] = targetLine;
      heroTitle.innerHTML = scrambledLines.join('<br>');
      lineIndex++;
      charIndex = 0;
      setTimeout(revealNext, revealSpeed * 3);
    }
  }

  setTimeout(revealNext, 500);
}

// ── Smooth Page Transitions ──
function initPageTransitions() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

// ── Interactive Particle Field (repulsion from cursor) ──
function initInteractiveParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'hero-particle-canvas';
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Check reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  let width, height, dpr;
  let particles = [];
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 8000), 120);
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.4
      });
    }
  }

  function update() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      const repelRadius = 120;

      if (dist < repelRadius && dist > 0) {
        const force = (repelRadius - dist) / repelRadius;
        p.vx += (dx / dist) * force * 1.8;
        p.vy += (dy / dist) * force * 1.8;
      }

      p.vx += (p.originX - p.x) * 0.03;
      p.vy += (p.originY - p.y) * 0.03;
      p.vx *= 0.88;
      p.vy *= 0.88;

      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 230, 57, ${p.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(update);
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  createParticles();
  update();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

// ── Magnetic Buttons ──
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');
  if (!buttons.length) return;

  const strength = 0.3;
  const radius = 100;

  buttons.forEach((btn) => {
    let isHovering = false;

    btn.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    btn.addEventListener('mouseleave', () => {
      isHovering = false;
      btn.style.transition = 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      btn.style.transform = 'translate(0, 0)';
      setTimeout(() => {
        btn.style.transition = '';
      }, 400);
    });

    btn.addEventListener('mousemove', (e) => {
      if (!isHovering) return;

      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const dist = Math.hypot(distX, distY);

      if (dist < radius) {
        const pullX = distX * strength;
        const pullY = distY * strength;
        btn.style.transition = 'transform 100ms cubic-bezier(0.16, 1, 0.3, 1)';
        btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
      }
    });
  });
}

// ── Theme Toggle (Dark/Light) ──
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  // Check saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    toggle.textContent = '🌙';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    toggle.textContent = isLight ? '🌙' : '☀';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ── Scroll Progress Bar ──
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });
}

// ── Back to Top Button ──
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}