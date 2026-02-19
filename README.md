# Chat IA — Documentación

## ¿Qué es este proyecto?

Es un chatbot con IA que funciona como intermediario entre el usuario y un modelo de lenguaje. El frontend (HTML + Tailwind) captura la pregunta del usuario y la envía a una API propia construida en Python. Esa API se comunica con Groq usando el modelo LLaMA 3.3 70B para generar una respuesta inteligente y personalizada.

---

## ¿Cómo funciona?

1. El usuario escribe una pregunta en el frontend
2. Vercel sirve el frontend (HTML + CSS + JS)
3. fetch() en JavaScript hace un POST a la API
4. FastAPI (Python) recibe la petición en el endpoint POST /ask
5. Groq API procesa la pregunta con LLaMA 3.3 70B
6. La respuesta regresa al frontend y se escribe con efecto typewriter

---

## Probar la API con Thunder Client

**Método:** POST  
**URL:** https://python-api-render-ubr9.onrender.com/ask

**Body (JSON):**
```json
{
  "name": "Sebastian",
  "question": "¿Qué es la inteligencia artificial?",
  "personality": "casual"
}
Respuesta esperada:

json
{
  "answer": "¡Hola Sebastian! La IA es..."
}
Valores disponibles para personality: casual, tutor, profesional, tecnico

 La API está en Render con plan gratuito. Si lleva tiempo inactiva, la primera petición puede tardar 30–60 segundos mientras el servidor se reactiva.

Stack tecnológico
Backend: Python + FastAPI

Frontend: HTML + Tailwind CSS

IA: Groq — LLaMA 3.3 70B

Historial: localStorage

API Deploy: Render

Frontend Deploy: Vercel

Proceso de desarrollo
1. Crear la estructura del proyecto
Se creó la carpeta api-python/ con subcarpeta app/ que contiene main.py, schemas.py y groq_service.py.

2. Instalar dependencias
Se creó un entorno virtual y se instalaron: fastapi, uvicorn, groq, python-dotenv. Se generó el requirements.txt con pip freeze.

3. Construir la API en FastAPI
Se creó el endpoint POST /ask que recibe name, question y personality, y devuelve la respuesta del modelo como JSON.

4. Integrar Groq con system prompts
Se creó un diccionario de personalidades que cambia el system prompt según la selección del usuario, controlando el tono y comportamiento del modelo.

5. Construir el frontend
Se creó la interfaz con HTML + Tailwind CSS: modal de bienvenida, sidebar con historial, selector de personalidad, input de chat y efecto typewriter en las respuestas.

6. Historial con localStorage
Se implementó persistencia de conversaciones en el navegador usando localStorage, permitiendo guardar, cargar y crear nuevos chats sin base de datos.

7. Variables de entorno
Se creó el archivo .env con la variable GROQ_API_KEY y se agregó al .gitignore para no exponer la clave en GitHub.

8. Despliegue en Render (API)
Se conectó el repositorio a Render. Start Command: uvicorn app.main:app --host 0.0.0.0 --port 10000. Se configuró la variable GROQ_API_KEY desde el panel de Render.

9. Despliegue en Vercel (Frontend)
Se conectó el repositorio a Vercel y se configuró el vercel.json para servir los archivos estáticos. Cada push a main redespliega automáticamente.

Autor
Nombre: Sebastian Vasquez Echavarria

Portafolio: https://sebas-dev.vercel.app

GitHub: https://github.com/sebastianvasquezechavarria1234/python-api-render