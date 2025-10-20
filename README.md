Obsidian - AI Security Advisor

Obsidian is a web-based application designed to make cybersecurity knowledge accessible to everyone. It provides a suite of AI-powered tools to help users understand digital threats, analyze suspicious content, and learn how to protect themselves online. The platform features a user authentication system, a friendly AI assistant for answering security questions, and a phishing email analyzer.

Features

User Authentication: Secure user registration and login system built with PHP and MySQL.

AI-Powered Threat Query: An interactive tool allowing users to ask any cybersecurity question and receive answers from an AI assistant grounded in a trusted knowledge base.

Phishing Email Analyzer: A tool to analyze the content of suspicious emails and provide a verdict on their safety.

Educational Content: Sections dedicated to explaining common cybersecurity threats in simple terms.

Light/Dark Theme: A modern user interface with a theme switcher for user preference.

Project File Structure

Here is a visual breakdown of the project's file and folder organization.

Obsidian-Project/
│
├── 📜 index.php               # Main landing page (PHP)
├── 📜 about.html             # About Us page
├── 📜 tools.html              # Hub page for all tools
├── 📜 threat-query.html       # Threat Query tool page
├── 📜 phishing-analyzer.html  # Phishing analysis tool page
│
├── 🎨 Mstyle.css              # Main stylesheet for all pages
├── ⚙️ script.js               # Frontend JavaScript (Theme switching, etc.)
│
├── 🔐 login.html               # User login page
├── 📝 signup.html             # User registration page
│
├── 🔌 db_connect.php          # PHP script for database connection
├── 🚀 login_process.php       # PHP script for handling login logic
├── ✅ register_process.php     # PHP script for handling registration logic
├── 🚪 logout.php              # PHP script for user logout
│
├── 🧠 app.py                  # Python Flask server for AI tools
├── 🛠️ rag_setup.py            # Python script to build the AI's knowledge base
├── 📚 knowledge_base/         # Folder for the AI's source documents
├── 🗂️ db/                     # Auto-generated vector database folder
│
├── 📦 requirements.txt        # Python dependencies
└── 🔑 .env                    # Environment variables (API Key)



Setup & Installation Guide

This project requires two separate server environments running simultaneously: XAMPP for the PHP website and a Python environment for the AI backend.

Part 1: Setting Up the Website (XAMPP)

Install XAMPP: Download and install XAMPP from the official website.

Place Project Folder: Move your entire Obsidian-Project folder into the htdocs folder within your XAMPP installation directory (e.g., C:/xampp/htdocs/).

Start Services: Open the XAMPP Control Panel and Start both the Apache and MySQL services.

Create the Database:

Navigate to http://localhost/phpmyadmin/ in your browser.

Create a new database named obsidian_db.

Go to the "SQL" tab and run the following command to create the users table:

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


Access Your Site: Your website is now live at http://localhost/Obsidian-Project/.

Part 2: Running the AI Backend (Python)

Open a New Terminal: Open a separate terminal window and navigate to your project directory (e.g., cd C:/xampp/htdocs/Obsidian-Project).

Create Python Environment:

Create a virtual environment: python -m venv venv

Activate it:

Windows: venv\Scripts\activate

macOS/Linux: source venv/bin/activate

Install Dependencies: pip install -r requirements.txt

Set API Key: Create a file named .env and add your API key: GEMINI_API_KEY="YOUR_API_KEY_HERE"

Build AI Database: Run the setup script once: python rag_setup.py

Run AI Server: Start the Flask server: python app.py

Important: You must keep this terminal window open. The AI server needs to be running in the background for the tools to work.

Project Architecture

This diagram illustrates how the different components of the Obsidian project interact.

graph TD
    subgraph "User's Browser"
        direction LR
        A["🌐 Frontend <br>(HTML, CSS, JS)"]
    end

    subgraph "Web Server (XAMPP)"
        direction LR
        B["🐘 Apache Server"]
        C["🐘 PHP Engine"]
        D["🗃️ MySQL Database <br>(obsidian_db)"]
    end

    subgraph "AI Server (Python)"
        direction LR
        E["🐍 Flask API <br>(app.py)"]
        F["🤖 Google AI API <br>(Gemini)"]
        G["📚 Vector Database <br>(ChromaDB)"]
    end

    A -- "HTTP Requests for Pages" --> B;
    B -- "Executes PHP for dynamic content" --> C;
    C -- "Handles Login/Signup" --> D;
    A -- "API Calls from JS <br>(for tools)" --> E;
    E -- "Processes queries" --> F;
    E -- "Retrieves context" --> G;
