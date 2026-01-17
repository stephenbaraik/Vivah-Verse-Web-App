import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Briefcase, FileText, UserCheck, CreditCard } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      <div className="text-center max-w-4xl mx-auto animate-float">
        <h1 className="text-5xl font-bold text-vivah-burgundy mb-6">
          Delivering Stress-Free Weddings.
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          Vivah Verse is a Wed-tech platform that manages end-to-end wedding planning and execution, taking complete responsibility so that families of the bride and groom can enjoy the celebration without stress or last-minute chaos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Briefcase, title: "End-to-End Execution", desc: "We take complete ownership of planning and execution." },
          { icon: FileText, title: "Transparent Packages", desc: "All-inclusive packages with venues and verified vendors." },
          { icon: UserCheck, title: "Dedicated Manager", desc: "A single point of accountability for flawless execution." },
          { icon: CreditCard, title: "Smart Financing", desc: "Structured EMI options to manage your budget comfortably." }
        ].map((item, idx) => (
          <GlassCard key={idx} hoverEffect className="text-center p-8">
            <div className="w-12 h-12 mx-auto bg-vivah-petal rounded-full flex items-center justify-center text-vivah-rose mb-4">
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-vivah-burgundy mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-vivah-rose to-vivah-gold rounded-2xl opacity-20 blur-lg"></div>
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Wedding Celebration" 
            className="relative rounded-2xl shadow-2xl"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-vivah-burgundy">How We Do It</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We help couples and their families curate transparent and all-inclusive wedding packages where venues and verified vendors are booked under Vivah Verse, eliminating the need for multiple visits, endless negotiations, and coordination with dozens of service providers.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Every wedding is managed by a dedicated wedding manager who acts as a single point of accountability, ensuring vendor reliability, timeline adherence, and flawless on-ground execution. To address the growing financial burden of weddings, Vivah Verse offers structured EMI payment options, allowing families to pay comfortably over time.
          </p>
          <p className="text-gray-700 font-semibold text-lg leading-relaxed">
            In short, Vivah Verse combines execution ownership, transparency, and smart financing to deliver stress-free weddings.
          </p>
        </div>
      </div>
    </div>
  );
};

