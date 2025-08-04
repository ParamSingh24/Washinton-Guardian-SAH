

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10">
        <Navigation />

        {/* Enhanced Hero Section */}
        <section className="min-h-[95vh] relative overflow-hidden border-b-2 border-white/20">
          {/* Solid Gradient Hero Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 via-pink-600 to-emerald-500 "></div>
          <div className="absolute inset-0 backdrop-blur-sm bg-black/5"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg animate-float delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-300/15 rounded-full blur-2xl animate-float delay-2000"></div>

          <div className="relative container py-12 px-6">
            <div className="text-center space-y-8 max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
                Healthcare AI
                <span className="block text-4xl md:text-6xl bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent pb-4 animate-gradient">
                  Washington Guardian
                </span>
              </h1>

              <p className="text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light">
                Revolutionary AI-powered healthcare assistant with X-ray analysis, symptom diagnosis,
                medication guidance, and real-time health monitoring
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                <Link to="/chat">
                  <Button size="lg" className="hero-consultation-button text-blue-600 px-12 py-6 font-bold text-xl">
                    <MessageCircle className="mr-3 h-6 w-6 icon-animate" />
                    Start AI Consultation
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="hero-button-secondary text-white rounded-2xl px-10 py-5 font-semibold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <Activity className="mr-3 h-6 w-6" />
                  View Health Dashboard
                </Button>
              </div>
            </div>
          </div>

          {/* Clean Bottom Border - No transparent gradient */}
        </section>

        <main className="flex-1 container py-16 px-6 relative z-10">
          {/* Enhanced Stats Cards */}
          <div className="mb-16">
            <StatsCards />
          </div>

          {/* Main Dashboard Grid with Better Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-8">
                <HealthNewsSection />
                <OutbreakMapPreview />
                <ClimateInsights />
                <RecentActivity />
              </div>
            </div>

            {/* Right Column - Enhanced Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Enhanced AI Chat Preview */}
              <div className="glass-card-enhanced group floating-element relative overflow-visible">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                  <div className="p-6 border-b border-white/20 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-xl">AI Health Assistant</h3>
                        <p className="text-sm text-slate-600">Always available to help</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <p className="text-sm text-slate-700 flex items-center font-medium">
                        <span className="mr-3 text-lg">👋</span>
                        Hello! I can help with:
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200/50 hover:scale-105 transition-all duration-200">
                        🩻 X-ray Analysis
                      </div>
                      <div className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100/80 backdrop-blur-sm rounded-full border border-green-200/50 hover:scale-105 transition-all duration-200">
                        🩺 Symptoms
                      </div>
                      <div className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100/80 backdrop-blur-sm rounded-full border border-purple-200/50 hover:scale-105 transition-all duration-200">
                        💊 Medications
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent my-6"></div>

                    <Link to="/chat">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 font-semibold shadow-xl hover:shadow-2xl rounded-2xl py-4 text-lg transition-all duration-300 hover:scale-105">
                        <MessageCircle className="mr-3 h-5 w-5" />
                        Start Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <AIInsights />
              <QuickActions />
              <MedicalGallery />
            </div>
          </div>

          {/* Enhanced Call to Action Section */}
          <div className="mt-24 relative overflow-hidden">
            {/* Glassmorphic CTA Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/90 via-blue-500/85 to-purple-600/90 rounded-3xl"></div>
            <div className="absolute inset-0 backdrop-blur-sm bg-white/5 rounded-3xl"></div>

            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg animate-float delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-300/15 rounded-full blur-md animate-float delay-2000"></div>

            <div className="relative p-16 text-center">
              <div className="space-y-8 max-w-4xl mx-auto">
                <div className="flex justify-center items-center gap-6 mb-8">
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                </div>

                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Join the Future of Healthcare
                </h2>

                <p className="text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light">
                  Experience AI-powered healthcare with advanced diagnostics, personalized recommendations, and 24/7 medical guidance.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                  <Link to="/chat">
                    <Button size="lg" className="cta-button-primary text-blue-600 rounded-2xl px-10 py-5 font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                      Get Started Free
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="cta-button-secondary text-white rounded-2xl px-10 py-5 font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Glassmorphic Footer */}
        <footer className="glass-footer relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-300/20 rounded-full blur-lg animate-float delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-300/15 rounded-full blur-md animate-float delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-pink-300/12 rounded-full blur-lg animate-float delay-3000"></div>

          <div className="relative py-16">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                <div className="glass-footer-brand space-y-6">
                  <div className="flex items-center gap-3">
                    
                    <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Healthcare AI
                    </span>
                  </div>
                  <p className="text-gray-800 text-base leading-relaxed font-medium">
                    Advanced AI-powered healthcare solutions for everyone. Building the future of medical care.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">Features</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">🩻 X-ray Analysis</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">🩺 Symptom Checker</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">💊 Medication Guide</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">📊 Health Monitoring</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">Support</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">❓ Help Center</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">📞 Contact Us</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">📚 Documentation</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">👥 Community</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">Legal</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">🔒 Privacy Policy</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">📋 Terms of Service</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">⚕️ Medical Disclaimer</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">🍪 Cookie Policy</li>
                  </ul>
                </div>
              </div>

              <div className="glass-footer-copyright pt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center text-gray-800">
                  <p className="flex items-center gap-2 text-base">
                   
                    <span>&copy; 2025 Healthcare AI. All rights reserved.</span>
                  </p>
                  <p className="mt-4 sm:mt-0 text-base">
                    Powered by <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Google Gemini AI</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
