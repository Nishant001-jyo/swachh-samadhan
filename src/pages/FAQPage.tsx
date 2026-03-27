import { useState } from 'react';
import { HelpCircle, Camera, MapPin, Users, Clock, CheckCircle, Phone, Mail, Shield, AlertTriangle, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqCategories = [
  {
    category: 'Getting Started',
    icon: HelpCircle,
    questions: [
      {
        question: 'What is Swachh-Samadhan?',
        answer: 'Swachh-Samadhan is an AI-powered civic issue detection and reporting platform that helps citizens report infrastructure problems like potholes, garbage accumulation, broken streetlights, and water leaks. Our AI automatically categorizes and routes issues to the appropriate government departments for faster resolution.',
        tags: ['general', 'platform', 'ai']
      },
      {
        question: 'How do I report an issue?',
        answer: 'You can report issues through our mobile app or website by: 1) Taking a photo of the issue, 2) Providing a brief description, 3) Selecting the issue type, 4) Adding location information, and 5) Submitting the report. Our AI will analyze the image and automatically categorize the issue.',
        tags: ['reporting', 'how-to', 'mobile']
      },
      {
        question: 'Is Swachh-Samadhan free to use?',
        answer: 'Yes, Swachh-Samadhan is completely free for citizens to use. There are no charges for reporting issues, accessing the platform, or receiving status updates. The service is funded by government initiatives to improve civic infrastructure.',
        tags: ['free', 'cost', 'citizen']
      }
    ]
  },
  {
    category: 'Reporting Issues',
    icon: Camera,
    questions: [
      {
        question: 'What types of issues can I report?',
        answer: 'You can report various civic infrastructure issues including: potholes and road damage, garbage accumulation and illegal dumping, broken or malfunctioning street lights, water leaks and pipe bursts, damaged public facilities, fallen trees blocking roads, broken traffic signals, and drainage problems.',
        tags: ['issues', 'categories', 'types']
      },
      {
        question: 'How accurate is the AI detection?',
        answer: 'Our AI detection system has high accuracy rates: Pothole detection (94%), Garbage detection (89%), Streetlight fault detection (86%), and Water leakage detection (91%). The system continuously improves through machine learning and user feedback.',
        tags: ['ai', 'accuracy', 'detection']
      },
      {
        question: 'What information should I include in my report?',
        answer: 'For effective issue resolution, include: clear photos from multiple angles, precise location (GPS coordinates preferred), detailed description of the issue, size estimates, any safety hazards, when you first noticed the issue, and your contact information for follow-up questions.',
        tags: ['reporting', 'information', 'details']
      },
      {
        question: 'Can I report issues anonymously?',
        answer: 'While you can submit reports without providing personal information, including your name and contact details helps government officials follow up for additional information or clarification. However, your privacy is always protected, and anonymous reports are still processed and addressed.',
        tags: ['privacy', 'anonymous', 'reporting']
      }
    ]
  },
  {
    category: 'Location & Maps',
    icon: MapPin,
    questions: [
      {
        question: 'How does the location detection work?',
        answer: 'Our platform uses GPS technology to automatically detect your location when you report an issue. You can also manually enter an address or drop a pin on the interactive map. The system uses reverse geocoding to convert coordinates to readable addresses for government officials.',
        tags: ['location', 'gps', 'maps']
      },
      {
        question: 'What if my location is not detected correctly?',
        answer: 'If GPS detection is inaccurate, you can: 1) Manually enter your address, 2) Use the interactive map to drop a pin at the exact location, 3) Enable location services in your browser settings, 4) Try again in an area with better GPS reception, or 5) Provide nearby landmarks for reference.',
        tags: ['location', 'troubleshooting', 'gps']
      },
      {
        question: 'Which cities are covered?',
        answer: 'Swachh-Samadhan is currently active in 48 major cities across 8 states including Delhi, Mumbai, Bangalore, Hyderabad, Kolkata, Chennai, Pune, Jaipur, and many more. We are continuously expanding to cover additional cities based on government partnerships and citizen demand.',
        tags: ['cities', 'coverage', 'expansion']
      }
    ]
  },
  {
    category: 'Issue Resolution',
    icon: Clock,
    questions: [
      {
        question: 'How long does it take to resolve issues?',
        answer: 'Resolution times vary by issue type and severity: Emergency issues (24-48 hours), High priority (2-3 days), Medium priority (3-5 days), Low priority (5-7 days). The average resolution time across all issues is 3.2 days. You\'ll receive updates at each step of the resolution process.',
        tags: ['resolution', 'timeline', 'process']
      },
      {
        question: 'How can I track my report status?',
        answer: 'After submitting a report, you\'ll receive a unique tracking ID. You can track status through: 1) Our mobile app dashboard, 2) Website status checker, 3) SMS updates (if enabled), 4) Email notifications, or 5) Calling our helpline with your tracking number.',
        tags: ['tracking', 'status', 'updates']
      },
      {
        question: 'What happens after I report an issue?',
        answer: 'Once reported, your issue goes through: 1) AI analysis and categorization, 2) Automatic routing to the appropriate government department, 3) Priority assignment based on severity, 4) Department notification, 5) Resolution scheduling, and 6) Status updates to you throughout the process.',
        tags: ['process', 'workflow', 'departments']
      }
    ]
  },
  {
    category: 'Account & Privacy',
    icon: Shield,
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'Creating an account is simple: 1) Download the Swachh-Samadhan mobile app, 2) Click "Sign Up", 3) Enter your name, email, and phone number, 4) Create a secure password, 5) Verify your email address, and 6) Complete your profile. Account creation helps track your reports and receive faster service.',
        tags: ['account', 'registration', 'sign-up']
      },
      {
        question: 'Is my personal information safe?',
        answer: 'Yes, we take data protection seriously: All data is encrypted during transmission, stored securely, used only for civic issue resolution, never shared with third parties without consent, and you control what information is shared. We comply with all applicable privacy laws and regulations.',
        tags: ['privacy', 'security', 'data-protection']
      },
      {
        question: 'Can I delete my account and data?',
        answer: 'Yes, you have complete control over your data: You can delete your account anytime through the app settings or by contacting support, All your personal information and report history will be permanently deleted, You can download your data before deletion, We comply with data protection laws regarding data retention and deletion.',
        tags: ['account', 'deletion', 'privacy']
      }
    ]
  },
  {
    category: 'Technical Support',
    icon: AlertTriangle,
    questions: [
      {
        question: 'The app is not working properly. What should I do?',
        answer: 'Try these troubleshooting steps: 1) Check your internet connection, 2) Update to the latest app version, 3) Clear app cache and restart, 4) Check if location services are enabled, 5) Ensure sufficient phone storage space, 6) Restart your device, or 7) Contact our technical support team for assistance.',
        tags: ['troubleshooting', 'technical', 'app-issues']
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer: 'To reset your password: 1) Click "Forgot Password" on the login screen, 2) Enter your registered email address, 3) Check your email for reset instructions, 4) Click the reset link within 24 hours, 5) Create a new strong password, and 6) Log in with your new password.',
        tags: ['password', 'reset', 'account-security']
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach our support team through: 1) In-app chat support (24/7), 2) Email: support@swachhsamadhan.gov.in, 3) Phone: 1800-123-4567 (24/7), 4) Help center in the app, 5) Social media channels, or 6) Visit our local service centers in major cities.',
        tags: ['support', 'contact', 'help']
      }
    ]
  }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState(faqCategories[0]);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState(faqCategories[0].questions);

  const handleCategoryChange = (category: typeof faqCategories[0]) => {
    setSelectedCategory(category);
    setExpandedQuestion(null);
    setFilteredQuestions(category.questions);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredQuestions(selectedCategory.questions);
      return;
    }

    const allQuestions = faqCategories.flatMap(cat => cat.questions);
    const filtered = allQuestions.filter(q => 
      q.question.toLowerCase().includes(term.toLowerCase()) ||
      q.answer.toLowerCase().includes(term.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredQuestions(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Swachh-Samadhan services
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <HelpCircle className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          {searchTerm && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Found {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories</h2>
              <div className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedCategory.category === category.category
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="h-5 w-5" />
                      <span className="font-medium">{category.category}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Questions</span>
                    <span className="font-semibold text-gray-900">
                      {faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-semibold text-gray-900">{faqCategories.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Resolution Time</span>
                    <span className="font-semibold text-green-600">3.2 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredQuestions.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        {expandedQuestion === index ? (
                          <Minus className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Plus className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  {expandedQuestion === index && (
                    <div className="p-6 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
