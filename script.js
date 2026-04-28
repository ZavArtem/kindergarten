// Меню бургер
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav ul');
    
    burgerMenu.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        burgerMenu.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
                burgerMenu.classList.remove('active');
            }
        });
    });
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Слайдер отзывов
    const reviewSlider = document.querySelector('.reviews-slider');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevButton = document.querySelector('.prev-review');
    const nextButton = document.querySelector('.next-review');
    
    let currentReview = 0;
    
    function showReview(index) {
        reviewCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextReview() {
        currentReview = (currentReview + 1) % reviewCards.length;
        showReview(currentReview);
    }
    
    function prevReview() {
        currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
        showReview(currentReview);
    }
    
    prevButton.addEventListener('click', prevReview);
    nextButton.addEventListener('click', nextReview);
    
    // Автопрокрутка отзывов
    let autoSlide = setInterval(nextReview, 5000);
    
    // Остановка автопрокрутки при наведении
    reviewSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    reviewSlider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextReview, 5000);
    });
    
    // Форма обратной связи
    const excursionForm = document.getElementById('excursion-form');
    
    excursionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь обычно код для отправки данных на сервер
        // В данном случае просто покажем сообщение об успехе
        
        const formData = new FormData(this);
        const name = formData.get('name') || 'не указано';
        
        alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.`);
        this.reset();
    });
    
    // Анимация появления элементов при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.teacher-card, .program-card, .price-card, .review-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Установка начальных стилей для анимации
    document.querySelectorAll('.teacher-card, .program-card, .price-card, .review-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Вызовем один раз при загрузке для элементов, которые уже в поле зрения
    animateOnScroll();
    
    // Показать первый отзыв
    showReview(0);
});