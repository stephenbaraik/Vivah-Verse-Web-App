import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { ThumbsUp } from 'lucide-react';

export const Solution: React.FC = () => {
  const solutions = [
    {
      title: 'Centralized Execution and Accountability',
      points: [
        'Vivah Verse contracts and manages verified venues and vendors under a single agreement',
        'Availability, service scope, and timelines are contractually fixed in advance',
        'A dedicated wedding manager is assigned as the single point of accountability',
        'Vendor coordination, escalation handling, and on-ground execution are centrally managed',
      ],
    },
    {
      title: 'Standardized Pricing and Structured Payments',
      points: [
        'Vendors operate on pre-negotiated and standardized pricing slabs',
        'Peak-season price variations and ad-hoc cost escalations are eliminated',
        'Clear definition of inclusions and exclusions for each service',
        'EMI-based payment plans reduce dependence on high-interest personal loans',
        'Improved cash-flow management before and after the wedding',
      ],
    },
    {
      title: 'Verified Information and Booking Reliability',
      points: [
        'Vendor onboarding includes verification and formal contracting',
        'Date availability is confirmed through the vendor portal',
        'Service scope is clearly defined to prevent post-booking changes',
        'Centralized platform enables objective vendor comparison',
        'Booking reliability is ensured through platform-level accountability',
      ],
    },
  ];

  return (
    <div className="bg-vivah-petal py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-vivah-burgundy mb-4 tracking-tight">Our <span className="font-semibold text-gradient-gold">Solution</span></h2>
          <p className="text-xl text-gray-600 leading-relaxed">We've rebuilt the wedding planning experience from the ground up to be simple, transparent, and reliable.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <GlassCard key={index} hoverEffect className="p-8 bg-white/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                  <ThumbsUp size={24} />
                </div>
                <h3 className="text-xl font-bold text-vivah-burgundy">{solution.title}</h3>
              </div>
              <ul className="space-y-2">
                {solution.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

