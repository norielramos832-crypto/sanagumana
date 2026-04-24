

document.addEventListener('DOMContentLoaded', () => {

  /* 1. MOBILE NAV TOGGLE */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });


  /* 2. NAVBAR SCROLL SHADOW */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightNav();
  });


  /* 3. ACTIVE NAV HIGHLIGHT */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.id;
      }
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  highlightNav();


  /* 4. SCROLL REVEAL */
  const revealEls = document.querySelectorAll('.reveal');

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('show');

      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => {
          bar.style.transform = 'scaleX(' + bar.dataset.w + ')';
        }, 300);
      });

      revealIO.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealIO.observe(el));


  /* 5. TITLE LINE ANIMATION */
  const titleLines = document.querySelectorAll('.title-line');

  const lineIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('grow');
        lineIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  titleLines.forEach(line => lineIO.observe(line));


  /* 6. CONTACT FORM */
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        successEl.style.display = 'block';
        form.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

        setTimeout(() => {
          successEl.style.display = 'none';
        }, 4000);
      }, 1200);
    });
  }


  /* 7. SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* 8. AUTO YEAR IN FOOTER */
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    footerCopy.textContent =
      'Copyright ' + new Date().getFullYear() + ' Ramos, Noriel B. — ITE 399 Final Project';
  }

});

