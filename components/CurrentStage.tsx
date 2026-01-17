import React from 'react';
import { GlassCard } from './GlassCard';
import { ClipboardList } from 'lucide-react';

export const CurrentStage: React.FC = () => {
  const currentStage = {
    title: 'Current Stage',
    points: [
      'Onboarding vendors across key wedding categories',
      'Initiating discussions with NBFCs and banks to enable EMI payment options',
      'Engaging with NGOs and sustainability partners for food and floral waste management',
    ],
    launchInfo: 'The platform is planned to go live in March 2025 with a focused launch in Mumbai, Navi Mumbai, Thane, Lonavala and nearby regions.',
  };

  return (
    <div className="bg-vivah-petal py-20">
        <div className="max-w-4xl mx-auto px-4">
            <GlassCard hoverEffect className="p-8 bg-white/50">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-4">
                        <ClipboardList size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-vivah-burgundy">{currentStage.title}</h3>
                </div>
                <ul className="space-y-2 mb-4">
                    {currentStage.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                        <span className="text-yellow-500 mr-2">»</span>
                        <span className="text-gray-600">{point}</span>
                    </li>
                    ))}
                </ul>
                <p className="text-gray-600 font-semibold">{currentStage.launchInfo}</p>
            </GlassCard>
        </div>
    </div>
  );
};
