import React, { useState, useEffect, useRef } from 'react';
import { GlassCard } from '../common/GlassCard';
import { UserPreferences, ChatMessage } from '../../types';
import { Send, Sparkles, MapPin, Users, IndianRupee, Heart } from 'lucide-react';

interface AIOnboardingProps {
  weddingDate: string;
  onComplete: (prefs: UserPreferences) => void;
}

const STEPS = [
  { id: 'city', question: "Namaste! I'm your Vivah Concierge. To design your perfect day, first tell me: Which city are you planning to tie the knot in?", icon: MapPin },
  { id: 'guestCount', question: "A beautiful choice. Now, roughly how many guests will be joining the celebration?", icon: Users },
  { id: 'budget', question: "Got it. To tailor the best packages, what is your estimated budget for the entire event?", icon: IndianRupee },
  { id: 'vibe', question: "Almost done. How would you describe your dream wedding style? (e.g., Royal, Minimalist, Beachside)", icon: Heart },
  { id: 'final', question: "Perfect! I'm curating your personalized packages now...", icon: Sparkles }
];

export const AIOnboarding: React.FC<AIOnboardingProps> = ({ weddingDate, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [prefs, setPrefs] = useState<Partial<UserPreferences>>({ weddingDate });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addSystemMessage(STEPS[0].question);
      }, 500);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addSystemMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'ai',
      text,
      timestamp: new Date()
    }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    
    const stepId = STEPS[currentStep].id;
    const newPrefs = { ...prefs };

    if (stepId === 'city') newPrefs.city = input;
    if (stepId === 'guestCount') newPrefs.guestCount = parseInt(input.replace(/[^0-9]/g, '')) || 100;
    if (stepId === 'budget') newPrefs.budget = input;
    if (stepId === 'vibe') newPrefs.vibe = input;

    setPrefs(newPrefs);
    setInput('');

    if (currentStep < STEPS.length - 2) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeout(() => {
        addSystemMessage(STEPS[nextStep].question);
      }, 800);
    } else {
      setTimeout(() => {
        addSystemMessage(STEPS[STEPS.length - 1].question);
        setTimeout(() => {
          onComplete(newPrefs as UserPreferences);
        }, 2000);
      }, 800);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vivah-gold/10 border border-vivah-gold/30 mb-4">
            <Sparkles size={16} className="text-vivah-gold animate-spin-slow" />
            <span className="text-xs font-bold text-vivah-gold uppercase tracking-widest">AI Concierge</span>
          </div>
          <h2 className="text-3xl font-light text-vivah-burgundy">Designing for <span className="font-bold">{new Date(weddingDate).toDateString()}</span></h2>
        </div>

        <GlassCard className="h-[600px] flex flex-col relative overflow-hidden shadow-2xl border-vivah-gold/20">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                <div className={`
                  max-w-[80%] p-4 rounded-2xl text-lg leading-relaxed shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-vivah-burgundy text-white rounded-br-none' 
                    : 'bg-white/80 text-vivah-burgundy rounded-bl-none border border-white'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-md border-t border-white/50">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your answer..."
                autoFocus
                className="flex-1 bg-white border border-vivah-gold/20 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-vivah-gold/50 shadow-inner"
              />
              <button
                onClick={handleSend}
                className="bg-vivah-gold text-white p-4 rounded-2xl hover:bg-vivah-burgundy transition-colors shadow-lg"
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

