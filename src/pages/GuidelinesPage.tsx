import { useState } from 'react';
import { FileText, Camera, CheckCircle, AlertTriangle, MapPin, Users, Clock, Shield, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const guidelines = [
  {
    category: 'Reporting Guidelines',
    icon: Camera,
    guidelines: [
      {
        title: 'Photo Quality Standards',
        description: 'Ensure your photos are clear and useful:',
        points: [
          'Take photos in good lighting conditions',
          'Capture the issue from multiple angles if possible',
          'Include reference objects for scale (coin, hand, etc.)',
          'Avoid blurry or shaky images',
          'Ensure the issue is clearly visible',
          'Use high-resolution settings when possible',
          'Include surrounding context for better location identification'
        ]
      },
      {
        title: 'Issue Classification',
        description: 'Help our AI categorize issues correctly:',
        points: [
          'Be specific about the type of issue (pothole, garbage, etc.)',
          'Include size estimates (small, medium, large)',
          'Mention any safety hazards or immediate risks',
          'Describe the impact on traffic or daily life',
          'Note if the issue is new or recurring',
          'Include weather conditions if relevant'
        ]
      },
      {
        title: 'Location Accuracy',
        description: 'Provide precise location information:',
        points: [
          'Use GPS coordinates when possible',
          'Include nearby landmarks or reference points',
          'Describe the exact location within the property',
          'Mention the street name and number',
          'Provide cross-streets or nearby roads',
          'Include floor level for multi-story buildings',
          'Note any access restrictions or special instructions'
        ]
      },
      {
        title: 'Description Best Practices',
        description: 'Write clear, helpful descriptions:',
        points: [
          'Be concise but comprehensive',
          'Include when the issue was first noticed',
          'Mention any previous attempts to report',
          'Describe any immediate dangers or risks',
          'Include approximate size or dimensions',
          'Note if the issue affects multiple properties',
          'Provide contact information for follow-up questions'
        ]
      }
    ]
  },
  {
    category: 'Content Guidelines',
    icon: FileText,
    guidelines: [
      {
        title: 'Appropriate Content',
        description: 'Only report genuine civic issues:',
        points: [
          'Actual infrastructure problems',
          'Public safety hazards',
          'Environmental concerns',
          'Service disruptions',
          'Accessibility issues',
          'Public facility maintenance needs'
        ]
      },
      {
        title: 'Prohibited Content',
        description: 'Do not report the following:',
        points: [
          'Private property disputes',
          'Commercial advertisements',
          'Political content or opinions',
          'Personal complaints about individuals',
          'Non-civic issues',
          'False or fabricated reports',
          'Duplicate or already resolved issues',
          'Issues outside civic jurisdiction'
        ]
      },
      {
        title: 'Language and Tone',
        description: 'Maintain professional communication:',
        points: [
          'Use respectful and neutral language',
          'Avoid offensive or inappropriate content',
          'Be factual and objective in descriptions',
          'Do not include personal opinions or judgments',
          'Use proper grammar and spelling',
          'Keep descriptions focused on the issue, not people',
          'Avoid speculation about causes or responsible parties',
          'Do not include threats or abusive language'
        ]
      }
    ]
  },
  {
    category: 'Safety Guidelines',
    icon: Shield,
    guidelines: [
      {
        title: 'Personal Safety',
        description: 'Stay safe while reporting issues:',
        points: [
          'Do not put yourself in dangerous situations',
          'Maintain safe distance from traffic or hazards',
          'Be aware of your surroundings',
          'Do not enter private property without permission',
          'Avoid reporting during dangerous weather conditions',
          'Bring someone with you for remote or isolated areas',
          'Use zoom instead of getting physically close to hazards',
          'Report dangerous situations to emergency services first'
        ]
      },
      {
        title: 'Traffic Safety',
        description: 'When reporting road issues:',
        points: [
          'Park legally and safely before taking photos',
          'Use hazard lights or warning triangles if needed',
          'Do not walk in active traffic lanes',
          'Wear visible clothing, especially at night',
          'Have someone spot traffic while you take photos',
          'Consider time of day and traffic conditions',
          'Do not block emergency access routes',
          'Move to safe location after reporting'
        ]
      },
      {
        title: 'Property Safety',
        description: 'Respect private and public property:',
        points: [
          'Do not damage property while documenting issues',
          'Stay on public right-of-way',
          'Do not enter restricted areas',
          'Respect no trespassing signs',
          'Do not interfere with ongoing work',
          'Avoid damaging landscaping or infrastructure',
          'Follow all posted rules and regulations',
          'Leave the area as you found it'
        ]
      }
    ]
  },
  {
    category: 'Community Guidelines',
    icon: Users,
    guidelines: [
      {
        title: 'Constructive Participation',
        description: 'Be a positive community member:',
        points: [
          'Focus on solutions, not just problems',
          'Support other community members',
          'Share helpful information and resources',
          'Participate in community clean-up initiatives',
          'Report issues promptly to prevent escalation',
          'Provide updates on resolved issues',
          'Thank government officials and workers for their service',
          'Mentor new users on the platform',
          'Promote civic responsibility in your community'
        ]
      },
      {
        title: 'Collaboration',
        description: 'Work effectively with authorities:',
        points: [
          'Provide accurate and complete information',
          'Respond to follow-up questions promptly',
          'Be patient with the resolution process',
          'Offer additional information or clarification when needed',
          'Document progress on issue resolution',
          'Report attempts to resolve issues independently',
          'Provide feedback on government response quality',
          'Suggest improvements to the reporting process',
          'Advocate for community needs and priorities'
        ]
      },
      {
        title: 'Digital Citizenship',
        description: 'Practice responsible online behavior:',
        points: [
          'Verify information before sharing',
          'Do not spread unverified rumors or claims',
          'Respect privacy of others in the community',
          'Use official channels for communication',
          'Report misinformation or fake reports',
          'Protect your personal and account information',
          'Follow platform guidelines and terms of service',
          'Report technical issues or bugs constructively',
          'Help maintain a positive online community'
        ]
      }
    ]
  }
];

const bestPractices = [
  {
    title: 'Before Reporting',
    icon: MapPin,
    tips: [
      'Verify the issue actually exists and needs attention',
      'Check if it has already been reported',
      'Gather all relevant information before submitting',
      'Choose the right time and conditions for documentation',
      'Consider the urgency and safety implications',
      'Document the issue progression if it changes over time',
      'Identify the correct government department',
      'Prepare necessary contact information',
      'Understand the expected resolution timeline'
    ]
  },
  {
    title: 'During Reporting',
    icon: Camera,
    tips: [
      'Take multiple photos from different angles',
      'Include scale references in your photos',
      'Provide detailed but concise descriptions',
      'Use precise location information',
      'Categorize the issue type correctly',
      'Mention any immediate safety concerns',
      'Include your contact information for follow-up',
      'Be honest about when you first noticed the issue',
      'Note any factors that might complicate resolution'
    ]
  },
  {
    title: 'After Reporting',
    icon: CheckCircle,
    tips: [
      'Save your confirmation and tracking number',
      'Follow up if the issue isn\'t addressed in reasonable time',
      'Provide additional information if requested',
      'Document any changes in the situation',
      'Report when the issue is resolved',
      'Thank the officials or workers who helped',
      'Share positive experiences to encourage others',
      'Suggest improvements to the process',
      'Participate in community feedback and surveys'
    ]
  }
];

export default function GuidelinesPage() {
  const [selectedCategory, setSelectedCategory] = useState(guidelines[0]);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('guidelines');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Guidelines</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Help us maintain a safe, respectful, and effective platform for civic issue reporting
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'guidelines'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Guidelines
            </button>
            <button
              onClick={() => setActiveTab('practices')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'practices'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Best Practices
            </button>
          </div>
        </div>

        {activeTab === 'guidelines' && (
          <div>
            {/* Category Selection */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {guidelines.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory.category === category.category
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.category}
                </button>
              ))}
            </div>

            {/* Guidelines Content */}
            <div className="space-y-8">
              {selectedCategory.guidelines.map((guideline, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">{guideline.title}</h2>
                      <div className={`transition-transform duration-300 ${
                        expandedSection === index ? 'rotate-180' : ''
                      }`}>
                        <AlertTriangle className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                  </button>
                  
                  {expandedSection === index && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                      <p className="text-gray-600 mb-4">{guideline.description}</p>
                      <ul className="space-y-2">
                        {guideline.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'practices' && (
          <div className="space-y-8">
            {bestPractices.map((practice, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <practice.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{practice.title}</h2>
                </div>
                <ul className="space-y-3">
                  {practice.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Quick Reference */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-6 w-6" />
              <h3 className="text-xl font-semibold">Quick Reference</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Emergency</h4>
                <p className="text-sm">Call 112 for immediate dangers</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <Camera className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Photo Tips</h4>
                <p className="text-sm">Multiple angles, good lighting</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Follow Up</h4>
                <p className="text-sm">Check status within 48 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for Help */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-6">
              If you have questions about these guidelines or need assistance with reporting, 
              our support team is here to help.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                Contact Support
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                Read Full Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
