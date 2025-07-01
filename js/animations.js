class RestaurantUX {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('restaurantCart')) || [];
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupParallax();
        this.updateCartCount();
        
        // Hide loading screen after 2 seconds
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.display = 'flex';
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Menu filters
        const menuFilters = document.querySelectorAll('.menu-filter');
        menuFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.filterMenu(e.target.dataset.category);
                this.updateActiveFilter(e.target);
            });
        });

        // Add to cart buttons
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                const price = parseFloat(e.target.dataset.price);
                this.addToCart(name, price);
            });
        });

        // Reservation modal
        const reserveBtn = document.getElementById('reserveBtn');
        const reservationModal = document.getElementById('reservationModal');
        const closeModal = document.getElementById('closeModal');
        const reservationForm = document.getElementById('reservationForm');

        reserveBtn?.addEventListener('click', () => {
            reservationModal.classList.remove('hidden');
        });

        closeModal?.addEventListener('click', () => {
            reservationModal.classList.add('hidden');
        });

        reservationModal?.addEventListener('click', (e) => {
            if (e.target === reservationModal) {
                reservationModal.classList.add('hidden');
            }
        });

        reservationForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleReservation(e.target);
        });

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('glass-effect');
            } else {
                navbar.classList.remove('glass-effect');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                reservationModal.classList.add('hidden');
            }
            
            // Arrow keys for menu filters
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const activeFilter = document.querySelector('.menu-filter.active');
                const filters = Array.from(document.querySelectorAll('.menu-filter'));
                const currentIndex = filters.indexOf(activeFilter);
                
                let newIndex;
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : filters.length - 1;
                } else {
                    newIndex = currentIndex < filters.length - 1 ? currentIndex + 1 : 0;
                }
                
                filters[newIndex].click();
            }
        });
    }

    setupIntersectionObserver() {
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

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));
    }

    setupParallax() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const floatingElements = document.querySelectorAll('.floating');
            floatingElements.forEach((el, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    filterMenu(category) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach((item, index) => {
            const itemCategory = item.dataset.category;
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    updateActiveFilter(activeFilter) {
        const filters = document.querySelectorAll('.menu-filter');
        filters.forEach(filter => {
            filter.classList.remove('active', 'bg-gold', 'text-white');
            filter.classList.add('text-gray-600');
        });
        
        activeFilter.classList.add('active', 'bg-gold', 'text-white');
        activeFilter.classList.remove('text-gray-600');
    }

    addToCart(name, price) {
        const existingItem = this.cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ name, price, quantity: 1 });
        }
        
        localStorage.setItem('restaurantCart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.showNotification(`${name} agregado al carrito`);
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.classList.remove('hidden');
        } else {
            cartCount.classList.add('hidden');
        }
    }

    handleReservation(form) {
        const formData = new FormData(form);
        const reservationData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time'),
            guests: formData.get('guests')
        };
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Reserva confirmada exitosamente');
            document.getElementById('reservationModal').classList.add('hidden');
            form.reset();
        }, 1000);
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        notificationText.textContent = message;
        
        // Update notification style based on type
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 z-50 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        
        // Show notification
        notification.style.transform = 'translateX(0)';
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
        }, 3000);
    }

    // Utility methods
    debounce(func, wait) {
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

    // Custom CSS animations
    addCustomAnimation(element, animationName, duration = '0.5s') {
        element.style.animation = `${animationName} ${duration} ease-in-out`;
        
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    }

    // Hover effects for menu items
    setupHoverEffects() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.addCustomAnimation(item, 'pulse');
            });
        });
    }

    // Screen reader announcements
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize the restaurant UX when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RestaurantUX();
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});

// Performance optimization - lazy loading
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}