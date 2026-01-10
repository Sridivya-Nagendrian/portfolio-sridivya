// script.js - COMPLETE FIXED VERSION
$(document).ready(function () {
    // Initialize AOS animations
    AOS.init({
        duration: 600,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
        mirror: false
    });
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    // Make sure body is visible immediately
    $('body').css('visibility', 'visible');
    
    // Enhanced loading animation
    setTimeout(() => {
        $('#page-loader').fadeOut(400, function() {
            $('body').css('overflow', 'auto');
            // Start animations after loader is gone
            initializeAnimations();
        });
    }, 4000);
    
    // Set current year in footer
    $('#currentYear').text(new Date().getFullYear());
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    
    let scrollTimeout;
    $(window).on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Navbar background on scroll
            if ($(window).scrollTop() > 30) {
                $('.portfolio-nav').addClass('scrolled');
            } else {
                $('.portfolio-nav').removeClass('scrolled');
            }
            
            // Back to top button
            if ($(window).scrollTop() > 200) {
                $('#backToTop').addClass('visible');
            } else {
                $('#backToTop').removeClass('visible');
            }
            
            // Update active nav link based on scroll position
            updateActiveNavLink();
        }, 10);
    });
    
    // ============================================
    // SMOOTH SCROLL NAVIGATION
    // ============================================
    
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        if(target === '#') return;
        
        // Close mobile menu if open
        if ($(window).width() <= 768) {
            $('#navbarMenu').collapse('hide');
        }
        
        // Update active nav link immediately
        $('.nav-animate').removeClass('active');
        $(this).addClass('active');
        
        // Smooth scroll animation
        const targetElement = $(target);
        if (targetElement.length) {
            $('html, body').stop().animate({
                scrollTop: targetElement.offset().top - 70
            }, 600, 'easeInOutQuad');
        }
    });
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    
    $('#backToTop').on('click', function() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 600, 'easeInOutQuad');
        
        // Update active nav link
        $('.nav-animate').removeClass('active');
        $('a[href="#home"]').addClass('active');
    });
    
    // ============================================
    // UPDATE ACTIVE NAV LINK FUNCTION
    // ============================================
    
    function updateActiveNavLink() {
        const scrollPosition = $(window).scrollTop() + 80;
        let currentSection = '';
        
        // Check each section
        $('section').each(function() {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionHeight = section.outerHeight();
            const sectionId = section.attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
                return false;
            }
        });
        
        if (currentSection) {
            $('.nav-animate').removeClass('active');
            $(`a[href="#${currentSection}"]`).addClass('active');
        }
    }
    
    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        
        // Basic form validation
        const name = $(this).find('input[type="text"]').val().trim();
        const email = $(this).find('input[type="email"]').val().trim();
        const message = $(this).find('textarea').val().trim();
        
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading overlay
        $('#form-overlay').fadeIn(300);
        
        // Simulate sending process
        setTimeout(() => {
            $('#form-overlay').fadeOut(300, function() {
                // Show success modal
                $('#success-modal').fadeIn(300);
                
                // Clear form
                $('#contactForm')[0].reset();
            });
        }, 1200);
    });
    
    // ============================================
    // SUCCESS MODAL OK BUTTON
    // ============================================
    
    $('#successOk').on('click', function () {
        $('#success-modal').fadeOut(200);
    });
    
    // ============================================
    // WHATSAPP BUTTON
    // ============================================
    
    $('#whatsappBtn').on('click', function() {
        const phoneNumber = "916369039328";
        const message = "Hi Sridivya, I came across your portfolio and wanted to connect with you.";
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    });
    
    // ============================================
    // ENHANCED ANIMATIONS
    // ============================================
    
    function initializeAnimations() {
        // Check if GSAP is loaded
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded - using CSS animations only');
            return;
        }
        
        // Initialize GSAP
        gsap.registerPlugin(ScrollTrigger);
        
        // Profile image floating elements
        gsap.to('.floating-element.element-1', {
            y: -20,
            x: 10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        gsap.to('.floating-element.element-2', {
            y: 15,
            x: -15,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5
        });
        
        gsap.to('.floating-element.element-3', {
            y: -15,
            x: -5,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
        
        // Profile image animation rings
        gsap.to('.profile-animation-ring', {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
        
        gsap.to('.profile-animation-ring.ring-2', {
            rotation: -360,
            duration: 25,
            repeat: -1,
            ease: "none"
        });
        
        // Animate skill progress bars (for skills section only)
        $('.skill-progress .progress-bar').each(function() {
            const width = $(this).css('width');
            $(this).css('width', '0');
            
            gsap.to($(this), {
                width: width,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: $(this).closest('.skill-card'),
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });
    }
    
    // ============================================
    // TYPING ANIMATIONS
    // ============================================
    
    function initTypingAnimations() {
        const typingElements = document.querySelectorAll('.animate-text[data-text]');
        
        typingElements.forEach((element) => {
            const text = element.getAttribute('data-text');
            element.textContent = text;
        });
    }
    
    // ============================================
    // CONTACT CARD HOVER EFFECTS
    // ============================================
    
    function initContactCardHovers() {
        const contactItems = document.querySelectorAll('.contact-info-item');
        
        contactItems.forEach(item => {
            // Add ripple effect on click
            item.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
                
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(59, 130, 246, 0.3);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // ============================================
    // NOTIFICATION FUNCTION
    // ============================================
    
    function showNotification(message, type = 'success') {
        const notification = $(`
            <div class="notification ${type}">
                <i class="bi ${type === 'error' ? 'bi-x-circle' : 'bi-check-circle'}"></i>
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(notification, 
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            
            setTimeout(() => {
                gsap.to(notification, {
                    y: -50,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => notification.remove()
                });
            }, 3000);
        } else {
            // Fallback if GSAP not available
            notification.css({ 
                transform: 'translateY(-50px)', 
                opacity: 0 
            });
            
            setTimeout(() => {
                notification.css({ 
                    transform: 'translateY(0)', 
                    opacity: 1 
                });
            }, 10);
            
            setTimeout(() => {
                notification.fadeOut(300, () => notification.remove());
            }, 3000);
        }
    }
    
    // Initialize contact card hovers
    initContactCardHovers();
    
    // Initialize typing animations
    initTypingAnimations();
    
    // Initial scroll check
    $(window).trigger('scroll');
    
    // ============================================
    // INITIAL LOG
    // ============================================
    
    console.log('Portfolio website initialized successfully!');
});