// Phishing Analyzer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Header effects
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Logo interactions
    const logoContainer = document.querySelector('.logo-container');
    logoContainer.addEventListener('click', function() {
        const logo = this.querySelector('.logo');
        logo.style.transform = 'rotate(45deg) scale(1.2)';
        setTimeout(() => {
            logo.style.transform = 'rotate(45deg) scale(1)';
        }, 300);
    });

    // Phishing analyzer functionality
    const analyzeBtn = document.getElementById('analyze-button');
    const clearBtn = document.getElementById('clear-button');
    const textarea = document.getElementById('phishing-content');
    const responseArea = document.getElementById('phishing-response');
    const spinner = document.querySelector('.button-spinner');

    // Analyze button handler
    analyzeBtn.addEventListener('click', function() {
        const emailContent = textarea.value.trim();
        
        if (!emailContent) {
            showError('Please paste email content to analyze.');
            return;
        }

        if (emailContent.length < 20) {
            showError('Please provide more complete email content for accurate analysis.');
            return;
        }

        startAnalysis();
        
        // Simulate AI analysis with realistic delay
        setTimeout(() => {
            analyzeEmail(emailContent);
        }, Math.random() * 1000 + 1500); // 1.5-2.5 seconds
    });

    // Clear button handler
    clearBtn.addEventListener('click', function() {
        textarea.value = '';
        resetResponseArea();
        textarea.focus();
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Auto-resize textarea
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.max(300, this.scrollHeight) + 'px';
    });

    function startAnalysis() {
        analyzeBtn.disabled = true;
        spinner.style.display = 'block';
        analyzeBtn.querySelector('span').textContent = 'Analyzing...';
        
        responseArea.innerHTML = `
            <div class="analyzing-state">
                <div class="analysis-spinner"></div>
                <h3>AI Analysis in Progress</h3>
                <p>Scanning for phishing indicators and threat patterns...</p>
                <div class="analysis-steps">
                    <div class="step active">Checking sender authenticity...</div>
                    <div class="step">Analyzing content patterns...</div>
                    <div class="step">Evaluating link safety...</div>
                    <div class="step">Generating threat assessment...</div>
                </div>
            </div>
        `;

        // Animate steps
        const steps = document.querySelectorAll('.step');
        let currentStep = 0;
        
        const stepInterval = setInterval(() => {
            if (currentStep < steps.length - 1) {
                steps[currentStep].classList.remove('active');
                steps[currentStep].classList.add('completed');
                currentStep++;
                steps[currentStep].classList.add('active');
            } else {
                clearInterval(stepInterval);
            }
        }, 400);
    }

    function analyzeEmail(content) {
        // Enhanced phishing detection patterns
        const phishingIndicators = [];
        const suspiciousPatterns = [
            { 
                pattern: /urgent|immediate|asap|act now|time.?sensitive|expires? (today|soon)|within \d+ hours?/i, 
                message: "Creates false urgency",
                severity: "high"
            },
            { 
                pattern: /click here|click now|download now|click.{0,10}link|download.{0,10}attachment/i, 
                message: "Suspicious call-to-action",
                severity: "medium"
            },
            { 
                pattern: /verify.{0,20}account|update.{0,20}information|confirm.{0,20}details|validate.{0,20}identity/i, 
                message: "Requests sensitive information verification",
                severity: "high"
            },
            { 
                pattern: /dear (customer|user|sir|madam|valued|member)/i, 
                message: "Generic greeting (legitimate companies use your name)",
                severity: "medium"
            },
            { 
                pattern: /suspended|closed|terminated|blocked|locked|frozen|restricted/i, 
                message: "Threats about account status",
                severity: "high"
            },
            { 
                pattern: /congratulations.{0,20}won|lottery|prize|winner|claim.{0,20}reward/i, 
                message: "Too good to be true offers",
                severity: "high"
            },
            {
                pattern: /password|ssn|social.?security|credit.?card|bank.?account|routing.?number/i,
                message: "Requests sensitive personal information",
                severity: "high"
            },
            {
                pattern: /free.{0,10}(gift|money|iphone|ipad|laptop)|limited.?time.?offer/i,
                message: "Suspicious promotional offers",
                severity: "medium"
            },
            {
                pattern: /security.?(alert|breach|violation)|unauthorized.?access|suspicious.?activity/i,
                message: "False security alerts to create panic",
                severity: "medium"
            }
        ];

        // Check for suspicious domains (simplified simulation)
        const domainPatterns = [
            { pattern: /\.(tk|ml|ga|cf)\b/i, message: "Uses suspicious domain extension", severity: "medium" },
            { pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i, message: "Uses IP address instead of domain", severity: "high" }
        ];

        // Analyze content
        suspiciousPatterns.forEach(({ pattern, message, severity }) => {
            if (pattern.test(content)) {
                phishingIndicators.push({ message, severity });
            }
        });

        domainPatterns.forEach(({ pattern, message, severity }) => {
            if (pattern.test(content)) {
                phishingIndicators.push({ message, severity });
            }
        });

        // Calculate risk level
        const highRiskCount = phishingIndicators.filter(i => i.severity === 'high').length;
        const mediumRiskCount = phishingIndicators.filter(i => i.severity === 'medium').length;
        
        let riskLevel;
        if (highRiskCount >= 2 || (highRiskCount >= 1 && mediumRiskCount >= 2)) {
            riskLevel = 'high';
        } else if (highRiskCount >= 1 || mediumRiskCount >= 2) {
            riskLevel = 'medium';
        } else if (mediumRiskCount >= 1) {
            riskLevel = 'low-medium';
        } else {
            riskLevel = 'low';
        }

        displayResults(riskLevel, phishingIndicators, content);
    }

    function displayResults(riskLevel, indicators, emailContent) {
        const riskColors = {
            high: { color: '#ef4444', bg: '#fef2f2', icon: '🚨', title: 'HIGH RISK' },
            medium: { color: '#f59e0b', bg: '#fffbeb', icon: '⚠️', title: 'MEDIUM RISK' },
            'low-medium': { color: '#f59e0b', bg: '#fffbeb', icon: '⚠️', title: 'LOW-MEDIUM RISK' },
            low: { color: '#10b981', bg: '#f0fdf4', icon: '✅', title: 'LOW RISK' }
        };

        const risk = riskColors[riskLevel];
        const confidence = calculateConfidence(indicators.length, emailContent.length);
        
        responseArea.innerHTML = `
            <div class="analysis-results">
                <div class="risk-header" style="background: ${risk.bg}; border-left: 4px solid ${risk.color};">
                    <div class="risk-icon">${risk.icon}</div>
                    <div class="risk-info">
                        <h3 style="color: ${risk.color};">${risk.title}</h3>
                        <p>Analysis Complete • Confidence: ${confidence}%</p>
                    </div>
                </div>
                
                <div class="indicators-section">
                    <h4>Detected Warning Signs (${indicators.length}):</h4>
                    ${indicators.length > 0 ? 
                        `<ul class="indicators-list">
                            ${indicators.map(indicator => 
                                `<li class="severity-${indicator.severity}">${indicator.message}</li>`
                            ).join('')}
                        </ul>` :
                        `<div class="no-indicators">✅ No obvious phishing indicators detected in this email.</div>`
                    }
                </div>
                
                <div class="recommendations">
                    <h4>Security Recommendations:</h4>
                    <div class="recommendation-text">
                        ${getRecommendations(riskLevel)}
                    </div>
                </div>

                <div class="additional-checks">
                    <h4>Additional Verification Steps:</h4>
                    <div class="check-list">
                        <div class="check-item">🔍 Verify sender through official website or phone</div>
                        <div class="check-item">🔗 Don't click links - navigate to site directly</div>
                        <div class="check-item">📱 Check with colleagues if work-related</div>
                        <div class="check-item">🛡️ Report to IT security if suspicious</div>
                    </div>
                </div>
            </div>
        `;

        // Reset button state
        analyzeBtn.disabled = false;
        spinner.style.display = 'none';
        analyzeBtn.querySelector('span').textContent = 'Analyze Email';
    }

    function calculateConfidence(indicatorCount, contentLength) {
        // Simple confidence calculation based on content length and indicators found
        const baseConfidence = Math.min(95, 60 + (contentLength / 50));
        const indicatorBonus = indicatorCount * 5;
        return Math.min(95, Math.round(baseConfidence + indicatorBonus));
    }

    function getRecommendations(riskLevel) {
        const recommendations = {
            high: `
                <p><strong>🚨 HIGH RISK - DO NOT INTERACT</strong></p>
                <p>• <strong>Do not click any links</strong> or download attachments</p>
                <p>• <strong>Do not reply</strong> or provide any information</p>
                <p>• <strong>Report immediately</strong> to your IT security team</p>
                <p>• <strong>Delete the email</strong> after reporting</p>
                <p>• <strong>Change passwords</strong> if you already interacted with this email</p>
            `,
            medium: `
                <p><strong>⚠️ MEDIUM RISK - EXERCISE EXTREME CAUTION</strong></p>
                <p>• <strong>Verify the sender</strong> through official channels before proceeding</p>
                <p>• <strong>Do not click links</strong> - navigate to the official website directly</p>
                <p>• <strong>Look for additional red flags</strong> in email headers and formatting</p>
                <p>• <strong>Consult with IT</strong> if this is work-related</p>
                <p>• <strong>When in doubt, don't interact</strong> with the email</p>
            `,
            'low-medium': `
                <p><strong>⚠️ LOW-MEDIUM RISK - PROCEED WITH CAUTION</strong></p>
                <p>• <strong>Double-check the sender</strong> authenticity</p>
                <p>• <strong>Verify any requests</strong> through alternative communication channels</p>
                <p>• <strong>Be cautious with links</strong> - check URLs before clicking</p>
                <p>• <strong>Trust your instincts</strong> if something feels off</p>
            `,
            low: `
                <p><strong>✅ LOW RISK - APPEARS LEGITIMATE</strong></p>
                <p>• Email appears to be legitimate, but <strong>stay vigilant</strong></p>
                <p>• <strong>Still verify important requests</strong> independently</p>
                <p>• <strong>Keep security software updated</strong> for ongoing protection</p>
                <p>• <strong>Monitor your accounts</strong> regularly for any suspicious activity</p>
                <p>• <strong>Report anything unusual</strong> to maintain security</p>
            `
        };
        return recommendations[riskLevel];
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
                <div class="waiting-icon">📧</div>
                <h3>Ready to Analyze</h3>
                <p>Paste your suspicious email content and click "Analyze Email" to get started.</p>
                <div class="example-note">
                    <small>💡 Tip: Include email headers (From, Subject, Date) for more accurate analysis</small>
                </div>
            </div>
        `;
    }

    // Enhanced tip cards interaction
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        card.addEventListener('click', function() {
            const icon = this.querySelector('.tip-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    });

    // Get Started button handler
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            textarea.focus();
            textarea.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (!analyzeBtn.disabled) {
                    analyzeBtn.click();
                }
            } else if (e.key === 'l') {
                e.preventDefault();
                clearBtn.click();
            }
        }
    });

    // Paste handler with auto-analysis option
    textarea.addEventListener('paste', function(e) {
        setTimeout(() => {
            if (this.value.length > 100) {
                const autoAnalyze = confirm('Email content detected. Would you like to analyze it automatically?');
                if (autoAnalyze) {
                    analyzeBtn.click();
                }
            }
        }, 100);
    });
});

// Add additional CSS for new elements
const additionalCSS = `
    .analysis-steps {
        margin-top: 1.5rem;
        text-align: left;
    }

    .step {
        padding: 0.5rem 1rem;
        margin: 0.25rem 0;
        border-radius: 6px;
        font-size: 0.875rem;
        opacity: 0.5;
        transition: all 0.3s ease;
    }

    .step.active {
        opacity: 1;
        background: rgba(99, 102, 241, 0.1);
        color: #6366f1;
        font-weight: 500;
    }

    .step.completed {
        opacity: 0.8;
        color: #10b981;
    }

    .step.completed::before {
        content: '✓ ';
        color: #10b981;
        font-weight: bold;
    }

    .severity-high {
        background: rgba(239, 68, 68, 0.1) !important;
        color: #dc2626 !important;
        border-left-color: #ef4444 !important;
    }

    .severity-medium {
        background: rgba(245, 158, 11, 0.1) !important;
        color: #d97706 !important;
        border-left-color: #f59e0b !important;
    }

    .additional-checks {
        margin-top: 2rem;
    }

    .additional-checks h4 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 1rem;
    }

    .check-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 0.75rem;
    }

    .check-item {
        background: rgba(248, 250, 252, 0.8);
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.875rem;
        color: #475569;
        border: 1px solid rgba(226, 232, 240, 0.6);
        transition: all 0.2s ease;
    }

    .check-item:hover {
        background: rgba(99, 102, 241, 0.05);
        border-color: rgba(99, 102, 241, 0.2);
    }

    .example-note {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(99, 102, 241, 0.05);
        border-radius: 8px;
        color: #6366f1;
        text-align: center;
    }

    @media (max-width: 768px) {
        .check-list {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);