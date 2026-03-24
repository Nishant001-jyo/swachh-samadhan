import { Link, useLocation } from "react-router-dom";
import { Camera, LayoutDashboard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
            <Camera className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">
            Swachh<span className="text-primary">Vision</span> AI
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant={location.pathname === "/" ? "default" : "ghost"} size="sm" asChild>
            <Link to="/"><Home className="h-4 w-4 mr-1" /> Home</Link>
          </Button>
          <Button variant={location.pathname === "/report" ? "default" : "ghost"} size="sm" asChild>
            <Link to="/report"><Camera className="h-4 w-4 mr-1" /> Report</Link>
          </Button>
          <Button variant={isAdmin ? "default" : "ghost"} size="sm" asChild>
            <Link to="/admin"><LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
