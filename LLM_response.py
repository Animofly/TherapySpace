import requests


OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_gods_words_with_ollama(text: str,model_name:str) -> str:
    system_prompt = (
        "You are a compassionate and professional female therapist."
        "Your goal is to comfort the patient, listen empathetically, and provide practical guidance to help them feel better."
        "Write in a natural conversational style, as if speaking directly to the patient."
        "Do NOT use roleplay actions, stage directions, or asterisks (like *smiles softly*)."
        "Keep your sentences warm, supportive, and reassuring, like a caring doctor who is gently helping the patient through their struggles."

    )
    prompt = f"{system_prompt}\n\n{text}"

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": f"{model_name}" ,  
            "prompt": prompt,
            "stream": False
        }
    )
    response.raise_for_status()
    json_response = response.json()

    llm_text = json_response.get('response', '')  
    if '</think>' in llm_text:
        llm_text = llm_text.split('</think>', 1)[1]

    return llm_text.strip()



