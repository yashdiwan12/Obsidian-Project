<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About - Obsidian</title>
    <link rel="stylesheet" href="Mstyle.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">
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
                <li><a href="about.php" class="active">About</a></li>
            </ul>
        <div class="nav-controls">
             <button id="theme-toggle-btn" class="theme-toggle">
                <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            <div class="nav-auth-buttons">
                <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
                    <!-- If user is logged in -->
                    <span class="welcome-message">Welcome, <?php echo htmlspecialchars($_SESSION['name']); ?>!</span>
                    <a href="logout.php" class="get-started-btn">Logout</a>
                <?php else: ?>
                    <!-- If user is NOT logged in -->
                    <a href="login.html" class="get-started-btn">Login</a>
                <?php endif; ?>
            </div>
        </div>
        </nav>
    </header>

    <main class="main">
        <!-- About Hero Section -->
        <section class="hero">
            <div class="hero-logo" id="heroLogo"></div>
            <h1 class="hero-title">About Obsidian</h1>
            <p style="color: #000000; font-size: 1.125rem;">
                Born from personal experience with cybercrime, built to protect others from the growing threats in our digital world.
            </p>
        </section>

        <!-- Inspiration Story Section -->
        <section id="inspiration-story" class="content-section">
            <div class="container">
                <h2 class="section-title">My Inspiration: A Personal Journey Against Cybercrime</h2>
                
                <div class="story-content">
                    <div class="story-intro card">
                        <h3>The Wake-Up Call</h3>
                        <p>The inspiration for this project didn't come from reading statistics or news articles about cybercrime—it came from watching the people I love most become targets of increasingly sophisticated scams. Over the past few years, my family and I have experienced firsthand how cybercriminals are evolving their tactics, preying on trust, urgency, and human emotions to steal money and personal information.</p>
                    </div>

                    <div class="story-incidents">
                        <div class="incident-card">
                            <h3>When Trust Becomes a Weapon</h3>
                            <p>It started with my mother receiving what seemed like a routine message on WhatsApp from her boss. The message was simple: they needed gift cards for an important client meeting. The request felt urgent and came from a familiar contact, so my mother was ready to help. Fortunately, something felt off, and she decided to verify the request through a different channel. It turned out to be a sophisticated identity theft scam where criminals had either cloned her boss's account or were using social engineering to impersonate them.</p>
                        </div>

                        <div class="incident-card">
                            <h3>The Grandmother Scam That Hit Home</h3>
                            <p>The most heart-wrenching incident happened to my grandmother. She received a distressing phone call from someone claiming to be a close friend of my uncle, saying there had been a serious accident. The caller spoke with urgency and intimate knowledge that made the story believable. In her panic and concern for her son, my grandmother immediately complied with their request for emergency funds. It was only later that we discovered my uncle was perfectly safe, and she had fallen victim to what's known as the "emergency scam" or "grandparent scam."</p>
                        </div>

                        <div class="incident-card">
                            <h3>The Pattern Emerges</h3>
                            <p>Soon after, I received my own suspicious call. The caller claimed they had accidentally sent money to my UPI account and desperately needed it returned. The story was crafted to create a sense of guilt and urgency—after all, who wouldn't want to help someone who made an honest mistake? Thankfully, my family's recent experiences had made me more vigilant.</p>
                            <p>The pattern didn't stop there. Friends began sharing similar stories—fake subscription renewals, bogus bill payment requests, and various other schemes designed to part people from their money or steal their personal information.</p>
                        </div>
                    </div>

                    <div class="story-realization card">
                        <h3>The Realization</h3>
                        <p>These experiences opened my eyes to a troubling reality: cybercriminals are not just targeting random victims with obvious scams anymore. They're studying human psychology, exploiting our relationships, and using our own kindness and trust against us. They're getting more sophisticated, more personal, and more convincing.</p>
                        <p>What struck me most was how these scams affected people across generations—from my tech-savvy friends to my grandmother who's less familiar with digital threats. The criminals were adapting their methods to target different demographics with personalized approaches.</p>
                    </div>

                    <div class="story-mission card">
                        <h3>The Mission</h3>
                        <p>These personal encounters with cybercrime didn't just make me angry—they inspired me to take action. I realized that awareness and education are our strongest weapons against these threats. While we can't stop every scam, we can empower people with knowledge, help them recognize warning signs, and create a community that's more resilient against cyber threats.</p>
                        <p>This project was born from the belief that everyone deserves to feel safe in our increasingly digital world. It's dedicated to my mother's vigilance, my grandmother's trust, and every person who has ever felt vulnerable to these sophisticated schemes.</p>
                        <div class="mission-statement">
                            <strong>Together, we can turn our experiences into protection for others.</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Get Started Section -->
        <section id="get-started-about" class="content-section">
            <div class="container">
                <div class="get-started-card card">
                    <h2>Ready to Protect Yourself?</h2>
                    <p>Start your journey toward better cybersecurity today. Use our tools to analyze threats, get answers to your security questions, and learn how to stay safe online.</p>
                    <div class="cta-buttons input-actions">
                        <a href="threat-query.html" class="tool-button">Ask a Security Question</a>
                        <a href="phishing-analyzer.html" class="tool-button">Analyze Suspicious Content</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script src="script.js"></script>
</body>
</html>