<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obsidian - Threat Query</title>
    <link rel="stylesheet" href="Mstyle.css">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
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
                <li><a href="threat-query.php" class="active">Threat Query</a></li>
                <li><a href="phishing-analyzer.php">Phishing Analyzer</a></li>
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
                    <h1 style="color: #0078ad">Threat Query [RAG]</h1>
                    <p class="tool-description">
                        Ask Obsidian any cybersecurity question. Our AI synthesizes answers from a curated knowledge base of trusted security documents to ensure accuracy and relevance.
                    </p>
                </div>
                
                <div class="tool-container">
                    <div class="input-section">
                        <label for="rag-question" class="input-label">Your Security Question</label>
                        <input 
                            type="text" 
                            id="rag-question" 
                            class="tool-input" 
                            placeholder="e.g., How do I secure my home Wi-Fi network against intrusions?"
                        >
                        <div class="input-actions">
                            <button id="ask-button" class="tool-button">
                                <span>Ask Obsidian</span>
                                <div class="button-spinner" style="display: none;"></div>
                            </button>
                            <button id="clear-button" class="tool-button-secondary">Clear</button>
                        </div>
                    </div>
                    
                    <div class="results-section">
                        <div class="response-area" id="rag-response">
                            <div class="waiting-state">
                                <div class="waiting-icon"></div>
                                <h3>Ready to Help</h3>
                                <p>Ask any cybersecurity question and get expert insights powered by our knowledge base.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tips-section">
                    <h2>Popular Security Topics</h2>
                    <div class="tips-grid">
                        <div class="tip-card">
                            <div class="tip-icon"></div>
                            <h3>Password Security</h3>
                            <p>Learn about strong password creation, password managers, and multi-factor authentication best practices.</p>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon"></div>
                            <h3>Mobile Security</h3>
                            <p>Discover how to secure your smartphones and tablets against malware, phishing, and data breaches.</p>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon"></div>
                            <h3>Network Protection</h3>
                            <p>Understanding firewalls, VPNs, and how to secure your home and business networks effectively.</p>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon"></div>
                            <h3>Cloud Security</h3>
                            <p>Best practices for securing cloud storage, applications, and maintaining data privacy online.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script src="threat-script.js"></script>
</body>
</html>