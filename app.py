import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI

# --- Initialization ---
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file. Please create one and add your key.")
genai.configure(api_key=api_key) # Configure base library for non-LangChain use

app = Flask(__name__)
CORS(app) # Allow requests from the frontend

# --- RAG Chain Setup (with API key fix) ---
try:
    # Pass the API key directly to the LangChain embedding class
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)
    vectorstore = Chroma(persist_directory="db", embedding_function=embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
except Exception as e:
    print(f"CRITICAL: Error loading vector store: {e}. The RAG tool will not work. Run 'python rag_setup.py' first.")
    retriever = None

# Pass the API key directly to the LangChain chat model class
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3, google_api_key=api_key)

rag_prompt_template = """
You are 'Obsidian', a precise and formal AI cybersecurity advisor. Your purpose is to answer user questions based *only* on the provided context.
- Be concise and clear.
- Do not use information outside of the given context.
- If the context does not contain the answer, you MUST state: "The provided knowledge base does not contain information on this topic."
- Do not answer questions that are not related to cybersecurity.

CONTEXT:
{context}

QUESTION:
{question}

HELPFUL ANSWER:
"""
rag_prompt = PromptTemplate.from_template(rag_prompt_template)
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | rag_prompt
    | llm
    | StrOutputParser()
)

# --- Phishing Analyzer Setup ---
phishing_analyzer_prompt_template = "You are an expert phishing analyst... Email Content: --- {email_content} --- Analysis:"
phishing_analyzer_model = genai.GenerativeModel('gemini-1.5-flash')

# --- API Endpoints ---
@app.route('/ask-rag', methods=['POST'])
@app.route('/ask-rag', methods=['POST'])
def ask_rag():
    if not retriever:
        return jsonify({"error": "Vector store not loaded."}), 500
    data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({"error": "Question not provided"}), 400
    try:
        # Get the raw answer from the RAG chain
        rag_answer = rag_chain.invoke(data['question'])
        
        # Create the enhanced response by appending the safety message
        enhanced_answer = f"{rag_answer}\n\n---\n\nFeel free to ask any more questions. I'm here to help you stay safe online!"
        
        # Return the enhanced answer
        return jsonify({"answer": enhanced_answer})
    except Exception as e:
        print(f"Error in /ask-rag: {e}")
        return jsonify({"error": "An error occurred."}), 500

@app.route('/analyze-phishing', methods=['POST'])
def analyze_phishing():
    data = request.get_json()
    if not data or 'email_content' not in data:
        return jsonify({"error": "Email content not provided"}), 400
    prompt = phishing_analyzer_prompt_template.format(email_content=data['email_content'])
    try:
        return jsonify({"analysis": phishing_analyzer_model.generate_content(prompt).text})
    except Exception as e:
        print(f"Error in /analyze-phishing: {e}")
        return jsonify({"error": "An error occurred."}), 500

# --- Main Execution ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
