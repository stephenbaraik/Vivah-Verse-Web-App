import React from 'react';
import { GlassCard } from './GlassCard';
import { ThumbsDown } from 'lucide-react';

export const Problem: React.FC = () => {
  const problems = [
    {
      title: 'Fragmented Execution & No Accountability',
      points: [
        'Wedding planning involves 10–25 independent vendors',
        'No single owner for end-to-end execution',
        'Frequent last-minute cancellations and coordination failures',
        'Families forced to manage issues on the wedding day',
        'High stress and compromised wedding experience',
      ],
    },
    {
      title: 'Unstructured Pricing & Financial Stress',
      points: [
        'No standardized pricing across vendors',
        'Peak-season price fluctuations of 20–40%',
        'Time-consuming and hard negotiations',
        'Rising wedding costs (₹15–35 lakhs in urban India)',
        'Dependence on high-interest personal loans',
        'Post-wedding debt and cash-flow pressure',
      ],
    },
    {
      title: 'Trust Deficit and Information Asymmetry',
      points: [
        'Vendors often claim availability over calls or listings but deny it later',
        'Prices and service scope change during in-person discussions',
        'Lack of verified information leads to wasted time and rushed decisions',
        'Couples struggle to compare vendors objectively',
        'Overall loss of trust in the wedding booking process',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-vivah-burgundy mb-4 tracking-tight">The <span className="font-semibold text-gradient-gold">Challenges</span> of Wedding Planning</h2>
        <p className="text-xl text-gray-600 leading-relaxed">The traditional wedding planning process is broken. Here are the core problems we solve.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {problems.map((problem, index) => (
          <GlassCard key={index} hoverEffect className="p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4">
                <ThumbsDown size={24} />
              </div>
              <h3 className="text-xl font-bold text-vivah-burgundy">{problem.title}</h3>
            </div>
            <ul className="space-y-2">
              {problem.points.map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-gray-600">{point}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
