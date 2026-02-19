// Simple fade-in animation on scroll
const cards = document.querySelectorAll('.product-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});
cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s ease";
    observer.observe(card);
});

// Order form submission
const orderForm = document.getElementById('orderForm');
const formStatus = document.getElementById('form-status');

orderForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const message = document.getElementById('message').value.trim();

    // Show loading state
    formStatus.textContent = 'Sending your order...';
    formStatus.style.color = '#888';

    try {
        const response = await fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, product, quantity, message })
        });

        const data = await response.json();

        if (response.ok) {
            formStatus.textContent = '✅ Order received! We\'ll contact you soon.';
            formStatus.style.color = '#2D6A4F';
            orderForm.reset();
        } else {
            formStatus.textContent = '❌ ' + (data.error || 'Something went wrong. Please try again.');
            formStatus.style.color = '#E63950';
        }
    } catch (error) {
        formStatus.textContent = '❌ Could not connect to the server. Please try again later.';
        formStatus.style.color = '#E63950';
    }
});