// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.menu-list a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    hamburger.classList.remove('active');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.header').offsetHeight), // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skill Bar Animation on Scroll
    const skillSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.bar span');

    const animateSkills = () => {
        const sectionTop = skillSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) { // When 75% of the section is visible
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%';
            });
            window.removeEventListener('scroll', animateSkills); // Animate once
        }
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Call once on load in case section is already in view

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

            let isValid = true;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Name validation
            if (nameInput.value.trim() === '') {
                document.getElementById('nameError').textContent = 'Name is required.';
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }

            // Email validation (simple regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '' || !emailPattern.test(emailInput.value.trim())) {
                document.getElementById('emailError').textContent = 'A valid email is required.';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                document.getElementById('messageError').textContent = 'Message cannot be empty.';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                alert('Form submitted successfully!');
                // In a real application, you would send this data to a server
                contactForm.reset(); // Clear the form
            }
        });
    }
});