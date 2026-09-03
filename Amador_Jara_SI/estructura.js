document.addEventListener('DOMContentLoaded', () => {

    // 1. DESCARGA INTERACTIVA DEL CV
    const btnDownload = document.querySelector('.btn-download');

    if (btnDownload) {
        btnDownload.addEventListener('click', (e) => {
            const originalHTML = btnDownload.innerHTML;
            btnDownload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Descargando...';
            btnDownload.style.pointerEvents = 'none';

            setTimeout(() => {
                btnDownload.innerHTML = '<i class="fa-solid fa-check"></i> ¡Completado!';
                setTimeout(() => {
                    btnDownload.innerHTML = originalHTML;
                    btnDownload.style.pointerEvents = 'auto';
                }, 2000);
            }, 1000);
        });
    }

    // 2. NAVEGACIÓN FLUIDA (SMOOTH SCROLL)
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 10;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. ANIMACIÓN DE ENTRADA AL HACER SCROLL (FADE-IN)
    const observerOptions = {
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-block, .card, .cv-paper');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        revealOnScroll.observe(el);
    });

    // 4. BOTÓN "VOLVER ARRIBA" (BACK TO TOP)
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTopBtn.id = 'backToTop';
    document.body.appendChild(backToTopBtn);

    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color, #2563eb)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'none',
        alignItems: 'center',
        justify-content: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        zIndex: '999',
        transition: 'transform 0.2s, opacity 0.2s'
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. COPIAR CORREO AL PORTAPAPELES
    const emailIcon = document.querySelector('.social-icon.email');
    if (emailIcon) {
        emailIcon.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'amadorantoniojc@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                alert('¡Correo copiado al portapapeles: ' + email + '!');
            });
        });
    }

});