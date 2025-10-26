// Tiempo de carga de la página sin subirla a un dominio de 2 segundos.
window.onload = function() {
    setTimeout(function() {
        // Oculta el loader
        document.getElementById('loader').style.display = 'none';
        // Muestra el contenido principal
        document.getElementById('content').classList.remove('hidden');
    }, 2000);
};

// Navegación suave
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave para enlaces internos
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambiar estilo de navegación al usar scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');

        if (window.scrollY > 50) {
            nav.style.padding = '0.5rem 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = 'none';
        }

        // Resaltar link activo en navegación

        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        }); 
    });

    // Animaciones en los elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Ver elementos para animación
    const elementsToAnimate = document.querySelectorAll('.proyecto, .about-content, .contact-content');

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Menú Hamburguesa para smartphones
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

   // Estilos para las animaciones
 const style = document.createElement('style');

style.textContent =`
    .animate-in {
       animation: fadeInUp 0.6s ease forwards;
    }
           
      @keyframes fadeInUp {
           from {
            opacity: 0;
            transform: translateY(30px);
           }
           to {
           opacity: 1;
           transform: translateY(0);
           }
        }
        
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
        }
            
    .hamburger.active span:nth-child(2) {
         opacity: 0;
     }
            
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
     }
    
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        padding: 1rem 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }
  `; 
document.head.appendChild(style);
});
