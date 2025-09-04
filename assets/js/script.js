document.addEventListener('DOMContentLoaded', function() {
    initLoading();
    initParticles();
    initScrollAnimations();
    initTypingEffect();
    initNavbarScroll();
    initSmoothScroll();
    initSkillsAnimation();
    initContactForm();
    initMobileMenu();
    initProgressBars();
    initCodeRain();
    initWhatsAppLinks(); // Adicionar inicialização dos links do WhatsApp
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }
});

// Loading Animation
function initLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                // Start other animations after loading
                startInitialAnimations();
            }, 500);
        }, 2000);
    });
}

function startInitialAnimations() {
    // Animate hero stats
    animateCounters();
    // Start typing effect
    startTypingEffect(document.querySelector('.site-title').textContent);
}

// Particles Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const delay = Math.random() * 20;
    const duration = Math.random() * 10 + 10;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Code Rain Effect
function initCodeRain() {
    const hero = document.querySelector('.hero');
    const codeRain = document.querySelector('.code-rain');
    
    if (!codeRain) {
        const rain = document.createElement('div');
        rain.className = 'code-rain';
        hero.appendChild(rain);
        
        const characters = '01010101101010101010101010101010101001011010';
        
        for (let i = 0; i < 20; i++) {
            createCodeDrop(rain, characters);
        }
    }
}

function createCodeDrop(container, characters) {
    const drop = document.createElement('div');
    drop.style.position = 'absolute';
    drop.style.color = 'rgba(255, 255, 255, 0.1)';
    drop.style.fontSize = '14px';
    drop.style.fontFamily = 'monospace';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
    drop.style.animationName = 'particleFloat';
    drop.style.animationIterationCount = 'infinite';
    drop.style.animationTimingFunction = 'linear';
    
    drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
    
    container.appendChild(drop);
    
    setTimeout(() => {
        if (drop.parentNode) {
            drop.parentNode.removeChild(drop);
            createCodeDrop(container, characters);
        }
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillCard(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section, .skill-card, .timeline-item, .project-card, .education-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    if (marker) {
        marker.style.transform = 'scale(1.2)';
        setTimeout(() => {
            marker.style.transform = 'scale(1)';
        }, 300);
    }
}

function animateSkillCard(card) {
    const progressBar = card.querySelector('.progress-bar');
    if (progressBar) {
        const width = progressBar.getAttribute('data-width');
        setTimeout(() => {
            progressBar.style.width = width;
        }, 200);
    }
}

function animateProjectCard(card) {
    const overlay = card.querySelector('.project-overlay');
    if (overlay) {
        overlay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            overlay.style.transform = 'scale(1)';
        }, 300);
    }
}

// Typing Effect
function initTypingEffect() {
    // This will be started after loading
}

function startTypingEffect(text) {
    const typingElement = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typingElement) return;
    
    const speed = 100;
    let i = 0;
    
    typingElement.textContent = '';
    
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Start blinking cursor
            if (cursor) {
                cursor.style.animation = 'blink 1s infinite';
            }
        }
    }
    
    typeWriter();
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skills Animation
function initSkillsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Progress Bars Animation
function initProgressBars() {
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        progressObserver.observe(skillsSection);
    }
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + '+';
        }, 16);
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // Floating labels
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            input.addEventListener('input', () => {
                if (input.value) {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            });
        }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `${contactEmailLink.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Formulário preparado! Seu cliente de email será aberto.', 'success');
        
        // Reset form
        form.reset();
        formGroups.forEach(group => {
            group.classList.remove('focused', 'has-value');
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Easter Eggs and Fun Interactions
function initEasterEggs() {
    // Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode = konamiCode.slice(-konamiSequence.length);
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            activatePartyMode();
        }
    });
    
    // Double click on avatar for surprise
    const avatar = document.querySelector('.avatar-circle');
    if (avatar) {
        avatar.addEventListener('dblclick', () => {
            createConfetti();
        });
    }
}

function activatePartyMode() {
    document.body.style.animation = 'rainbow 0.5s infinite';
    showNotification('🎉 Party Mode Activated! 🎉', 'success');
    createConfetti();
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
    
    .form-group.focused label,
    .form-group.has-value label {
        top: -0.5rem;
        font-size: 0.8rem;
        color: var(--primary-color);
        background: white;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Initialize Easter Eggs
setTimeout(initEasterEggs, 3000);

// Intersection Observer for navbar highlighting
function initNavbarHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize navbar highlighting
initNavbarHighlight();

// Parallax effect for hero
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Initialize parallax
initParallax();

// Smooth reveal animations
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .education-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(reveal => {
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(30px)';
        reveal.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(reveal);
    });
}

// Initialize reveal animations
initRevealAnimations();

// Add interactive hover effects
function initHoverEffects() {
    // Project cards 3D effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Skill cards pulse effect
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.animation = 'pulse 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.animation = '';
            }
        });
    });
}

// Initialize hover effects
initHoverEffects();

// Inicializar links do WhatsApp com URL dinâmica
function initWhatsAppLinks() {
    // Adicionar pequeno delay para garantir que os elementos estejam carregados
    setTimeout(() => {
        const whatsappLinks = document.querySelectorAll('.whatsapp-link');
        const siteName = window.location.hostname;
        
        console.log(`🔍 Procurando links WhatsApp... Encontrados: ${whatsappLinks.length}`);
        
        whatsappLinks.forEach((link, index) => {
            const phone = link.getAttribute('data-phone');
            
            console.log(`🔗 Configurando link ${index + 1}: telefone ${phone}`);
            
            // Adicionar event listener para o click
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir comportamento padrão
                
                console.log('📱 Click no WhatsApp detectado!');
                
                // Construir mensagem dinâmica
                const message = `E aí, Marcelo! 👋 Vim do seu site ${siteName} 🚀 Bora trocar uma idéia sobre tech? 😄`;
                
                // Codificar a mensagem para URL
                const encodedMessage = encodeURIComponent(message);
                
                // Construir URL completa do WhatsApp
                const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
                
                console.log(`🔗 Abrindo: ${whatsappUrl}`);
                
                // Abrir WhatsApp em nova aba
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            });
            
            // Também definir o href como fallback
            const message = `E aí, Marcelo! 👋 Vim do seu site ${siteName} 🚀 Bora trocar uma idéia sobre tech? 😄`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
            link.href = whatsappUrl;
            link.target = '_blank';
            link.rel = 'noopener';
        });
        
        console.log(`✅ WhatsApp links inicializados para ${whatsappLinks.length} elementos`);
        console.log(`🌐 Site detectado: ${siteName}`);
    }, 100);
}

console.log('🚀 Site do Marcelo Matos carregado com sucesso!');
console.log('💻 Desenvolvido com amor e tecnologia');
console.log('🎨 Design interativo e responsivo');
console.log('⚡ Performance otimizada');

// Service Worker Registration (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}