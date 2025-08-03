import React from 'react';
import Navigation from '@/components/Navigation';
import ClimateInsights from '@/components/ClimateInsights';

const ClimatePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-teal-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container py-16 px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Climate Insights
              <span className="block text-2xl md:text-4xl bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
                Environmental Monitoring
              </span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Real-time monitoring of environmental conditions, natural disasters, and air quality
              to keep you informed and safe.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      <main className="flex-1 container py-12 px-4">
        <ClimateInsights />
      </main>
      
      <footer className="border-t border-gray-200 py-8 mt-auto bg-gray-50">
        <div className="container text-center">
          <p className="text-sm text-gray-500">
            © 2025 Healthcare AI - Climate Insights Module. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ClimatePage;
