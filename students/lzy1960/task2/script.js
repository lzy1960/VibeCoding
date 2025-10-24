document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.glass-effect');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Smooth scrolling for navigation links (timeline items)
    document.querySelectorAll('.timeline-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Timeline navigation active state based on scroll
    const sections = document.querySelectorAll('section');
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Adjust this value as needed
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                timelineItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.dataset.section === currentSectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});