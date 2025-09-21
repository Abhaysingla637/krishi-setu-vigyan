import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ConditionBox from "@/components/ConditionBox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, 
  Droplets, 
  Bug, 
  TrendingUp, 
  Lightbulb,
  Thermometer,
  Wind,
  Eye,
  RefreshCw
} from "lucide-react";

interface LocationData {
  state: string;
  district: string;
  village: string;
  coordinates?: { lat: string; lng: string };
  useCurrentLocation: boolean;
}

const Dashboard = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const storedLocation = localStorage.getItem("krishisetu-location");
    if (storedLocation) {
      setLocationData(JSON.parse(storedLocation));
    }
  }, []);

  const refreshData = () => {
    setLastUpdated(new Date());
    // In a real app, this would fetch fresh data from APIs
  };

  const getLocationString = () => {
    if (!locationData) return "Location not set";
    if (locationData.useCurrentLocation && locationData.coordinates) {
      return `Current Location (${parseFloat(locationData.coordinates.lat).toFixed(2)}, ${parseFloat(locationData.coordinates.lng).toFixed(2)})`;
    }
    return `${locationData.village}, ${locationData.district}, ${locationData.state}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <Header />
      
      {/* Location & Status Bar */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="font-medium">Location:</span>
                <span className="text-sm">{getLocationString()}</span>
              </div>
              <Badge variant="outline" className="bg-primary/10">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                System Online
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <Button 
                onClick={refreshData}
                size="sm" 
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Soil Condition Box */}
          <ConditionBox
            title="Soil Health Status"
            icon={<Sprout className="w-5 h-5 text-soil-healthy" />}
            value={85}
            unit="%"
            status="healthy"
            description="Optimal NPK levels, good moisture retention. pH slightly alkaline at 7.2."
            trend="up"
            benchmark={80}
            className="bg-gradient-to-br from-soil-healthy/5 to-soil-healthy/10"
          >
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Nitrogen</p>
                <p className="font-semibold">78%</p>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Phosphorus</p>
                <p className="font-semibold">82%</p>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Potassium</p>
                <p className="font-semibold">91%</p>
              </div>
            </div>
          </ConditionBox>

          {/* Rainwater Box */}
          <ConditionBox
            title="Water Management"
            icon={<Droplets className="w-5 h-5 text-water-moderate" />}
            value={65}
            unit="mm"
            status="moderate"
            description="Recent rainfall adequate. Irrigation recommended for next 3 days."
            trend="down"
            benchmark={75}
            className="bg-gradient-to-br from-water-moderate/5 to-water-moderate/10"
          >
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Soil Moisture</p>
                <p className="font-semibold">68%</p>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Irrigation Status</p>
                <p className="font-semibold text-accent">Scheduled</p>
              </div>
            </div>
          </ConditionBox>

          {/* Pest Condition Box */}
          <ConditionBox
            title="Pest & Disease Control"
            icon={<Bug className="w-5 h-5 text-pest-caution" />}
            value={12}
            unit="% risk"
            status="caution"
            description="Low aphid activity detected. Monitor closely for next 48 hours."
            trend="stable"
            benchmark={20}
            className="bg-gradient-to-br from-pest-caution/5 to-pest-caution/10"
          >
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Aphids</span>
                <Badge variant="outline" className="bg-pest-caution/20">Low</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fungal Risk</span>
                <Badge variant="outline" className="bg-pest-safe/20">Very Low</Badge>
              </div>
            </div>
          </ConditionBox>

          {/* Market Condition Box */}
          <ConditionBox
            title="Market Intelligence"
            icon={<TrendingUp className="w-5 h-5 text-market-up" />}
            value={2850}
            unit="₹/quintal"
            status="up"
            description="Wheat prices trending upward. Good time to plan harvest strategy."
            trend="up"
            benchmark={2500}
            className="bg-gradient-to-br from-market-up/5 to-market-up/10"
          >
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Local Mandi</p>
                <p className="font-semibold">₹2,850</p>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground">MSP</p>
                <p className="font-semibold">₹2,125</p>
              </div>
            </div>
          </ConditionBox>

          {/* Recommendations Box */}
          <ConditionBox
            title="AI Recommendations"
            icon={<Lightbulb className="w-5 h-5 text-accent" />}
            value={4}
            unit="actions"
            status="stable"
            description="Based on current conditions, here are priority actions for optimal yield."
            className="md:col-span-2 bg-gradient-to-br from-accent/5 to-accent/10"
          >
            <div className="space-y-3 mt-4">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Irrigation Scheduling</p>
                  <p className="text-xs text-muted-foreground">Plan irrigation for tomorrow evening based on weather forecast</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Pest Monitoring</p>
                  <p className="text-xs text-muted-foreground">Install yellow sticky traps in affected areas to monitor aphid population</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Nutrient Management</p>
                  <p className="text-xs text-muted-foreground">Consider phosphorus supplement in northern fields within 10 days</p>
                </div>
              </div>
            </div>
          </ConditionBox>

          {/* Weather Info */}
          <div className="bg-gradient-sky rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Thermometer className="w-5 h-5" />
              <span className="font-semibold">Weather Today</span>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">28°C</div>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4" />
                  <span>12 km/h</span>
                </div>
                <div>Humidity: 68%</div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Partly cloudy with moderate humidity. Favorable conditions for most crops.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;