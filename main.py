from fastapi import FastAPI, status
from pydantic import BaseModel
from LLM_response import generate_gods_words_with_ollama
from TTS import save_audio
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

# -------------------------------
# Request body schema
# -------------------------------
class CodeRequest(BaseModel):
    complaint: str
    model_name: str
    language: str
    voice: str


# -------------------------------
# App initialization
# -------------------------------
app = FastAPI()

# ✅ Enable CORS (so frontend @ localhost:8081 can talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 👉 change to ["http://localhost:8081"] for stricter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------
# Routes
# -------------------------------
@app.get("/")
async def serve_ui():
    """Serve index.html for root route"""
    return FileResponse(os.path.join("C:\\Users\\menda\\Downloads\\soothe-sentience-main", "index.html"))


@app.post('/therapy', status_code=status.HTTP_201_CREATED)
async def getBapatized(req: CodeRequest):
    """Handles therapy requests"""
    complaint_data = req.complaint
    model_name_data = req.model_name
    voice_data = req.voice
    language_data = req.language

    # Generate text response from LLM
    oracle_text = generate_gods_words_with_ollama(complaint_data, model_name_data)

    # Generate TTS audio file
    oracle_audio_file = save_audio(oracle_text, voice_data, language_data)

    return {
        "TheLight": oracle_text,
        "audio_url": f"/audio/{oracle_audio_file}"
    }


# -------------------------------
# Static file serving
# -------------------------------
os.makedirs("static", exist_ok=True)
app.mount("/audio", StaticFiles(directory="static"), name="audio")
