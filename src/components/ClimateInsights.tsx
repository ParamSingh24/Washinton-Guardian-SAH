import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Zap, 
  CloudRain, 
  Tornado, 
  Flame, 
  Wind,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

interface ClimateData {
  earthquakes: {
    riskLevel: 'low' | 'moderate' | 'high';
    recentActivity: Array<{
      magnitude: number;
      location: string;
      date: string;
      depth: number;
    }>;
    zones: Array<{
      name: string;
      riskLevel: 'low' | 'moderate' | 'high';
    }>;
  };
  floods: {
    riskLevel: 'low' | 'moderate' | 'high';
    warnings: Array<{
      area: string;
      severity: 'minor' | 'moderate' | 'major';
      expectedTime: string;
    }>;
    weatherPatterns: Array<{
      pattern: string;
      impact: string;
    }>;
  };
  tornadoes: {
    riskLevel: 'low' | 'moderate' | 'high';
    alerts: Array<{
      area: string;
      severity: 'watch' | 'warning';
      validUntil: string;
    }>;
    zones: Array<{
      name: string;
      riskLevel: 'low' | 'moderate' | 'high';
    }>;
  };
  wildfires: {
    riskLevel: 'low' | 'moderate' | 'high';
    currentFires: Array<{
      name: string;
      size: string;
      containment: number;
      location: string;
    }>;
    conditions: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      fireWeatherIndex: number;
    };
  };
  airQuality: {
    aqi: number;
    level: 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
    pollutants: Array<{
      name: string;
      value: number;
      unit: string;
      level: 'good' | 'moderate' | 'unhealthy';
    }>;
    healthRecommendations: Array<string>;
  };
}

