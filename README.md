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
