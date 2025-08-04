
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aiInsights } from "@/lib/ai-utils";
import { Brain } from "lucide-react";

const AIInsights = () => {
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="glass-card-enhanced">
      <div className="p-4 border-b border-slate-300/20 rounded-t-[1.5rem]">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center text-slate-800">
            <Brain className="mr-2 h-5 w-5 text-blue-600" />
            AI Health Insights
          </h3>
          <div className="glass-button px-3 py-1 text-xs font-semibold text-slate-700 border-blue-400/30">
            {aiInsights.length} New
          </div>
        </div>
      </div>
      <div className="p-0">
        <div className="space-y-0 max-h-[400px] overflow-y-auto">
          {aiInsights.map(insight => (
            <div key={insight.id} className="p-4 border-b border-slate-300/10 hover:bg-white/20 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm text-slate-800">{insight.title}</h3>
                <div className={`px-2 py-1 text-xs font-medium rounded-lg border ${
                    insight.severity === 'alert' ? 'bg-red-100/80 text-red-700 border-red-200' : 
                    insight.severity === 'warning' ? 'bg-amber-100/80 text-amber-700 border-amber-200' : 
                    'bg-blue-100/80 text-blue-700 border-blue-200'
                  }`}>
                  {insight.severity === 'alert' ? 'Critical' : 
                   insight.severity === 'warning' ? 'Warning' : 'Info'}
                </div>
              </div>
              
              <p className="mt-1 text-xs text-slate-600">{insight.description}</p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {insight.relatedSymptoms.map(symptom => (
                  <div key={symptom} className="px-2 py-1 text-xs text-slate-600 bg-slate-100/60 border border-slate-200/50 rounded-md">
                    {symptom}
                  </div>
                ))}
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent my-2" />
              
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>{formatDate(insight.timestamp)}</span>
                <div className="flex items-center">
                  <span className="mr-2">AI Confidence:</span>
                  <div className="w-16 h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300" 
                      style={{ width: `${(insight.confidenceScore * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 text-center border-t border-slate-300/20 rounded-b-[1.5rem]">
          <a href="#" className="text-xs text-blue-600 hover:text-blue-700 transition-colors font-medium">View all insights</a>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
