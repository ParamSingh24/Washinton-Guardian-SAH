
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Bell,
  MessageCircle,
  Map,
  User,
  Settings,
  Plane,
  CloudSun
} from "lucide-react";

const Navigation = () => {
  const [currentRoute, setCurrentRoute] = React.useState('/');
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Activity className="h-5 w-5" /> },
    { path: '/symptoms', label: 'Report Symptoms', icon: <Bell className="h-5 w-5" /> },
    { path: '/map', label: 'Outbreak Map', icon: <Map className="h-5 w-5" /> },
    { path: '/travel', label: 'Travel Health', icon: <Plane className="h-5 w-5" /> },
    { path: '/climate', label: 'Climate Insights', icon: <CloudSun className="h-5 w-5" /> },
    { path: '/chat', label: 'Medical Assistant', icon: <MessageCircle className="h-5 w-5" /> },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full glass-navbar">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline-block text-center font-bold text-xl text-white drop-shadow-sm">
            Washington Guardian
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-2 mx-4">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setCurrentRoute(item.path)}
              className={cn(
                "glass-nav-item flex items-center px-4 py-2 text-sm font-medium",
                currentRoute === item.path 
                  ? "glass-nav-item active text-white" 
                  : "text-white/80 hover:text-white"
              )}
            >
              <div className="flex items-center justify-center relative z-10">
                <span className="mr-2">{item.icon}</span>
                <span className="text-center">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="glass-button-enhanced rounded-full text-white hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="glass-button-enhanced rounded-full text-white hover:text-white">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-navbar z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setCurrentRoute(item.path)}
              className={cn(
                "glass-nav-item flex flex-col items-center justify-center py-2 px-3 rounded-lg",
                currentRoute === item.path 
                  ? "glass-nav-item active text-white" 
                  : "text-white/80"
              )}
            >
              <div className="relative z-10">
                {item.icon}
                <span className="text-xs mt-1 block">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
