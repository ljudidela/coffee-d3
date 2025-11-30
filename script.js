import './node_modules/aos/dist/aos.css';

// Инициализация AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Инициализация частиц
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#ffa500", "#ff6b35", "#ffffff", "#8B4513"] },
        shape: {
            type: ["circle", "polygon"],
            polygon: { nb_sides: 6 }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: { enable: false },
        move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    },
    retina_detect: true
});

// GSAP анимации
gsap.registerPlugin(ScrollTrigger);

// Анимация падающих кофейных зёрен
const createCoffeeBeans = () => {
    const container = document.querySelector('.coffee-beans-animation');
    
    for (let i = 0; i < 20; i++) {
        const bean = document.createElement('div');
        bean.className = 'coffee-bean';
        bean.style.cssText = `
            position: absolute;
            width: 10px;
            height: 15px;
            background: #8B4513;
            border-radius: 50%;
            top: -20px;
            left: ${Math.random() * 100}%;
            opacity: 0;
        `;
        container.appendChild(bean);
        
        gsap.to(bean, {
            y: 400,
            opacity: 1,
            rotation: 360,
            duration: 3,
            delay: i * 0.2,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: '.coffee-section',
                start: "top center",
                end: "bottom center",
                scrub: true
            }
        });
    }
};

// Анимация ингредиентов для рецептов
const animateIngredients = () => {
    const ingredients = ['☕', '🥛', '⭐', '🌌'];
    const section = document.querySelector('.recipes-section');
    
    ingredients.forEach((ingredient, index) => {
        const elem = document.createElement('div');
        elem.textContent = ingredient;
        elem.style.cssText = `
            position: absolute;
            font-size: 2rem;
            opacity: 0;
            left: ${20 + index * 20}%;
            top: 50%;
        `;
        section.appendChild(elem);
        
        gsap.to(elem, {
            x: 100,
            y: -100,
            opacity: 1,
            duration: 2,
            scrollTrigger: {
                trigger: '.recipes-section',
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        });
    });
};

// Анимация отправки формы
const setupFormAnimation = () => {
    const form = document.querySelector('.order-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Создаём частицы для анимации
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: #ffa500;
                border-radius: 50%;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                pointer-events: none;
                z-index: 1000;
            `;
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: submitBtn.getBoundingClientRect().left + submitBtn.offsetWidth / 2,
                y: submitBtn.getBoundingClientRect().top + submitBtn.offsetHeight / 2,
                scale: 0,
                duration: 1,
                onComplete: () => {
                    // Создаём конфетти
                    createConfetti();
                    particle.remove();
                }
            });
        }
        
        // Показываем сообщение об успехе
        setTimeout(() => {
            alert('Заказ запущен в космос!  🚀
Скоро с вами свяжутся!');
        }, 1500);
    });
};

// Создание конфетти
const createConfetti = () => {
    const colors = ['#ffa500', '#ff6b35', '#ffffff', '#8B4513'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: 50%;
            top: 50%;
            pointer-events: none;
            z-index: 1000;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        document.body.appendChild(confetti);
        
        gsap.to(confetti, {
            x: (Math.random() - 0.5) * 1000,
            y: (Math.random() - 0.5) * 1000,
            rotation: 360,
            scale: 0,
            duration: 2,
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
};

// Инициализация всех анимаций при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createCoffeeBeans();
    animateIngredients();
    setupFormAnimation();
    
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 100 },
                    ease: "power2.inOut"
                });
            }
        });
    });
});