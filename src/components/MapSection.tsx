import { motion } from "framer-motion";
import { MapPin, Navigation, Filter, Search, Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mapLocations = [
  { 
    id: 1, 
    lat: 28.6139, 
    lng: 77.2090, 
    city: "Delhi", 
    state: "National Capital Territory",
    issues: 45, 
    status: "active",
    population: "32.9M",
    departments: "MCD, NDMC, PWD"
  },
  { 
    id: 2, 
    lat: 19.0760, 
    lng: 72.8777, 
    city: "Mumbai", 
    state: "Maharashtra",
    issues: 38, 
    status: "active",
    population: "20.4M",
    departments: "BMC, MMRDA"
  },
  { 
    id: 3, 
    lat: 12.9716, 
    lng: 77.5946, 
    city: "Bangalore", 
    state: "Karnataka",
    issues: 52, 
    status: "active",
    population: "12.3M",
    departments: "BBMP, BDA, BWSSB"
  },
  { 
    id: 4, 
    lat: 22.5726, 
    lng: 88.3639, 
    city: "Kolkata", 
    state: "West Bengal",
    issues: 29, 
    status: "active",
    population: "14.9M",
    departments: "KMC, KMDA"
  },
  { 
    id: 5, 
    lat: 17.3850, 
    lng: 78.4867, 
    city: "Hyderabad", 
    state: "Telangana",
    issues: 31, 
    status: "active",
    population: "10.5M",
    departments: "GHMC, HMDA"
  },
  { 
    id: 6, 
    lat: 26.9124, 
    lng: 75.7873, 
    city: "Jaipur", 
    state: "Rajasthan",
    issues: 18, 
    status: "active",
    population: "3.9M",
    departments: "JMC, JDA"
  },
  { 
    id: 7, 
    lat: 21.1702, 
    lng: 72.8311, 
    city: "Surat", 
    state: "Gujarat",
    issues: 22, 
    status: "active",
    population: "6.8M",
    departments: "SMC, SUDA"
  },
  { 
    id: 8, 
    lat: 28.6358, 
    lng: 77.2080, 
    city: "Noida", 
    state: "Uttar Pradesh",
    issues: 15, 
    status: "active",
    population: "2.5M",
    departments: "Noida Authority"
  },
  { 
    id: 9, 
    lat: 28.4722, 
    lng: 77.0323, 
    city: "Gurgaon", 
    state: "Haryana",
    issues: 25, 
    status: "active",
    population: "2.8M",
    departments: "MCG, GMDA"
  }
];

export default function MapSection() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = mapLocations.filter(location => 
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Find nearest city or create custom location
          const nearestLocation = {
            id: 'current',
            lat: latitude,
            lng: longitude,
            city: 'Your Location',
            state: 'Current Position',
            issues: 0,
            status: 'current',
            population: '1',
            departments: 'Local Authority'
          };
          setSelectedLocation(nearestLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
            Interactive <span className="text-orange-600">India Map</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your location from the map to report civic issues. Click on any city to view details and report problems in your area.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    <span className="font-semibold">Select Your Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleGetCurrentLocation}
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Use Current Location
                    </Button>
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Interactive India Map */}
              <div className="relative h-[600px] bg-gradient-to-br from-blue-50 to-green-50">
                <img 
                  src="/india_political_map.png" 
                  alt="India Political Map"
                  className="w-full h-full object-contain"
                />
                
                {/* Location Pins */}
                {filteredLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="absolute cursor-pointer group"
                    style={{
                      top: `${15 + index * 8}%`,
                      left: `${25 + index * 7}%`
                    }}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-pulse ${
                        selectedLocation?.id === location.id 
                          ? 'bg-orange-500 scale-125' 
                          : location.issues > 40 
                            ? 'bg-red-500' 
                            : location.issues > 25 
                              ? 'bg-yellow-500' 
                              : 'bg-green-500'
                      }`}>
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 ${
                        selectedLocation?.id === location.id ? 'opacity-100' : ''
                      }`}>
                        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl whitespace-nowrap min-w-[200px]">
                          <div className="font-semibold text-orange-400">{location.city}</div>
                          <div className="text-xs text-gray-300">{location.state}</div>
                          <div className="text-sm mt-1">
                            <span className="text-yellow-400">●</span> {location.issues} active issues
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Current Location Pin */}
                {selectedLocation?.id === 'current' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg animate-pulse">
                      <Navigation className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Your Location
                    </div>
                  </motion.div>
                )}
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-xs font-semibold mb-2">Issue Density</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs">High (40+ issues)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">Medium (25-39 issues)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Low (&lt;25 issues)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Location Details */}
              {selectedLocation && selectedLocation.id !== 'current' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-orange-50 border-t border-orange-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{selectedLocation.city}</h3>
                      <p className="text-sm text-gray-600">{selectedLocation.state}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-gray-500">📍 {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</span>
                        <span className="text-gray-500">👥 {selectedLocation.population}</span>
                        <span className="text-gray-500">🏢 {selectedLocation.departments}</span>
                      </div>
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <MapPin className="h-4 w-4 mr-2" />
                      Report Issue Here
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sidebar - Location Search & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Search Box */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-900">Search Location</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>
            </div>

            {/* Location List */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <h3 className="font-semibold mb-4 text-gray-900">Cities</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredLocations.map((city, index) => (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedLocation?.id === city.id 
                        ? 'bg-orange-100 border border-orange-300' 
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                    onClick={() => handleLocationSelect(city)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{city.city}</div>
                        <div className="text-xs text-gray-500">{city.state}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          📍 {city.lat.toFixed(2)}, {city.lng.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-orange-600">{city.issues}</div>
                        <div className="text-xs text-gray-500">issues</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl p-4 text-white shadow-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Map className="h-5 w-5" />
                Map Statistics
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Cities:</span>
                  <span className="font-semibold">{mapLocations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Issues:</span>
                  <span className="font-semibold">
                    {mapLocations.reduce((sum, loc) => sum + loc.issues, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Covered States:</span>
                  <span className="font-semibold">
                    {[...new Set(mapLocations.map(loc => loc.state))].length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
