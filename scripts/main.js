/* ==================================
   PIZZA NAPOLI - Customer Site JavaScript
   Interactive Elements & Form Handling
   ================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // --- Order Form Submission ---
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                delivery: document.querySelector('input[name="delivery"]:checked').value,
                payment: document.querySelector('input[name="payment"]:checked').value,
                rememberContacts: document.getElementById('remember-contacts').checked
            };
            
            console.log('Order request:', formData);
            
            // Save contacts to localStorage if checked
            if (formData.rememberContacts) {
                localStorage.setItem('pizzaNapoliContacts', JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                }));
            }
            
            // Show success message
            alert(`Grazie! Спасибо за заказ, ${formData.name}! Мы свяжемся с вами в ближайшее время по номеру ${formData.phone}.`);
            
            // Reset form
            orderForm.reset();
        });
    }
    
    // --- Delivery Cost Toggle ---
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const deliveryCostGroup = document.getElementById('delivery-cost-group');
    
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'delivery') {
                deliveryCostGroup.classList.remove('hidden');
            } else {
                deliveryCostGroup.classList.add('hidden');
            }
        });
    });
    
    // --- Load Saved Contacts ---
    const savedContacts = localStorage.getItem('pizzaNapoliContacts');
    if (savedContacts) {
        const contacts = JSON.parse(savedContacts);
        document.getElementById('name').value = contacts.name || '';
        document.getElementById('email').value = contacts.email || '';
        document.getElementById('phone').value = contacts.phone || '';
        document.getElementById('remember-contacts').checked = true;
    }
    
    // --- Set minimum date for order to today ---
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || this.classList.contains('nav-toggle')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .category-card, .contact-card, .info-block');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // --- Parallax Effect for Hero Section ---
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (heroBg && scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    if (header) {
        const updateHeader = () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        };
        
        window.addEventListener('scroll', updateHeader);
        updateHeader();
    }
    
    console.log('🍕 Pizza Napoli website initialized successfully!');
});

// --- Utility Functions ---

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
