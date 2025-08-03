import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { availableSymptoms, monitoredLocations, reportSymptom, type LocationWithOutbreaks, type DiseaseOutbreak } from "@/lib/ai-utils";
import { toast } from "@/components/ui/sonner";
import { Activity, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";

const RealTimeSymptomReporting = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>(monitoredLocations[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [realtimeData, setRealtimeData] = useState<LocationWithOutbreaks[]>(monitoredLocations);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prevData => 
        prevData.map(location => ({
          ...location,
          outbreaks: location.outbreaks.map(outbreak => ({
            ...outbreak,
            // Randomly adjust cases slightly to simulate real-time updates
            cases: Math.max(0, outbreak.cases + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))
          })),
          lastUpdated: new Date()
        }))
      );
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom to report.");
      return;
    }

    setIsSubmitting(true);

    try {
      await reportSymptom(selectedSymptoms, selectedLocation);
      setShowThankYou(true);
      setSelectedSymptoms([]);
      
      // Update local data to reflect the report
      setRealtimeData(prevData => 
        prevData.map(loc => 
          loc.id === selectedLocation 
            ? { ...loc, reportCount: loc.reportCount + 1, lastUpdated: new Date() }
            : loc
        )
      );
    } catch (error) {
      toast.error("There was an error reporting your symptoms. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowThankYou(false);
    setSelectedSymptoms([]);
  };

  const currentLocation = realtimeData.find(loc => loc.id === selectedLocation);

  const getTrendIcon = (trend: DiseaseOutbreak['trend']) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-3 w-3 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-3 w-3 text-green-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: DiseaseOutbreak['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'moderate':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full border-pink-200 shadow-lg shadow-pink-100/30">
        <CardHeader className="pb-3 border-b border-pink-100 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Activity className="mr-2 h-5 w-5 text-pink-500" />
            Real-Time Symptom Reporting
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {showThankYou ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Thank You for Your Report</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your contribution helps us monitor public health and detect outbreaks early. 
                Real-time data has been updated.
              </p>
              <Button onClick={resetForm}>Report Another Symptom</Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location" className="block text-sm font-medium mb-1">
                    Your Location
                  </Label>
                  <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    {realtimeData.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}, {location.county}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="block text-sm font-medium mb-2">
                    Select Your Symptoms
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableSymptoms.map(symptom => (
                      <div key={symptom.id} className="flex items-start space-x-2">
                        <Checkbox 
                          id={symptom.id} 
                          checked={selectedSymptoms.includes(symptom.id)}
                          onCheckedChange={() => handleSymptomToggle(symptom.id)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label 
                            htmlFor={symptom.id} 
                            className="text-sm font-medium cursor-pointer"
                          >
                            {symptom.name}
                            {symptom.severity === 'severe' && (
                              <span className="ml-1 text-xs text-red-500 font-normal">(Severe)</span>
                            )}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || selectedSymptoms.length === 0}
                  className="w-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  Your data is anonymized and used only for public health monitoring. 
                  Personal identifiable information is never shared.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Real-time Disease Outbreak Dashboard */}
      {currentLocation && (
        <Card className="border-orange-200 shadow-lg shadow-orange-100/30">
          <CardHeader className="pb-3 border-b border-orange-100 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <CardTitle className="text-lg font-semibold flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
              Live Disease Outbreaks - {currentLocation.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Last updated: {currentLocation.lastUpdated.toLocaleTimeString()}
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLocation.outbreaks.map(outbreak => (
                <div key={outbreak.id} className="p-3 border rounded-lg bg-gray-50/50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{outbreak.name}</h4>
                    <Badge className={getSeverityColor(outbreak.severity)}>
                      {outbreak.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      {outbreak.cases} cases
                    </span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(outbreak.trend)}
                      <span className="text-xs text-gray-600 capitalize">
                        {outbreak.trend}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Total Reports:</strong> {currentLocation.reportCount} | 
                <strong> Population:</strong> {currentLocation.population.toLocaleString()} | 
                <strong> Risk Level:</strong> <span className="capitalize">{currentLocation.riskLevel}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealTimeSymptomReporting;
