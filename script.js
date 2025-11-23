
document.addEventListener('DOMContentLoaded', function () {
  /* Skill Bars (animate when visible)  */
  const bars = document.querySelectorAll('.bar-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const percent = el.getAttribute('data-percent') || '0';
        el.style.width = percent + '%';
        // once animated, unobserve
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => observer.observe(b));

  /*Contact Form validation + localStorage  */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.style.color = '#ff5c5c';
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = 'Please enter a valid email.';
        status.style.color = '#ff5c5c';
        return;
      }

      const formData = { name, email, message, time: new Date().toISOString() };
      try {
        localStorage.setItem('contactFormData', JSON.stringify(formData));
        status.textContent = 'Saved! Redirecting to details...';
        status.style.color = '#8ef5a1';
        setTimeout(() => {
          window.location.href = 'form-details.html';
        }, 600);
      } catch (err) {
        status.textContent = 'Unable to save data locally.';
        status.style.color = '#ff5c5c';
        console.error(err);
      }
    });
  }

  /* Project cards clickable via JS */
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });

  /* Canvas drawing  */
  const canvas = document.getElementById('demoCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0b0c0d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.6);
    for (let x = 0; x <= canvas.width; x += 10) {
      const y = canvas.height * 0.6 + Math.sin((x / canvas.width) * Math.PI * 2) * 12;
      ctx.lineTo(x, y);
    }
ctx.font = "28px Segoe Script";
ctx.fillStyle = "#ff5c5c";
ctx.globalAlpha = 0.9;
ctx.fillText("Prerita", 90, 100);
ctx.globalAlpha = 1;

  }
  /* Image slider */
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
  }
  if (slides.length > 0) {
    showSlide(currentIndex);

    if (prevBtn) prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);
  }

  /*Theme toggle */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  // load theme from localStorage
  const savedTheme = localStorage.getItem('siteTheme');
  if (savedTheme === 'light') body.classList.add('light-mode');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('siteTheme', isLight ? 'light' : 'dark');
    });
    themeToggle.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';
  }

  /* Back-to-top + smooth scroll  */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /*Accessibility: allow keyboard activation of project cards*/
  projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /*Defensive: log if optional media missing  */
  const v = document.getElementById('sampleVideo');
  const a = document.getElementById('sampleAudio');
  if (v && v.querySelector('source') && !v.querySelector('source').getAttribute('src')) {
    console.info('No sample-video.mp4 present in project root — video element will be empty.');
  }
  if (a && a.querySelector('source') && !a.querySelector('source').getAttribute('src')) {
    console.info('No sample-audio.mp3 present in project root — audio element will be empty.');
  }
});
