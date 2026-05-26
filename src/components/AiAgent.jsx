import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function AiAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Initial welcoming message from Mohan's AI
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm Mohan's AI Assistant. Ask me anything about his skills, experience, or projects!"
    }
  ]);

  const chatEndRef = useRef(null);

  // Auto-scrolls to the bottom of the chat whenever a new message appears
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const askAgent = async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || loading) return;

    // 1. Instantly append user's message to the local chat history state
    const updatedHistory = [...chatHistory, { role: "user", content: trimmedMessage }];
    setChatHistory(updatedHistory);
    setInputMessage(""); // Reset input field
    setLoading(true);

    try {
      // 2. Pass the entire message history block required by your Groq API handler
      const { data } = await axios.post("/api/agent", {
        messages: updatedHistory
      });

      if (data.success) {
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: data.answer }
        ]);
      } else {
        throw new Error(data.answer);
      }
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Allows sending messages cleanly by pressing 'Enter' without holding 'Shift'
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askAgent();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans antialiased">
      
      {/* 1. CHAT TOGGLE BUTTON (FLOTATION BUBBLE) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group relative"
        >
          {/* Subtle live notification pulse indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <svg className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* 2. CHAT WINDOW CONTAINER */}
      {isOpen && (
        <div className="w-[380px] sm:w-[400px] h-[500px] rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Chat Header */}
          <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-x-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  MM
                </div>
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-indigo-600"></span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm leading-tight">Mohan's Assistant</h3>
                <p className="text-xs text-indigo-100 flex items-center gap-x-1">
                  Online
                </p>
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-indigo-100 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L10 12l-4-6m6 12l4-6-4-6" />
              </svg>
            </button>
          </div>

          {/* Chat Messages Log Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-xs ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Simulated Animated Typing Loader Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 border border-slate-200/80 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center space-x-1">
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Footer Action Section */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-end gap-x-2">
            <textarea
              rows="1"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me something..."
              className="flex-1 max-h-24 min-h-[38px] rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-none leading-relaxed"
            />
            
            <button
              onClick={askAgent}
              disabled={!inputMessage.trim() || loading}
              className={`h-9 w-9 flex items-center justify-center rounded-xl text-white shadow-xs transition-all cursor-pointer ${
                inputMessage.trim() && !loading
                  ? 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <svg className="h-4 w-4 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}