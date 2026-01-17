import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Send, Sparkles, X } from 'lucide-react';
import { ChatMessage } from '../../types';
import { getWeddingAdvice } from '../../services/geminiService';

interface WeddingPlannerAIProps {
  weddingDate: string | null;
  venueName: string | null;
  onClose?: () => void;
}

export const WeddingPlannerAI: React.FC<WeddingPlannerAIProps> = ({ weddingDate, venueName, onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Namaste! I'm your Vivah Verse wedding assistant. I see you're planning a wedding ${venueName ? `at ${venueName}` : ''} ${weddingDate ? `on ${weddingDate}` : ''}. How can I help you design your dream day?`,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const advice = await getWeddingAdvice(input, weddingDate, venueName);

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: advice,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <GlassCard className="h-[600px] flex flex-col relative !p-0 overflow-hidden shadow-2xl border-pink-200">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="animate-pulse" />
          <h3 className="font-bold">Vivah Verse Genie</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-pink-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 shadow-md rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white/60 backdrop-blur-md border-t border-white/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about decor, traditions, or budget..."
            className="flex-1 bg-white border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-pink-600 text-white p-3 rounded-xl hover:bg-pink-700 disabled:opacity-50 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

