import React from 'react';
import { GlassCard } from '../common/GlassCard';

export const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Krish Dhiliwal',
      role: 'CEO, Founder',
      image: '/images/team/Krish Pic.jpeg',
    },
    {
      name: 'Aarav Pillay',
      role: 'CFO, Co-founder',
      image: '/images/team/aarav.jpg',
    },
    {
      name: 'Tanisha Ghosh',
      role: 'Creative head, Co-founder',
      image: '/images/team/Tanisha Pic.jpg',
    },
    {
      name: 'Stephen Baraik',
      role: 'CTO',
      image: '/images/team/Stephen Pic.PNG',
    },
    {
      name: 'Sneha Das',
      role: 'Customer relations manager',
      image: '/images/team/Sneha Pic.jpeg',
    },
    {
      name: 'Anam Shaikh',
      role: 'Vendor relations manager',
      image: '/images/team/Anam Pic.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-vivah-burgundy mb-4 tracking-tight">Our <span className="font-semibold text-gradient-gold">Team</span></h2>
        <p className="text-xl text-gray-600 leading-relaxed">The people behind Vivah Verse, dedicated to making your wedding perfect.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <GlassCard key={index} hoverEffect className="p-8 text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover object-center"
            />
            <h3 className="text-xl font-bold text-vivah-burgundy">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

