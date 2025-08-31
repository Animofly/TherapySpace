import os
import requests
from murf import Murf

MURF_API_KEY = "ap2_96c274c9-9fb4-4c42-ad71-9f9b67f1e15a"  # secure this later with env var

# Mapping: language -> available voices
VOICE_OPTIONS = {
    "English": [
        {"voice_id": "en-US-julia", "style": "Calm"},
        {"voice_id": "en-US-alicia", "style": "Calm"},
        {"voice_id": "en-UK-ruby", "style": "Sad"},
        {"voice_id": "en-UK-theo", "style": "Sad"},
        {"voice_id": "en-AU-leyton", "style": "Calm"},
    ],
    "French": [
        {"voice_id": "fr-FR-adélie", "style": "Sad"},
        {"voice_id": "fr-FR-justine", "style": "Calm"},
    ],
    "German": [
        {"voice_id": "de-DE-matthias", "style": "Calm"},
        {"voice_id": "de-DE-josephine", "style": "Calm"},
    ],
    "Chinese": [
        {"voice_id": "zh-CN-tao", "style": "Sad"},
    ],
    "Korean": [
        {"voice_id": "ko-KR-hwan", "style": "Sad"},
    ],
    "Hindi": [
        {"voice_id": "hi-IN-shweta", "style": "Calm"},
    ],
    "Spanish": [
        {"voice_id": "es-MX-luisa", "style": "Sad"},
    ],
}


def save_audio(text: str, language: str, voice: str) -> str:
    client = Murf(api_key=MURF_API_KEY)

    # --- Normalize inputs ---
    # If frontend accidentally sends "en-US-julia" as language, split it
    if "-" in language and language in [v["voice_id"] for voices in VOICE_OPTIONS.values() for v in voices]:
        # swap: user passed voice_id in language field
        voice = language
        language = "English"  # default to English bucket unless you want to detect per prefix

    # Try to find the voice in the given language bucket
    selected_voice = None
    for v in VOICE_OPTIONS.get(language, []):
        if v["voice_id"] == voice:
            selected_voice = v
            break

    if not selected_voice:
        # fallback: scan all languages if mismatch
        for lang, voices in VOICE_OPTIONS.items():
            for v in voices:
                if v["voice_id"] == voice:
                    selected_voice = v
                    language = lang
                    break
            if selected_voice:
                break

    if not selected_voice:
        raise ValueError(
            f"Voice '{voice}' not found for language '{language}'. "
            f"Available voices: {[v['voice_id'] for v in VOICE_OPTIONS.get(language, [])]}"
        )

    # Call Murf API
    response = client.text_to_speech.generate(
        text=text,
        voice_id=selected_voice["voice_id"],
        style=selected_voice["style"]
    )

    audio_link = response.audio_file

    # Save audio file locally
    filename = "output.mp3"
    os.makedirs("static", exist_ok=True)
    speech_file_path = os.path.join("static", filename)

    audio_response = requests.get(audio_link)
    if audio_response.status_code == 200:
        with open(speech_file_path, 'wb') as f:
            f.write(audio_response.content)
        return filename
    else:
        raise Exception(f"Failed to download audio file: {audio_response.status_code}")
