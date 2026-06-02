// Comet trail cursor
(function() {
  const dot    = document.getElementById('cursorDot');
  const canvas = document.getElementById('star-trail-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const TRAIL = 28;
  const trail = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', e => {
    const x = e.clientX, y = e.clientY;
    if (dot) { dot.style.left = x + 'px'; dot.style.top = y + 'px'; }
    trail.unshift({ x, y });
    if (trail.length > TRAIL) trail.pop();
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    if (trail.length < 2) { requestAnimationFrame(draw); return; }

    for (let i = 1; i < trail.length; i++) {
      const t   = 1 - i / trail.length;        // 1 at head → 0 at tail
      const r   = 3.5 * t;                     // radius tapers
      const a   = t * 0.75;                    // alpha fades

      // Interpolate color: white at head → blue at tail
      const R = Math.round(255 * t + 41  * (1 - t));
      const G = Math.round(255 * t + 171 * (1 - t));
      const B = Math.round(255 * t + 226 * (1 - t));

      // Draw smooth segment
      ctx.beginPath();
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x, trail[i].y);
      ctx.strokeStyle = `rgba(${R},${G},${B},${a})`;
      ctx.lineWidth   = r * 2;
      ctx.lineCap     = 'round';
      ctx.stroke();
    }

    // Bright tip dot
    if (trail[0]) {
      ctx.beginPath();
      ctx.arc(trail[0].x, trail[0].y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// 3D tilt on cards
document.querySelectorAll('.card, .service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Particles
(function() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function randomParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 120 }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(41,171,226,${p.alpha})`;
      ctx.fill();
    });
    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(41,171,226,${0.06 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// =====================
// MODALES DE APPS
// =====================
(function () {
  const overlay = document.getElementById('modal-overlay');

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAll() {
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open modal on "Ver más" click
  document.querySelectorAll('.btn-ver-mas').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });

  // Close on X button
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  // Close on overlay click
  overlay.addEventListener('click', closeAll);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });

  // =====================
  // ACORDEÓN
  // =====================
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const accordion = btn.closest('.accordion');
      const isOpen = accordion.classList.contains('open');

      // Close all accordions in the same modal
      const modal = btn.closest('.modal');
      modal.querySelectorAll('.accordion').forEach(a => {
        a.classList.remove('open');
        a.querySelector('.accordion-btn').setAttribute('aria-expanded', 'false');
      });

      // Open this one if it was closed
      if (!isOpen) {
        accordion.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
