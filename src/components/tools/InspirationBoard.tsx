import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Sparkles, RefreshCw, Heart, Download } from 'lucide-react';
import { UserPreferences } from '../../types';

interface InspirationBoardProps {
  userPreferences: UserPreferences | null;
}

export const InspirationBoard: React.FC<InspirationBoardProps> = ({ userPreferences }) => {
  const [activeTab, setActiveTab] = useState<'Decor' | 'Attire' | 'Mandap'>('Decor');
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  const getKeywords = (category: string) => {
    const vibe = userPreferences?.vibe || 'Indian Wedding';
    const base = `${vibe} ${category} Indian wedding`;
    return [
      `https://images.unsplash.com/photo-1519225421980-715cb0202128?w=600&q=80`,
      `https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80`,
      `https://images.unsplash.com/photo-1569391570861-20c3b82a1a02?w=600&q=80`,
      `https://images.unsplash.com/photo-1522673607200-1645062cd495?w=600&q=80`,
      `https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80`,
      `https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80`,
    ];
  };

  const handleGenerate = () => {
    setGenerating(true);
    setImages([]);
    setTimeout(() => {
      const newImages = getKeywords(activeTab);
      setImages(newImages);
      setGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    handleGenerate();
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vivah-rose/10 border border-vivah-rose/20 mb-4">
          <Sparkles size={16} className="text-vivah-rose animate-pulse" />
          <span className="text-sm font-bold text-vivah-rose uppercase tracking-widest">AI Stylist</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-vivah-burgundy mb-4">Your Wedding Vision Board</h2>
        <p className="text-vivah-burgundy/70 text-lg max-w-2xl mx-auto">
          Based on your preference for a <span className="font-bold text-vivah-rose">{userPreferences?.vibe || 'Luxury'}</span> aesthetic in <span className="font-bold text-vivah-rose">{userPreferences?.city || 'India'}</span>.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        {['Decor', 'Attire', 'Mandap'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 border ${activeTab === tab 
              ? 'bg-vivah-burgundy text-white border-vivah-burgundy shadow-lg scale-105' 
              : 'bg-white/40 text-vivah-burgundy border-white/60 hover:bg-white hover:border-vivah-soft'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {generating ? (
        <div className="h-96 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-vivah-rose/30 border-t-vivah-rose rounded-full animate-spin mb-6"></div>
          <p className="text-vivah-burgundy font-medium animate-pulse">Curating {activeTab.toLowerCase()} concepts...</p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <div key={idx} className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src={img} 
                alt="Inspiration" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vivah-burgundy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm font-medium">{userPreferences?.vibe} {activeTab}</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-vivah-rose transition-colors">
                      <Heart size={18} />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-vivah-rose transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <button 
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-md border border-vivah-burgundy/10 rounded-xl text-vivah-burgundy font-bold hover:bg-vivah-burgundy hover:text-white transition-all shadow-lg hover:shadow-xl"
        >
          <RefreshCw size={20} className={generating ? "animate-spin" : ""} />
          Regenerate Concepts
        </button>
      </div>
    </div>
  );
};

