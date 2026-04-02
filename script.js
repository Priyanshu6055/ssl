document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                delay += 120; // Stagger effect for Apple/Stripe feel
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Sticky Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Scroll-based Timeline Progress Line
    const timeline = document.querySelector('.journey-timeline');
    const track = document.querySelector('.timeline-track');
    if (timeline && track) {
        const progressLine = document.createElement('div');
        progressLine.style.position = 'absolute';
        progressLine.style.top = '0';
        progressLine.style.left = '0';
        progressLine.style.width = '100%';
        progressLine.style.background = 'var(--gradient-main)';
        progressLine.style.height = '0%';
        progressLine.style.borderRadius = '5px';
        progressLine.style.boxShadow = 'var(--shadow-glow)';
        progressLine.style.transition = 'height 0.2s ease-out';
        progressLine.style.zIndex = '1';
        track.appendChild(progressLine);

        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how far the user has scrolled past the top of the timeline
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                let scrollPercentage = (windowHeight * 0.8 - rect.top) / (rect.height);
                scrollPercentage = Math.max(0, Math.min(1, scrollPercentage));
                progressLine.style.height = (scrollPercentage * 100) + '%';
            }
        });
    }
});
