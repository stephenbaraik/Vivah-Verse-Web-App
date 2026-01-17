import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Calendar, Users, MapPin, CreditCard, CheckCircle, Sparkles } from 'lucide-react';

export const BusinessModel: React.FC = () => {
  const howItWorksSteps = [
    {
      step: '1',
      title: 'Select Your Date',
      description: 'Choose an auspicious date using our AI-powered calendar that highlights muhurat times and availability.',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      step: '2',
      title: 'AI Consultation',
      description: 'Tell us about your preferences, guest count, budget, and style. Our AI concierge creates personalized recommendations.',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      step: '3',
      title: 'Choose Package & Venue',
      description: 'Browse curated venues and select from our Silver, Gold, or Platinum packages tailored to your needs.',
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      step: '4',
      title: 'Customize Services',
      description: 'Add vendors for catering, photography, decor, entertainment, and more from our verified network.',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      step: '5',
      title: 'Secure Payment',
      description: 'Pay securely with multiple options. Your dedicated wedding manager takes care of everything from here.',
      icon: CreditCard,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      step: '6',
      title: 'Enjoy Your Day',
      description: 'Sit back and enjoy your stress-free wedding. We handle all coordination, execution, and last-minute adjustments.',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-light text-vivah-burgundy mb-4 tracking-tight">How It <span className="font-semibold text-gradient-gold">Works</span></h2>
        <p className="text-xl text-gray-600 leading-relaxed">From date selection to wedding day, we make planning effortless and enjoyable.</p>
      </div>

      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-vivah-gold/20 via-vivah-gold/50 to-vivah-gold/20" aria-hidden="true"></div>
        
        <div className="space-y-12">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="flex items-center group">
              {/* Left side content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                {index % 2 === 0 && (
                  <GlassCard hoverEffect className="p-6 transform transition-transform duration-500 group-hover:scale-105 inline-block">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center ${step.color}`}>
                        <step.icon size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-vivah-burgundy">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                )}
              </div>

              {/* Center circle */}
              <div className="w-14 h-14 bg-white border-2 border-vivah-gold rounded-full flex items-center justify-center z-10 text-vivah-gold font-bold text-lg transition-all duration-500 group-hover:scale-125 group-hover:bg-vivah-gold group-hover:text-white group-hover:shadow-lg flex-shrink-0">
                {step.step}
              </div>

              {/* Right side content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                {index % 2 !== 0 && (
                  <GlassCard hoverEffect className="p-6 transform transition-transform duration-500 group-hover:scale-105 inline-block">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center ${step.color}`}>
                        <step.icon size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-vivah-burgundy">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

