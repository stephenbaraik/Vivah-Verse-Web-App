import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Sparkles, RefreshCw, Heart, Download } from 'lucide-react';
import { UserPreferences } from '../types';

interface InspirationBoardProps {
  userPreferences: UserPreferences | null;
}

export const InspirationBoard: React.FC<InspirationBoardProps> = ({ userPreferences }) => {
  const [activeTab, setActiveTab] = useState<'Decor' | 'Attire' | 'Mandap'>('Decor');
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  // Simulated Keywords mapping based on vibe
  const getKeywords = (category: string) => {
    const vibe = userPreferences?.vibe || 'Indian Wedding';
    const base = `${vibe} ${category} Indian wedding`;
    // We use Unsplash source URL with specific keywords to simulate generation
    return [
      `https://source.unsplash.com/800x600/?${base},luxury`,
      `https://source.unsplash.com/600x800/?${base},details`,
      `https://source.unsplash.com/800x800/?${base},flower`,
      `https://source.unsplash.com/600x600/?${base},gold`,
      `https://source.unsplash.com/800x1000/?${base},light`,
      `https://source.unsplash.com/800x500/?${base},venue`,
    ];
  };

  // Mock "AI Generation" effect
  const handleGenerate = () => {
    setGenerating(true);
    setImages([]); // Clear current
    setTimeout(() => {
        // In a real app, we'd call Gemini to get image prompts, then an image gen API.
        // Here we simulate by fetching fresh Unsplash URLs with a random sig to prevent caching.
        const newImages = getKeywords(activeTab).map(url => `${url}&sig=${Math.random()}`);
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
                className={`
                    px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 border
                    ${activeTab === tab 
                        ? 'bg-vivah-burgundy text-white border-vivah-burgundy shadow-lg scale-105' 
                        : 'bg-white/40 text-vivah-burgundy border-white/60 hover:bg-white hover:border-vivah-soft'
                    }
                `}
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
                    
                    {/* Hover Overlay */}
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