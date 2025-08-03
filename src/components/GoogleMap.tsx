import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { monitoredLocations } from '@/lib/ai-utils';

const DEFAULT_API_KEY = "AIzaSyAraVzrGGD7HF-NmhdgdUMx14LYSp6vOc4";

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('googleMapsApiKey') || DEFAULT_API_KEY);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (apiKey && mapRef.current && !isLoaded) {
      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      });

      loader.load().then(() => {
        const mapInstance = new google.maps.Map(mapRef.current!, {
          center: { lat: 36.7783, lng: -119.4179 }, // California center
          zoom: 6,
          styles: [
            {
              featureType: 'poi.medical',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'poi.hospital',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        setMap(mapInstance);
        setIsLoaded(true);

        // Add markers and disease outbreak overlays for each location
        monitoredLocations.forEach(location => {
          let markerColor = '#22C55E'; // green
          if (location.riskLevel === 'moderate') markerColor = '#EAB308'; // yellow
          if (location.riskLevel === 'high') markerColor = '#F97316'; // orange
          if (location.riskLevel === 'severe') markerColor = '#EF4444'; // red

          // Create main marker
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: mapInstance,
            title: `${location.name}: ${location.reportCount} reports (${location.riskLevel} risk)` +
                   `\nOutbreaks: ${location.outbreaks.map(o => `${o.name} (${o.cases})`).join(', ')}`,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: Math.max(10, Math.min(location.reportCount / 20, 25)),
              fillColor: markerColor,
              fillOpacity: 0.8,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }
          });

          // Add outbreak heat overlay circles for severe outbreaks
          location.outbreaks.forEach(outbreak => {
            if (outbreak.severity === 'critical' || outbreak.severity === 'high') {
              const circle = new google.maps.Circle({
                strokeColor: outbreak.severity === 'critical' ? '#DC2626' : '#EA580C',
                strokeOpacity: 0.4,
                strokeWeight: 1,
                fillColor: outbreak.severity === 'critical' ? '#DC2626' : '#EA580C',
                fillOpacity: 0.15,
                map: mapInstance,
                center: { lat: location.lat, lng: location.lng },
                radius: Math.max(5000, outbreak.cases * 50) // Dynamic radius based on cases
              });
            }
          });

          // Add natural disaster risk overlays if available
          if (location.naturalDisasterRisk) {
            // Earthquake risk overlay (square)
            if (location.naturalDisasterRisk.earthquake.riskLevel === 'very_high' || location.naturalDisasterRisk.earthquake.riskLevel === 'high') {
              const rectangle = new google.maps.Rectangle({
                strokeColor: '#B91C1C',
                strokeOpacity: 0.3,
                strokeWeight: 2,
                fillColor: '#B91C1C',
                fillOpacity: 0.1,
                map: mapInstance,
                bounds: {
                  north: location.lat + 0.1,
                  south: location.lat - 0.1,
                  east: location.lng + 0.1,
                  west: location.lng - 0.1,
                },
              });
            }

            // Wildfire risk overlay (if very high or extreme season)
            if (location.naturalDisasterRisk.wildfire.riskLevel === 'very_high' || location.naturalDisasterRisk.wildfire.currentSeason === 'extreme') {
              const fireOverlay = new google.maps.Circle({
                strokeColor: '#EA580C',
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillColor: '#EA580C',
                fillOpacity: 0.2,
                map: mapInstance,
                center: { lat: location.lat, lng: location.lng },
                radius: 15000 // 15km radius for wildfire risk
              });
            }
          }

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-3 max-w-xs">
                <h3 class="font-semibold text-sm mb-1">${location.name}</h3>
                <p class="text-xs text-gray-600 mb-1">${location.county}</p>
                <p class="text-xs mb-2">${location.reportCount} symptom reports</p>
                <p class="text-xs mb-2">Risk Level: <span class="font-medium" style="color: ${markerColor}">${location.riskLevel}</span></p>
                <div class="border-t pt-2">
                  <h4 class="font-semibold text-xs mb-1">Active Outbreaks:</h4>
                  ${location.outbreaks.map(o => `
                    <div class="text-xs mb-1">
                      <span class="font-medium">${o.name}:</span> ${o.cases} cases
                      <span class="text-gray-500">(${o.severity}, ${o.trend})</span>
                    </div>
                  `).join('')}
                </div>
                <p class="text-xs text-gray-500 mt-2">Last updated: ${location.lastUpdated.toLocaleString()}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        });
      }).catch(error => {
        console.error('Error loading Google Maps:', error);
      });
    }
  }, [apiKey, isLoaded]);

  const handleApiKeySubmit = () => {
    localStorage.setItem('googleMapsApiKey', apiKey);
    window.location.reload();
  };

  if (!apiKey) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Google Maps Integration</h3>
        <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
          To display real Google Maps, please enter your Google Maps API key. 
          Get one from the Google Cloud Console.
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="password"
            placeholder="Enter Google Maps API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border-pink-300 focus:border-pink-500"
          />
          <Button 
            onClick={handleApiKeySubmit}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white"
          >
            Load Map
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Your API key will be stored locally in your browser
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden border border-pink-200 shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
