import { useState } from 'react';
import { Shield, Users, MapPin, Target, Award, Clock, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');

  const timeline = [
    {
      year: '2024',
      title: 'Swachh-Samadhan Launch',
      description: 'Official launch of the AI-powered civic issue detection platform',
      milestone: true
    },
    {
      year: '2024',
      title: 'First 10,000 Issues',
      description: 'Reached significant milestone in citizen engagement',
      milestone: true
    },
    {
      year: '2025',
      title: 'National Expansion',
      description: 'Platform extended to cover 48 cities across 8 states',
      milestone: true
    }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Former IAS officer with 15+ years in public administration'
    },
    {
      name: 'Priya Sharma',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      bio: 'AI/ML expert with background in civic tech solutions'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Operations specialist focused on scaling civic services'
    }
  ];

  const partners = [
    {
      name: 'Ministry of Urban Development',
      type: 'Government',
      logo: '🏛️'
    },
    {
      name: 'Smart Cities Mission',
      type: 'Government',
      logo: '🏙️'
    },
    {
      name: 'Digital India Foundation',
      type: 'Government',
      logo: '💻'
    },
    {
      name: 'Google India',
      type: 'Technology',
      logo: '🔍'
    },
    {
      name: 'Microsoft',
      type: 'Technology',
      logo: '🖥️'
    },
    {
      name: 'Nasscom',
      type: 'Industry',
      logo: '💼'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-orange-600">Swachh-Samadhan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering citizens with AI technology to create cleaner, smarter cities across India
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-10 w-10 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To revolutionize civic issue reporting and resolution in India through cutting-edge AI technology, 
              making our cities cleaner, safer, and more livable for millions of citizens.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detect</h3>
              <p className="text-gray-600">AI-powered identification of civic issues from images</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Route</h3>
              <p className="text-gray-600">Automatic assignment to the right department</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resolve</h3>
              <p className="text-gray-600">Track progress until completion</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">12,458+</div>
            <div className="text-sm text-gray-600">Issues Reported</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">9,832</div>
            <div className="text-sm text-gray-600">Issues Resolved</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">48</div>
            <div className="text-sm text-gray-600">Cities Covered</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">34.5K+</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
            <div className="space-y-8 relative z-10">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.milestone ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {item.milestone ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <span className="text-sm font-bold">{item.year}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                <div className="text-2xl mb-2">{partner.logo}</div>
                <div className="text-sm text-gray-600">{partner.name}</div>
                <div className="text-xs text-gray-500">{partner.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-white/90">Transparent and honest in all our operations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Citizen First</h3>
              <p className="text-white/90">Empowering citizens to improve their communities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-white/90">Striving for the highest quality in service</p>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technology & Innovation</h2>
          
          {/* Detection Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Detection</h3>
              <p className="text-gray-600 mb-4">
                Our advanced AI algorithms can identify over 50 different types of civic issues 
                with 94% accuracy, enabling instant categorization and routing.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Computer vision analysis</li>
                <li> Natural language processing</li>
                <li> Pattern recognition</li>
                <li> Predictive analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Detection Capabilities</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop"
                    alt="Pothole Detection"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Pothole Detection</h4>
                    <p className="text-sm text-gray-600">94% accuracy, size measurement</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop"
                    alt="Garbage Detection"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Garbage Detection</h4>
                    <p className="text-sm text-gray-600">89% accuracy, waste classification</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=80&h=80&fit=crop"
                    alt="Streetlight Detection"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Streetlight Detection</h4>
                    <p className="text-sm text-gray-600">86% accuracy, fault classification</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc47b?w=80&h=80&fit=crop"
                    alt="Water Leakage Detection"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Water Leakage Detection</h4>
                    <p className="text-sm text-gray-600">91% accuracy, leak source detection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Detection</h3>
              <p className="text-gray-600 mb-4">
                Our advanced AI algorithms can identify over 50 different types of civic issues 
                with 94% accuracy, enabling instant categorization and routing.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Computer vision analysis</li>
                <li> Natural language processing</li>
                <li> Pattern recognition</li>
                <li> Predictive analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Routing System</h3>
              <p className="text-gray-600 mb-4">
                Intelligent department assignment ensures every issue reaches the right team 
                automatically, reducing resolution time by 60%.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Automatic categorization</li>
                <li> Priority-based routing</li>
                <li> Real-time tracking</li>
                <li> Performance analytics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">Recognition & Awards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆️</div>
              <h3 className="text-xl font-semibold mb-2">National Innovation Award</h3>
              <p className="text-white/90">Government of India Digital India Initiative</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">🏅️</div>
              <h3 className="text-xl font-semibold mb-2">Smart Cities Champion</h3>
              <p className="text-white/90">Ministry of Urban Development</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Tech Excellence Award</h3>
              <p className="text-white/90">Nasscom Innovation Challenge</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
