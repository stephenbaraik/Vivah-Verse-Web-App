import React from 'react';
import { GlassCard } from './GlassCard';
import { UserPreferences, PackageTier } from '../types';
import { PACKAGES, isAuspiciousDate } from '../constants';
import { Check, ArrowRight, Star } from 'lucide-react';

interface PackageSelectionProps {
  preferences: UserPreferences;
  onSelect: (tier: PackageTier) => void;
}

export const PackageSelection: React.FC<PackageSelectionProps> = ({ preferences, onSelect }) => {
  const isMuhurat = preferences.weddingDate ? isAuspiciousDate(new Date(preferences.weddingDate)) : false;
  const multiplier = isMuhurat ? 1.1 : 1.0; // Surge pricing for Gold dates

  return (
    <div className="max-w-[90rem] mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-light text-vivah-burgundy mb-4">Curated <span className="text-gradient-gold font-bold">Experiences</span></h2>
        <p className="text-xl text-vivah-burgundy/60 max-w-2xl mx-auto">
          Based on your {preferences.guestCount} guests in {preferences.city}. 
          {isMuhurat && <span className="block mt-2 text-vivah-gold font-bold text-sm uppercase tracking-widest"><Star size={12} className="inline mb-1"/> Peak Muhurat Date Pricing Applied</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        {PACKAGES.map((pkg) => {
          // Dynamic Cost Calculation: Base + (Guest * Standard Plate Cost Approx)
          const estimatedCost = (pkg.basePrice + (preferences.guestCount * (pkg.tier === 'Platinum' ? 4000 : pkg.tier === 'Gold' ? 2500 : 1500))) * multiplier;
          
          const isGold = pkg.tier === PackageTier.GOLD;

          return (
            <GlassCard 
              key={pkg.tier} 
              className={`
                relative p-10 flex flex-col transition-all duration-500
                ${isGold ? 'scale-110 z-10 border-vivah-gold/50 shadow-2xl bg-white/90' : 'bg-white/60 hover:bg-white/80'}
              `}
            >
              {isGold && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-vivah-gold text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className="text-3xl font-bold text-vivah-burgundy mb-2">{pkg.name}</h3>
              <p className="text-sm text-vivah-burgundy/60 mb-8 h-12">{pkg.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-light text-vivah-burgundy">₹{(estimatedCost / 100000).toFixed(1)} L</span>
                <span className="text-sm text-vivah-burgundy/40 block mt-1">Estimated Total</span>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {pkg.includes.map((feat, idx) => (
                   <div key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isGold ? 'bg-vivah-gold/20 text-vivah-gold' : 'bg-gray-200 text-gray-500'}`}>
                        <Check size={12} />
                      </div>
                      <span className="text-sm font-medium text-vivah-burgundy/80">{feat}</span>
                   </div>
                ))}
              </div>

              <button 
                onClick={() => onSelect(pkg.tier)}
                className={`
                    w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                    ${isGold 
                        ? 'bg-vivah-gold text-white hover:bg-vivah-burgundy shadow-lg' 
                        : 'bg-white border border-vivah-burgundy/10 text-vivah-burgundy hover:bg-vivah-petal'
                    }
                `}
              >
                Customize <ArrowRight size={18} />
              </button>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
