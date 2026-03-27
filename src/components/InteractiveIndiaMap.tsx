import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Navigation, MapPin, Search, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  name?: string;
  timestamp: Date;
}

interface SavedLocation extends Location {
  id: string;
}

// Custom marker icon
const customIcon = L.divIcon({
  html: `
    <div style="
      background: linear-gradient(135deg, #ff9933, #ff6600);
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `,
  className: 'custom-marker',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Component to handle map clicks
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function InteractiveIndiaMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reverseGeocoding, setReverseGeocoding] = useState(false);
  const [map, setMap] = useState<any>(null);
  const mapRef = useRef<any>(null);

  // India center coordinates
  const indiaCenter: [number, number] = [20.5937, 78.9629];

  // Get current location
  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location: Location = {
            lat: latitude,
            lng: longitude,
            timestamp: new Date(),
          };

          // Get location name using reverse geocoding
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            location.name = data.display_name || 'Unknown Location';
          } catch (error) {
            console.error('Reverse geocoding failed:', error);
          }

          setCurrentLocation(location);
          setSelectedLocation(location);
          setIsLoading(false);

          // Center map on current location
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    }
  };

  // Handle map click
  const handleMapClick = async (lat: number, lng: number) => {
    const location: Location = {
      lat,
      lng,
      timestamp: new Date(),
    };

    // Get location name using reverse geocoding
    setReverseGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      location.name = data.display_name || 'Unknown Location';
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    }
    setReverseGeocoding(false);

    setSelectedLocation(location);
  };

  // Save location to backend
  const saveLocation = async () => {
    if (!selectedLocation) return;

    try {
      const response = await axios.post('/api/save-location', selectedLocation);
      const savedLocation: SavedLocation = {
        ...selectedLocation,
        id: response.data.id,
      };
      setSavedLocations([...savedLocations, savedLocation]);
      alert('Location saved successfully!');
    } catch (error) {
      console.error('Error saving location:', error);
      alert('Error saving location');
    }
  };

  // Search location
  const searchLocation = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const result = data[0];
        const location: Location = {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          name: result.display_name,
          timestamp: new Date(),
        };
        
        setSelectedLocation(location);
        
        // Center map on searched location
        if (mapRef.current) {
          mapRef.current.setView([location.lat, location.lng], 13);
        }
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">Select Your Location</h1>
            </div>
            <Button
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4 mr-2" />
              )}
              Use Current Location
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-[600px] relative">
                <MapContainer
                  center={indiaCenter}
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  <MapClickHandler onMapClick={handleMapClick} />
                  
                  {/* Current Location Marker */}
                  {currentLocation && (
                    <Marker
                      position={[currentLocation.lat, currentLocation.lng]}
                      icon={L.divIcon({
                        html: `
                          <div style="
                            background: #3b82f6;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            border: 3px solid white;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                          "></div>
                        `,
                        className: 'current-location-marker',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10],
                      })}
                    >
                      <Popup>
                        <div className="text-sm">
                          <strong>Your Current Location</strong><br />
                          {currentLocation.name || 'Unknown'}
                        </div>
                      </Popup>
                    </Marker>
                  )}
                  
                  {/* Selected Location Marker */}
                  {selectedLocation && (
                    <Marker
                      position={[selectedLocation.lat, selectedLocation.lng]}
                      icon={customIcon}
                    >
                      <Popup>
                        <div className="text-sm max-w-xs">
                          <strong>Selected Location</strong><br />
                          {selectedLocation.name || 'Unknown Location'}<br />
                          <span className="text-xs text-gray-600">
                            {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                  
                  {/* Saved Locations */}
                  {savedLocations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={[loc.lat, loc.lng]}
                      icon={L.divIcon({
                        html: `
                          <div style="
                            background: #10b981;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            border: 2px solid white;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                          "></div>
                        `,
                        className: 'saved-location-marker',
                        iconSize: [16, 16],
                        iconAnchor: [8, 8],
                      })}
                    >
                      <Popup>
                        <div className="text-sm">
                          <strong>Saved Location</strong><br />
                          {loc.name || 'Unknown'}<br />
                          <span className="text-xs text-gray-600">
                            {new Date(loc.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* Loading Overlay */}
                {reverseGeocoding && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Getting location name...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Search */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="font-semibold mb-3 text-gray-900">Search Location</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter city, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                />
                <Button onClick={searchLocation} size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Selected Location */}
            {selectedLocation && (
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <h3 className="font-semibold mb-3 text-gray-900">Selected Location</h3>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Latitude</div>
                    <div className="font-mono text-sm">{selectedLocation.lat.toFixed(6)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Longitude</div>
                    <div className="font-mono text-sm">{selectedLocation.lng.toFixed(6)}</div>
                  </div>
                  {selectedLocation.name && (
                    <div>
                      <div className="text-xs text-gray-500">Location Name</div>
                      <div className="text-sm text-gray-900">{selectedLocation.name}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-gray-500">Selected At</div>
                    <div className="text-sm text-gray-900">
                      {selectedLocation.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
                <Button onClick={saveLocation} className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Location
                </Button>
              </div>
            )}

            {/* Saved Locations */}
            {savedLocations.length > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <h3 className="font-semibold mb-3 text-gray-900">Saved Locations</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {savedLocations.map((loc) => (
                    <div
                      key={loc.id}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedLocation(loc);
                        if (mapRef.current) {
                          mapRef.current.setView([loc.lat, loc.lng], 13);
                        }
                      }}
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {loc.name || 'Unknown Location'}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(loc.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl p-4 text-white shadow-lg">
              <h3 className="font-semibold mb-3">Map Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Saved Locations:</span>
                  <span className="font-semibold">{savedLocations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Location:</span>
                  <span className="font-semibold">
                    {currentLocation ? 'Available' : 'Not Set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Map Center:</span>
                  <span className="font-semibold">
                    {indiaCenter[0].toFixed(2)}, {indiaCenter[1].toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
