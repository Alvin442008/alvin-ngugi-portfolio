function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            return;
        }

        if (!emailPattern.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            return;
        }

        formMessage.textContent = 'Thank you! Your message has been submitted.';
        contactForm.reset();
    });
}