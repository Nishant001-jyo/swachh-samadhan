import { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, Users, MapPin, CheckCircle, AlertTriangle, Headphones, FileText, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const supportOptions = [
  {
    title: 'Contact Support',
    icon: Phone,
    description: 'Speak directly with our support team',
    options: [
      {
        method: 'Phone Support',
        details: '1800-123-4567',
        availability: '24/7 Available',
        description: 'For immediate assistance and emergency issues',
        waitTime: 'Average wait: 2-3 minutes',
        bestFor: ['Urgent issues', 'Complex problems', 'First-time users']
      },
      {
        method: 'Email Support',
        details: 'support@swachhsamadhan.gov.in',
        availability: 'Response within 24 hours',
        description: 'For detailed inquiries and documentation',
        waitTime: 'Response time: 24 hours',
        bestFor: ['Technical issues', 'Account problems', 'General inquiries']
      },
      {
        method: 'Live Chat',
        details: 'Available in app and website',
        availability: '24/7 Available',
        description: 'Real-time text-based support',
        waitTime: 'Instant response',
        bestFor: ['Quick questions', 'App guidance', 'Status updates']
      }
    ]
  },
  {
    title: 'Self-Service Options',
    icon: FileText,
    description: 'Find answers and resolve issues independently',
    options: [
      {
        method: 'Help Center',
        details: 'Comprehensive guides and tutorials',
        availability: 'Always available',
        description: 'Step-by-step instructions for common tasks',
        waitTime: 'Instant access',
        bestFor: ['DIY troubleshooting', 'Learning platform', 'Quick answers']
      },
      {
        method: 'FAQ Section',
        details: 'Frequently asked questions',
        availability: 'Always available',
        description: 'Answers to common user questions',
        waitTime: 'Instant access',
        bestFor: ['Common questions', 'Immediate answers', '24/7 access']
      },
      {
        method: 'Video Tutorials',
        details: 'Visual learning resources',
        availability: 'Always available',
        description: 'Watch and learn at your own pace',
        waitTime: 'On-demand access',
        bestFor: ['Visual learners', 'Complex procedures', 'Step-by-step guidance']
      }
    ]
  },
  {
    title: 'Community Support',
    icon: Users,
    description: 'Get help from fellow citizens',
    options: [
      {
        method: 'Community Forum',
        details: 'user-forum.swachhsamadhan.gov.in',
        availability: '24/7 Available',
        description: 'Connect with other users and experts',
        waitTime: 'Varies by community response',
        bestFor: ['Peer advice', 'Shared experiences', 'Community solutions']
      },
      {
        method: 'Social Media',
        details: '@SwachhSamadhan on all platforms',
        availability: '24/7 Available',
        description: 'Updates, tips, and community engagement',
        waitTime: 'Response within few hours',
        bestFor: ['Public questions', 'Announcements', 'Community updates']
      },
      {
        method: 'Local Support Centers',
        details: 'Available in major cities',
        availability: 'Business hours only',
        description: 'In-person assistance and training',
        waitTime: 'Immediate during business hours',
        bestFor: ['In-person help', 'Training sessions', 'Local issues']
      }
    ]
  }
];

const commonIssues = [
  {
    category: 'Account & Login',
    icon: Users,
    issues: [
      { title: 'Forgot Password', solution: 'Use password reset link on login page', priority: 'High' },
      { title: 'Account Locked', solution: 'Wait 30 minutes or contact support', priority: 'High' },
      { title: 'Email Verification', solution: 'Check spam folder and click resend', priority: 'Medium' },
      { title: 'Profile Update Issues', solution: 'Clear browser cache and try again', priority: 'Medium' }
    ]
  },
  {
    category: 'Reporting Issues',
    icon: MapPin,
    issues: [
      { title: 'Photo Upload Failed', solution: 'Check file size and internet connection', priority: 'High' },
      { title: 'Location Not Detected', solution: 'Enable GPS services or enter manually', priority: 'High' },
      { title: 'AI Analysis Error', solution: 'Try again or contact support', priority: 'Medium' },
      { title: 'Duplicate Report', solution: 'Check existing reports before submitting', priority: 'Low' }
    ]
  },
  {
    category: 'Technical Issues',
    icon: AlertTriangle,
    issues: [
      { title: 'App Crashing', solution: 'Update app or clear cache', priority: 'High' },
      { title: 'Slow Performance', solution: 'Check internet speed and device storage', priority: 'Medium' },
      { title: 'Notifications Not Working', solution: 'Check notification settings', priority: 'Medium' },
      { title: 'Map Not Loading', solution: 'Refresh page or check internet', priority: 'Medium' }
    ]
  }
];

const supportTeam = [
  {
    name: 'Rajesh Kumar',
    role: 'Head of Customer Support',
    experience: '15+ years in public service',
    expertise: 'Customer service excellence, team leadership',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Priya Sharma',
    role: 'Technical Support Specialist',
    experience: '10+ years in tech support',
    expertise: 'Mobile app troubleshooting, API integration',
    avatar: 'https://images.unsplash.com/photo-1494790108757-5bb590a2b6d?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Amit Patel',
    role: 'Community Manager',
    experience: '8+ years in community engagement',
    expertise: 'User education, forum moderation, social media',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf774b5?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Sunita Reddy',
    role: 'Training Specialist',
    experience: '12+ years in user education',
    expertise: 'Tutorial creation, user onboarding, documentation',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6d21bce6d47b?w=100&h=100&fit=crop&crop=face'
  }
];

export default function SupportPage() {
  const [selectedOption, setSelectedOption] = useState(supportOptions[0]);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    issueType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      issueType: 'general'
    });
    
    alert('Support request submitted successfully! We\'ll respond within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get help from our support team or find answers to common questions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact Support
            </button>
            <button
              onClick={() => setActiveTab('self-service')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'self-service'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Self-Service
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'team'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Our Team
            </button>
          </div>
        </div>

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Options */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {supportOptions.map((option, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <option.icon className="h-6 w-6 text-orange-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">{option.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    
                    <div className="space-y-3">
                      {option.options.map((method, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{method.method}</h3>
                              <div className="text-sm text-gray-600">{method.details}</div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              method.availability.includes('24/7') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {method.availability}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{method.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-600">{method.waitTime}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {method.bestFor.map((item, i) => (
                              <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Type
                    </label>
                    <select
                      id="issueType"
                      name="issueType"
                      value={formData.issueType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Issue</option>
                      <option value="reporting">Problem Reporting</option>
                      <option value="account">Account Problem</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                      placeholder="Describe your issue or question..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'self-service' && (
          <div className="space-y-8">
            {/* Common Issues */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Common Issues & Solutions</h2>
              <div className="space-y-6">
                {commonIssues.map((category) => (
                  <div key={category.category}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.issues.map((issue, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            issue.priority === 'High' ? 'bg-red-500' :
                            issue.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{issue.title}</div>
                            <div className="text-sm text-gray-600">{issue.solution}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <FileText className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-gray-900">User Manual</div>
                    <div className="text-sm text-gray-600">Complete guide to all features</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Video Tutorials</div>
                    <div className="text-sm text-gray-600">Step-by-step video guides</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Service Status</div>
                    <div className="text-sm text-gray-600">Check platform status</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">System Requirements</div>
                    <div className="text-sm text-gray-600">Device compatibility info</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-8">
            {/* Team Members */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Meet Our Support Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportTeam.map((member, index) => (
                  <div key={index} className="text-center">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <div className="text-orange-600 font-medium mb-2">{member.role}</div>
                    <div className="text-sm text-gray-600 mb-2">{member.experience}</div>
                    <div className="text-xs text-gray-500">
                      <strong>Expertise:</strong> {member.expertise}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">2.3 hrs</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Availability</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-gray-600">Team Members</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-xl font-semibold">Emergency Support</h3>
            </div>
            <p className="mb-6">
              For urgent civic issues requiring immediate attention, please contact our emergency hotline.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency: 112
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Headphones className="h-5 w-5" />
                Priority Support Line
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
