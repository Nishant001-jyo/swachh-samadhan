import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center overflow-hidden">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full object-contain p-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Main circle background */}
                  <circle cx="50" cy="50" r="45" fill="white" opacity="0.2"/>
                  
                  {/* Eye shape */}
                  <ellipse cx="50" cy="45" rx="35" ry="20" fill="none" stroke="white" strokeWidth="3"/>
                  <ellipse cx="50" cy="45" rx="32" ry="17" fill="white" opacity="0.3"/>
                  
                  {/* Camera lens as pupil */}
                  <circle cx="50" cy="45" r="10" fill="white"/>
                  <circle cx="50" cy="45" r="7" fill="#ff9933"/>
                  <circle cx="50" cy="45" r="4" fill="white"/>
                  <circle cx="52" cy="43" r="1.5" fill="#ff9933" opacity="0.8"/>
                  
                  {/* Indian flag arc */}
                  <path d="M 15 25 Q 50 8, 85 25" fill="none" stroke="#ff9933" strokeWidth="4"/>
                  <path d="M 15 30 Q 50 13, 85 30" fill="none" stroke="white" strokeWidth="4"/>
                  <path d="M 15 35 Q 50 18, 85 35" fill="none" stroke="#138808" strokeWidth="4"/>
                  
                  {/* Cityscape below */}
                  <rect x="18" y="65" width="8" height="15" fill="white" opacity="0.7" rx="1"/>
                  <rect x="30" y="60" width="8" height="20" fill="white" opacity="0.7" rx="1"/>
                  <rect x="42" y="62" width="8" height="18" fill="white" opacity="0.7" rx="1"/>
                  <rect x="54" y="58" width="8" height="22" fill="white" opacity="0.7" rx="1"/>
                  <rect x="66" y="64" width="8" height="16" fill="white" opacity="0.7" rx="1"/>
                  
                  {/* Problem indicators */}
                  <circle cx="23" cy="70" r="2.5" fill="#ff0000"/>
                  <rect x="43" y="75" width="4" height="4" fill="#8B4513" rx="0.5"/>
                  <path d="M 63 72 L 66 69 L 69 72 L 66 69 Z" fill="#ff0000"/>
                  
                  {/* Sparkle effects */}
                  <circle cx="25" cy="25" r="1.5" fill="white" opacity="0.8"/>
                  <circle cx="75" cy="30" r="1" fill="white" opacity="0.6"/>
                  <circle cx="70" cy="20" r="1.2" fill="white" opacity="0.4"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Swachh-Samadhan</h3>
                <p className="text-xs text-gray-400">Clean India Initiative</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              AI-powered civic issue detection and reporting system for a smarter, cleaner India.
            </p>
            <div className="flex gap-3">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="/departments" className="text-gray-300 hover:text-white transition-colors">Departments</a></li>
              <li><a href="/cities" className="text-gray-300 hover:text-white transition-colors">Cities Covered</a></li>
              <li><a href="/api" className="text-gray-300 hover:text-white transition-colors">API Access</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/guidelines" className="text-gray-300 hover:text-white transition-colors">Reporting Guidelines</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/support" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Contact Info</h4>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">support@swachhsamadhan.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">New Delhi, India</span>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium mb-2 text-sm">Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
                <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 Swachh-Samadhan. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Digital India Initiative</span>
              <span>•</span>
              <span>Smart Cities Mission</span>
              <span>•</span>
              <span>Swachh Bharat Abhiyan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
