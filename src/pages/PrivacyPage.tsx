import { useState } from 'react';
import { Shield, Eye, Lock, Database, User, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const privacySections = [
  {
    title: 'Information We Collect',
    icon: Database,
    content: [
      {
        type: 'Personal Information',
        description: 'When you report issues or use our services, we may collect:',
        details: [
          'Name and contact information (when provided)',
          'Email address and phone number',
          'GPS location data',
          'Device information and IP address',
          'Browser and usage data'
        ]
      },
      {
        type: 'Issue Reports',
        description: 'When you submit civic issue reports:',
        details: [
          'Photos and images of issues',
          'Issue descriptions and categories',
          'Location coordinates',
          'Date and time of report',
          'Communication preferences'
        ]
      },
      {
        type: 'Technical Data',
        description: 'Automatically collected technical information:',
        details: [
          'Device type and operating system',
          'Browser information and version',
          'IP address and general location',
          'Access times and usage patterns',
          'Error logs and performance data'
        ]
      }
    ]
  },
  {
    title: 'How We Use Your Information',
    icon: Eye,
    content: [
      {
        type: 'Service Delivery',
        description: 'We use your information to:',
        details: [
          'Process and route your issue reports',
          'Provide AI-powered issue detection',
          'Connect you with appropriate government departments',
          'Send status updates and notifications',
          'Improve our services and user experience'
        ]
      },
      {
        type: 'Analytics and Improvement',
        description: 'For platform improvement:',
        details: [
          'Analyze usage patterns and trends',
          'Identify common civic issues in areas',
          'Improve AI detection accuracy',
          'Optimize response times',
          'Develop new features and services'
        ]
      },
      {
        type: 'Communication',
        description: 'We may contact you for:',
        details: [
          'Issue status updates and resolutions',
          'Service announcements and maintenance',
          'Security alerts and important notices',
          'User feedback and satisfaction surveys',
          'Educational content about civic issues'
        ]
      }
    ]
  },
  {
    title: 'Information Sharing',
    icon: Lock,
    content: [
      {
        type: 'Government Departments',
        description: 'We share your issue reports with:',
        details: [
          'Relevant municipal departments',
          'Public works authorities',
          'Emergency services when required',
          'Statistical government agencies',
          'Anonymized data for research purposes'
        ]
      },
      {
        type: 'Legal Requirements',
        description: 'We may share information when:',
        details: [
          'Required by law or regulation',
          'Necessary to protect public safety',
          'Preventing fraud or illegal activities',
          'Responding to legal requests',
          'Protecting our rights and property'
        ]
      },
      {
        type: 'Third Parties',
        description: 'Limited sharing with service partners:',
        details: [
          'Cloud service providers for data storage',
          'Payment processors for transactions',
          'Analytics services (anonymized data)',
          'Communication service providers',
          'Security and monitoring services'
        ]
      }
    ]
  },
  {
    title: 'Data Security',
    icon: Shield,
    content: [
      {
        type: 'Protection Measures',
        description: 'We implement multiple security layers:',
        details: [
          'SSL/TLS encryption for data transmission',
          'Encrypted database storage',
          'Regular security audits and testing',
          'Employee background checks and training',
          'Access controls and authentication',
          'Incident response procedures'
        ]
      },
      {
        type: 'Data Retention',
        description: 'Your data is retained according to:',
        details: [
          'Issue reports: 7 years (as required by law)',
          'Account information: Until account deletion',
          'Analytics data: Anonymized after 90 days',
          'Error logs: 30 days maximum',
          'Communication records: 2 years'
        ]
      }
    ]
  }
];

const userRights = [
  {
    title: 'Access and Control',
    description: 'You have the right to:',
    points: [
      'Access your personal information',
      'Update or correct your data',
      'Delete your account and data',
      'Download your data (portability)',
      'Opt-out of marketing communications',
      'Control data sharing preferences'
    ]
  },
  {
    title: 'Transparency',
    description: 'We are committed to:',
    points: [
      'Clear privacy policies and notices',
      'Transparent data practices',
      'Regular privacy policy updates',
      'Accessible contact information',
      'Response to privacy inquiries',
      'Independent audits and assessments'
    ]
  },
  {
    title: 'Security and Privacy',
    description: 'Your privacy is protected through:',
    points: [
      'End-to-end encryption',
      'Secure authentication methods',
      'Regular security updates',
      'Privacy by design principles',
      'Data minimization practices',
      'User consent mechanisms'
    ]
  }
];

export default function PrivacyPage() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('policy');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab('policy')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'policy'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('rights')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'rights'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Your Rights
            </button>
          </div>
        </div>

        {activeTab === 'policy' && (
          <div className="space-y-8">
            {privacySections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <section.icon className="h-6 w-6 text-orange-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                    </div>
                    <div className={`transition-transform duration-300 ${
                      expandedSection === index ? 'rotate-180' : ''
                    }`}>
                      <AlertTriangle className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                </button>
                
                {expandedSection === index && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <div className="space-y-6">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="space-y-3">
                          <h3 className="text-lg font-semibold text-gray-900">{item.type}</h3>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          <ul className="space-y-2">
                            {item.details.map((detail, detailIdx) => (
                              <li key={detailIdx} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                <span className="text-gray-700">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rights' && (
          <div className="space-y-8">
            {userRights.map((right, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{right.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{right.description}</p>
                <ul className="space-y-2">
                  {right.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Contact for Privacy */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Privacy Questions?</h3>
            <p className="mb-6">
              If you have questions about this privacy policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Privacy Inquiries
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Shield className="h-4 w-4" />
                Report Privacy Issue
              </button>
            </div>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900">Policy Updates</h3>
            </div>
            <p className="text-gray-600 mb-6">
              We may update this privacy policy from time to time to reflect changes in our practices, 
              technology, or legal requirements. We will notify users of significant changes.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-900 font-medium">Last Updated</span>
                <span className="text-gray-600">March 24, 2024</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-900 font-medium">Next Review</span>
                <span className="text-gray-600">June 24, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
