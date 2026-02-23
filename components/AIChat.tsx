import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, BrainCircuit } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToOpenRouter } from '../services/openRouterService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm Md Umor's AI Assistant. Ask me anything about his skills, experience, or projects!",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendMessageToOpenRouter(userMessage.text, messages);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        timestamp: new Date(),
        reasoning_details: response.reasoning_details
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-brand-dark border border-brand-primary rotate-90' : 'bg-brand-primary hover:bg-[#8e4aa8] animate-bounce-subtle'
        }`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X className="text-brand-light w-6 h-6" /> : <MessageSquare className="text-brand-light w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 md:right-6 z-40 w-[calc(100vw-2rem)] md:w-96 bg-brand-dark border border-brand-primary rounded-2xl shadow-2xl shadow-brand-primary/20 transition-all duration-300 origin-bottom-right transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-brand-primary rounded-t-xl flex items-center gap-3">
          <div className="bg-brand-light/20 p-2 rounded-full">
            <Bot className="text-brand-light w-5 h-5" />
          </div>
          <div>
            <h3 className="text-brand-light font-bold text-sm">Portfolio Assistant</h3>
            <p className="text-brand-light/80 text-xs">Powered by OpenRouter AI</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-brand-dark scrollbar-thin scrollbar-thumb-brand-primary/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-brand-primary' : 'bg-brand-primary/20'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4 text-brand-light" /> : <Bot className="w-4 h-4 text-brand-primary" />}
                </div>
                <div
                  className={`p-3 rounded-lg text-sm max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-brand-primary text-brand-light rounded-br-none'
                      : 'bg-brand-primary/10 text-brand-secondary rounded-bl-none border border-brand-primary/20'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              
              {/* Reasoning Indicator (if available) */}
              {msg.reasoning_details && (
                <div className="flex items-center gap-1.5 text-[10px] text-brand-secondary/50 ml-11">
                  <BrainCircuit className="w-3 h-3" />
                  <span>Reasoning included</span>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-brand-primary" />
              </div>
              <div className="p-3 rounded-lg bg-brand-primary/10 rounded-bl-none border border-brand-primary/20">
                <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-3 bg-brand-dark rounded-b-xl border-t border-brand-primary/20">
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about my experience..."
              className="w-full bg-brand-primary/5 text-brand-light pl-4 pr-12 py-3 rounded-xl border border-brand-primary/30 focus:outline-none focus:border-brand-primary text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-primary hover:text-brand-light disabled:opacity-50 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIChat;