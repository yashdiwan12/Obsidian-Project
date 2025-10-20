document.addEventListener('DOMContentLoaded', function(){
    
    const header = document.querySelector('.header');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const learnMoreLinks = document.querySelectorAll('.learn-more-link');
    const heroLogo = document.getElementById('heroLogo');
    const heroTitle = document.querySelector('.hero-title');
    const navLinks = document.querySelectorAll('.nav-links a');
    const badges = document.querySelectorAll('.badge');
    const brandName = document.querySelector('.brand-name');
    const logoContainer = document.querySelector('.logo-container');
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    let isLogoClicked = false;
    let typewriterActive = false;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || 'light'; 
    applyTheme(currentTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme;
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                newTheme = 'light';
            } else {
                body.classList.add('dark-theme');
                newTheme = 'dark';
            }
            localStorage.setItem('theme', newTheme);
        });
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (header) {
            if (currentScrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = 'none';
            }
        }
    });

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            showPasswordModal('your-secret-password', () => {
                console.log('Access Granted! Redirecting to tools...');
                window.location.href = 'tools.html'; 
            });
        });
    }

    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const threat = this.dataset.threat;
            showThreatInfo(threat);
        });
    });

    if (heroLogo) {
        heroLogo.addEventListener('click', function() {
            isLogoClicked = true;
            this.style.transform = 'rotate(45deg) scale(1.2) rotateY(180deg)';
            
            setTimeout(() => {
                isLogoClicked = false;
            }, 300);
        });
    }

    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        badge.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-4px) scale(1.05)';
            }, 100);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    if (brandName && logoContainer) {
        const originalText = brandName.textContent;
        function typewriterEffect() {
            if (typewriterActive) return;
            typewriterActive = true;
            
            brandName.textContent = '';
            let i = 0;
            
            const typeInterval = setInterval(() => {
                brandName.textContent += originalText[i];
                i++;
                if (i >= originalText.length) {
                    clearInterval(typeInterval);
                    typewriterActive = false;
                }
            }, 100);
        }
        logoContainer.addEventListener('mouseenter', typewriterEffect);
    }
    
    function showThreatInfo(threatType) {
        const threatInfo = {
            'phishing': { title: 'Phishing', content: 'Detailed info about phishing...'},
            'malware': { title: 'Malware', content: 'Detailed info about malware...'},
            'passwords': { title: 'Weak Passwords', content: 'Detailed info about weak passwords...'},
            'wifi': { title: 'Unsecured Wi-Fi', content: 'Detailed info about unsecured Wi-Fi...'},
            'social-engineering': { title: 'Social Engineering', content: 'Detailed info about social engineering...'}
        };
        const info = threatInfo[threatType];
        if (info) {
            alert(`${info.title}\n\n${info.content}`);
        }
    }
    
    function showPasswordModal(correctPassword, onSuccess) {
        const modal = document.getElementById('password-modal');
        const form = document.getElementById('password-form');
        const passwordInput = document.getElementById('password-input');
        const errorMessage = document.getElementById('error-message');
    
        modal.classList.remove('hidden');
        passwordInput.focus();
    
        form.onsubmit = function(event) {
            event.preventDefault();
            const enteredPassword = passwordInput.value;
    
            if (enteredPassword === correctPassword) {
                modal.classList.add('hidden');
                passwordInput.value = '';
                errorMessage.textContent = '';
                onSuccess();
            } else {
                errorMessage.textContent = 'Incorrect password. Please try again.';
                passwordInput.value = '';
            }
        };
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.content-section, .threat-card').forEach(el => {
        observer.observe(el);
    });

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    setInterval(createParticle, 500);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                opacity: 0;
                transform: translateY(0);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateY(-100px);
            }
        }
        .particle {
            position: fixed;
            bottom: 0;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(0, 120, 173, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: floatUp linear forwards;
            z-index: -1;
        }
        .ripple {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes rippleEffect {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    const ragQuestionInput = document.getElementById('rag-question');
    const askButton = document.getElementById('ask-button');
    const ragResponseArea = document.getElementById('rag-response');

    const phishingContentInput = document.getElementById('phishing-content');
    const analyzeButton = document.getElementById('analyze-button');
    const phishingResponseArea = document.getElementById('phishing-response');

    const API_URL = 'http://127.0.0.1:5001'; 

    const handleApiCall = async (button, input, responseArea, endpoint, payloadKey, thinkingMessage) => {
        const content = input.value.trim();
        if (!content) {
            alert('Please provide input before proceeding.');
            return;
        }
        
        const originalButtonText = button.textContent;
        button.disabled = true;
        button.textContent = 'Processing...';
        responseArea.textContent = thinkingMessage;

        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [payloadKey]: content })
            });
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            
            const data = await response.json();
            const answer = data.answer || data.analysis;
            responseArea.textContent = answer || 'No valid response received.';

        } catch (error) {
            console.error('API Call Failed:', error);
            responseArea.textContent = `Error: Could not connect to the Obsidian server. Please ensure it is running.`;
        } finally {
            button.disabled = false;
            button.textContent = originalButtonText;
        }
    };

    if (askButton) {
        askButton.addEventListener('click', () => {
            handleApiCall(askButton, ragQuestionInput, ragResponseArea, 'ask-rag', 'question', 'Querying knowledge base...');
        });
    }

    if (analyzeButton) {
        analyzeButton.addEventListener('click', () => {
            handleApiCall(analyzeButton, phishingContentInput, phishingResponseArea, 'analyze-phishing', 'email_content', 'Analyzing email for threats...');
        });
    }
});