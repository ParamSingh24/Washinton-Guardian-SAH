
import { useState, useRef, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import { fetchGeminiAdvice, analyzeXrayImage } from "@/lib/ai-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Heart, Phone, Upload } from "lucide-react";
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
    <div className="glass-card-enhanced flex flex-col h-full max-h-[700px] rounded-3xl transition-all duration-500 ease-in-out hover:shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/15 rounded-t-3xl backdrop-blur-xl transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-emerald-500 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 transition-all duration-300 ease-in-out hover:scale-110 bg-gradient-to-br from-white/30 to-white/20 shadow-lg shadow-emerald-500/25">
              <Heart className="h-5 w-5 text-white transition-all duration-200 ease-in-out" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <h3 className="font-bold text-white text-lg drop-shadow-md transition-all duration-200 ease-in-out">Healthcare AI Assistant</h3>
            <p className="text-sm text-white/85 transition-all duration-200 ease-in-out">Powered by Google Gemini • Always Available</p>
          </div>
        </div>
        <div className="text-sm text-white px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300 ease-in-out bg-gradient-to-br from-white/25 to-white/15 border border-white/30 shadow-lg hover:bg-gradient-to-br hover:from-white/35 hover:to-white/20 hover:scale-105">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            Online
          </div>
        </div>
      </div>

      <CardContent className="flex-1 p-0 flex flex-col h-full min-h-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0 custom-scrollbar backdrop-blur-sm bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/40">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in transition-all duration-500 ease-out`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg transition-all duration-300 ease-in-out backdrop-blur-md ${message.sender === "user"
                  ? "message-bubble-user text-white"
                  : "message-bubble-bot text-gray-800"
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap transition-all duration-200 ease-in-out">{message.content}</p>
                <p className="text-xs opacity-70 mt-1 transition-all duration-200 ease-in-out">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in transition-all duration-500 ease-out">
              <div className="typing-indicator rounded-2xl px-4 py-3 shadow-lg transition-all duration-300 ease-in-out backdrop-blur-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse transition-all duration-200 ease-in-out"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-150 transition-all duration-200 ease-in-out"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-300 transition-all duration-200 ease-in-out"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {selectedSymptoms.length > 0 && (
          <div className="px-5 py-3 border-t border-white/15 flex-shrink-0 backdrop-blur-md transition-all duration-300 ease-in-out bg-gradient-to-br  border-emerald-500/15 shadow-lg shadow-emerald-500/10">
            <p className="text-sm text-emerald-700 font-semibold transition-all duration-200 ease-in-out mb-2">🩺 Identified symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(symptom => (
                <span
                  key={symptom.id}
                  className="text-sm px-3 py-1 rounded-full shadow-md hover:scale-105 transition-all duration-300 ease-in-out backdrop-blur-sm bg-gradient-to-br from-white/80 to-white/60 border border-emerald-500/20 text-emerald-700 font-medium shadow-emerald-500/15 hover:bg-gradient-to-br hover:from-white/90 hover:to-white/70 hover:shadow-lg"
                >
                  {symptom.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="p-5 border-t border-white/15 flex-shrink-0 backdrop-blur-md transition-all duration-300 ease-in-out bg-gradient-to-br from-white/80 to-white/60 rounded-b-3xl shadow-lg">
          <div className="flex space-x-3 mb-4">
            <Button
              type="button"
              size="sm"
              onClick={connectToDoctor}
              className="flex-1 text-white font-semibold text-sm py-3 backdrop-blur-lg bg-gradient-to-r from-emerald-500/25 to-emerald-600/20 border border-emerald-500/35 rounded-xl shadow-lg shadow-emerald-500/25 hover:bg-gradient-to-r hover:from-emerald-500/40 hover:to-emerald-600/30 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/30 hover:translate-y-[-1px] transition-all duration-300 ease-in-out"
            >
              <Phone className="h-4 w-4 mr-2 transition-all duration-200 ease-in-out" />
              Connect to Doctor
            </Button>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={simulateVoiceInput}
              disabled={isProcessing}
              className="text-blue-600 flex-shrink-0 backdrop-blur-lg bg-gradient-to-br from-white/25 to-white/15 border border-white/30 rounded-xl shadow-lg hover:bg-gradient-to-br hover:from-white/35 hover:to-white/20 hover:border-white/45 hover:shadow-xl hover:translate-y-[-1px] transition-all duration-300 ease-in-out"
              title="Voice Input"
            >
              <Mic className="h-4 w-4 transition-all duration-200 ease-in-out" />
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
                className="text-purple-600 flex-shrink-0 backdrop-blur-lg bg-gradient-to-br from-white/25 to-white/15 border border-white/30 rounded-lg shadow-lg hover:bg-gradient-to-br hover:from-white/35 hover:to-white/20 hover:border-white/45 hover:shadow-xl hover:translate-y-[-1px] transition-all duration-300 ease-in-out w-10 h-10"
                title="Upload X-ray"
                asChild
              >
                <label htmlFor="xray-upload" className="cursor-pointer flex items-center justify-center min-w-full h-full transition-all duration-200 ease-in-out">
                  <Upload className="h-4 w-4 transition-all duration-200 ease-in-out" />
                  <span className="sr-only">Upload X-ray</span>
                </label>
              </Button>
            </div>

            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="💬 Describe symptoms, ask about medications, or upload X-rays..."
              disabled={isProcessing}
              className="flex-1 text-slate-700 backdrop-blur-lg bg-gradient-to-br from-white/35 to-white/20 border border-white/30 rounded-xl shadow-lg focus:bg-gradient-to-br focus:from-white/45 focus:to-white/25 focus:border-blue-500/50 focus:shadow-xl focus:shadow-blue-500/15 focus:translate-y-[-1px] transition-all duration-300 ease-in-out placeholder:text-slate-500/70"
            />

            <Button
              type="button"
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || isProcessing}
              className="text-white flex-shrink-0 backdrop-blur-lg bg-gradient-to-r from-blue-500/20 to-blue-600/15 border border-blue-500/30 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-blue-600/20 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/25 hover:translate-y-[-1px] transition-all duration-300 ease-in-out"
              title="Send Message"
            >
              <Send className="h-4 w-4 transition-all duration-200 ease-in-out" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center text-sm text-emerald-600 space-x-2 transition-all duration-300 ease-in-out hover:text-emerald-700">
              <Heart className="h-4 w-4 transition-all duration-200 ease-in-out" />
              <span className="transition-all duration-200 ease-in-out font-medium">🏥 Healthcare AI - Powered by Gemini</span>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ChatBot;
