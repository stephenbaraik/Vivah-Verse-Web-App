import React from 'react';
import { GlassCard } from './GlassCard';
import { DollarSign, Percent, TrendingUp } from 'lucide-react';

export const BusinessModel: React.FC = () => {
  const workflowSteps = [
    'Vendor Acquisition and Onboarding',
    'Vendor Contracting',
    'Vendor Portal Access',
    'Customer Acquisition',
    'Initial Customer Consultation and Requirement Mapping',
    'Vendor Matching and Date Lock-In',
    'Contract Signing and Payment Structure',
    'Wedding Manager Assignment',
    'Pre-Wedding Planning and Coordination',
    'On-Ground Wedding Execution',
    'Post-Wedding Closure',
  ];

  const revenueStreams = [
    {
      title: 'Commission on Vendor Bookings',
      description: 'Vivah Verse earns a commission on every vendor and venue booked through the platform. This commission is built into the package pricing, so customers do not pay anything extra.',
      icon: Percent,
    },
    {
      title: 'Wedding Management Fee',
      description: 'For end-to-end planning and execution, Vivah Verse charges a wedding management fee of 6% of the total wedding bill or ₹3.5 lakh, whichever is lower. This covers the dedicated wedding manager, coordination, and execution.',
      icon: DollarSign,
    },
    {
      title: 'Vendor Promotion and Visibility Fees',
      description: '(To be integrated later) At a later stage, vendors will have the option to pay a fee to feature their services higher on the platform. This will be clearly marked as promoted and optional.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
      {/* Workflow Section */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-vivah-burgundy mb-4 tracking-tight">How It <span className="font-semibold text-gradient-gold">Works</span></h2>
          <p className="text-xl text-gray-600 leading-relaxed">A seamless and transparent process from start to finish.</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-vivah-gold/20 via-vivah-gold/50 to-vivah-gold/20" aria-hidden="true"></div>
          <div className="space-y-16">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-center group">
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <GlassCard hoverEffect className="p-6 transform transition-transform duration-500 group-hover:scale-105">
                    <p className="font-bold text-vivah-burgundy">{step}</p>
                  </GlassCard>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-vivah-gold rounded-full flex items-center justify-center text-vivah-gold font-bold z-10 text-lg transition-all duration-500 group-hover:scale-125 group-hover:bg-vivah-gold group-hover:text-white group-hover:shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Streams Section */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-vivah-burgundy mb-4 tracking-tight">Our <span className="font-semibold text-gradient-gold">Revenue Model</span></h2>
          <p className="text-xl text-gray-600 leading-relaxed">A multi-revenue stream model that ensures predictable income while keeping customer pricing transparent.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {revenueStreams.map((stream, index) => (
            <GlassCard key={index} hoverEffect className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <stream.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-vivah-burgundy">{stream.title}</h3>
              </div>
              <p className="text-gray-600">{stream.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
