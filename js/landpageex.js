document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 0. GERENCIADOR DA TELA DE CARREGAMENTO (LOADING SCREEN)
  // ==========================================================================
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
      setTimeout(() => {
          loadingScreen.classList.add('hidden');
      }, 600);
  });

  // ==========================================================================
  // MENU MOBILE
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          menuToggle.classList.remove('active');
      });
  });

  // ==========================================================================
  // STICKY NAVBAR
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // ==========================================================================
  // ANIMAÇÃO PARALLAX (HERO SECTION)
  // ==========================================================================
  const heroParallax = document.getElementById('heroParallax');
  window.addEventListener('scroll', () => {
      let offset = window.scrollY;
      if (window.innerWidth > 992) {
          heroParallax.style.transform = `translateY(${offset * 0.4}px)`;
      }
  });

  // ==========================================================================
  // INTERSECTION OBSERVER (SCROLL REVEAL)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('reveal-active');
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  revealElements.forEach(element => revealObserver.observe(element));

  // ==========================================================================
  // CONTADORES DINÂMICOS
  // ==========================================================================
  const counterElements = document.querySelectorAll('.counter-number');
  let countersStarted = false;

  const startCounters = () => {
      counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 1800;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
              current += increment;
              if (current < target) {
                  counter.innerText = Math.ceil(current) + (target === 10 ? ' Anos' : target === 98 ? '%' : '+');
                  requestAnimationFrame(updateCounter);
              } else {
                  counter.innerText = target + (target === 10 ? ' Anos' : target === 98 ? '%' : '+');
              }
          };
          updateCounter();
      });
  };

  const countersSection = document.querySelector('.counters-grid');
  const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersStarted) {
          countersStarted = true;
          startCounters();
      }
  }, { threshold: 0.5 });
  
  if (countersSection) counterObserver.observe(countersSection);

  // ==========================================================================
  // TIMERS REGRESSIVOS DE CONVERSÃO
  // ==========================================================================
  let targetTime = new Date().getTime() + (5 * 60 * 60 * 1000) + (42 * 60 * 1000);
  
  const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
          targetTime = new Date().getTime() + (6 * 60 * 60 * 1000);
          return;
      }

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById('timer-hours').innerText = String(hours).padStart(2, '0');
      document.getElementById('timer-minutes').innerText = String(minutes).padStart(2, '0');
      document.getElementById('timer-seconds').innerText = String(seconds).padStart(2, '0');
  };
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // MASONRY GALERIA LIGHTBOX INTEGRADA
  // ==========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.querySelector('.lightbox-close');

  document.querySelectorAll('.portfolio-trigger').forEach(item => {
      item.addEventListener('click', () => {
          const bigImg = item.getAttribute('data-img');
          const desc = item.getAttribute('data-desc');
          lightboxImg.src = bigImg;
          lightboxCaption.innerText = desc;
          lightbox.classList.add('active');
      });
  });

  closeLightbox.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });

  // ==========================================================================
  // CAROUSEL AUTOMÁTICO (DEPOIMENTOS)
  // ==========================================================================
  const track = document.getElementById('carouselTrack');
  const cards = document.querySelectorAll('.carousel-card');
  const dotsContainer = document.getElementById('carouselDots');
  let currentIndex = 0;

  cards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveCarousel(idx));
      dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.carousel-dots .dot');

  const moveCarousel = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');
      currentIndex = index;
  };

  setInterval(() => {
      let nextIndex = (currentIndex + 1) % cards.length;
      moveCarousel(nextIndex);
  }, 5000);

  // ==========================================================================
  // LAZY LOADING (IMAGENS E MAPAS)
  // ==========================================================================
  const lazyImages = document.querySelectorAll('.lazy-img');
  const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.getAttribute('data-src');
              img.removeAttribute('data-src');
              lazyImageObserver.unobserve(img);
          }
      });
  });
  lazyImages.forEach(image => lazyImageObserver.observe(image));

  const lazyMap = document.querySelector('.lazy-map');
  const mapObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && lazyMap.getAttribute('data-src')) {
          lazyMap.src = lazyMap.getAttribute('data-src');
          lazyMap.removeAttribute('data-src');
          mapObserver.unobserve(lazyMap);
      }
  });
  if (lazyMap) mapObserver.observe(lazyMap);

  // ==========================================================================
  // BACK TO TOP UTILITY
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
          backToTopBtn.classList.add('visible');
      } else {
          backToTopBtn.classList.remove('visible');
      }
  });
  backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================================================
  // VALIDAÇÃO DE LEAD & INTEGRAÇÃO WHATSAPP
  // ==========================================================================
  const form = document.getElementById('leadsForm');
  const phoneInput = document.getElementById('phone');
  
  phoneInput.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  });

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isFormValid = true;

      const inputsToValidate = form.querySelectorAll('input[required], select[required]');
      inputsToValidate.forEach(input => {
          const group = input.parentElement;
          if (!input.value.trim() || (input.id === 'phone' && input.value.length < 14)) {
              group.classList.add('invalid');
              isFormValid = false;
          } else {
              group.classList.remove('invalid');
          }
      });

      if (isFormValid) {
          const name = document.getElementById('name').value.trim();
          const phone = phoneInput.value.trim();
          const city = document.getElementById('city').value.trim();
          const project = document.getElementById('project').value;

          const messageText = `Olá Power Services,\n` +
                              `Gostaria de solicitar uma proposta comercial:\n\n` +
                              `• *Nome:* ${name}\n` +
                              `• *Telefone:* ${phone}\n` +
                              `• *Cidade:* ${city}\n` +
                              `• *Solução:* ${project}`;

          window.open(`https://wa.me/5515997019070?text=${encodeURIComponent(messageText)}`, '_blank', 'noopener');
      }
  });
});