// Copy Email to Clipboard
function copyEmail(event) {
    event.preventDefault(); // Stop standard link behavior
    const email = "ijazahmed619@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        // Show Toast Notification
        const toast = document.getElementById("toast");
        toast.className = "show";

        // Hide after 3 seconds
        setTimeout(function () {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Toggle Mobile Menu
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const nav = document.querySelector('nav');

    if (nav && !nav.contains(event.target) && mobileMenu && !mobileMenu.contains(event.target) && mobileMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Toggle Experience Details
function toggleExp(btn) {
    // Find parent card
    const card = btn.closest('.experience-card');
    // Find details section
    const details = card.querySelector('.experience-details');
    // Toggle visibility
    details.classList.toggle('show');

    // Update button text and icon
    if (details.classList.contains('show')) {
        btn.innerHTML = 'Show Less <i class="fa-solid fa-chevron-up"></i>';
    } else {
        btn.innerHTML = 'Show More <i class="fa-solid fa-chevron-down"></i>';
    }
}

// ScrollSpy Initialization Function
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active-link');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active-link');
            }
        });
    });
}

// Initialize on load if content is present
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelectorAll('section').length > 0) {
        initScrollSpy();
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height (approx 70px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
