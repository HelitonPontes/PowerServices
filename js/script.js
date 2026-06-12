document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. EFEITO DE ALTERAÇÃO DO HEADER AO ROLAR A PÁGINA
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================================================
  // LÓGICA DE ALTERNAÇÃO DE TEMA (LIGHT / DARK MODE)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeToggleIcon = themeToggleBtn.querySelector('i');
  
  // Verifica se o utilizador já tinha uma preferência guardada no navegador
  const savedTheme = localStorage.getItem('theme');
  
  // Se o utilizador já tinha escolhido o modo dark anteriormente, aplica-o de imediato
  if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggleIcon.classList.replace('fa-moon', 'fa-sun'); // Transforma em Sol
  }

  // Ouvinte de clique no botão
  themeToggleBtn.addEventListener('click', () => {
      // Alterna a classe dark-mode no elemento <body>
      document.body.classList.toggle('dark-mode');
      
      // Se agora estiver no modo dark
      if (document.body.classList.contains('dark-mode')) {
          themeToggleIcon.classList.replace('fa-moon', 'fa-sun'); // Muda ícone para Sol
          localStorage.setItem('theme', 'dark'); // Guarda a preferência
      } else {
          themeToggleIcon.classList.replace('fa-sun', 'fa-moon'); // Muda ícone para Lua
          localStorage.setItem('theme', 'light'); // Guarda a preferência
      }
  });
  
    // ==========================================================================
    // 2. ANIMAÇÃO DE REVELAÇÃO DOS CARDS NO SCROLL (SCROLL REVEAL - CORRIGIDO)
    // ==========================================================================
    // Captura os blocos "Sobre" (mvv), os Cards de Serviços e os Cards de Produtos
    const cardsParaAnimar = document.querySelectorAll('.service-card-tech, .mvv-card, .product-card');
  
    // Configurações do Observador Nativo (Executado fora do evento de scroll para máxima performance)
    const observerOptions = {
        root: null, // Usa a própria janela do navegador
        rootMargin: '0px',
        threshold: 0.10 // Ativa a animação assim que 10% do card surgir no ecrã
    };
  
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            // Se o elemento entrou na área visível da tela
            if (entry.isIntersecting) {
                // Aplica um micro-atraso sequencial (stagger) baseado na posição
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, (index % 3) * 100); 
  
                // Remove a observação do elemento para poupar memória, já que ele já apareceu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
  
    // Ativa o monitor em cada um dos elementos mapeados
    cardsParaAnimar.forEach(card => {
        scrollObserver.observe(card);
    });
  
    // ==========================================================================
    // 3. CONTROLE DO MENU HAMBÚRGUER MOBILE
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
  
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
            
            const isMenuOpen = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isMenuOpen);
        });
    }
  
    // Fecha o menu automaticamente ao clicar em qualquer link (Mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
  
    // ==========================================================================
    // 4. MOTOR DO EFEITO TYPEWRITER
    // ==========================================================================
    const specialties = [
        "Controle de Acesso",
        "Câmeras Wi-Fi",
        "Redes Mesh",
        "Segurança IP",
        "Alarme de Intrusão",
        "Monitoramento de Imagens",
        "Redes e Infraestrutura",
        "Roteadores e Switch ",
        "Automação de Porta e Portões",
        "Softwares e Apps",
        "Automação Residencial",
        "Alarme Perimetral"
    ];
  
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const targetElement = document.getElementById("typewriter-text");
    
    const typingSpeed = 80;
    const erasingSpeed = 40;
    const delayBetweenWords = 2000; 
  
    function typeEffect() {
        if (!targetElement) return;
        
        const currentWord = specialties[wordIndex];
        
        if (isDeleting) {
            targetElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            targetElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
  
        let currentSpeed = isDeleting ? erasingSpeed : typingSpeed;
  
        if (!isDeleting && charIndex === currentWord.length) {
            currentSpeed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % specialties.length;
            currentSpeed = 300; 
        }
  
        setTimeout(typeEffect, currentSpeed);
    }
  
    if (targetElement) {
        setTimeout(typeEffect, 500);
    }
  });
  
  // ==========================================================================
  // 5. EFEITO PARALLAX NAS IMAGENS DOS CARDS (ISOLADO E PERFORMANCE OPTIMIZED)
  // ==========================================================================
  window.addEventListener('scroll', () => {
      const parallaxImages = document.querySelectorAll('.service-img-tech');
      
      parallaxImages.forEach(img => {
          const card = img.closest('.service-card-tech');
          if (!card) return;
          
          const cardTop = card.getBoundingClientRect().top;
          const screenHeight = window.innerHeight;
  
          if (cardTop < screenHeight && cardTop > -card.offsetHeight) {
              const speed = 0.25;
              const yPos = (cardTop - screenHeight / 3) * speed;
              img.style.transform = `translateY(${yPos}px)`;
          }
      });
  });

  // ==========================================================================
/* CONTROLE DO BOTÃO FLUTUANTE VOLTAR AO TOPO */
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        // Se o scroll passar de 400px de altura, exibe o botão suavemente
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Evento de clique para rolar até o início com efeito suave
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});