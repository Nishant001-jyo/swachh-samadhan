import { useState } from 'react';
import { MapPin, Users, CheckCircle, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cities = [
  {
    id: 1,
    name: 'Bangalore',
    state: 'Karnataka',
    population: '12.3M',
    area: '741 km²',
    image: 'https://images.unsplash.com/photo-1559828268-dca888d6567c?w=600&h=400&fit=crop',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    stats: {
      totalIssues: 520,
      resolvedThisMonth: 412,
      pendingIssues: 108,
      avgResolutionTime: '2.1 days',
      satisfactionRate: '96%',
      activeUsers: 8234,
      coverage: '87%'
    },
    departments: ['Public Works', 'Sanitation', 'Electrical', 'Water Supply'],
    initiatives: ['Smart City Project', 'Clean Bangalore Initiative', 'Digital Governance']
  },
  {
    id: 2,
    name: 'Delhi',
    state: 'National Capital Territory',
    population: '32.9M',
    area: '1,484 km²',
    image: 'https://images.unsplash.com/photo-1587474260584-87f0f42b41da?w=600&h=400&fit=crop',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    stats: {
      totalIssues: 450,
      resolvedThisMonth: 380,
      pendingIssues: 70,
      avgResolutionTime: '1.8 days',
      satisfactionRate: '94%',
      activeUsers: 12450,
      coverage: '92%'
    },
    departments: ['Public Works', 'Sanitation', 'Electrical', 'Water Supply', 'Municipal Corporation'],
    initiatives: ['Smart Delhi Mission', 'Swachh Bharat Abhiyan', 'Digital Delhi']
  },
  {
    id: 3,
    name: 'Mumbai',
    state: 'Maharashtra',
    population: '20.4M',
    area: '603 km²',
    image: 'https://images.unsplash.com/photo-15494883448-3d4d3ceb7c0c?w=600&h=400&fit=crop',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    stats: {
      totalIssues: 380,
      resolvedThisMonth: 320,
      pendingIssues: 60,
      avgResolutionTime: '2.3 days',
      satisfactionRate: '91%',
      activeUsers: 9876,
      coverage: '85%'
    },
    departments: ['Public Works', 'Sanitation', 'Electrical'],
    initiatives: ['Smart Mumbai', 'Clean Mumbai Initiative']
  },
  {
    id: 4,
    name: 'Hyderabad',
    state: 'Telangana',
    population: '10.5M',
    area: '650 km²',
    image: 'https://images.unsplash.com/photo-1558618047-d293b9ab1d0c?w=600&h=400&fit=crop',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    stats: {
      totalIssues: 310,
      resolvedThisMonth: 280,
      pendingIssues: 30,
      avgResolutionTime: '1.9 days',
      satisfactionRate: '93%',
      activeUsers: 6543,
      coverage: '78%'
    },
    departments: ['Public Works', 'Sanitation', 'Electrical'],
    initiatives: ['Smart City Project', 'Clean Hyderabad']
  },
  {
    id: 5,
    name: 'Kolkata',
    state: 'West Bengal',
    population: '14.9M',
    area: '185 km²',
    image: 'https://images.unsplash.com/photo-1560442351-63a5d5b1d7c?w=600&h=400&fit=crop',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    stats: {
      totalIssues: 290,
      resolvedThisMonth: 250,
      pendingIssues: 40,
      avgResolutionTime: '2.5 days',
      satisfactionRate: '89%',
      activeUsers: 5432,
      coverage: '82%'
    },
    departments: ['Public Works', 'Sanitation'],
    initiatives: ['Smart Kolkata', 'Clean City Mission']
  },
  {
    id: 6,
    name: 'Chennai',
    state: 'Tamil Nadu',
    population: '11.9M',
    area: '426 km²',
    image: 'https://images.unsplash.com/photo-1578662976362-9b1c6b6d47c?w=600&h=400&fit=crop',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    stats: {
      totalIssues: 265,
      resolvedThisMonth: 234,
      pendingIssues: 31,
      avgResolutionTime: '2.2 days',
      satisfactionRate: '92%',
      activeUsers: 4876,
      coverage: '79%'
    },
    departments: ['Public Works', 'Sanitation', 'Water Supply'],
    initiatives: ['Smart Chennai', 'Clean Chennai']
  },
  {
    id: 7,
    name: 'Pune',
    state: 'Maharashtra',
    population: '7.4M',
    area: '516 km²',
    image: 'https://images.unsplash.com/photo-1578662976362-9b1c6b6d47c?w=600&h=400&fit=crop',
    coordinates: { lat: 18.5204, lng: 73.8567 },
    stats: {
      totalIssues: 198,
      resolvedThisMonth: 176,
      pendingIssues: 22,
      avgResolutionTime: '1.7 days',
      satisfactionRate: '94%',
      activeUsers: 3456,
      coverage: '75%'
    },
    departments: ['Public Works', 'Sanitation'],
    initiatives: ['Smart Pune', 'Clean City Initiative']
  },
  {
    id: 8,
    name: 'Jaipur',
    state: 'Rajasthan',
    population: '4.2M',
    area: '467 km²',
    image: 'https://images.unsplash.com/photo-1578662976362-9b1c6b6d47c?w=600&h=400&fit=crop',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    stats: {
      totalIssues: 156,
      resolvedThisMonth: 142,
      pendingIssues: 14,
      avgResolutionTime: '2.0 days',
      satisfactionRate: '91%',
      activeUsers: 2345,
      coverage: '68%'
    },
    departments: ['Public Works', 'Sanitation'],
    initiatives: ['Smart Jaipur', 'Pink City Initiative']
  }
];

export default function CitiesPage() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCities = [...filteredCities].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'population') return b.population.localeCompare(a.population);
    if (sortBy === 'issues') return b.stats.totalIssues - a.stats.totalIssues;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cities Covered</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Swachh-Samadhan is currently active in {cities.length} cities across {new Set(cities.map(c => c.state)).size} states
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">{cities.length}</div>
            <div className="text-sm text-gray-600">Total Cities</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{new Set(cities.map(c => c.state)).size}</div>
            <div className="text-sm text-gray-600">States Covered</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {cities.reduce((sum, city) => sum + city.stats.totalIssues, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Issues</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {cities.reduce((sum, city) => sum + city.stats.activeUsers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search cities by name or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="name">Sort by Name</option>
              <option value="population">Sort by Population</option>
              <option value="issues">Sort by Issues</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cities Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedCities.map((city) => (
                <div
                  key={city.id}
                  onClick={() => setSelectedCity(city)}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    selectedCity.id === city.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <div className="relative h-48">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="text-xs font-semibold text-gray-900">{city.name}</div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="text-xs text-gray-600">{city.state}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-gray-900">{city.population} population</span>
                      </div>
                      <div className="text-xs text-gray-600">{city.area}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{city.stats.totalIssues}</div>
                        <div className="text-gray-600">Issues</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{city.stats.satisfactionRate}</div>
                        <div className="text-gray-600">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* City Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">City Details</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    <h4 className="text-lg font-bold text-gray-900">{selectedCity.name}</h4>
                  </div>
                  <p className="text-gray-600">{selectedCity.state}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Population</div>
                    <div className="font-semibold text-gray-900">{selectedCity.population}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Area</div>
                    <div className="font-semibold text-gray-900">{selectedCity.area}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Coordinates</div>
                  <div className="font-mono text-sm text-gray-900">
                    {selectedCity.coordinates.lat.toFixed(4)}, {selectedCity.coordinates.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Issues</span>
                  <span className="font-semibold text-gray-900">{selectedCity.stats.totalIssues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolved This Month</span>
                  <span className="font-semibold text-green-600">{selectedCity.stats.resolvedThisMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Issues</span>
                  <span className="font-semibold text-orange-600">{selectedCity.stats.pendingIssues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Resolution Time</span>
                  <span className="font-semibold text-blue-600">{selectedCity.stats.avgResolutionTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Satisfaction Rate</span>
                  <span className="font-semibold text-purple-600">{selectedCity.stats.satisfactionRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-semibold text-orange-600">{selectedCity.stats.activeUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage</span>
                  <span className="font-semibold text-green-600">{selectedCity.stats.coverage}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Departments</h3>
              <div className="space-y-2">
                {selectedCity.departments.map((dept, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{dept}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Initiatives</h3>
              <div className="space-y-2">
                {selectedCity.initiatives.map((initiative, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">{initiative}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Report Issue in {selectedCity.name}
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  View Dashboard
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Emergency Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
