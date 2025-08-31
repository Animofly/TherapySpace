export interface VoiceOption {
  id: string;
  name: string;
}

export interface VoiceOptions {
  [key: string]: VoiceOption[];
}

export interface TherapyFormData {
  model: string;
  language: string;
  voice: string;
  complaint: string;
}

export interface TherapyResponse {
  TheLight: string;
  audio_url: string;
}

export const VOICE_OPTIONS: VoiceOptions = {
  "English": [
    {id: "en-US-julia", name: "Julia (Calm)"},
    {id: "en-US-alicia", name: "Alicia (Calm)"},
    {id: "en-UK-ruby", name: "Ruby (Sad)"},
    {id: "en-UK-theo", name: "Theo (Sad)"},
    {id: "en-AU-leyton", name: "Leyton (Calm)"}
  ],
  "French": [
    {id: "fr-FR-adélie", name: "Adélie (Sad)"},
    {id: "fr-FR-justine", name: "Justine (Calm)"}
  ],
  "German": [
    {id: "de-DE-matthias", name: "Matthias (Calm)"},
    {id: "de-DE-josephine", name: "Josephine (Calm)"}
  ],
  "Chinese": [
    {id: "zh-CN-tao", name: "Tao (Sad)"}
  ],
  "Korean": [
    {id: "ko-KR-hwan", name: "Hwan (Sad)"}
  ],
  "Hindi": [
    {id: "hi-IN-shweta", name: "Shweta (Calm)"}
  ],
  "Spanish": [
    {id: "es-MX-luisa", name: "Luisa (Sad)"}
  ]
};

export const MODEL_OPTIONS = [
  { value: "llama3.2", label: "Llama 3.2" },
  { value: "mistral", label: "Mistral" },
  { value: "gemma", label: "Gemma" },
  { value: "falcon", label: "Falcon" }
];

export const LANGUAGE_OPTIONS = [
  "English", "French", "German", "Chinese", "Korean", "Hindi", "Spanish"
];