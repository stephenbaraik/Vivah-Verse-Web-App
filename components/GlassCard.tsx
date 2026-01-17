import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div 
      className={`
        glass-panel rounded-3xl transition-all duration-500 ease-out
        ${hoverEffect ? 'glass-card-hover cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};