import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Stethoscope, TestTube, TrendingUp, Users, Activity } from "lucide-react";

const statsData = [
  {
    title: "AI Consultations",
    value: "2,847",
    change: "+12%",
    icon: Stethoscope,
    desc: "Personalized AI consultations provided",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50"
  },
  {
    title: "X-ray Analyses",
    value: "1,293",
    change: "+8%",
    icon: Activity,
    desc: "Medical images analyzed by AI",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50"
  },
  {
    title: "Health Insights",
    value: "5,672",
    change: "+24%",
    icon: Heart,
    desc: "Personalized health recommendations",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50"
  },
  {
    title: "Active Users",
    value: "15.2K",
    change: "+18%",
    icon: Users,
    desc: "People using our healthcare AI",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50"
  }
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="glass-stats-card group floating-element">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-[1.5rem]`}></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg glass-shimmer`}>
                  <IconComponent className="h-6 w-6 text-white relative z-10" />
                </div>
                <div className={`glass-button flex items-center gap-1 px-3 py-1 text-slate-700 text-xs font-semibold border-slate-300/30`}>
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent my-4" />
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors">
                  {stat.value}
                </h3>
                <p className="text-sm font-semibold text-slate-700">
                  {stat.title}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
