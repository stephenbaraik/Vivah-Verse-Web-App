import React from 'react';
import { GlassCard } from './GlassCard';
import { Heart, Globe, Shield, Zap } from 'lucide-react';
import { APP_NAME } from '../constants';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto animate-float">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Memories</span>.
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {APP_NAME} isn't just a directory; it's the operating system for the modern Indian wedding. 
          We merge traditional hospitality with futuristic technology to eliminate the chaos.
        </p>
      </div>

      {/* Stats/Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Zap, title: "AI-Powered", desc: "Predictive budgeting & styling." },
          { icon: Globe, title: "Pan-India", desc: "Venues from Kerala to Kashmir." },
          { icon: Shield, title: "Verified", desc: "100% vetted vendor partners." },
          { icon: Heart, title: "User First", desc: "Zero commission for couples." }
        ].map((item, idx) => (
          <GlassCard key={idx} hoverEffect className="text-center p-8">
            <div className="w-12 h-12 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4">
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </GlassCard>
        ))}
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Wedding Team" 
            className="relative rounded-2xl shadow-2xl"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The Indian wedding market is fragmented. Vendors are overwhelmed, and couples are stressed. 
            We saw an opportunity to bring order to this beautiful chaos.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            By digitizing the entire supply chain, we allow venue owners to maximize occupancy and couples to execute 
            their vision with a single click. From the "Roka" to the "Reception", Vivah Verse is your silent partner.
          </p>
        </div>
      </div>
    </div>
  );
};