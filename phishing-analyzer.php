<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obsidian</title>
    <link rel="stylesheet" href="Mstyle.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo-container">
                <img src="images/main.png" alt="Obsidian Logo" class="logo">
                <span class="brand-name">Obsidian</span>
            </div>
            <ul class="nav-links">
                <li><a href="index.php">Home</a></li>
                <li><a href="threat-query.php">Threat Query</a></li>
                <li><a href="phishing-analyzer.php" class="active">Phishing Analyzer</a></li>
                <li><a href="about.php">About</a></li>
            </ul>
            <div class="nav-controls">
                <!-- NEW: Theme Toggle Button -->
                <button id="theme-toggle-btn" class="theme-toggle">
                    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
                <div class="nav-auth-buttons">
                    <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
                        <span class="welcome-message">Welcome, <?php echo htmlspecialchars($_SESSION['name']); ?>!</span>
                        <a href="logout.php" class="get-started-btn">Logout</a>
                    <?php else: ?>
                        <a href="login.html" class="get-started-btn">Login</a>
                    <?php endif; ?>
                </div>
            </div>
        </nav>
    </header>

    <main class="main">
        <section class="tool-page">
            <div class="container">
                <div class="tool-header">
                    <div class="tool-icon"></div>
                    <h1 style="color:#0078ad;">Phishing Email Analyzer</h1>
                    <p class="tool-description">
                        Paste the full content of a suspicious email below. Our AI will analyze it for common red flags and deliver a verdict on its safety.
                    </p>
                </div>
                
                <div class="tool-container">
                    <div class="input-section">
                        <label for="phishing-content" class="input-label">Email Content</label>
                        <textarea 
                            id="phishing-content" 
                            class="tool-textarea" 
                            rows="12" 
                            placeholder="Paste the full email content here, including headers if available...

Example:
From: security@bank-alert.com
Subject: URGENT: Your account will be suspended
Date: Today

Dear Valued Customer,

