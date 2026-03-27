import { motion } from "framer-motion";
import { Camera, BarChart3, Upload, MapPin, AlertTriangle, Lightbulb, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const stats = [
  { label: "Issues Reported", target: 12458, suffix: "+" },
  { label: "Issues Fixed", target: 9832, suffix: "+" },
  { label: "Cities Covered", target: 48, suffix: "" },
  { label: "Active Citizens", target: 34500, suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString("en-IN")}{suffix}</span>;
}

const features = [
  { 
    icon: AlertTriangle, 
    title: "🕳️ Pothole Detection", 
    desc: "AI detects road damage and automatically reports to maintenance department",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"
  },
  { 
    icon: Droplets, 
    title: "🗑️ Garbage Detection", 
    desc: "Identifies waste accumulation and alerts sanitation services",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop"
  },
  { 
    icon: Lightbulb, 
    title: "💡 Streetlight Fault Detection", 
    desc: "Detects broken or malfunctioning street lights for quick repairs",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=250&fit=crop"
  },
  { 
    icon: Droplets, 
    title: "🚰 Water Leakage Detection", 
    desc: "Identifies water leaks and pipe bursts to prevent wastage",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc47b?w=400&h=250&fit=crop"
  },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="relative h-[600px] md:h-[700px] indian-pattern">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=700&fit=crop"
            alt="City infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium text-white border border-white/20">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Public Problem Detection • Smart Reporting System
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6 text-white">
                Public Problem
                <br />
                <span className="text-yellow-300">Detection System</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
                AI-powered civic issue detection and smart reporting for Indian cities. Upload images to detect and report civic problems instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/report")}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-lg px-8 py-6 rounded-xl shadow-elevated font-display font-semibold"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Image
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/admin")}
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl font-display"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold font-display text-orange-600">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4 text-gray-900">
            Smart City <span className="text-orange-600">Issue Detection</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our AI system can identify various civic problems automatically and route them to the appropriate departments for quick resolution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
