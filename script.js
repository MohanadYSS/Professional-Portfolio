/* ========================================
   PROFESSIONAL PORTFOLIO - JAVASCRIPT
   3D Parallax, Typing Effect, Animations
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavigation();
    initTypingEffect();
    init3DTilt();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initParticles();
    initCodeWindowEffect();
});

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Navbar background on scroll
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 26, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 26, 0.8)';
        }
    });

    // Smooth scroll
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
    const dynamicText = document.querySelector('.dynamic-text');
    const words = ['برمجيات', 'Full-Stack', 'ذكاء اصطناعي', 'موبايل', 'ويب'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ========================================
   3D TILT EFFECT
   ======================================== */
function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ========================================
   CODE WINDOW 3D EFFECT
   ======================================== */
function initCodeWindowEffect() {
    const codeWindow = document.getElementById('codeWindow');
    
    if (codeWindow) {
        codeWindow.addEventListener('mousemove', (e) => {
            const rect = codeWindow.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            codeWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            codeWindow.style.boxShadow = `
                ${rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 245, 255, 0.2),
                0 0 60px rgba(0, 245, 255, 0.1)
            `;
        });

        codeWindow.addEventListener('mouseleave', () => {
            codeWindow.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            codeWindow.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.1)';
        });
    }
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counters
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stagger animation for cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/* ========================================
   SKILL BARS ANIMATION
   ======================================== */
function initSkillBars() {
    // Initial state
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
    });
}

function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 300);
    });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounters() {
    // Initial state
    document.querySelectorAll('.stat-number').forEach(counter => {
        counter.textContent = '0';
    });
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = isDecimal ? target.toFixed(2) : target;
            }
        };

        updateCounter();
    });
}

/* ========================================
   PARTICLES BACKGROUND
   ======================================== */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 245, 255, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        pointer-events: none;
        z-index: -1;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
    `;
    
    container.appendChild(particle);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translateY(-100px) translateX(50px);
        }
    }
`;
document.head.appendChild(particleStyle);

/* ========================================
   PARALLAX MOUSE EFFECT
   ======================================== */
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    // Move background slightly
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
});

/* ========================================
   SMOOTH REVEAL ON SCROLL
   ======================================== */
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

/* ========================================
   GLOW EFFECT ON BUTTONS
   ======================================== */
document.querySelectorAll('.glow-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});

/* ========================================
   INITIALIZE HERO SECTION IMMEDIATELY
   ======================================== */
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}
