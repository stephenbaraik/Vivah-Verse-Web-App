import React from 'react';
import { GlassCard } from './GlassCard';
import { Users, BarChart2 } from 'lucide-react';

export const TargetAudience: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Target Customers */}
        <GlassCard hoverEffect className="p-8 bg-white/50">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-4">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold text-vivah-burgundy">Target Customers</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Vivah Verse primarily targets modern couples who will be getting married in the next 4 years. These couples value convenience, transparency, and financial flexibility.
          </p>
          <p className="text-gray-600">
            In addition, parents of the bride and groom form an important secondary customer segment. Having experienced the stress and inefficiencies of wedding planning, they actively look for more structured and reliable solutions for their children’s weddings.
          </p>
        </GlassCard>

        {/* Market Size */}
        <GlassCard hoverEffect className="p-8 bg-white/50">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mr-4">
              <BarChart2 size={24} />
            </div>
            <h3 className="text-2xl font-bold text-vivah-burgundy">Market Size</h3>
          </div>
          <p className="text-gray-600 mb-4">
            The Indian wedding industry is one of the largest consumer-driven markets in the country. In November to December 2025 alone, India witnessed approximately 48 lakh weddings, generating an estimated ₹6.5 lakh crore in economic value.
          </p>
          <p className="text-gray-600">
            The wedding planning industry in India is currently valued at approximately ₹57,000 crore and is growing at a compound annual growth rate of 12.35%.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};