We have detected suspicious activity on your account..."
                        ></textarea>
                        <div class="input-actions">
                            <button id="analyze-button" class="tool-button">
                                <span>Analyze Email</span>
                                <div class="button-spinner" style="display: none;"></div>
                            </button>
                            <button id="clear-button" class="tool-button-secondary">Clear</button>
                        </div>
                    </div>
                    
                    <div class="results-section">
                        <div class="response-area" id="phishing-response">
                            <div class="waiting-state">
                                <div class="waiting-icon"></div>
                                <h3>Ready to Analyze</h3>
                                <p>Paste your suspicious email content and click "Analyze Email" to get started.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tips-section">
                    <h2>Quick Phishing Detection Tips</h2>
                    <div class="tips-grid">
                        <div class="tip-card">
                            <div class="tip-icon"></div>
                            <h3>Check the Sender</h3>
                            <p>Look for misspelled domains or suspicious email addresses that don't match the claimed organization.</p>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon"></div>
                            <h3>Hover Over Links</h3>
                            <p>Before clicking, hover to see where links actually lead. Legitimate links should match the sender's domain.</p>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon"></div>
                            <h3>Urgency Red Flags</h3>
                            <p>Be wary of emails creating false urgency like "Account will be closed" or "Immediate action required".</p>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon"></div>
                            <h3>Generic Greetings</h3>
                            <p>Legitimate organizations usually use your name, not generic terms like "Dear Customer" or "Dear User".</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script src="script.js"></script>
    <script>
        // Phishing analyzer specific functionality
        document.addEventListener('DOMContentLoaded', function() {
            const analyzeBtn = document.getElementById('analyze-button');
            const clearBtn = document.getElementById('clear-button');
            const textarea = document.getElementById('phishing-content');
            const responseArea = document.getElementById('phishing-response');
            const spinner = document.querySelector('.button-spinner');

            analyzeBtn.addEventListener('click', function() {
                const emailContent = textarea.value.trim();
                
                if (!emailContent) {
                    showError('Please paste email content to analyze.');
                    return;
                }

                startAnalysis();
                
                // Simulate AI analysis
                setTimeout(() => {
                    analyzeEmail(emailContent);
                }, 2000);
            });

            clearBtn.addEventListener('click', function() {
                textarea.value = '';
                resetResponseArea();
                textarea.focus();
            });

            function startAnalysis() {
                analyzeBtn.disabled = true;
                spinner.style.display = 'block';
                analyzeBtn.querySelector('span').textContent = 'Analyzing...';
                
                responseArea.innerHTML = `
                    <div class="analyzing-state">
                        <div class="analysis-spinner"></div>
                        <h3>AI Analysis in Progress</h3>
                        <p>Scanning for phishing indicators...</p>
                    </div>
                `;
            }

            function analyzeEmail(content) {
                // Simple phishing detection simulation
                const phishingIndicators = [];
                const suspiciousPatterns = [
                    { pattern: /urgent|immediate|asap|act now/i, message: "Creates false urgency" },
                    { pattern: /click here|click now|download now/i, message: "Suspicious call-to-action" },
                    { pattern: /verify.*account|update.*information|confirm.*details/i, message: "Requests sensitive information" },
                    { pattern: /dear (customer|user|sir|madam)/i, message: "Generic greeting (not personalized)" },
                    { pattern: /suspended|closed|terminated|blocked/i, message: "Threats about account status" },
                    { pattern: /congratulations.*won|lottery|prize/i, message: "Too good to be true offers" }
                ];

                suspiciousPatterns.forEach(({ pattern, message }) => {
                    if (pattern.test(content)) {
                        phishingIndicators.push(message);
                    }
                });

                const riskLevel = phishingIndicators.length >= 3 ? 'high' : 
                                phishingIndicators.length >= 2 ? 'medium' : 'low';

                displayResults(riskLevel, phishingIndicators);
            }

            function displayResults(riskLevel, indicators) {
                const riskColors = {
                    high: { color: '#ef4444', bg: '#fef2f2', icon: '🚨' },
                    medium: { color: '#f59e0b', bg: '#fffbeb', icon: '⚠️' },
                    low: { color: '#10b981', bg: '#f0fdf4', icon: '✅' }
                };

                const risk = riskColors[riskLevel];
                
                responseArea.innerHTML = `
                    <div class="analysis-results">
                        <div class="risk-header" style="background: ${risk.bg}; border-left: 4px solid ${risk.color};">
                            <div class="risk-icon">${risk.icon}</div>
                            <div class="risk-info">
                                <h3 style="color: ${risk.color};">${riskLevel.toUpperCase()} RISK</h3>
                                <p>Analysis Complete</p>
                            </div>
                        </div>
                        
                        <div class="indicators-section">
                            <h4>Detected Indicators:</h4>
                            ${indicators.length > 0 ? 
                                `<ul class="indicators-list">
                                    ${indicators.map(indicator => `<li>${indicator}</li>`).join('')}
                                </ul>` :
                                `<p class="no-indicators">No obvious phishing indicators detected.</p>`
                            }
                        </div>
                        
                        <div class="recommendations">
                            <h4>Recommendations:</h4>
                            <div class="recommendation-text">
                                ${getRecommendations(riskLevel)}
                            </div>
                        </div>
                    </div>
                `;

                // Reset button state
                analyzeBtn.disabled = false;
                spinner.style.display = 'none';
                analyzeBtn.querySelector('span').textContent = 'Analyze Email';
            }

            function getRecommendations(riskLevel) {
                const recommendations = {
                    high: `
                        <p><strong>🚨 High Risk - Do Not Interact</strong></p>
                        <p>• Do not click any links or download attachments</p>
                        <p>• Do not reply or provide any information</p>
                        <p>• Report this email to your IT department</p>
                        <p>• Delete the email immediately</p>
                    `,
                    medium: `
                        <p><strong>⚠️ Medium Risk - Exercise Caution</strong></p>
                        <p>• Verify the sender through official channels</p>
                        <p>• Do not click links - navigate to the site directly</p>
                        <p>• Look for additional red flags</p>
                        <p>• When in doubt, don't interact</p>
                    `,
                    low: `
                        <p><strong>✅ Low Risk - Appears Safe</strong></p>
                        <p>• Email appears legitimate but stay vigilant</p>
                        <p>• Still verify important requests independently</p>
                        <p>• Trust your instincts if something feels off</p>
                        <p>• Keep security software updated</p>
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
                    </div>
                `;
            }
        });
    </script>
</body>
</html>