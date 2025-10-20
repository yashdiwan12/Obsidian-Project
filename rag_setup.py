import os
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# --- Initialization ---
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file. Please create one and add your key.")

# --- Constants ---
KNOWLEDGE_BASE_DIR = 'knowledge_base'
PERSIST_DIR = 'db'

def main():
    """
    Main function to load documents, split them, create embeddings,
    and persist them to a Chroma vector store.
    """
    if not os.path.exists(KNOWLEDGE_BASE_DIR):
        print(f"Error: The '{KNOWLEDGE_BASE_DIR}' directory was not found.")
        print("Please create it and add your .txt documents for the AI to learn from.")
        return

    # Load documents from the specified directory
    loader = DirectoryLoader(KNOWLEDGE_BASE_DIR, glob="**/*.txt", show_progress=True, use_multithreading=True)
    documents = loader.load()
    
    if not documents:
        print(f"No .txt documents found in the '{KNOWLEDGE_BASE_DIR}' directory. Aborting.")
        return

    print(f"Loaded {len(documents)} document(s).")

    # Split the documents into smaller chunks for processing
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    splits = text_splitter.split_documents(documents)
    print(f"Split documents into {len(splits)} chunks.")

    # --- FIX: Pass the API key directly to the embeddings class ---
    print("Initializing embeddings model...")
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)
    
    # Create and persist the vector store from the document splits
    print(f"Creating and persisting vector store to '{PERSIST_DIR}'... (This may take a moment)")
    Chroma.from_documents(
        documents=splits, 
        embedding=embeddings, 
        persist_directory=PERSIST_DIR
    )
    
    print(f"✅ Vector store successfully created and saved.")

if __name__ == '__main__':
    main()
