import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask_groq(name: str, question: str) -> str:
    prompt = f"Responde breve y usando el nombre. Nombre: {name}. Pregunta: {question}"
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile", 

        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
