import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Brain, Heart, MessageCircle, Volume2, Loader2 } from "lucide-react";
import {
  TherapyFormData,
  TherapyResponse,
  VOICE_OPTIONS,
  MODEL_OPTIONS,
  LANGUAGE_OPTIONS,
  VoiceOption
} from "@/types/therapy";
import heroImage from "@/assets/therapy-hero.jpg";

const TherapySession = () => {
  const [formData, setFormData] = useState<TherapyFormData>({
    model: "llama3.2",
    language: "English",
    voice: "en-US-julia",
    complaint: ""
  });
  
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TherapyResponse | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  
  const characterCount = formData.complaint.length;
  const maxCharacters = 300;
  const characterProgress = (characterCount / maxCharacters) * 100;

  useEffect(() => {
    setAvailableVoices(VOICE_OPTIONS[formData.language] || []);
    if (VOICE_OPTIONS[formData.language]?.length > 0) {
      setFormData(prev => ({
        ...prev,
        voice: VOICE_OPTIONS[formData.language][0].id
      }));
    }
  }, [formData.language]);

  const handleSubmit = async () => {
  if (!formData.complaint.trim()) {
    toast.error("Please describe your concerns before starting the session.");
    return;
  }

  if (characterCount > maxCharacters) {
    toast.error(`Please keep your description under ${maxCharacters} characters.`);
    return;
  }

  setIsLoading(true);

  try {
    // 🌍 call your backend
    const response = await fetch("http://localhost:8000/therapy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        complaint: formData.complaint,
        model_name: formData.model,
        language: formData.language,
        voice: formData.voice,
      }),
    });

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data: TherapyResponse = await response.json();

    setResponse(data);
    setShowResponse(true);
    toast.success("Your therapy session response is ready!");
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    console.error("Therapy session error:", error);
  } finally {
    setIsLoading(false);
  }
};


  const handleNewSession = () => {
    setFormData({
      model: "llama3.2",
      language: "English", 
      voice: "en-US-julia",
      complaint: ""
    });
    setResponse(null);
    setShowResponse(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Peaceful therapy environment" 
            className="w-full h-96 object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-hero/80" />
        </div>
        
        <div className="relative container mx-auto px-4 pt-16 pb-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Brain className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              TherapySpace
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Professional AI-powered therapy sessions with multilingual support and compassionate voice interaction
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          {!showResponse ? (
            <Card className="shadow-therapeutic border-0 bg-card/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Start Your Session</CardTitle>
                <CardDescription className="text-base">
                  Share your thoughts and let our AI therapist provide supportive guidance
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Model Selection */}
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-sm font-medium">
                    AI Model
                  </Label>
                  <Select 
                    value={formData.model} 
                    onValueChange={(value) => setFormData(prev => ({...prev, model: value}))}
                  >
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MODEL_OPTIONS.map(model => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Selection */}
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm font-medium">
                    Language
                  </Label>
                  <Select 
                    value={formData.language} 
                    onValueChange={(value) => setFormData(prev => ({...prev, language: value}))}
                  >
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_OPTIONS.map(lang => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Voice Selection */}
                <div className="space-y-2">
                  <Label htmlFor="voice" className="text-sm font-medium">
                    Therapist Voice
                  </Label>
                  <Select 
                    value={formData.voice} 
                    onValueChange={(value) => setFormData(prev => ({...prev, voice: value}))}
                  >
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map(voice => (
                        <SelectItem key={voice.id} value={voice.id}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Complaint Text Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="complaint" className="text-sm font-medium">
                      Tell me about your concerns
                    </Label>
                    <span className={`text-sm ${characterCount > maxCharacters ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {characterCount}/{maxCharacters}
                    </span>
                  </div>
                  <Textarea
                    id="complaint"
                    placeholder="Please share what's been on your mind lately. Take your time and express yourself freely..."
                    value={formData.complaint}
                    onChange={(e) => setFormData(prev => ({...prev, complaint: e.target.value}))}
                    className="min-h-[120px] bg-input/50 border-border/50 resize-none"
                  />
                  <Progress 
                    value={characterProgress} 
                    className="h-1"
                    max={100}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.complaint.trim() || characterCount > maxCharacters}
                  variant="therapeutic"
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing your session...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      Start Therapy Session
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Response Display */
            <Card className="shadow-therapeutic border-0 bg-card/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Your Therapy Response</CardTitle>
                <CardDescription>
                  Here's your personalized guidance
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {response && (
                  <>
                    <div className="bg-gradient-secondary p-6 rounded-lg">
                      <p className="text-foreground leading-relaxed">
                        {response.TheLight}
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Volume2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Audio Response</span>
                      </div>
                      <audio 
                        controls 
                        className="w-full"
                        src={response ? `http://localhost:8000${response.audio_url}?t=${Date.now()}` : ""}
                      >
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleNewSession}
                        variant="calm"
                        className="flex-1"
                      >
                        New Session
                      </Button>
                      <Button 
                        onClick={() => {
                          navigator.clipboard.writeText(response.TheLight);
                          toast.success("Response copied to clipboard!");
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        Copy Response
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapySession;