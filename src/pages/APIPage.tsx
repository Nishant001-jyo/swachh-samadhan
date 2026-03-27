import { useState } from 'react';
import { Code, Database, Shield, Key, Clock, CheckCircle, Copy, Terminal, Zap, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const apiEndpoints = [
  {
    category: 'Issue Management',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/issues',
        description: 'Submit a new civic issue report',
        authentication: 'Required',
        parameters: [
          { name: 'image', type: 'File', required: true, description: 'Image of the issue' },
          { name: 'description', type: 'String', required: false, description: 'Optional description' },
          { name: 'location', type: 'Object', required: true, description: 'GPS coordinates' },
          { name: 'citizen_info', type: 'Object', required: false, description: 'Reporter information' }
        ],
        response: {
          success: { code: 201, description: 'Issue created successfully' },
          error: { code: 400, description: 'Invalid request data' }
        }
      },
      {
        method: 'GET',
        path: '/api/v1/issues',
        description: 'Get list of reported issues',
        authentication: 'Required',
        parameters: [
          { name: 'city', type: 'String', required: false, description: 'Filter by city' },
          { name: 'status', type: 'String', required: false, description: 'Filter by status' },
          { name: 'page', type: 'Integer', required: false, description: 'Pagination' },
          { name: 'limit', type: 'Integer', required: false, description: 'Results per page' }
        ],
        response: {
          success: { code: 200, description: 'Issues list retrieved' },
          error: { code: 401, description: 'Unauthorized' }
        }
      },
      {
        method: 'PUT',
        path: '/api/v1/issues/{id}',
        description: 'Update issue status or details',
        authentication: 'Required',
        parameters: [
          { name: 'id', type: 'String', required: true, description: 'Issue ID' },
          { name: 'status', type: 'String', required: false, description: 'New status' },
          { name: 'notes', type: 'String', required: false, description: 'Update notes' }
        ],
        response: {
          success: { code: 200, description: 'Issue updated successfully' },
          error: { code: 404, description: 'Issue not found' }
        }
      }
    ]
  },
  {
    category: 'Analytics & Reports',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/analytics/summary',
        description: 'Get overall platform analytics',
        authentication: 'Required',
        parameters: [
          { name: 'start_date', type: 'Date', required: false, description: 'Start date for analytics' },
          { name: 'end_date', type: 'Date', required: false, description: 'End date for analytics' },
          { name: 'city', type: 'String', required: false, description: 'Filter by city' }
        ],
        response: {
          success: { code: 200, description: 'Analytics data retrieved' },
          error: { code: 403, description: 'Insufficient permissions' }
        }
      },
      {
        method: 'GET',
        path: '/api/v1/reports/generate',
        description: 'Generate detailed reports',
        authentication: 'Required',
        parameters: [
          { name: 'type', type: 'String', required: true, description: 'Report type (daily/weekly/monthly)' },
          { name: 'format', type: 'String', required: false, description: 'Output format (pdf/csv/json)' },
          { name: 'department', type: 'String', required: false, description: 'Filter by department' }
        ],
        response: {
          success: { code: 200, description: 'Report generated successfully' },
          error: { code: 500, description: 'Report generation failed' }
        }
      }
    ]
  },
  {
    category: 'Location Services',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/locations/cities',
        description: 'Get list of supported cities',
        authentication: 'None',
        parameters: [
          { name: 'state', type: 'String', required: false, description: 'Filter by state' },
          { name: 'search', type: 'String', required: false, description: 'Search cities' }
        ],
        response: {
          success: { code: 200, description: 'Cities list retrieved' },
          error: { code: 404, description: 'No cities found' }
        }
      },
      {
        method: 'GET',
        path: '/api/v1/locations/reverse-geocode',
        description: 'Convert coordinates to address',
        authentication: 'Required',
        parameters: [
          { name: 'lat', type: 'Float', required: true, description: 'Latitude' },
          { name: 'lng', type: 'Float', required: true, description: 'Longitude' }
        ],
        response: {
          success: { code: 200, description: 'Address retrieved' },
          error: { code: 400, description: 'Invalid coordinates' }
        }
      }
    ]
  },
  {
    category: 'User Management',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/auth/login',
        description: 'User authentication',
        authentication: 'None',
        parameters: [
          { name: 'email', type: 'String', required: true, description: 'User email' },
          { name: 'password', type: 'String', required: true, description: 'User password' }
        ],
        response: {
          success: { code: 200, description: 'Authentication successful' },
          error: { code: 401, description: 'Invalid credentials' }
        }
      },
      {
        method: 'GET',
        path: '/api/v1/users/profile',
        description: 'Get user profile information',
        authentication: 'Required',
        parameters: [],
        response: {
          success: { code: 200, description: 'Profile retrieved' },
          error: { code: 401, description: 'Unauthorized' }
        }
      }
    ]
  }
];

