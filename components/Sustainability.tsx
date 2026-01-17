import React from 'react';
import { GlassCard } from './GlassCard';
import { Heart, Recycle, Users, TrendingUp } from 'lucide-react';

export const Sustainability: React.FC = () => {
  const initiatives = [
    {
      title: 'Reducing Food Wastage',
      description: 'Vivah Verse is in active discussions with NGOs like The Robin Hood Army to collect surplus food and distribute it to people in need. Nearly 30% of food prepared at Indian weddings goes to waste. Through this partnership, surplus food from wedding events will be safely collected and redistributed.',
      icon: Heart,
    },
    {
      title: 'Responsible Use of Floral Waste',
      description: 'Wedding decorations and flowers are often discarded within hours. Vivah Verse plans to partner with organizations that reuse real flowers to create products such as incense sticks, perfumes, compost, and eco-friendly items, ensuring that floral waste is repurposed instead of ending up in landfills.',
      icon: Recycle,
    },
    {
      title: 'Creating Opportunities for Freelancers',
      description: 'Vivah Verse creates consistent work opportunities for freelancers and small wedding service providers by onboarding them onto a centralized platform. Standardized contracts, transparent pricing, and assured payments help reduce operational risk and support sustainable growth.',
      icon: Users,
    },
    {
        title: 'Long-Term Impact',
        description: 'By integrating these practices into wedding execution, Vivah Verse aims to significantly reduce food and floral waste at scale. These small but consistent steps help create weddings that are not only stress-free but also socially and environmentally responsible.',
        icon: TrendingUp,
    }
  ];

  return (
    <div className="bg-vivah-petal py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-vivah-burgundy mb-4 tracking-tight">Sustainability & <span className="font-semibold text-gradient-gold">Impact</span></h2>
          <p className="text-xl text-gray-600 leading-relaxed">Creating weddings that are not only stress-free but also socially and environmentally responsible.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((initiative, index) => (
            <GlassCard key={index} hoverEffect className="p-8 bg-white/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                  <initiative.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-vivah-burgundy">{initiative.title}</h3>
              </div>
              <p className="text-gray-600">{initiative.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
