import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Navigation } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const LocationSelection = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const navigate = useNavigate();

  const handleLocationSubmit = () => {
    if ((state && district && village) || (coordinates.lat && coordinates.lng) || useCurrentLocation) {
      const locationData = {
        state,
        district,
        village,
        coordinates: coordinates.lat && coordinates.lng ? coordinates : null,
        useCurrentLocation
      };
      localStorage.setItem("krishisetu-location", JSON.stringify(locationData));
      navigate("/dashboard");
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString()
          });
          setUseCurrentLocation(true);
          setState("");
          setDistrict("");
          setVillage("");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      {/* Header */}
      <div className="h-1 w-full bg-gradient-to-r from-accent via-background to-primary mb-8"></div>
      
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Location Setup
            </CardTitle>
            <p className="text-muted-foreground">
              Please provide your farm location for personalized insights
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Current Location Option */}
            <div className="bg-gradient-earth p-6 rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Use Current Location (Recommended)
              </h3>
              <Button 
                onClick={getCurrentLocation}
                variant="outline"
                className="w-full"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get My Location
              </Button>
              {useCurrentLocation && (
                <p className="text-sm text-primary mt-2 font-medium">
                  ✓ Current location detected: {coordinates.lat}, {coordinates.lng}
                </p>
              )}
            </div>

            <div className="text-center text-muted-foreground">
              <span>OR</span>
            </div>

            {/* Manual Location Entry */}
            <div className="space-y-4">
              <h3 className="font-semibold">Enter Location Manually</h3>
              
              <div className="space-y-4">
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((stateName) => (
                      <SelectItem key={stateName} value={stateName}>
                        {stateName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Enter District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />

                <Input
                  placeholder="Enter Village/Town"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                />
              </div>
            </div>

            <div className="text-center text-muted-foreground">
              <span>OR</span>
            </div>

            {/* Coordinates Entry */}
            <div className="space-y-4">
              <h3 className="font-semibold">Enter GPS Coordinates</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Latitude"
                  value={coordinates.lat}
                  onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e.target.value }))}
                />
                <Input
                  placeholder="Longitude"
                  value={coordinates.lng}
                  onChange={(e) => setCoordinates(prev => ({ ...prev, lng: e.target.value }))}
                />
              </div>
            </div>

            <Button 
              onClick={handleLocationSubmit}
              disabled={!((state && district && village) || (coordinates.lat && coordinates.lng) || useCurrentLocation)}
              className="w-full h-12 text-lg font-semibold bg-gradient-hero hover:shadow-lg transition-all duration-300"
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocationSelection;