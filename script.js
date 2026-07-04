/* ==========================================================
   SHIKHAR REALTY — LANDING PAGE SCRIPT
   Vanilla JS — Hero Slider, Mobile Menu, Testimonial Slider,
   Stats Counter, Scroll Header
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- HERO SLIDER ---------------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let current = 0;
  let heroTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dots = document.querySelectorAll('.hero-dot');

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  function startAutoplay() {
    heroTimer = setInterval(nextSlide, 5500);
  }
  function stopAutoplay() {
    clearInterval(heroTimer);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoplay(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoplay(); startAutoplay(); });

  if (slides.length > 1) startAutoplay();

  /* ---------------- MOBILE MENU (simple show/hide of CTA) ---------------- */
  const menuToggle = document.getElementById('menuToggle');
  const headerCta = document.querySelector('.header-cta');
  if (menuToggle && headerCta) {
    menuToggle.addEventListener('click', () => {
      const isOpen = headerCta.classList.toggle('mobile-open');
      menuToggle.classList.toggle('active', isOpen);
      headerCta.style.display = isOpen ? 'flex' : 'none';
      if (isOpen) {
        headerCta.style.position = 'absolute';
        headerCta.style.top = '70px';
        headerCta.style.right = '24px';
        headerCta.style.background = '#0B1D37';
        headerCta.style.padding = '18px';
        headerCta.style.borderRadius = '12px';
        headerCta.style.flexDirection = 'column';
        headerCta.style.gap = '14px';
      }
    });
  }

  /* ---------------- STICKY HEADER ON SCROLL ---------------- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(11, 29, 55, 0.96)';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
      header.style.background = 'transparent';
      header.style.boxShadow = 'none';
    }
  });

  /* ---------------- STATS COUNTER (animate on scroll into view) ---------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1600;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = prefix + value.toLocaleString('en-IN') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  const trustSection = document.querySelector('.trust-section');
  if (trustSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(trustSection);
  } else {
    animateStats();
  }

  /* ---------------- TESTIMONIAL SLIDER ---------------- */
  const track = document.getElementById('testimonialTrack');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('testimonialDots');
  let tCurrent = 0;
  let tTimer;

  testimonialCards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToTestimonial(i));
    dotsContainer.appendChild(dot);
  });
  const tDots = document.querySelectorAll('.testimonial-dot');

  function goToTestimonial(index) {
    tCurrent = (index + testimonialCards.length) % testimonialCards.length;
    track.style.transform = `translateX(-${tCurrent * 100}%)`;
    tDots.forEach(d => d.classList.remove('active'));
    tDots[tCurrent].classList.add('active');
  }

  function nextTestimonial() { goToTestimonial(tCurrent + 1); }
  function prevTestimonial() { goToTestimonial(tCurrent - 1); }

  function startTestimonialAutoplay() {
    tTimer = setInterval(nextTestimonial, 4500);
  }
  function stopTestimonialAutoplay() {
    clearInterval(tTimer);
  }

  const testimonialNextBtn = document.getElementById('testimonialNext');
  const testimonialPrevBtn = document.getElementById('testimonialPrev');
  if (testimonialNextBtn) testimonialNextBtn.addEventListener('click', () => { nextTestimonial(); stopTestimonialAutoplay(); startTestimonialAutoplay(); });
  if (testimonialPrevBtn) testimonialPrevBtn.addEventListener('click', () => { prevTestimonial(); stopTestimonialAutoplay(); startTestimonialAutoplay(); });

  if (testimonialCards.length > 1) startTestimonialAutoplay();

  /* ---------------- SMOOTH SCROLL FOR ANCHOR LINKS ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});
