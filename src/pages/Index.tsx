
import React from "react";
import Navigation from "@/components/Navigation";
import OutbreakMapPreview from "@/components/OutbreakMapPreview";
import AIInsights from "@/components/AIInsights";
import QuickActions from "@/components/QuickActions";
import RecentActivity from "@/components/RecentActivity";
import MedicalGallery from "@/components/MedicalGallery";
import HealthNewsSection from "@/components/HealthNewsSection";
import StatsCards from "@/components/StatsCards";
import ClimateInsights from "@/components/ClimateInsights";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Sparkles, Activity, Shield, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container py-24 px-4">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Healthcare AI
              <span className="block text-3xl md:text-5xl bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Washinton Guardian
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered healthcare assistant with X-ray analysis, symptom diagnosis, 
              medication guidance, and real-time health monitoring
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/chat">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-4 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start AI Consultation
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-4 font-semibold text-lg backdrop-blur-sm">
                <Activity className="mr-2 h-5 w-5" />
                View Health Dashboard
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      <main className="flex-1 container py-12 px-4">
        {/* Stats Cards */}
        <StatsCards />
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <HealthNewsSection />
            <OutbreakMapPreview />
            <ClimateInsights />
            <RecentActivity />
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Chat Preview */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
              <div className="rounded-xl bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">AI Health Assistant</h3>
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    👋 Hello! I can help with:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">X-ray Analysis</span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">Symptoms</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full">Medications</span>
                  </div>
                </div>
                <Link to="/chat">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold shadow-lg">
                    Start Consultation
                  </Button>
                </Link>
              </div>
            </div>
            
            <AIInsights />
            <QuickActions />
            <MedicalGallery />
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative space-y-6">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Shield className="h-8 w-8 text-white" />
              <Users className="h-8 w-8 text-white" />
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the Future of Healthcare
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience AI-powered healthcare with advanced diagnostics, personalized recommendations, and 24/7 medical guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/chat">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                  Get Started Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-4 font-bold text-lg backdrop-blur-sm">
git                 Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-gray-200 py-12 mt-auto bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Healthcare AI</span>
              </div>
              <p className="text-gray-600 text-sm">
                Advanced AI-powered healthcare solutions for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>X-ray Analysis</li>
                <li>Symptom Checker</li>
                <li>Medication Guide</li>
                <li>Health Monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Medical Disclaimer</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
              <p className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-pink-400" />
                <span>&copy; 2025 Healthcare AI. All rights reserved.</span>
              </p>
              <p className="mt-2 sm:mt-0">
                Powered by Google Gemini AI
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