const codeExamples = {
  curl: {
    title: 'cURL',
    language: 'bash',
    example: `curl -X POST https://api.swachhsamadhan.gov.in/api/v1/issues \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "base64_encoded_image",
    "description": "Large pothole on main road",
    "location": {
      "lat": 28.6139,
      "lng": 77.2090
    },
    "citizen_info": {
      "name": "John Doe",
      "phone": "+91 98765 43210"
    }
  }'`
  },
  javascript: {
    title: 'JavaScript',
    language: 'javascript',
    example: `const response = await fetch('https://api.swachhsamadhan.gov.in/api/v1/issues', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image: "base64_encoded_image",
    description: "Large pothole on main road",
    location: {
      lat: 28.6139,
      lng: 77.2090
    },
    citizen_info: {
      name: "John Doe",
      phone: "+91 98765 43210"
    }
  })
});

const data = await response.json();
console.log(data);`
  },
  python: {
    title: 'Python',
    language: 'python',
    example: `import requests

url = "https://api.swachhsamadhan.gov.in/api/v1/issues"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

data = {
    "image": "base64_encoded_image",
    "description": "Large pothole on main road",
    "location": {
        "lat": 28.6139,
        "lng": 77.2090
    },
    "citizen_info": {
        "name": "John Doe",
        "phone": "+91 98765 43210"
    }
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`
  }
};

export default function APIPage() {
  const [selectedCategory, setSelectedCategory] = useState(apiEndpoints[0]);
  const [selectedExample, setSelectedExample] = useState('curl');
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Integrate Swachh-Samadhan capabilities into your applications with our RESTful API
          </p>
        </div>

        {/* API Key Section */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl p-8 mb-12 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Get Your API Key</h2>
            <p className="mb-6">Sign up for free API access and start building civic solutions</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Sign Up for API Key
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {apiEndpoints.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory.category === category.category
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Endpoints */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedCategory.category} Endpoints
              </h2>
              
              <div className="space-y-6">
                {selectedCategory.endpoints.map((endpoint, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                          endpoint.method === 'PUT' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{endpoint.path}</h3>
                      </div>
                      {endpoint.authentication === 'Required' && (
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-orange-600" />
                          <span className="text-sm text-orange-600 font-medium">Auth Required</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{endpoint.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
                        <div className="space-y-2">
                          {endpoint.parameters.map((param, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                param.required ? 'bg-red-500' : 'bg-gray-400'
                              }`}></div>
                              <div>
                                <div className="font-mono text-sm text-gray-900">{param.name}</div>
                                <div className="text-xs text-gray-600">{param.type}</div>
                                <div className="text-xs text-gray-500">{param.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Response Codes</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div>
                              <span className="font-mono text-sm text-green-600">{endpoint.response.success.code}</span>
                              <span className="text-sm text-gray-600 ml-2">{endpoint.response.success.description}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div>
                              <span className="font-mono text-sm text-red-600">{endpoint.response.error.code}</span>
                              <span className="text-sm text-gray-600 ml-2">{endpoint.response.error.description}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
              <div className="flex gap-2 mb-4">
                {Object.keys(codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedExample(lang)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedExample === lang
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {codeExamples[lang as keyof typeof codeExamples].title}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples[selectedExample as keyof typeof codeExamples].example}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeExamples[selectedExample as keyof typeof codeExamples].example)}
                  className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                >
                  {copiedCode === codeExamples[selectedExample as keyof typeof codeExamples].example ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limits</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Requests per minute</span>
                  <span className="font-semibold text-gray-900">60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Requests per hour</span>
                  <span className="font-semibold text-gray-900">1,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Requests per day</span>
                  <span className="font-semibold text-gray-900">10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File upload size</span>
                  <span className="font-semibold text-gray-900">10MB</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SDKs & Tools</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-gray-900">JavaScript SDK</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Download
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-900">Python SDK</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Download
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-gray-900">Postman Collection</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Developer Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>API Documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Community Forum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
