// Main JavaScript file for Introduction Overview Section
document.addEventListener('DOMContentLoaded', function() {
    console.log('Introduction Overview Section Loaded!');

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.text-content, .image-content, .floating-card');
    animatedElements.forEach(el => observer.observe(el));

    // Button click handlers with ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get button position
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create ripple element
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: translate(-50%, -50%);
                left: ${x}px;
                top: ${y}px;
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;

            button.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Button action
            if (button.classList.contains('btn-primary')) {
                console.log('Primary CTA clicked - Mulai Sekarang');
                // Add your primary action here
            } else if (button.classList.contains('btn-secondary')) {
                console.log('Secondary CTA clicked - Pelajari Lebih Lanjut');
                // Add your secondary action here
            }
        });
    });

    // Add ripple animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for floating cards
    let ticking = false;
    
    function updateParallax(scrollPos) {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            const speed = (index + 1) * 0.05;
            const yPos = -(scrollPos * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', function() {
        const scrollPos = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax(scrollPos);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Animate stats counter on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            const isPercentage = target.includes('%');
            const isTime = target.includes('/');
            
            if (isPercentage) {
                animateNumber(stat, 0, 98, 2000, '%');
            } else if (isTime) {
                stat.textContent = '24/7';
            } else {
                animateNumber(stat, 0, 500, 2000, '+');
            }
        });
    }

    function animateNumber(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // Add hover effect to floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Smooth scroll for potential anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation complete
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    console.log('All animations and interactions initialized successfully!');
});