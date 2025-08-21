document.addEventListener('DOMContentLoaded', function() {
    initLoading();
    initScrollAnimations();
    initTypingEffect();
    initNavbarScroll();
    initSmoothScroll();
});

function initLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

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
                
                if (entry.target.classList.contains('card')) {
                    animateCard(entry.target);
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section, .card, .timeline-item, .contact-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    
    setTimeout(() => {
        marker.style.transform = 'translateX(-50%) scale(1.2)';
        setTimeout(() => {
            marker.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    }, 300);
    
    setTimeout(() => {
        content.style.transform = 'scale(1.02)';
        setTimeout(() => {
            content.style.transform = 'scale(1)';
        }, 300);
    }, 500);
}

function animateCard(card) {
    const icon = card.querySelector('.card-icon, .contact-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 200);
    }
}

function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 100);
        }
    }
    
    setTimeout(typeChar, 1500);
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(this);
            }
        });
    });
    
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

document.querySelectorAll('.btn, .contact-btn, .social-link').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'rotate(5deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }
    });
});

function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

document.addEventListener('DOMContentLoaded', addParallaxEffect);

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .section,
    .card,
    .timeline-item,
    .contact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
`;
document.head.appendChild(style);

document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.includes('whatsapp.com')) {
            gtag && gtag('event', 'whatsapp_click', {
                event_category: 'engagement',
                event_label: 'contact'
            });
        } else if (href.includes('mailto:')) {
            gtag && gtag('event', 'email_click', {
                event_category: 'engagement',
                event_label: 'contact'
            });
        }
    });
});

const easterEggSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let easterEggIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.code === easterEggSequence[easterEggIndex]) {
        easterEggIndex++;
        if (easterEggIndex === easterEggSequence.length) {
            triggerEasterEgg();
            easterEggIndex = 0;
        }
    } else {
        easterEggIndex = 0;
    }
});

function triggerEasterEgg() {
    const hero = document.querySelector('.hero');
    hero.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)';
    hero.style.backgroundSize = '400% 400%';
    hero.style.animation = 'gradient 3s ease infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        hero.style.background = '';
        hero.style.animation = '';
        document.head.removeChild(style);
    }, 10000);
    
    console.log('🎉 Easter egg ativado! Desenvolvido com ♥ por Marcelo Matos');
}