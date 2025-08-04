
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, PlusCircle, ZoomIn } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="glass-card-enhanced">
      <div className="p-4 border-b border-slate-300/20 rounded-t-[1.5rem]">
        <h3 className="text-lg font-semibold text-slate-800">Quick Actions</h3>
      </div>
      <div className="space-y-4 p-4">
        <Button className="w-full glass-button bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/80 hover:to-purple-600/80 text-white border-0 font-semibold" size="lg">
          <Bell className="mr-2 h-4 w-4" />
          Report Symptoms
        </Button>
        
        <Button className="w-full glass-button text-slate-700 hover:text-slate-800 border-slate-300/30" size="lg">
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat with AI Assistant
        </Button>
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent my-4" />
        
        <div className="grid grid-cols-2 gap-3">
          <Button className="glass-button text-slate-600 hover:text-slate-800 text-sm border-slate-300/20" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Health Data
          </Button>
          
          <Button className="glass-button text-slate-600 hover:text-slate-800 text-sm border-slate-300/20" size="sm">
            <ZoomIn className="mr-2 h-4 w-4" />
            Analyze Trends
          </Button>
        </div>
        
        <div className="glass-card p-3">
          <h3 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Did you know?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your anonymous symptom reports power our AI-driven outbreak detection system, creating a community shield against emerging health threats.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
