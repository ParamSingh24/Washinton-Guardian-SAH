
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchGeminiAdvice, analyzeXrayImage } from "@/lib/ai-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Plus, Image, Heart, Phone, Upload } from "lucide-react";
import { availableSymptoms, generateAIResponse, Symptom } from "@/lib/ai-utils";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "👋 Hello! I'm your AI Healthcare Assistant powered by Google Gemini. I can help you with:\n\n🩺 Symptom analysis & health guidance\n💊 Medication information & interactions\n🏥 X-ray analysis & medical imaging\n🔬 Lab results interpretation\n🎯 Personalized health recommendations\n\nHow can I assist you with your health today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsProcessing(true);

    const matchedSymptoms = identifySymptoms(input);
    setSelectedSymptoms(matchedSymptoms);

    setIsTyping(true);
    
    setTimeout(async () => {
      setIsTyping(false);
      
      try {
        const aiResponse = await fetchGeminiAdvice(input, matchedSymptoms);
        
        const newBotMessage: Message = {
          id: `bot-${Date.now()}`,
          content: aiResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, newBotMessage]);
        
        if (matchedSymptoms.length > 0) {
          toast({
            title: `${matchedSymptoms.length} symptom${matchedSymptoms.length > 1 ? 's' : ''} identified`,
            description: "The AI is analyzing your symptoms.",
            variant: "default",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error('Error getting AI response:', error);
        const fallbackResponse = generateAIResponse(matchedSymptoms);
        
        const newBotMessage: Message = {
          id: `bot-${Date.now()}`,
          content: fallbackResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, newBotMessage]);
      }
      
      setIsProcessing(false);
    }, 1500);
  };

  const identifySymptoms = (input: string): Symptom[] => {
    return availableSymptoms.filter(symptom => 
      input.toLowerCase().includes(symptom.name.toLowerCase())
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const simulateVoiceInput = () => {
    setIsProcessing(true);
    
    toast({
      title: "Voice recording started",
      description: "Listening to your health concerns...",
      duration: 2000,
    });
    
    setTimeout(() => {
      const voiceText = "I've been having a fever and cough since yesterday. My temperature is around 100°F.";
      setInput(voiceText);
      setIsProcessing(false);
      
      inputRef.current?.focus();
      
      toast({
        title: "Voice captured",
        description: "You can edit the text before sending.",
        duration: 3000,
      });
    }, 2000);
  };
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an image file
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsProcessing(true);
    setIsTyping(true);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: `Uploaded X-ray image: ${file.name}`,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    toast({
      title: "Analyzing X-ray",
      description: "AI is analyzing your X-ray image...",
      duration: 3000,
    });

    try {
      const analysis = await analyzeXrayImage(file);
      
      setTimeout(() => {
        setIsTyping(false);
        
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: analysis,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsProcessing(false);
      }, 2000);
      
    } catch (error) {
      setIsTyping(false);
      setIsProcessing(false);
      
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the X-ray. Please try again or consult a healthcare professional.",
        variant: "destructive",
        duration: 5000,
      });
    }

    // Reset the input
    event.target.value = '';
  };

  const connectToDoctor = () => {
    toast({
      title: "Connecting to Doctor",
      description: "We're finding an available healthcare professional for you.",
      duration: 3000,
    });
  };

  return (
    <Card className="flex flex-col h-full max-h-[700px] border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gradient-to-r from-blue-200 to-purple-200 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-bold text-white">Healthcare AI Assistant</h3>
            <p className="text-xs text-white/80">Powered by Google Gemini</p>
          </div>
        </div>
        <div className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
          Online
        </div>
      </div>
      
      <CardContent className="flex-1 p-0 flex flex-col h-full min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-pink-50/50 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                    : "bg-white border border-pink-100"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white rounded-2xl px-4 py-3 border border-pink-100 shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {selectedSymptoms.length > 0 && (
          <div className="px-4 py-2 bg-pink-50 border-t border-pink-100 flex-shrink-0">
            <p className="text-xs text-pink-600 font-medium">Identified symptoms:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedSymptoms.map(symptom => (
                <span 
                  key={symptom.id}
                  className="text-xs bg-white px-2 py-0.5 rounded-full border border-pink-200 shadow-sm hover:bg-pink-50 transition-colors"
                >
                  {symptom.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-pink-100 bg-white flex-shrink-0">
          <div className="flex space-x-2 mb-3">
            <Button
              type="button"
              size="sm"
              onClick={connectToDoctor}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              <Phone className="h-4 w-4 mr-2" />
              Connect to Doctor
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={simulateVoiceInput}
              disabled={isProcessing}
              className="text-pink-500 border-pink-200 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 flex-shrink-0"
            >
              <Mic className="h-4 w-4" />
              <span className="sr-only">Voice input</span>
            </Button>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isProcessing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="xray-upload"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                disabled={isProcessing}
                className="text-pink-500 border-pink-200 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 flex-shrink-0"
                asChild
              >
                <label htmlFor="xray-upload" className="cursor-pointer flex items-center justify-center w-full h-full">
                  <Upload className="h-4 w-4" />
                  <span className="sr-only">Upload X-ray</span>
                </label>
              </Button>
            </div>
            
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe symptoms, ask about medications, or upload X-rays..."
              disabled={isProcessing}
              className="flex-1 border-pink-200 focus-visible:ring-pink-400"
            />
            
            <Button
              type="button"
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || isProcessing}
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white flex-shrink-0"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>

          <div className="flex justify-center mt-3">
            <div className="flex items-center text-xs text-pink-400 space-x-1">
              <Heart className="h-3 w-3" />
              <span>Healthcare AI - Powered by Gemini</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
