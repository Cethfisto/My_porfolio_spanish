/**
 * César Dalisay Portfolio - Main Script
 * Control del DOM, animaciones de scroll y gestión de estado del tema.
 */

// 1. Gestión de la pantalla de carga "Loader"
window.onload = function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
    }, 1000);
};

// 2. Comportamiento principal
document.addEventListener('DOMContentLoaded', function() {
    
    // === Lógica de gestión de tema oscuro o claro ===
    const themeToggleBtn = document.getElementById('dtheme-toggle');
    
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        const currentTheme = localStorage.getItem('theme');

        // Inicialización del estado persistido
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        // Listener del evento click del switch de tema
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (themeIcon) {
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('theme', 'light');
                }
            }
        });
    } else {
        console.warn("Aviso: El botón 'dtheme-toggle' no se encontró en el DOM todavía.");
    }


    // === Desplazamiento suave (Smooth scrolling) ===
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
                
                // Cierre del menú móvil tras la interacción de navegación
                const hamburger = document.querySelector('.hamburger');
                const navLinksContainer = document.querySelector('.nav-links');
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                }
            }
        });
    });


    // === Dinamismo del scroll (Diseño del navbar y links activos) ===
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');

        // Efecto visual Navbar encogido
        if (window.scrollY > 50) {
            nav.style.padding = '0.5rem 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = 'none';
        }

        // Detección de sección visible para enlaces activos
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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


    // === Animaciones en base a "IntersectionObserver" ===
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

    const elementsToAnimate = document.querySelectorAll('.proyecto, .about-content, .contact-content');
    elementsToAnimate.forEach(el => observer.observe(el));


    // === Menú responsivo (Menú Hamburguesa) ===
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }
});