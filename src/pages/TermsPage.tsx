import { useState } from 'react';
import { FileText, Shield, AlertTriangle, CheckCircle, Users, Clock, Calendar, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const termsSections = [
  {
    title: 'Acceptance of Terms',
    icon: CheckCircle,
    content: [
      'By accessing and using Swachh-Samadhan services, you accept and agree to be bound by these Terms and Conditions.',
      'If you do not agree to these terms, you must not use our services.',
      'Continued use of the platform constitutes acceptance of any changes to these terms.',
      'These terms apply to all users of the platform, including citizens, government departments, and partners.'
    ]
  },
  {
    title: 'Service Description',
    icon: FileText,
    content: [
      'Swachh-Samadhan is an AI-powered civic issue detection and reporting platform.',
      'Services include issue reporting, AI analysis, department routing, and status tracking.',
      'Platform connects citizens with appropriate government departments for issue resolution.',
      'AI technology automatically categorizes and prioritizes reported issues.',
      'Services are provided free of charge to citizens and government entities.'
    ]
  },
  {
    title: 'User Responsibilities',
    icon: Users,
    content: [
      'Provide accurate and truthful information when reporting issues.',
      'Ensure reported issues are genuine civic problems requiring attention.',
      'Do not submit false, misleading, or fraudulent reports.',
      'Respect privacy and rights of others when using the platform.',
      'Use services for legitimate civic improvement purposes only.',
      'Maintain security of your account and authentication credentials.',
      'Report technical issues or bugs through appropriate channels.',
      'Cooperate with government departments during issue resolution process.'
    ]
  },
  {
    title: 'Prohibited Activities',
    icon: AlertTriangle,
    content: [
      'Submitting false or misleading information about civic issues.',
      'Using the platform for illegal activities or purposes.',
      'Attempting to gain unauthorized access to systems or data.',
      'Interfering with or disrupting platform operations.',
      'Violating any applicable laws or regulations.',
      'Infringing on intellectual property rights.',
      'Spreading malware or malicious content.',
      'Harassing or threatening other users or government officials.',
      'Using automated tools to abuse platform features.'
    ]
  },
  {
    title: 'Intellectual Property',
    icon: Shield,
    content: [
      'All content, trademarks, and intellectual property remain the property of Swachh-Samadhan.',
      'Users may not copy, modify, or distribute platform content without permission.',
      'AI algorithms and detection models are proprietary and confidential.',
      'Government data integration is subject to respective department policies.',
      'User-generated content remains the property of the respective users.',
      'Platform design and functionality are protected by copyright and other intellectual property laws.'
    ]
  }
];

const legalTerms = [
  {
    title: 'Limitation of Liability',
    content: [
      'Platform is provided on "as is" and "as available" basis.',
      'Swachh-Samadhan is not liable for issue resolution outcomes.',
      'Not responsible for delays or failures in government department responses.',
      'Limited liability for technical issues or service interruptions.',
      'No liability for indirect, incidental, or consequential damages.',
      'User assumes all risks associated with civic issue reporting.',
      'Platform acts as intermediary, not guarantor of government action.'
    ]
  },
  {
    title: 'Indemnification',
    content: [
      'Users agree to indemnify Swachh-Samadhan from certain claims.',
      'Includes claims arising from user violations of these terms.',
      'Covers costs of legal defense and settlements.',
      'Users must cooperate in defense of any such claims.',
      'Indemnification does not apply to gross negligence or willful misconduct.',
      'Platform may seek recovery of legal costs and attorney fees.'
    ]
  },
  {
    title: 'Dispute Resolution',
    content: [
      'Disputes will be resolved through good faith negotiations.',
      'If negotiation fails, disputes may be submitted to arbitration.',
      'Arbitration will be conducted in English under applicable laws.',
      'Arbitrator decision will be final and binding on both parties.',
      'Each party bears their own arbitration costs.',
      'Court proceedings are excluded except for enforcement of arbitration awards.',
      'Disputes must be filed within one year of the claim arising.'
    ]
  },
  {
    title: 'Service Availability',
    content: [
      'Platform availability is not guaranteed 100% of the time.',
      'Scheduled maintenance may interrupt services temporarily.',
      'Emergency maintenance may be required without prior notice.',
      'Platform may modify or discontinue services at any time.',
      'Users will be notified of significant service changes.',
      'No liability for service interruptions beyond reasonable control.',
      'Third-party service dependencies may affect availability.'
    ]
  },
  {
    title: 'Termination',
    content: [
      'Users may terminate their account at any time for any reason.',
      'Swachh-Samadhan may suspend or terminate accounts for violations.',
      'Termination does not relieve liability for accrued obligations.',
      'User data may be retained as required by law.',
      'Platform may delete inactive accounts after extended periods.',
      'Certain provisions survive termination (indemnification, liability limitations).',
      'Termination affects access to all platform features and services.'
    ]
  }
];

export default function TermsPage() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using Swachh-Samadhan services
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'general'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              General Terms
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'legal'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Legal Terms
            </button>
          </div>
        </div>

        {activeTab === 'general' && (
          <div className="space-y-8">
            {termsSections.map((section, index) => (
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
                    <div className="space-y-4">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="space-y-8">
            {legalTerms.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Important Notices */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-6 w-6" />
              <h3 className="text-xl font-semibold">Important Notices</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Last Updated</h4>
                <p className="text-sm">March 24, 2024</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <FileText className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Version</h4>
                <p className="text-sm">2.1.0</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Effective Date</h4>
                <p className="text-sm">January 1, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About Terms?</h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms and Conditions, please contact our legal team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Legal Inquiries</h4>
                <p className="text-sm text-gray-600 mb-2">legal@swachhsamadhan.gov.in</p>
                <p className="text-sm text-gray-600">Response within 5 business days</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">General Support</h4>
                <p className="text-sm text-gray-600 mb-2">support@swachhsamadhan.gov.in</p>
                <p className="text-sm text-gray-600">Response within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
