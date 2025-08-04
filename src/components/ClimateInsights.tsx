import React, { useState } from 'react';
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
  Info,
  ChevronDown,
  MapPin,
  Thermometer,
  Droplets,
  Eye,
  Sun
} from 'lucide-react';

interface City {
  id: string;
  name: string;
  state: string;
  coordinates: { lat: number; lng: number };
  population: string;
  distanceFromLA: string;
}

interface ClimateData {
  city: City;
  lastUpdated: string;
  currentWeather: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    uvIndex: number;
    condition: string;
  };
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
  // Cities near Los Angeles
  const cities: City[] = [
    {
      id: 'los-angeles',
      name: 'Los Angeles',
      state: 'CA',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      population: '3.9M',
      distanceFromLA: '0 miles'
    },
    {
      id: 'santa-monica',
      name: 'Santa Monica',
      state: 'CA',
      coordinates: { lat: 34.0195, lng: -118.4912 },
      population: '93K',
      distanceFromLA: '15 miles'
    },
    {
      id: 'pasadena',
      name: 'Pasadena',
      state: 'CA',
      coordinates: { lat: 34.1478, lng: -118.1445 },
      population: '138K',
      distanceFromLA: '11 miles'
    },
    {
      id: 'long-beach',
      name: 'Long Beach',
      state: 'CA',
      coordinates: { lat: 33.7701, lng: -118.1937 },
      population: '466K',
      distanceFromLA: '20 miles'
    },
    {
      id: 'burbank',
      name: 'Burbank',
      state: 'CA',
      coordinates: { lat: 34.1808, lng: -118.3090 },
      population: '103K',
      distanceFromLA: '12 miles'
    },
    {
      id: 'glendale',
      name: 'Glendale',
      state: 'CA',
      coordinates: { lat: 34.1425, lng: -118.2551 },
      population: '197K',
      distanceFromLA: '8 miles'
    },
    {
      id: 'anaheim',
      name: 'Anaheim',
      state: 'CA',
      coordinates: { lat: 33.8366, lng: -117.9143 },
      population: '346K',
      distanceFromLA: '28 miles'
    },
    {
      id: 'riverside',
      name: 'Riverside',
      state: 'CA',
      coordinates: { lat: 33.9533, lng: -117.3962 },
      population: '314K',
      distanceFromLA: '55 miles'
    }
  ];

  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock climate data for July 2025
  const getClimateData = (city: City): ClimateData => {
    const baseData = {
      city,
      lastUpdated: 'July 15, 2025 - 2:30 PM PDT',
    };

    switch (city.id) {
      case 'los-angeles':
        return {
          ...baseData,
          currentWeather: {
            temperature: 84,
            humidity: 65,
            windSpeed: 8,
            visibility: 6.2,
            uvIndex: 9,
            condition: 'Partly Cloudy'
          },
          earthquakes: {
            riskLevel: 'high',
            recentActivity: [
              { magnitude: 4.2, location: 'San Fernando Valley', date: '2025-07-12', depth: 8.5 },
              { magnitude: 3.8, location: 'Santa Monica Bay', date: '2025-07-10', depth: 12.3 },
              { magnitude: 5.1, location: 'San Andreas Fault', date: '2025-07-08', depth: 15.7 },
            ],
            zones: [
              { name: 'Downtown LA', riskLevel: 'high' },
              { name: 'Hollywood Hills', riskLevel: 'high' },
              { name: 'San Fernando Valley', riskLevel: 'moderate' },
            ]
          },
          floods: {
            riskLevel: 'low',
            warnings: [],
            weatherPatterns: [
              { pattern: 'Summer Heat Dome', impact: 'Minimal precipitation expected' },
              { pattern: 'Marine Layer', impact: 'Morning coastal fog' },
            ]
          },
          tornadoes: {
            riskLevel: 'low',
            alerts: [],
            zones: [
              { name: 'LA Basin', riskLevel: 'low' },
              { name: 'San Gabriel Valley', riskLevel: 'low' },
              { name: 'South Bay', riskLevel: 'low' },
            ]
          },
          wildfires: {
            riskLevel: 'high',
            currentFires: [
              { name: 'Griffith Park Fire', size: '1,250 acres', containment: 45, location: 'Griffith Park' },
              { name: 'Angeles Forest Fire', size: '3,800 acres', containment: 25, location: 'Angeles National Forest' },
            ],
            conditions: {
              temperature: 95,
              humidity: 15,
              windSpeed: 18,
              fireWeatherIndex: 28
            }
          },
          airQuality: {
            aqi: 125,
            level: 'unhealthy-sensitive',
            pollutants: [
              { name: 'PM2.5', value: 45, unit: 'μg/m³', level: 'unhealthy' },
              { name: 'PM10', value: 85, unit: 'μg/m³', level: 'moderate' },
              { name: 'O3', value: 0.12, unit: 'ppm', level: 'unhealthy' },
              { name: 'NO2', value: 0.08, unit: 'ppm', level: 'moderate' },
            ],
            healthRecommendations: [
              'Sensitive groups should avoid outdoor activities',
              'Everyone should limit prolonged outdoor exertion',
              'Keep windows and doors closed',
              'Use air purifiers and avoid outdoor exercise'
            ]
          }
        };
      
      case 'santa-monica':
        return {
          ...baseData,
          currentWeather: {
            temperature: 78,
            humidity: 72,
            windSpeed: 12,
            visibility: 8.5,
            uvIndex: 7,
            condition: 'Marine Layer'
          },
          earthquakes: {
            riskLevel: 'moderate',
            recentActivity: [
              { magnitude: 3.5, location: 'Santa Monica Bay', date: '2025-07-11', depth: 10.2 },
              { magnitude: 2.9, location: 'Malibu Coast', date: '2025-07-09', depth: 6.8 },
            ],
            zones: [
              { name: 'Santa Monica', riskLevel: 'moderate' },
              { name: 'Venice Beach', riskLevel: 'moderate' },
              { name: 'Pacific Palisades', riskLevel: 'low' },
            ]
          },
          floods: {
            riskLevel: 'low',
            warnings: [],
            weatherPatterns: [
              { pattern: 'Coastal Marine Layer', impact: 'Natural cooling effect' },
              { pattern: 'Sea Breeze', impact: 'Afternoon wind patterns' },
            ]
          },
          tornadoes: {
            riskLevel: 'low',
            alerts: [],
            zones: [
              { name: 'Coastal Areas', riskLevel: 'low' },
              { name: 'Santa Monica Mountains', riskLevel: 'low' },
            ]
          },
          wildfires: {
            riskLevel: 'moderate',
            currentFires: [
              { name: 'Topanga Fire', size: '850 acres', containment: 70, location: 'Topanga Canyon' },
            ],
            conditions: {
              temperature: 82,
              humidity: 45,
              windSpeed: 15,
              fireWeatherIndex: 18
            }
          },
          airQuality: {
            aqi: 95,
            level: 'moderate',
            pollutants: [
              { name: 'PM2.5', value: 28, unit: 'μg/m³', level: 'moderate' },
              { name: 'PM10', value: 52, unit: 'μg/m³', level: 'moderate' },
              { name: 'O3', value: 0.09, unit: 'ppm', level: 'moderate' },
              { name: 'NO2', value: 0.04, unit: 'ppm', level: 'good' },
            ],
            healthRecommendations: [
              'Air quality is acceptable for most people',
              'Sensitive individuals may experience minor symptoms',
              'Consider reducing outdoor activities during peak hours',
              'Ocean breeze helps improve air circulation'
            ]
          }
        };

      default:
        return {
          ...baseData,
          currentWeather: {
            temperature: 86,
            humidity: 58,
            windSpeed: 10,
            visibility: 7.0,
            uvIndex: 8,
            condition: 'Sunny'
          },
          earthquakes: {
            riskLevel: 'moderate',
            recentActivity: [
              { magnitude: 3.1, location: `Near ${city.name}`, date: '2025-07-13', depth: 9.5 },
              { magnitude: 2.7, location: `${city.name} Area`, date: '2025-07-11', depth: 7.2 },
            ],
            zones: [
              { name: `${city.name} Metro`, riskLevel: 'moderate' },
              { name: `${city.name} Suburbs`, riskLevel: 'low' },
            ]
          },
          floods: {
            riskLevel: 'low',
            warnings: [],
            weatherPatterns: [
              { pattern: 'Summer Dry Pattern', impact: 'Low precipitation probability' },
            ]
          },
          tornadoes: {
            riskLevel: 'low',
            alerts: [],
            zones: [
              { name: `${city.name} Area`, riskLevel: 'low' },
            ]
          },
          wildfires: {
            riskLevel: 'moderate',
            currentFires: [
              { name: `${city.name.split(' ')[0]} Hills Fire`, size: '1,100 acres', containment: 55, location: `Near ${city.name}` },
            ],
            conditions: {
              temperature: 89,
              humidity: 25,
              windSpeed: 14,
              fireWeatherIndex: 22
            }
          },
          airQuality: {
            aqi: 105,
            level: 'unhealthy-sensitive',
            pollutants: [
              { name: 'PM2.5', value: 35, unit: 'μg/m³', level: 'moderate' },
              { name: 'PM10', value: 68, unit: 'μg/m³', level: 'moderate' },
              { name: 'O3', value: 0.10, unit: 'ppm', level: 'moderate' },
              { name: 'NO2', value: 0.06, unit: 'ppm', level: 'moderate' },
            ],
            healthRecommendations: [
              'Sensitive groups should limit outdoor activities',
              'Consider indoor exercise alternatives',
              'Monitor air quality throughout the day',
              'Use air conditioning with good filtration'
            ]
          }
        };
    }
  };

  const climateData = getClimateData(selectedCity);

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
    <Card className="climate-card border-0 shadow-glass">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <Activity className="h-7 w-7 text-blue-600" />
            Climate Insights & Environmental Monitoring
          </CardTitle>
          
          {/* City Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 min-w-[200px]"
            >
              <MapPin className="h-5 w-5 text-blue-600" />
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-800">{selectedCity.name}</div>
                <div className="text-xs text-gray-600">{selectedCity.distanceFromLA} from LA</div>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-blue-50/50 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
                      selectedCity.id === city.id ? 'bg-blue-100/50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">{city.name}, {city.state}</div>
                        <div className="text-sm text-gray-600">Pop: {city.population} • {city.distanceFromLA}</div>
                      </div>
                      {selectedCity.id === city.id && (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Current Weather Summary */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-gray-800">Current Conditions</span>
            </div>
            <span className="text-sm text-gray-600">{climateData.lastUpdated}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <Thermometer className="h-4 w-4 text-red-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-800">{climateData.currentWeather.temperature}°F</div>
              <div className="text-xs text-gray-600">Temperature</div>
            </div>
            <div className="text-center">
              <Droplets className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-800">{climateData.currentWeather.humidity}%</div>
              <div className="text-xs text-gray-600">Humidity</div>
            </div>
            <div className="text-center">
              <Wind className="h-4 w-4 text-gray-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-800">{climateData.currentWeather.windSpeed} mph</div>
              <div className="text-xs text-gray-600">Wind Speed</div>
            </div>
            <div className="text-center">
              <Eye className="h-4 w-4 text-gray-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-800">{climateData.currentWeather.visibility} mi</div>
              <div className="text-xs text-gray-600">Visibility</div>
            </div>
            <div className="text-center">
              <Sun className="h-4 w-4 text-orange-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-800">{climateData.currentWeather.uvIndex}</div>
              <div className="text-xs text-gray-600">UV Index</div>
            </div>
            <div className="text-center">
              <CloudRain className="h-4 w-4 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-bold text-gray-800">{climateData.currentWeather.condition}</div>
              <div className="text-xs text-gray-600">Condition</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Earthquake Risk */}
        <div className="climate-section rounded-consistent p-5 shadow-lg">
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
        <div className="climate-section rounded-consistent p-5 shadow-lg">
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
        <div className="climate-section rounded-consistent p-5 shadow-lg">
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
        <div className="climate-section rounded-consistent p-5 shadow-lg">
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
        <div className="climate-section rounded-consistent p-5 shadow-lg">
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
