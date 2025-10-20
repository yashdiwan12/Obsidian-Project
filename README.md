# Obsidian - AI Security Advisor

Obsidian is a web-based application designed to make cybersecurity knowledge accessible to everyone. It provides a suite of AI-powered tools to help users understand digital threats, analyze suspicious content, and learn how to protect themselves online. The platform features a user authentication system, a friendly AI assistant for answering security questions, and a phishing email analyzer.

---

## Features

- User Authentication: Secure user registration and login system (PHP + MySQL).
- AI-Powered Threat Query: Ask cybersecurity questions and get AI-assisted answers.
- Phishing Email Analyzer: Automatically analyzes email content for threats.
- Educational Content: Easy-to-understand cybersecurity learning hub.
- Light/Dark Theme: Modern UI with theme switcher.

---

##  Setup & Installation Guide

This project requires two separate server environments running simultaneously: XAMPP (PHP Website) and Python Environment (AI Backend).

---

### Part 1: Setting Up the Website (XAMPP)

1. Install XAMPP.
2. Move the Obsidian-Project folder into:

   C:/xampp/htdocs/

3. Start Apache and MySQL from XAMPP.
4. Go to http://localhost/phpmyadmin/ and create database: obsidian_db.
5. Run this SQL:

   CREATE TABLE users (
       id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
       username VARCHAR(50) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );

6. Visit http://localhost/Obsidian-Project/

---

### Part 2: Running the AI Backend (Python)

cd C:/xampp/htdocs/Obsidian-Project

python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt

# .env file:
GEMINI_API_KEY="YOUR_API_KEY_HERE"

python rag_setup.py
python app.py   # keep this terminal open

---

## Project Architecture

```mermaid
graph TD
    A["🌐 User's Browser <br>(Frontend: HTML, CSS, JS)"]

    B["🐘 Apache Server"]
    C["🐘 PHP Engine"]
    D["🗃️ MySQL Database <br>(obsidian_db)"]

    E["🐍 Flask API <br>(app.py)"]
    F["🤖 Google AI API <br>(Gemini)"]
    G["📚 Vector Database <br>(ChromaDB)"]

    A -->|"HTTP Requests for Pages"| B
    B -->|"Executes PHP"| C
    C -->|"Handles Login/Signup"| D
    A -->|"API Calls for Tools (JS)"| E
    E -->|"Processes Queries"| F
    E -->|"Retrieves Context"| G