const ClimateInsights = () => {
  // Mock climate data
  const climateData: ClimateData = {
    earthquakes: {
      riskLevel: 'moderate',
      recentActivity: [
        { magnitude: 3.2, location: 'Puget Sound', date: '2024-01-15', depth: 15.2 },
        { magnitude: 2.8, location: 'Olympic Peninsula', date: '2024-01-14', depth: 8.5 },
        { magnitude: 4.1, location: 'Cascades', date: '2024-01-12', depth: 22.1 },
      ],
      zones: [
        { name: 'Seattle Metropolitan', riskLevel: 'high' },
        { name: 'Puget Sound Region', riskLevel: 'moderate' },
        { name: 'Eastern Washington', riskLevel: 'low' },
      ]
    },
    floods: {
      riskLevel: 'high',
      warnings: [
        { area: 'Skagit River Valley', severity: 'moderate', expectedTime: '6-12 hours' },
        { area: 'Snoqualmie River', severity: 'minor', expectedTime: '12-24 hours' },
      ],
      weatherPatterns: [
        { pattern: 'Atmospheric River', impact: 'Heavy rainfall expected' },
        { pattern: 'Snowmelt', impact: 'Elevated river levels' },
      ]
    },
    tornadoes: {
      riskLevel: 'low',
      alerts: [
        { area: 'Eastern Washington', severity: 'watch', validUntil: '6:00 PM PST' },
      ],
      zones: [
        { name: 'Columbia Basin', riskLevel: 'moderate' },
        { name: 'Palouse Region', riskLevel: 'low' },
        { name: 'Western Washington', riskLevel: 'low' },
      ]
    },
    wildfires: {
      riskLevel: 'moderate',
      currentFires: [
        { name: 'Alpine Fire', size: '2,450 acres', containment: 65, location: 'Okanogan County' },
        { name: 'Cedar Creek Fire', size: '890 acres', containment: 85, location: 'Chelan County' },
      ],
      conditions: {
        temperature: 78,
        humidity: 25,
        windSpeed: 12,
        fireWeatherIndex: 15
      }
    },
    airQuality: {
      aqi: 85,
      level: 'moderate',
      pollutants: [
        { name: 'PM2.5', value: 25, unit: 'μg/m³', level: 'moderate' },
        { name: 'PM10', value: 45, unit: 'μg/m³', level: 'good' },
        { name: 'O3', value: 0.08, unit: 'ppm', level: 'moderate' },
        { name: 'NO2', value: 0.03, unit: 'ppm', level: 'good' },
      ],
      healthRecommendations: [
        'Sensitive individuals should limit outdoor activities',
        'Consider wearing masks during outdoor exercise',
        'Keep windows closed during high pollution hours',
        'Use air purifiers indoors if available'
      ]
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-600';
    if (aqi <= 100) return 'text-yellow-600';
    if (aqi <= 150) return 'text-orange-600';
    if (aqi <= 200) return 'text-red-600';
    if (aqi <= 300) return 'text-purple-600';
    return 'text-red-800';
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <Activity className="h-6 w-6 text-blue-600" />
          Climate Insights & Environmental Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Earthquake Risk */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-lg">Earthquake Risk & Seismic Activity</h3>
            </div>
            <Badge className={getRiskBadgeColor(climateData.earthquakes.riskLevel)}>
              {climateData.earthquakes.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Recent Seismic Activity</h4>
              <div className="space-y-2">
                {climateData.earthquakes.recentActivity.map((quake, index) => (
                  <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">M{quake.magnitude}</span>
                      <span className="text-gray-500">{quake.date}</span>
                    </div>
                    <div className="text-gray-600">{quake.location} • {quake.depth}km depth</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Risk Zones</h4>
              <div className="space-y-2">
                {climateData.earthquakes.zones.map((zone, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{zone.name}</span>
                    <Badge className={getRiskBadgeColor(zone.riskLevel)} variant="outline">
                      {zone.riskLevel}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Flood Risk */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Flood Risk & Weather Patterns</h3>
            </div>
            <Badge className={getRiskBadgeColor(climateData.floods.riskLevel)}>
              {climateData.floods.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
          {climateData.floods.warnings.length > 0 && (
            <Alert className="mb-4 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Active Flood Warnings:</strong>
                <ul className="mt-1 ml-4 list-disc">
                  {climateData.floods.warnings.map((warning, index) => (
                    <li key={index}>
                      {warning.area} - {warning.severity} flooding expected in {warning.expectedTime}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Weather Patterns</h4>
            {climateData.floods.weatherPatterns.map((pattern, index) => (
              <div key={index} className="text-sm bg-blue-50 p-2 rounded">
                <span className="font-medium text-blue-800">{pattern.pattern}:</span>
                <span className="ml-2 text-blue-700">{pattern.impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tornado Risk */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Tornado className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-lg">Tornado Risk & Weather Alerts</h3>
            </div>
            <Badge className={getRiskBadgeColor(climateData.tornadoes.riskLevel)}>
              {climateData.tornadoes.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
          {climateData.tornadoes.alerts.length > 0 && (
            <Alert className="mb-4 border-yellow-200 bg-yellow-50">
              <Info className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Active Tornado Alerts:</strong>
                <ul className="mt-1 ml-4 list-disc">
                  {climateData.tornadoes.alerts.map((alert, index) => (
                    <li key={index}>
                      {alert.area} - {alert.severity.toUpperCase()} valid until {alert.validUntil}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {climateData.tornadoes.zones.map((zone, index) => (
              <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                <span>{zone.name}</span>
                <Badge className={getRiskBadgeColor(zone.riskLevel)} variant="outline">
                  {zone.riskLevel}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Wildfire Risk */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold text-lg">Wildfire Risk & Current Conditions</h3>
            </div>
            <Badge className={getRiskBadgeColor(climateData.wildfires.riskLevel)}>
              {climateData.wildfires.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Active Fires</h4>
              <div className="space-y-2">
                {climateData.wildfires.currentFires.map((fire, index) => (
                  <div key={index} className="text-sm bg-red-50 p-2 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-red-800">{fire.name}</span>
                      <span className="text-red-600">{fire.containment}% contained</span>
                    </div>
                    <div className="text-red-700">{fire.size} • {fire.location}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Fire Weather Conditions</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-medium">Temperature</div>
                  <div className="text-red-600">{climateData.wildfires.conditions.temperature}°F</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-medium">Humidity</div>
                  <div className="text-orange-600">{climateData.wildfires.conditions.humidity}%</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-medium">Wind Speed</div>
                  <div className="text-blue-600">{climateData.wildfires.conditions.windSpeed} mph</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-medium">Fire Weather Index</div>
                  <div className="text-red-600">{climateData.wildfires.conditions.fireWeatherIndex}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-lg">Air Quality Index & Health Recommendations</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getAQIColor(climateData.airQuality.aqi)}`}>
                {climateData.airQuality.aqi}
              </span>
              <Badge className={getRiskBadgeColor(climateData.airQuality.level === 'good' ? 'low' : climateData.airQuality.level === 'moderate' ? 'moderate' : 'high')}>
                {climateData.airQuality.level.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Pollutant Levels</h4>
              <div className="space-y-2">
                {climateData.airQuality.pollutants.map((pollutant, index) => (
                  <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                    <div>
                      <span className="font-medium">{pollutant.name}</span>
                      <span className="ml-2 text-gray-600">{pollutant.value} {pollutant.unit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {pollutant.level === 'good' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : pollutant.level === 'moderate' ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-xs ${
                        pollutant.level === 'good' ? 'text-green-600' :
                        pollutant.level === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {pollutant.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Health Recommendations</h4>
              <ul className="space-y-1 text-sm">
                {climateData.airQuality.healthRecommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClimateInsights;
