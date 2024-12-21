document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.product-images');
    const slides = document.querySelectorAll('.product-image');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(n) {
        currentSlide = n;
        const offset = -n * 100;
        slider.style.transform = `translateX(${offset}%)`;
        updateDots();
        resetAutoSlide();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();

    // Модальное окно для изображений
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.clickable-image').forEach(image => {
        image.addEventListener('click', function() {
            modal.style.display = "block";
            modalImage.src = this.src;
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
