import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowRight, Shield, Heart, MessageCircle, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-secondary/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold">TherapySpace</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/sign-in">
            <Button variant="ghost" className="hover:bg-primary/10">
              Sign In
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="therapy">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-6">
                <Brain className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Therapy<span className="text-primary">Space</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional AI-powered therapy sessions with multilingual support and compassionate voice interaction
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/sign-up">
              <Button variant="therapy" size="lg" className="text-lg px-8 py-6">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Compassionate Care</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                AI therapy designed with empathy and understanding, providing a safe space for emotional healing and growth.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Voice Interaction</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Natural voice conversations that feel authentic and supportive, available 24/7 whenever you need to talk.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Multilingual Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Therapy sessions in multiple languages, breaking down barriers to mental health care worldwide.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Section */}
        <div className="mt-24 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Your Privacy Matters</h2>
          <p className="text-lg text-muted-foreground mb-8">
            All conversations are encrypted and confidential. Your mental health journey is private and secure with TherapySpace.
          </p>
          <Link to="/sign-up">
            <Button variant="therapy" size="lg">
              Begin Confidential Sessions
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
