document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const askBtn = document.getElementById('ask-button');
    const clearBtn = document.getElementById('clear-button');
    const questionInput = document.getElementById('rag-question');
    const responseArea = document.getElementById('rag-response');
    const spinner = document.querySelector('.button-spinner');
    const brandName = document.querySelector('.brand-name');
    const logoContainer = document.querySelector('.logo-container');
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    let typewriterActive = false;
    let isProcessing = false;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            console.log('✅ Dark theme applied');
        } else {
            body.classList.remove('dark-theme');
            console.log('✅ Light theme applied');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || 'light'; 
    console.log('🔍 Saved theme:', savedTheme, '| Current theme:', currentTheme);
    applyTheme(currentTheme);

    if (themeToggleButton) {
        console.log('✅ Theme toggle button found');
        themeToggleButton.addEventListener('click', () => {
            let newTheme;
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                newTheme = 'light';
                console.log('🌞 Switched to light theme');
            } else {
                body.classList.add('dark-theme');
                newTheme = 'dark';
                console.log('🌙 Switched to dark theme');
            }
            localStorage.setItem('theme', newTheme);
            console.log('💾 Theme saved to localStorage:', newTheme);
        });
    } else {
        console.error('❌ Theme toggle button NOT found!');
    }

    window.addEventListener('scroll', () => {
        if (header) {
            const isDark = body.classList.contains('dark-theme');
            if (window.scrollY > 50) {
                header.style.background = isDark ? 'rgba(10, 25, 47, 0.95)' : 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = isDark ? 'rgba(10, 25, 47, 0.8)' : 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            }
        }
    });

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            showModal('Welcome to Obsidian Security! 🔒\n\nThis is the Threat Query tool. Ask any security question below and get expert insights powered by our knowledge base.');
        });
    }
    
    if (brandName && logoContainer) {
        const originalText = brandName.textContent;
        logoContainer.addEventListener('mouseenter', () => {
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
        });
    }

    if (questionInput) {
        questionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !isProcessing) {
                askBtn.click();
            }
        });
    }
    if (askBtn) {
        askBtn.addEventListener('click', function() {
            const question = questionInput.value.trim();
            
            if (!question) {
                showError('Please enter a security question to get started.');
                return;
            }

            if (isProcessing) return;

            startQuery();
            callRagApi(question);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            questionInput.value = '';
            resetResponseArea();
            questionInput.focus();
        });
    }


    function startQuery() {
        isProcessing = true;
        askBtn.disabled = true;
        if (spinner) spinner.style.display = 'block';
        if (askBtn.querySelector('span')) {
            askBtn.querySelector('span').textContent = 'Processing...';
        }
        
        responseArea.innerHTML = `
            <div class="analyzing-state">
                <div class="analysis-spinner"></div>
                <h3>AI Analysis in Progress</h3>
                <p>Connecting to Obsidian knowledge base...</p>
            </div>
        `;
    }

    async function callRagApi(question) {
        try {
            const response = await fetch('http://localhost:5001/ask-rag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            displayBackendAnswer(data.answer, question);

        } catch (error) {
            console.error("API call failed:", error);
            
            if (error.message.includes('fetch')) {
                showConnectionError();
            } else {
                showError(`Backend error: ${error.message}`);
            }
            
            console.log("Falling back to local knowledge base...");
            setTimeout(() => {
                processLocalQuery(question);
            }, 1000);
        } finally {
            resetButtonState();
        }
    }

    function displayBackendAnswer(answer, question) {
        responseArea.innerHTML = `
            <div class="query-results">
                <div class="answer-header" style="background-color: #f7fafc; border: 1px solid #e2e8f0;">
                    <div class="answer-icon">🛡️</div>
                    <div class="answer-info">
                        <h3>Obsidian RAG Response</h3>
                        <p>AI-Generated from Knowledge Base</p>
                    </div>
                </div>
                
                <div class="answer-content">
                    <div style="white-space: pre-wrap; line-height: 1.7;">${answer}</div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-radius: 8px; border-left: 3px solid #4a41d4;">
                    <p style="font-size: 0.9rem; color: #4a5568; margin: 0;">
                        💡 <strong>Connected to Backend:</strong> This response was generated using the Obsidian RAG system with real-time knowledge base lookup.
                    </p>
                </div>
            </div>
        `;
    }

    function showConnectionError() {
        responseArea.innerHTML = `
            <div class="error-state">
                <div class="error-icon">🔌</div>
                <h3>Backend Connection Failed</h3>
                <p>Could not connect to the Obsidian server. Please ensure the backend is running on localhost:5001.</p>
                <p style="margin-top: 15px; font-size: 0.9rem; color: #4a5568;">
                    Falling back to local knowledge base...
                </p>
            </div>
        `;
    }

    function processLocalQuery(question) {
        const responses = {
            'wifi': {
                topic: 'Wi-Fi Network Security',
                answer: `To secure your home Wi-Fi network effectively:

**Essential Steps:**
• Change the default router password immediately
• Use WPA3 encryption (or WPA2 if WPA3 isn't available)
• Create a strong, unique network name (SSID) - avoid personal information
• Enable network firewall and keep router firmware updated
• Disable WPS (Wi-Fi Protected Setup) as it's vulnerable to attacks

**Advanced Security Measures:**
• Set up a guest network for visitors and IoT devices
• Use MAC address filtering for added device control
• Regularly monitor connected devices for unauthorized access
• Consider using a VPN router for additional privacy protection

**Regular Maintenance:**
• Update router firmware monthly
• Change Wi-Fi password every 3-6 months
• Review connected devices quarterly to remove unused ones`
            },
            'password': {
                topic: 'Password Security Best Practices',
                answer: `Strong password security is fundamental to cybersecurity:

**Password Creation Guidelines:**
• Use at least 12 characters with mixed case, numbers, and symbols
• Avoid personal information, common words, or predictable patterns
• Create unique passwords for every account - no reuse
• Consider passphrases: "Coffee#Morning$Run2024!" instead of complex gibberish

**Password Management:**
• Use a reputable password manager (1Password, Bitwarden, LastPass)
• Enable two-factor authentication (2FA) wherever possible
• Use app-based authenticators rather than SMS when available
• Store backup codes in a secure location

**Red Flags to Avoid:**
• Never share passwords via email or messaging
• Don't save passwords in browsers on shared computers
• Avoid password hints that are easily guessable
• Change passwords immediately if there's a suspected breach`
            },
            'phishing': {
                topic: 'Phishing Attack Prevention',
                answer: `Protect yourself from phishing attacks with these strategies:

**Email Safety:**
• Verify sender authenticity before clicking links or attachments
• Look for spelling errors, urgent language, and generic greetings
• Hover over links to see actual destinations before clicking
• Never provide sensitive information via email

**Website Verification:**
• Check for HTTPS and valid SSL certificates
• Look for official logos, proper spelling, and professional design
• Verify URLs match the legitimate organization's domain
• Be wary of shortened URLs or suspicious redirects

**Response Protocols:**
• When in doubt, contact the organization directly through official channels
• Report phishing attempts to your IT department and relevant authorities
• Don't reply to or interact with suspicious messages
• Keep your email client and browser security settings updated`
            },
            'default': {
                topic: 'General Cybersecurity Guidance',
                answer: `Here are fundamental cybersecurity principles to protect yourself:

**Core Security Practices:**
• Keep all software and operating systems updated with latest patches
• Use reputable antivirus software and keep it current
• Be cautious with email attachments and links from unknown senders
• Backup important data regularly using the 3-2-1 rule

**Online Safety:**
• Verify website authenticity before entering sensitive information
• Use secure, encrypted connections (look for HTTPS and the lock icon)
• Be skeptical of unsolicited offers or urgent security warnings
• Limit personal information shared on social media platforms

**Incident Response:**
• Monitor financial accounts and credit reports regularly
• Report suspicious activities to relevant authorities promptly
• Have an incident response plan for potential security breaches
• Keep emergency contacts and important account information secure

For specific security concerns, please provide more details about your particular situation or technology environment.`
            }
        };

        let selectedResponse = responses.default;
        const lowerQuestion = question.toLowerCase();

        if (lowerQuestion.includes('wifi') || lowerQuestion.includes('wi-fi') || lowerQuestion.includes('network') || lowerQuestion.includes('router')) {
            selectedResponse = responses.wifi;
        } else if (lowerQuestion.includes('password') || lowerQuestion.includes('authentication') || lowerQuestion.includes('login')) {
            selectedResponse = responses.password;
        } else if (lowerQuestion.includes('phishing') || lowerQuestion.includes('email') || lowerQuestion.includes('scam')) {
            selectedResponse = responses.phishing;
        }

        displayLocalAnswer(selectedResponse.topic, selectedResponse.answer);
    }

    function displayLocalAnswer(topic, answer) {
        responseArea.innerHTML = `
            <div class="query-results">
                <div class="answer-header" style="background-color: #fff7ed; border: 1px solid #fed7aa;">
                    <div class="answer-icon">🛡️</div>
                    <div class="answer-info">
                        <h3>${topic}</h3>
                        <p>Local Knowledge Base (Fallback Mode)</p>
                    </div>
                </div>
                
                <div class="answer-content">
                    ${formatAnswerContent(answer)}
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 3px solid #f59e0b;">
                    <p style="font-size: 0.9rem; color: #4a5568; margin: 0;">
                        ⚠️ <strong>Offline Mode:</strong> This response was generated using local knowledge base. For the most current information, please ensure the backend server is running.
                    </p>
                </div>
            </div>
        `;
    }

    function formatAnswerContent(answer) {
        return answer.split('\n').map(line => {
            if (line.startsWith('**') && line.endsWith(':**')) {
                return `<h4 style="color: #4a41d4; margin-top: 20px; margin-bottom: 10px; font-weight: 600;">${line.replace(/\*\*/g, '')}</h4>`;
            } else if (line.startsWith('• ')) {
                return `<li style="margin-bottom: 8px; color: #2d3748;">${line.substring(2)}</li>`;
            } else if (line.trim() === '') {
                return '';
            } else {
                return `<p style="margin-bottom: 15px; color: #1a202c;">${line}</p>`;
            }
        }).join('');
    }

    function showError(message) {
        responseArea.innerHTML = `
            <div class="error-state">
                <div class="error-icon">❌</div>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }

    function resetResponseArea() {
        responseArea.innerHTML = `
            <div class="waiting-state">
                <div class="waiting-icon">🤖</div>
                <h3>Ready to Help</h3>
                <p>Ask any cybersecurity question and get expert insights powered by our knowledge base.</p>
            </div>
        `;
    }

    function resetButtonState() {
        isProcessing = false;
        askBtn.disabled = false;
        if (spinner) spinner.style.display = 'none';
        if (askBtn.querySelector('span')) {
            askBtn.querySelector('span').textContent = 'Ask Obsidian';
        }
    }

    function showModal(content) {
        alert(content);
    }

    function init() {
        questionInput.focus();
        console.log('Enhanced Threat Query RAG system initialized with backend integration');
    }

    init();

    const style = document.createElement('style');
    style.textContent = `
        .get-started-btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .analysis-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e2e8f0;
            border-top: 3px solid #4a41d4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .analyzing-state {
            text-align: center;
            color: #4a5568;
        }
        .analyzing-state h3 {
            font-size: 1.4rem;
            margin-bottom: 8px;
            color: #080312;
            font-weight: 600;
        }
        .query-results {
            text-align: left;
            color: #1a202c;
            width: 100%;
        }
        .answer-header {
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .answer-icon {
            font-size: 2rem;
        }
        .answer-info h3 {
            font-size: 1.3rem;
            margin-bottom: 4px;
            color: #080312;
            font-weight: 600;
        }
        .answer-info p {
            color: #4a5568;
            font-size: 0.9rem;
        }
        .answer-content {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 25px;
            line-height: 1.7;
            font-size: 1rem;
            color: #1a202c;
        }
        .error-state {
            text-align: center;
            color: #e53e3e;
        }
        .error-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }
        .error-state h3 {
            font-size: 1.4rem;
            margin-bottom: 8px;
            font-weight: 600;
        }
        .waiting-state {
            text-align: center;
            color: #4a5568;
        }
        .waiting-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            opacity: 0.7;
        }
        .waiting-state h3 {
            font-size: 1.4rem;
            margin-bottom: 8px;
            color: #080312;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});