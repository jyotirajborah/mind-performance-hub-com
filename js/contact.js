document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
            formMessage.style.display = 'block';
            formMessage.style.background = '#d4edda';
            formMessage.style.color = '#155724';
            formMessage.style.padding = '1rem';
            formMessage.style.borderRadius = '6px';
            formMessage.style.marginTop = '1rem';
            
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});
