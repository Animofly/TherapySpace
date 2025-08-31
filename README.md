# VoiceTherapy
Professional AI-powered therapy sessions with multilingual support and compassionate voice interaction
---
Demo video : https://www.loom.com/share/2bb9581886b348449b0469d7bf91553c?sid=e5ae1810-28e7-4a4a-aefa-f6fde4bc9aaa
---

AI-assisted therapy companion with:
- **React + Vite + TypeScript + Tailwind + shadcn-ui** frontend(s)
- **FastAPI** backend that:
  - calls a **local Ollama** LLM for empathetic responses
  - converts replies to speech using **Murf TTS**
  - serves the generated audio as a static file

---

## Project Structure

```
/                # Frontend app (Vite + React + TS)
/SignInPage/     # (Optional) separate frontend for sign-in UI (Vite + React + TS)
main.py          # FastAPI app (backend)
LLM_response.py  # Calls Ollama on localhost:11434/api/generate
TTS.py           # Uses Murf SDK to synthesize speech and saves static/output.mp3
/static/         # Backend-served static files (audio)
```

**Stacks used**
- Vite, React, TypeScript, Tailwind CSS, shadcn-ui (frontends)
- FastAPI, Pydantic, Uvicorn, Requests, Murf SDK (backend)
- Ollama (local LLM inference)

---

## Prerequisites

- **Node.js** ≥ 18 and **npm**
- **Python** ≥ 3.10 and **pip**
- **Ollama** installed and running locally
- **Murf** API key

> Ollama runs an HTTP server on `http://localhost:11434`. The backend calls `POST /api/generate` and expects a `model` name such as `llama3.1` or any model you’ve pulled.

---

## Quick Start (Cloning + Running All 3 servers)

### 0) Clone the repo
```bash
git clone https://github.com/Animofly/VoiceTherapy.git
cd VoiceTherapy
```

### 1) Start Ollama (LLM)
```bash
# In a new terminal
ollama serve
# Pull at least one model and keep note of its name for requests (e.g., llama3.1)
ollama pull llama3.1
```

### 2) Backend (FastAPI)
```bash
# In another terminal, at repo root
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install fastapi uvicorn "pydantic>=2" requests murf
# Run backend on port 8000:
uvicorn main:app --reload --port 8000
```

**What the backend exposes**
- `POST /therapy` → accepts `{ complaint, model_name, language, voice }`, returns text + `audio_url`.
- Serves audio files from `/audio/*` (mapped to local `static/`). The TTS currently saves as `static/output.mp3`.
- FastAPI docs at `http://localhost:8000/docs`.

### 3) Frontend #1 (root app)
```bash
# In a third terminal, at repo root
npm i
npm run dev            # defaults to http://localhost:5173
```

### 4) Frontend #2 (SignInPage app)
```bash
# In a fourth terminal
cd SignInPage
npm i
npm run dev -- --port 5174   # run on a different port to avoid collision
```

> If your frontend needs a base URL for the API, set it to `http://localhost:8000`.

---

## API Contract

### POST `/therapy`
**Body**
```json
{
  "complaint": "I'm feeling anxious about exams.",
  "model_name": "llama3.1",
  "language": "English",
  "voice": "en-US-julia"
}
```

**Response**
```json
{
  "TheLight": "<LLM_text_response>",
  "audio_url": "/audio/output.mp3"
}
```

---

## Murf TTS Setup

In `TTS.py`, the API key is read from the environment. Create a `.env` file like this:

```
MURF_API_KEY=your_murf_api_key_here
```

Choose a **language/voice** pair from `VOICE_OPTIONS`. Example IDs: `en-US-julia`, `en-UK-ruby`, `fr-FR-justine`, etc.

---

## Notes & Gotchas

- **Function argument order**: `save_audio` is defined as `(text, language, voice)` but the backend currently calls it as `(text, voice, language)`. Swap the order to ensure correct voice selection.
- **Root `/` route**: The backend serves a hardcoded Windows path for `index.html`. Point this to your actual built frontend or remove it if your frontends are served by Vite/hosted separately.
- **Audio filename**: Always saved as `output.mp3` (overwrites per request). If you need multiple audios, generate unique filenames.
- **Restrict CORS**: Replace `allow_origins=["*"]` with the exact frontend origins (e.g., `http://localhost:5173`, `http://localhost:5174`) before production.

---

## Production Tips

- Build a single production frontend and host it (Vercel/Netlify). Point it to the backend base URL.
- Serve compiled frontend from FastAPI, or keep them separate behind a reverse proxy.
- Manage secrets via environment variables; never commit API keys.

---


