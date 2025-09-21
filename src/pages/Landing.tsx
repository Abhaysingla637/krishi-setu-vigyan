import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import agriculturalHero from "@/assets/agriculture-tech-hero.jpg";

const languages = [
  { code: "hi", name: "हिन्दी", nameEng: "Hindi" },
  { code: "en", name: "English", nameEng: "English" },
  { code: "bn", name: "বাংলা", nameEng: "Bengali" },
  { code: "te", name: "తెలుగు", nameEng: "Telugu" },
  { code: "ta", name: "தமிழ்", nameEng: "Tamil" },
  { code: "gu", name: "ગુજરાતી", nameEng: "Gujarati" },
  { code: "kn", name: "ಕನ್ನಡ", nameEng: "Kannada" },
  { code: "ml", name: "മലയാളം", nameEng: "Malayalam" },
  { code: "mr", name: "मराठी", nameEng: "Marathi" },
  { code: "pa", name: "ਪੰਜਾਬੀ", nameEng: "Punjabi" },
  { code: "or", name: "ଓଡ଼ିଆ", nameEng: "Odia" },
  { code: "as", name: "অসমীয়া", nameEng: "Assamese" }
];

const Landing = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  const handleLanguageSelect = () => {
    if (selectedLanguage) {
      localStorage.setItem("krishisetu-language", selectedLanguage);
      navigate("/location");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Indian Tricolor Banner */}
      <div className="h-2 w-full bg-gradient-to-r from-accent via-background to-primary"></div>
      
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${agriculturalHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <h1 className="text-6xl font-bold mb-4 tracking-wide">कृषिसेतु</h1>
              <h2 className="text-4xl font-semibold mb-2">KrishiSetu</h2>
              <p className="text-2xl font-medium opacity-90">विज्ञान फॉर किसान</p>
              <p className="text-xl opacity-80">VigyanForKishan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-foreground mb-4">
                Welcome to KrishiSetu
              </CardTitle>
              <p className="text-lg text-muted-foreground leading-relaxed">
                An AI-powered platform for sustainable agriculture with real-time monitoring 
                of soil health, weather patterns, pest control, and market insights.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <label className="text-lg font-semibold text-foreground block">
                  Select Your Language / अपनी भाषा चुनें
                </label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="Choose your preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code} className="text-lg py-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-muted-foreground">({lang.nameEng})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleLanguageSelect}
                disabled={!selectedLanguage}
                className="w-full h-14 text-lg font-semibold bg-gradient-hero hover:shadow-lg transition-all duration-300"
              >
                Continue to Dashboard / डैशबोर्ड पर जाएं
              </Button>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="text-center p-4 bg-soil-healthy/10 rounded-lg">
              <div className="w-12 h-12 bg-soil-healthy rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Soil Health</p>
            </div>
            <div className="text-center p-4 bg-water-abundant/10 rounded-lg">
              <div className="w-12 h-12 bg-water-abundant rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Water Management</p>
            </div>
            <div className="text-center p-4 bg-pest-safe/10 rounded-lg">
              <div className="w-12 h-12 bg-pest-safe rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Pest Control</p>
            </div>
            <div className="text-center p-4 bg-market-up/10 rounded-lg">
              <div className="w-12 h-12 bg-market-up rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Market Insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;