<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obsidian - Cybersecurity, Demystified</title>
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
        <section class="hero-section">
            <div class="container">
                <h1 class="hero-description">Cybersecurity, Demystified.</h1>
                <p class="hero-subtitle">Your AI-powered guide to understanding threats, analyzing risks, and protecting your digital world. Free tools, clear answers.</p>
            </div>
        </section>

        <!-- NEW: "How It Works" Section -->
        <section id="how-it-works" class="content-section">
            <div class="container">
                <h2 class="section-title">A Simpler Path to Safety</h2>
                 <div class="steps-grid">
                    <div class="step-card">
                        <div class="step-icon">1</div>
                        <h3>Ask or Analyze</h3>
                        <p>Have a question? Use our Threat Query. Got a suspicious email? Use our Phishing Analyzer.</p>
                    </div>
                    <div class="step-card">
                        <div class="step-icon">2</div>
                        <h3>Get AI-Powered Insights</h3>
                        <p>Our tools provide instant, clear, and actionable analysis based on trusted security data.</p>
                    </div>
                    <div class="step-card">
                        <div class="step-icon">3</div>
                        <h3>Stay Protected</h3>
                        <p>Use the knowledge you gain to make smarter decisions and secure your digital life effectively.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- UPDATED: "Features" Section -->
        <section id="features" class="content-section">
            <div class="container">
                <h2 class="section-title">Features At a Glance</h2>
                <div class="threats-grid">
                    <div class="threat-card">
                        <div class="threat-icon">🧠</div>
                        <h3>AI Threat Query</h3>
                        <p>Get clear answers to complex cybersecurity questions, from setting up a VPN to understanding malware.</p>
                        <a href="threat-query.php" class="learn-more-link">Try The Query Tool →</a>
                    </div>
                    <div class="threat-card">
                        <div class="threat-icon">🎣</div>
                        <h3>Phishing Analyzer</h3>
                        <p>Automatically scan suspicious emails for red flags and get an instant verdict on their safety before you click.</p>
                         <a href="phishing-analyzer.php" class="learn-more-link">Analyze an Email →</a>
                    </div>
                    <div class="threat-card">
                        <div class="threat-icon">📚</div>
                        <h3>Trusted Knowledge Base</h3>
                        <p>Our AI's answers are grounded in up-to-date information from leading cybersecurity agencies and experts.</p>
                         <a href="about.php" class="learn-more-link">Learn About Our Mission →</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- NEW: Final CTA Section -->
        <section id="final-cta" class="cta-section">
            <div class="container">
                <h2>Ready to Secure Your Digital Life?</h2>
                <p>Create a free account to access all tools and start your journey to a safer online experience.</p>
                <a href="signup.html" class="get-started-btn cta-btn">Get Started for Free</a>
            </div>
        </section>

    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Obsidian. All Rights Reserved.</p>
            <p>This website provides educational information and links to external resources.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>

