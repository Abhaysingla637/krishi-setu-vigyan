import { Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import indianAgriculture from "@/assets/indian-agriculture.jpg";
import atalBihariVajpayee from "@/assets/atal-bihari-vajpayee.jpg";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground shadow-lg">
      {/* Indian Tricolor Top Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-accent via-background to-primary"></div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Atal Bihari Vajpayee */}
          <div className="flex items-center gap-4">
            <img 
              src={atalBihariVajpayee}
              alt="Atal Bihari Vajpayee"
              className="w-16 h-20 rounded-lg object-cover border-2 border-primary-foreground/20"
            />
            <div className="text-left">
              <p className="text-sm font-medium opacity-90">जय जवान जय किसान</p>
              <p className="text-lg font-bold">जय विज्ञान</p>
              <p className="text-xs opacity-80">Jai Jawan Jai Kishan Jai Vigyan</p>
            </div>
          </div>

          {/* Center Section - Main Branding */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-wide">कृषिसेतु</h1>
              <h2 className="text-2xl font-semibold">KrishiSetu</h2>
              <p className="text-sm font-medium opacity-90">विज्ञान फॉर किसान • VigyanForKishan</p>
            </div>
            
            {/* Indian Flag Colors */}
            {/* <div className="w-12 h-8 rounded-md overflow-hidden border border-primary-foreground/20">
              <div className="h-1/3 bg-accent"></div>
              <div className="h-1/3 bg-background"></div>
              <div className="h-1/3 bg-primary"></div>
            </div> */}
          </div>

          {/* Right Section - Agriculture Image & Controls */}
          <div className="flex items-center gap-4">
            <img 
              src={indianAgriculture}
              alt="Indian Agriculture"
              className="w-20 h-16 rounded-lg object-cover border-2 border-primary-foreground/20"
            />
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;