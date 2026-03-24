import { motion } from "framer-motion";
import { Camera, Shield, BarChart3, MapPin } from "lucide-react";
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
  { icon: Camera, title: "Upload & Detect", desc: "AI instantly identifies civic issues" },
  { icon: Shield, title: "Auto-Route", desc: "Complaints reach the right department" },
  { icon: BarChart3, title: "Track Progress", desc: "Real-time status updates" },
  { icon: MapPin, title: "Location Aware", desc: "Precise geolocation mapping" },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Tricolor bar */}
      <div className="h-1 tricolor-bar" />
      
      {/* Hero */}
      <div className="gradient-hero text-primary-foreground py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTJ2LTZoMnptMC0zMHY2aC0yVjRoMnptLTMwIDI2djZINHYtNmgyek0wIDR2Nkg0VjRIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-saffron animate-pulse" />
              Powered by AI • Made for India
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
              Spot a problem.
              <br />
              <span className="text-saffron">AI fixes it.</span>
              <br />
              India improves.
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Upload a photo of any civic issue — potholes, garbage, broken roads — and our AI instantly detects, categorizes, and routes it to the right government department.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/report")}
                className="bg-saffron hover:bg-saffron/90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-elevated animate-pulse-glow font-display font-semibold"
              >
                <Camera className="mr-2 h-5 w-5" />
                Report Issue Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/admin")}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-xl font-display"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
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
                <div className="text-3xl md:text-4xl font-bold font-display text-primary">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-12">
          How <span className="text-primary">SwachhVision AI</span> Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-elevated border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
