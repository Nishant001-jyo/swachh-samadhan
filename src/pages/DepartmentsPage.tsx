import { useState } from 'react';
import { Building, Users, Clock, CheckCircle, AlertTriangle, Phone, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const departments = [
  {
    id: 'pothole',
    name: 'Public Works Department',
    icon: Building,
    color: 'bg-orange-600',
    description: 'Handles road maintenance, pothole repairs, and infrastructure issues',
    responsibilities: [
      'Pothole repair and road maintenance',
      'Street infrastructure management',
      'Traffic signal maintenance',
      'Road safety inspections'
    ],
    contact: {
      phone: '1800-123-4567',
      email: 'pwd@swachhsamadhan.gov.in',
      head: 'Shri Rajesh Kumar',
      address: 'Public Works Office, New Delhi'
    },
    stats: {
      activeIssues: 4520,
      resolvedThisMonth: 892,
      avgResolutionTime: '2.5 days',
      satisfactionRate: '94%'
    }
  },
  {
    id: 'garbage',
    name: 'Sanitation Department',
    icon: Users,
    color: 'bg-green-600',
    description: 'Manages waste collection, garbage disposal, and cleanliness initiatives',
    responsibilities: [
      'Garbage collection and disposal',
      'Street cleaning operations',
      'Waste management initiatives',
      'Public toilet maintenance'
    ],
    contact: {
      phone: '1800-123-4568',
      email: 'sanitation@swachhsamadhan.gov.in',
      head: 'Smt. Priya Sharma',
      address: 'Sanitation Office, New Delhi'
    },
    stats: {
      activeIssues: 3120,
      resolvedThisMonth: 654,
      avgResolutionTime: '1.8 days',
      satisfactionRate: '91%'
    }
  },
  {
    id: 'streetlight',
    name: 'Electrical Department',
    icon: AlertTriangle,
    color: 'bg-blue-600',
    description: 'Responsible for street lighting, electrical maintenance, and power infrastructure',
    responsibilities: [
      'Street light installation and maintenance',
      'Electrical infrastructure repairs',
      'Power outage management',
      'Energy efficiency programs'
    ],
    contact: {
      phone: '1800-123-4569',
      email: 'electrical@swachhsamadhan.gov.in',
      head: 'Shri Amit Patel',
      address: 'Electrical Office, New Delhi'
    },
    stats: {
      activeIssues: 2100,
      resolvedThisMonth: 423,
      avgResolutionTime: '3.1 days',
      satisfactionRate: '89%'
    }
  },
  {
    id: 'water_leak',
    name: 'Water Supply Department',
    icon: CheckCircle,
    color: 'bg-cyan-600',
    description: 'Manages water supply, pipeline maintenance, and leak detection',
    responsibilities: [
      'Water supply management',
      'Pipeline maintenance and repairs',
      'Leak detection and repair',
      'Water quality monitoring'
    ],
    contact: {
      phone: '1800-123-4570',
      email: 'water@swachhsamadhan.gov.in',
      head: 'Shri Ramesh Kumar',
      address: 'Water Supply Office, New Delhi'
    },
    stats: {
      activeIssues: 1560,
      resolvedThisMonth: 312,
      avgResolutionTime: '2.8 days',
      satisfactionRate: '92%'
    }
  },
  {
    id: 'manhole',
    name: 'Municipal Corporation',
    icon: Building,
    color: 'bg-purple-600',
    description: 'Handles manhole maintenance, drainage systems, and urban infrastructure',
    responsibilities: [
      'Manhole cover maintenance',
      'Drainage system management',
      'Urban infrastructure oversight',
      'Public utility coordination'
    ],
    contact: {
      phone: '1800-123-4571',
      email: 'municipal@swachhsamadhan.gov.in',
      head: 'Shri Suresh Kumar',
      address: 'Municipal Office, New Delhi'
    },
    stats: {
      activeIssues: 1158,
      resolvedThisMonth: 287,
      avgResolutionTime: '2.2 days',
      satisfactionRate: '93%'
    }
  }
];

export default function DepartmentsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Government Departments</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the departments working together to keep our cities clean and functional
          </p>
        </div>

        {/* Department Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedDepartment.id === dept.id
                  ? `${dept.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <dept.icon className="h-4 w-4" />
                <span>{dept.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Department Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('responsibilities')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'responsibilities'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Responsibilities
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'contact'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Contact
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 ${selectedDepartment.color} rounded-lg flex items-center justify-center`}>
                      <selectedDepartment.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedDepartment.name}</h2>
                      <p className="text-gray-600">{selectedDepartment.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedDepartment.stats.activeIssues.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Active Issues</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedDepartment.stats.resolvedThisMonth}
                      </div>
                      <div className="text-sm text-gray-600">Resolved This Month</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedDepartment.stats.avgResolutionTime}
                      </div>
                      <div className="text-sm text-gray-600">Avg Resolution Time</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedDepartment.stats.satisfactionRate}
                      </div>
                      <div className="text-sm text-gray-600">Satisfaction Rate</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'responsibilities' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
                  <ul className="space-y-3">
                    {selectedDepartment.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'contact' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Department Head</div>
                        <div className="text-gray-600">{selectedDepartment.contact.head}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Phone</div>
                        <div className="text-gray-600">{selectedDepartment.contact.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Email</div>
                        <div className="text-gray-600">{selectedDepartment.contact.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Office Address</div>
                        <div className="text-gray-600">{selectedDepartment.contact.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedDepartment.id === dept.id
                        ? 'bg-orange-50 border-2 border-orange-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${dept.color} rounded flex items-center justify-center`}>
                          <dept.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {dept.stats.activeIssues} issues
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900 font-medium">Closed</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <p className="text-sm mb-4">For urgent issues requiring immediate attention</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">Emergency: 112</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">24/7 Available</span>
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
