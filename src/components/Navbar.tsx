import { Link, useLocation } from "react-router-dom";
import { Camera, LayoutDashboard, Home, BarChart3, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <nav className="sticky top-0 z-50 gradient-header text-gray-900 shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center border border-gray-300 overflow-hidden shadow-lg">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full object-contain p-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main circle background */}
              <circle cx="50" cy="50" r="45" fill="#ff9933" opacity="0.1"/>
              
              {/* Eye shape */}
              <ellipse cx="50" cy="45" rx="35" ry="20" fill="none" stroke="#ff9933" strokeWidth="3"/>
              <ellipse cx="50" cy="45" rx="32" ry="17" fill="white" opacity="0.9"/>
              
              {/* Camera lens as pupil */}
              <circle cx="50" cy="45" r="10" fill="#ff9933"/>
              <circle cx="50" cy="45" r="7" fill="white"/>
              <circle cx="50" cy="45" r="4" fill="#ff9933"/>
              <circle cx="52" cy="43" r="1.5" fill="white" opacity="0.8"/>
              
              {/* Indian flag arc */}
              <path d="M 15 25 Q 50 8, 85 25" fill="none" stroke="#ff9933" strokeWidth="4"/>
              <path d="M 15 30 Q 50 13, 85 30" fill="none" stroke="white" strokeWidth="4"/>
              <path d="M 15 35 Q 50 18, 85 35" fill="none" stroke="#138808" strokeWidth="4"/>
              
              {/* Cityscape below */}
              <rect x="18" y="65" width="8" height="15" fill="#666" rx="1"/>
              <rect x="30" y="60" width="8" height="20" fill="#666" rx="1"/>
              <rect x="42" y="62" width="8" height="18" fill="#666" rx="1"/>
              <rect x="54" y="58" width="8" height="22" fill="#666" rx="1"/>
              <rect x="66" y="64" width="8" height="16" fill="#666" rx="1"/>
              
              {/* Problem indicators */}
              <circle cx="23" cy="70" r="2.5" fill="#ff0000"/>
              <rect x="43" y="75" width="4" height="4" fill="#8B4513" rx="0.5"/>
              <path d="M 63 72 L 66 69 L 69 72 L 66 69 Z" fill="#ff0000"/>
              
              {/* Sparkle effects */}
              <circle cx="25" cy="25" r="1.5" fill="#ff9933" opacity="0.6"/>
              <circle cx="75" cy="30" r="1" fill="#138808" opacity="0.6"/>
              <circle cx="70" cy="20" r="1.2" fill="#ff9933" opacity="0.4"/>
            </svg>
          </div>
          <div>
            <span className="font-display font-bold text-xl drop-shadow-lg">
              Swachh-Samadhan
            </span>
            <div className="text-xs text-gray-600 drop-shadow">Clean India Initiative</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Button 
            variant={location.pathname === "/" ? "secondary" : "ghost"} 
            size="sm" 
            asChild
            className="text-gray-900 hover:bg-orange-100 hover:text-orange-600 hover:scale-105 transition-all duration-300 font-medium rounded-lg"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          <Button 
            variant={location.pathname === "/report" ? "secondary" : "ghost"} 
            size="sm" 
            asChild
            className="text-gray-900 hover:bg-orange-100 hover:text-orange-600 hover:scale-105 transition-all duration-300 font-medium rounded-lg"
          >
            <Link to="/report" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>Report Issue</span>
            </Link>
          </Button>
          <Button 
            variant={location.pathname === "/admin" ? "secondary" : "ghost"} 
            size="sm" 
            asChild
            className="text-gray-900 hover:bg-orange-100 hover:text-orange-600 hover:scale-105 transition-all duration-300 font-medium rounded-lg"
          >
            <Link to="/admin" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="text-gray-900 hover:bg-orange-100 hover:text-orange-600 hover:scale-105 transition-all duration-300 font-medium rounded-lg"
          >
            <Link to="/map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Interactive Map</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="text-gray-900 hover:bg-orange-100 hover:text-orange-600 hover:scale-105 transition-all duration-300 font-medium rounded-lg"
          >
            <Link to="/analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="text-gray-900 hover:bg-orange-100 hover:text-orange-600 hover:scale-105 transition-all duration-300 font-medium rounded-lg"
          >
            <Link to="/contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="text-gray-900 hover:bg-orange-100 hover:text-orange-600 hover:scale-105 transition-all duration-300 font-medium rounded-lg"
          >
            <Link to="/about" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>About</span>
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-orange-100 hover:text-orange-600 hover:scale-105 transition-all duration-300">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
}
