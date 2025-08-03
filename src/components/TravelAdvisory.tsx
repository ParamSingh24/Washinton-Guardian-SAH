import React, { useState } from "react";
import { monitoredLocations, type LocationWithOutbreaks, type ClimateAlert, type NaturalDisasterRisk } from "@/lib/ai-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Thermometer, Water, AlertTriangle, CloudSun, Wind, MapPin, Plane, Home, Shield, Eye, Activity } from "lucide-react";

const TravelAdvisory = () => {
    const [currentLocation, setCurrentLocation] = useState<LocationWithOutbreaks>(monitoredLocations[0]);
    const [travelDestination, setTravelDestination] = useState<LocationWithOutbreaks>(monitoredLocations[1]);

    const getAirQualityLevel = (aqi: number) => {
        if (aqi <= 50) return { level: 'Good', color: 'bg-green-500', textColor: 'text-green-700' };
        if (aqi <= 100) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
        if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'bg-orange-500', textColor: 'text-orange-700' };
        if (aqi <= 200) return { level: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-700' };
        return { level: 'Very Unhealthy', color: 'bg-purple-500', textColor: 'text-purple-700' };
    };

    const getUVLevel = (uv: number) => {
        if (uv <= 2) return { level: 'Low', color: 'bg-green-500' };
        if (uv <= 5) return { level: 'Moderate', color: 'bg-yellow-500' };
        if (uv <= 7) return { level: 'High', color: 'bg-orange-500' };
        if (uv <= 10) return { level: 'Very High', color: 'bg-red-500' };
        return { level: 'Extreme', color: 'bg-purple-500' };
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'very_low': return 'text-green-600';
            case 'low': return 'text-green-500';
            case 'moderate': return 'text-yellow-500';
            case 'high': return 'text-orange-500';
            case 'very_high': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const renderClimateAlert = (alert: ClimateAlert) => (
        <div key={alert.id} className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">{alert.title}</h4>
                <Badge className={`${alert.severity === 'emergency' ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-orange-500' : 'bg-yellow-500'} text-white`}>
                    {alert.severity}
                </Badge>
            </div>
            <p className="text-xs mb-1">
                <strong>Type:</strong> {alert.type.replace('_', ' ')}
            </p>
            <p className="text-xs mb-1">
                <strong>Start:</strong> {alert.startDate.toLocaleDateString()} – <strong>End:</strong> {alert.endDate.toLocaleDateString()}
            </p>
            <p className="text-xs mb-2">
                {alert.description}
            </p>
            <div className="space-y-1">
                <p className="text-xs font-medium text-red-700">Health Impacts:</p>
                <ul className="text-xs text-red-600 list-disc list-inside">
                    {alert.healthImpacts.map((impact, idx) => <li key={idx}>{impact}</li>)}
                </ul>
                <p className="text-xs font-medium text-blue-700 mt-2">Recommendations:</p>
                <ul className="text-xs text-blue-600 list-disc list-inside">
                    {alert.recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
                </ul>
            </div>
        </div>
    );

    const renderLocationCard = (location: LocationWithOutbreaks, isDestination: boolean = false) => {
        const airQuality = getAirQualityLevel(location.airQualityIndex);
        const uvLevel = getUVLevel(location.uvIndex);
        
        return (
            <Card className="border-blue-200 shadow-lg shadow-blue-100/30">
                <CardHeader className="pb-3 border-b border-blue-100 bg-gradient-to-r from-blue-500/10 to-green-500/10">
                    <CardTitle className="text-lg font-semibold flex items-center">
                        {isDestination ? <Plane className="mr-2 h-5 w-5 text-blue-500" /> : <Home className="mr-2 h-5 w-5 text-green-500" />}
                        {isDestination ? 'Travel Destination' : 'Current Location'}: {location.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{location.county}, CA</p>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    {/* Environmental Conditions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="text-center p-2 bg-gray-50 rounded">
                            <Thermometer className="h-5 w-5 mx-auto mb-1 text-red-500" />
                            <p className="text-xs font-medium">Temperature</p>
                            <p className="text-sm font-bold">{location.temperature}°F</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                            <Eye className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                            <p className="text-xs font-medium">Air Quality</p>
                            <p className={`text-sm font-bold ${airQuality.textColor}`}>{location.airQualityIndex}</p>
                            <p className={`text-xs ${airQuality.textColor}`}>{airQuality.level}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                            <CloudSun className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                            <p className="text-xs font-medium">UV Index</p>
                            <p className="text-sm font-bold">{location.uvIndex}</p>
                            <Badge className={`${uvLevel.color} text-white text-xs`}>{uvLevel.level}</Badge>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                            <Water className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                            <p className="text-xs font-medium">Humidity</p>
                            <p className="text-sm font-bold">{location.humidity}%</p>
                        </div>
                    </div>

                    {/* Climate Alerts */}
                    {location.climateAlerts.length > 0 && (
                        <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-1 text-orange-500" />
                                Active Climate Alerts
                            </h4>
                            <div className="space-y-2">
                                {location.climateAlerts.map(renderClimateAlert)}
                            </div>
                        </div>
                    )}

                    {/* Natural Disaster Risks */}
                    <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                            <Shield className="h-4 w-4 mr-1 text-red-500" />
                            Natural Disaster Risks
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="p-3 border rounded-lg bg-red-50">
                                <div className="flex items-center gap-2 mb-1">
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                    <span className="font-medium text-sm">Earthquake</span>
                                </div>
                                <p className={`text-sm font-bold capitalize ${getRiskColor(location.naturalDisasterRisk.earthquake.riskLevel)}`}>
                                    {location.naturalDisasterRisk.earthquake.riskLevel.replace('_', ' ')} Risk
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    30-year probability: {location.naturalDisasterRisk.earthquake.probability30Year}%
                                </p>
                                <p className="text-xs text-gray-600">
                                    Last major: {location.naturalDisasterRisk.earthquake.lastMajorEvent}
                                </p>
                            </div>
                            <div className="p-3 border rounded-lg bg-blue-50">
                                <div className="flex items-center gap-2 mb-1">
                                    <Water className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium text-sm">Flood</span>
                                </div>
                                <p className={`text-sm font-bold capitalize ${getRiskColor(location.naturalDisasterRisk.flood.riskLevel)}`}>
                                    {location.naturalDisasterRisk.flood.riskLevel.replace('_', ' ')} Risk
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Zone: {location.naturalDisasterRisk.flood.floodZone}
                                </p>
                                <p className="text-xs text-gray-600">
                                    Seasonal risk: {location.naturalDisasterRisk.flood.seasonalRisk}
                                </p>
                            </div>
                            <div className="p-3 border rounded-lg bg-orange-50">
                                <div className="flex items-center gap-2 mb-1">
                                    <Wind className="h-4 w-4 text-orange-500" />
                                    <span className="font-medium text-sm">Wildfire</span>
                                </div>
                                <p className={`text-sm font-bold capitalize ${getRiskColor(location.naturalDisasterRisk.wildfire.riskLevel)}`}>
                                    {location.naturalDisasterRisk.wildfire.riskLevel.replace('_', ' ')} Risk
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Season: {location.naturalDisasterRisk.wildfire.currentSeason}
                                </p>
                                <p className="text-xs text-gray-600">
                                    Nearby fires: {location.naturalDisasterRisk.wildfire.nearbyFires}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Disease Outbreaks */}
                    <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                            <Activity className="h-4 w-4 mr-1 text-purple-500" />
                            Disease Outbreaks
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {location.outbreaks.map(outbreak => (
                                <div key={outbreak.id} className="p-2 border rounded bg-purple-50">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">{outbreak.name}</span>
                                        <Badge className={`${outbreak.severity === 'critical' ? 'bg-red-500' : outbreak.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'} text-white text-xs`}>
                                            {outbreak.severity}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">{outbreak.cases} cases, trend: {outbreak.trend}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            {/* Location Selection */}
            <Card className="border-green-200 shadow-lg shadow-green-100/30">
                <CardHeader className="pb-3 border-b border-green-100 bg-gradient-to-r from-green-500/10 to-blue-500/10">
                    <CardTitle className="text-lg font-semibold flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-green-500" />
                        Travel Advisory Dashboard
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Compare health and safety conditions between locations</p>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Current Location</label>
                            <select 
                                value={currentLocation.id}
                                onChange={(e) => setCurrentLocation(monitoredLocations.find(loc => loc.id === e.target.value)!)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {monitoredLocations.map(location => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}, {location.county}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Travel Destination</label>
                            <select 
                                value={travelDestination.id}
                                onChange={(e) => setTravelDestination(monitoredLocations.find(loc => loc.id === e.target.value)!)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {monitoredLocations.map(location => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}, {location.county}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Location Comparison */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {renderLocationCard(currentLocation, false)}
                {renderLocationCard(travelDestination, true)}
            </div>
        </div>
                    <strong>Earthquake Risk:</strong> {risk.earthquake.riskLevel}
                    <p className="text-xs mt-1">
                        Last major: {risk.earthquake.lastMajorEvent}, Magnitude {risk.earthquake.magnitude}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Water className="h-5 w-5 text-blue-500" />
                <div>
                    <strong>Flood Risk:</strong> {risk.flood.riskLevel}
                    <p className="text-xs mt-1">
                        Zone: {risk.flood.floodZone}, Seasonal risk: {risk.flood.seasonalRisk}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-orange-500" />
                <div>
                    <strong>Wildfire Risk:</strong> {risk.wildfire.riskLevel}
                    <p className="text-xs mt-1">
                        Current season: {risk.wildfire.currentSeason}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <Card className="border-green-200 shadow-lg shadow-green-100/30">
                <CardHeader className="pb-3 border-b border-green-100 bg-gradient-to-r from-green-500/10 to-blue-500/10">
                    <CardTitle className="text-lg font-semibold flex items-center">
                        <CloudSun className="mr-2 h-5 w-5 text-green-500" />
                        Travel Advisory
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Current Location */}
                        <div>
                            <h2 className="text-xl font-bold mb-2">Current Location: {currentLocation.name}</h2>
                            <p className="text-sm mb-4">{currentLocation.county}, CA</p>
                            <div className="mb-4">
                                {currentLocation.climateAlerts.map(renderClimateAlert)}
                            </div>
                            {renderDisasterRisks(currentLocation.naturalDisasterRisk)}
                        </div>
                        {/* Travel Destination */}
                        <div>
                            <h2 className="text-xl font-bold mb-2">Travel Destination: {travelDestination.name}</h2>
                            <p className="text-sm mb-4">{travelDestination.county}, CA</p>
                            <div className="mb-4">
                                {travelDestination.climateAlerts.map(renderClimateAlert)}
                            </div>
                            {renderDisasterRisks(travelDestination.naturalDisasterRisk)}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TravelAdvisory;

