document.addEventListener('DOMContentLoaded', function () {

    // --- EFECTO DE TRANSICIÓN DEL BACKGROUND ---
    const bgImage1 = document.querySelector('.bg-image-1');
    const bgImage2 = document.querySelector('.bg-image-2');
    if (bgImage1 && bgImage2) {
        let isFirstImageVisible = true;
        setInterval(() => {
            if (isFirstImageVisible) {
                bgImage1.style.opacity = '0';
                bgImage2.style.opacity = '1';
            } else {
                bgImage1.style.opacity = '1';
                bgImage2.style.opacity = '0';
            }
            isFirstImageVisible = !isFirstImageVisible;
        }, 8000);
    }

    // --- EFECTOS DE SCROLL OPTIMIZADOS ---
    const navbar = document.querySelector('.navbar');
    const backgroundContainer = document.querySelector('.background-container');
    let ticking = false;

    function handleScroll() {
        const scrollTop = window.pageYOffset;

        // Efecto del Navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Efecto Parallax del background
        if (backgroundContainer) {
            backgroundContainer.style.transform = `translateY(${scrollTop * 0.4}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });

    // --- ANIMACIONES DE ENTRADA AL HACER SCROLL (INTERSECTION OBSERVER) ---
    const animatedElements = document.querySelectorAll('.feature-card, .product-card');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Para que la animación ocurra solo una vez
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }

    // --- LÓGICA PARA EL MODAL DE PRODUCTOS ---
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('show.bs.modal', function (event) {
            // Botón que activó el modal
            const card = event.relatedTarget;

            // Extraer información de los atributos data-*
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');
            const img = card.getAttribute('data-img');
            const desc = card.getAttribute('data-desc');

            // Actualizar el contenido del modal
            const modalTitle = productModal.querySelector('.modal-title');
            const modalImage = productModal.querySelector('#modal-img');
            const modalName = productModal.querySelector('#modal-name');
            const modalPrice = productModal.querySelector('#modal-price');
            const modalDesc = productModal.querySelector('#modal-desc');

            modalTitle.textContent = name;
            modalImage.src = img;
            modalImage.alt = name;
            modalName.textContent = name;
            modalPrice.textContent = price;
            modalDesc.textContent = desc;
        });
    }
});