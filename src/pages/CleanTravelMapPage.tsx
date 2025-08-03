import React from "react";
import Navigation from "@/components/Navigation";
import GoogleMap from "@/components/GoogleMap";
import ComprehensiveTravelAdvisory from "@/components/ComprehensiveTravelAdvisory";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Heart } from "lucide-react";

const TravelMapPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-50">
      <Navigation />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <Plane className="h-6 w-6 text-pink-500" />
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              California Travel Health Advisor
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive health, climate, and natural disaster information for California travel planning.
          </p>
        </div>
        
        {/* Interactive Map */}
        <Card className="mb-6 border-pink-200 shadow-lg shadow-pink-100/30 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div style={{height: "400px"}}>
              <GoogleMap />
            </div>
          </CardContent>
        </Card>
        
        {/* Comprehensive Travel Advisory */}
        <ComprehensiveTravelAdvisory />
      </main>
      
      <footer className="border-t border-pink-200 py-6 mt-8 bg-white/80 backdrop-blur-sm">
        <div className="container text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-1">
            <Heart className="h-3 w-3 text-pink-400" />
            <span>&copy; 2025 California Guardian. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelMapPage;
