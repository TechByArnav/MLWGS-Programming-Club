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
  initRippleEffect();
  initTiltEffect();
  initStatsCounter();
  initAccordion();
  initLoadingScreen();
  initPrefetch();
  initViewTransitions();
  initCopyEmail();
  initCursorTrail();
  initCommandPalette();
  initMagneticButtons();
  initThemeToggle();
  initScrollProgress();
  initParallax();
  initParticleMotion();
  initPageTransitions();
  initInteractiveParticles();
  // New features
  initTouchRipple();
  initHapticFeedback();
  initSwipeNavigation();
  initScrollTextReveal();
  initPerformanceMonitoring();
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
      btn.style.background = '#084c27';
      btn.style.color = '#f0ebe3';

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
          // Only move background elements, not the content/buttons
          if (heroGlow) heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.1}px)) scale(${1 + (scrollY / heroHeight) * 0.05})`;
          if (heroParticles) heroParticles.style.transform = `translateY(${scrollY * 0.1}px)`;
          // Keep content in place to avoid clipping
          heroContent.style.transform = 'translateY(0)';
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

// ── Text Scramble Effect on Hero Title (Fixed) ──
function initTextScramble() {
  const heroTitle = document.querySelector('.hero h1');
  if (!heroTitle) return;

  // Store original HTML to restore later (preserves gradient-text span)
  const originalHTML = heroTitle.innerHTML;

  // Extract plain text lines (strip HTML tags)
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = originalHTML;
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  const lines = textContent.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

  // If no newlines, split by <br> manually
  if (lines.length <= 1) {
    const brLines = originalHTML.split(/<br\s*\/?>/i).map((l) => l.replace(/<[^>]*>/g, '').trim()).filter((l) => l.length > 0);
    if (brLines.length > 1) {
      lines.length = 0;
      lines.push(...brLines);
    }
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Create scrambled versions
  const scrambledLines = lines.map((text) =>
    text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
  );

  // Show scrambled text
  heroTitle.textContent = scrambledLines.join('\n');
  heroTitle.style.opacity = '1';
  heroTitle.style.transform = 'translateY(0)';
  heroTitle.style.whiteSpace = 'pre-line';

  let lineIndex = 0;
  let charIndex = 0;
  const revealSpeed = 50;

  function revealNext() {
    if (lineIndex >= lines.length) {
      // Restore original HTML with gradient span
      heroTitle.innerHTML = originalHTML;
      heroTitle.style.whiteSpace = '';
      return;
    }

    const targetLine = lines[lineIndex];

    if (charIndex < targetLine.length) {
      // Build the revealed string
      let revealed = targetLine.substring(0, charIndex + 1);
      let remaining = '';
      for (let i = charIndex + 1; i < targetLine.length; i++) {
        remaining += chars[Math.floor(Math.random() * chars.length)];
      }
      scrambledLines[lineIndex] = revealed + remaining;
      heroTitle.textContent = scrambledLines.join('\n');
      charIndex++;
      setTimeout(revealNext, revealSpeed);
    } else {
      scrambledLines[lineIndex] = targetLine;
      heroTitle.textContent = scrambledLines.join('\n');
      lineIndex++;
      charIndex = 0;
      if (lineIndex < lines.length) {
        setTimeout(revealNext, revealSpeed * 2);
      } else {
        // All done, restore original HTML
        setTimeout(() => {
          heroTitle.innerHTML = originalHTML;
          heroTitle.style.whiteSpace = '';
        }, revealSpeed * 2);
      }
    }
  }

  setTimeout(revealNext, 800);
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
      ctx.fillStyle = `rgba(8, 76, 39, ${p.alpha})`;
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

// ── Touch Ripple ──
function initTouchRipple() {
  document.querySelectorAll('.btn, .card').forEach((el) => {
    el.addEventListener('touchstart', (e) => {
      const rect = el.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      ripple.style.marginLeft = -(Math.max(rect.width, rect.height) / 2) + 'px';
      ripple.style.marginTop = -(Math.max(rect.width, rect.height) / 2) + 'px';
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 400);
    }, { passive: true });
  });
}

// ── Haptic Feedback ──
function initHapticFeedback() {
  if (!navigator.vibrate) return;

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigator.vibrate(10);
    });
  });
}

// ── Swipe Navigation ──
function initSwipeNavigation() {
  let startX = 0;
  let startY = 0;
  const pages = ['index.html', 'about.html', 'dragonshack.html', 'contact.html'];
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentIndex = pages.indexOf(currentPath);

  if (currentIndex === -1) return;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;

    // Only trigger on horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
      if (diffX > 0 && currentIndex > 0) {
        // Swipe right → previous page
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = pages[currentIndex - 1]; }, 200);
      } else if (diffX < 0 && currentIndex < pages.length - 1) {
        // Swipe left → next page
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = pages[currentIndex + 1]; }, 200);
      }
    }
  }, { passive: true });
}

// ── Scroll-Triggered Text Reveal ──
function initScrollTextReveal() {
  const textRevealElements = document.querySelectorAll('.text-reveal');
  if (!textRevealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  textRevealElements.forEach((el) => observer.observe(el));
}

// ── Performance Monitoring ──
function initPerformanceMonitoring() {
  if (!window.PerformanceObserver) return;

  // Monitor LCP
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', Math.round(lastEntry.startTime), 'ms');
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {}

  // Monitor CLS
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue.toFixed(4));
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {}
}

// ── Ripple Effect on Buttons ──
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      ripple.style.marginLeft = -(Math.max(rect.width, rect.height) / 2) + 'px';
      ripple.style.marginTop = -(Math.max(rect.width, rect.height) / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ── Tilt Effect on Cards ──
function initTiltEffect() {
  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
}

// ── Stats Counter Animation ──
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => observer.observe(el));
}

// ── Accordion FAQ ──
function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── Loading Screen ──
function initLoadingScreen() {
  const screen = document.querySelector('.loading-screen');
  if (!screen) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      screen.classList.add('hidden');
      setTimeout(() => screen.remove(), 500);
    }, 800);
  });
}

// ── Prefetching on hover ──
function initPrefetch() {
  const links = document.querySelectorAll('a[href$=".html"]');
  const prefetched = new Set();

  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href && !prefetched.has(href) && !href.startsWith('http')) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
        prefetched.add(href);
      }
    });
  });
}

// ── Ripple Effect on Buttons ──
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      ripple.style.marginLeft = -(Math.max(rect.width, rect.height) / 2) + 'px';
      ripple.style.marginTop = -(Math.max(rect.width, rect.height) / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ── Tilt Effect on Cards ──
function initTiltEffect() {
  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
}

// ── Stats Counter Animation ──
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => observer.observe(el));
}

// ── Accordion FAQ ──
function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all others
      faqItems.forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── Loading Screen ──
function initLoadingScreen() {
  const screen = document.querySelector('.loading-screen');
  if (!screen) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      screen.classList.add('hidden');
      setTimeout(() => screen.remove(), 500);
    }, 800);
  });
}

// ── Sticky CTA Bar ──
function initStickyCTA() {
  const bar = document.querySelector('.sticky-cta');
  if (!bar) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  }, { passive: true });
}

// ── Prefetching on hover ──
function initPrefetch() {
  const links = document.querySelectorAll('a[href$=".html"]');
  const prefetched = new Set();

  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href && !prefetched.has(href) && !href.startsWith('http')) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
        prefetched.add(href);
      }
    });
  });
}

// ── View Transitions (if supported) ──
function initViewTransitions() {
  if (!document.startViewTransition) return;

  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http')) return;
      e.preventDefault();
      document.startViewTransition(() => {
        window.location.href = href;
      });
    });
  });
}

// Add new init calls
document.addEventListener('DOMContentLoaded', () => {
  initRippleEffect();
  initTiltEffect();
  initStatsCounter();
  initAccordion();
  initLoadingScreen();
  initStickyCTA();
  initPrefetch();
  initViewTransitions();
  initCopyEmail();
});

// ── Cursor Trail ──
function initCursorTrail() {
  const trail = document.getElementById('cursorTrail');
  if (!trail) return;

  if (window.matchMedia('(pointer: coarse)').matches) {
    trail.style.display = 'none';
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let trailX = 0;
  let trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trail.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    trail.classList.remove('active');
  });

  function updateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    trail.style.left = (trailX - 3) + 'px';
    trail.style.top = (trailY - 3) + 'px';
    requestAnimationFrame(updateTrail);
  }
  updateTrail();
}

// ── Command Palette (press /) ──
function initCommandPalette() {
  const palette = document.getElementById('commandPalette');
  const backdrop = document.getElementById('commandPaletteBackdrop');
  const input = document.getElementById('commandPaletteInput');
  const results = document.getElementById('commandPaletteResults');
  if (!palette || !input || !results) return;

  const pages = [
    { name: 'Home', url: 'index.html', icon: 'H', desc: 'MLWGS Programming Club landing page' },
    { name: 'About Us', url: 'about.html', icon: 'A', desc: 'Mission, pillars, and leadership' },
    { name: 'DragonsHack', url: 'dragonshack.html', icon: 'D', desc: 'Annual hackathon — coming soon' },
    { name: 'Contact', url: 'contact.html', icon: 'C', desc: 'Get in touch with the club' },
    { name: 'GitHub', url: 'https://github.com/TechByArnav', icon: 'G', desc: 'Arnav\'s GitHub profile', external: true },
    { name: 'Email', url: 'mailto:arnav.shukla2607@gmail.com', icon: 'E', desc: 'Send an email', external: true },
  ];

  let selectedIndex = 0;
  let filteredPages = [...pages];

  function renderResults() {
    results.innerHTML = '';
    filteredPages.forEach((page, i) => {
      const item = document.createElement('div');
      item.className = 'command-palette-item' + (i === selectedIndex ? ' selected' : '');
      item.innerHTML = `<span class="icon">${page.icon}</span><div><div>${page.name}</div><div style="font-size:11px;color:var(--text-dim)">${page.desc}</div></div>`;
      item.addEventListener('click', () => navigateTo(page));
      results.appendChild(item);
    });
  }

  function navigateTo(page) {
    closePalette();
    if (page.external) {
      window.open(page.url, '_blank');
    } else {
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = page.url; }, 200);
    }
  }

  function openPalette() {
    palette.classList.add('open');
    input.value = '';
    filteredPages = [...pages];
    selectedIndex = 0;
    renderResults();
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    palette.classList.remove('open');
  }

  // Keyboard shortcut: / to open
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const tag = document.activeElement.tagName.toLowerCase();
      if (tag !== 'input' && tag !== 'textarea') {
        e.preventDefault();
        openPalette();
      }
    }
    if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Backdrop click to close
  if (backdrop) {
    backdrop.addEventListener('click', closePalette);
  }

  // Filter on input
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    filteredPages = pages.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query)
    );
    selectedIndex = 0;
    renderResults();
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filteredPages.length - 1);
      renderResults();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      renderResults();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredPages[selectedIndex]) {
        navigateTo(filteredPages[selectedIndex]);
      }
    }
  });

  // Initial render
  renderResults();
}

// ── Copy Email Button ──
function initCopyEmail() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const email = link.getAttribute('href').replace('mailto:', '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          const original = link.textContent;
          link.textContent = 'Copied!';
          setTimeout(() => { link.textContent = original; }, 1500);
        }).catch(() => {});
      }
    });
  });
}