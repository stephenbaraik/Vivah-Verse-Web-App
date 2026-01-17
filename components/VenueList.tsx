import React, { useState } from 'react';
import { MOCK_VENUES } from '../constants';
import { GlassCard } from './GlassCard';
import { MapPin, ArrowRight, Leaf } from 'lucide-react';
import { Venue, UserPreferences } from '../types';

interface VenueListProps {
  selectedDate: string;
  userPreferences: UserPreferences | null;
  onViewDetails: (venue: Venue) => void;
}

export const VenueList: React.FC<VenueListProps> = ({ selectedDate, userPreferences, onViewDetails }) => {
  const [filter, setFilter] = useState<'All' | 'Palace' | 'Resort'>('All');

  const filteredVenues = MOCK_VENUES.filter(v => filter === 'All' || v.type === filter);

  return (
    <div className="max-w-[90rem] mx-auto px-6 py-20 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
        <div className="animate-slide-up">
          <h2 className="text-6xl lg:text-7xl font-light text-vivah-burgundy tracking-tight">
             Curated <span className="font-semibold">Spaces</span>
          </h2>
          <p className="text-vivah-burgundy/50 mt-6 text-xl font-light max-w-2xl leading-relaxed">
            {userPreferences 
              ? `Handpicked collections for ${userPreferences.guestCount} guests in ${userPreferences.city}`
              : 'Exclusive properties managed by Vivah Verse, ready for your story.'
            }
          </p>
        </div>
        
        <div className="flex gap-3 animate-slide-up delay-100">
          {['All', 'Palace', 'Resort'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                filter === type 
                ? 'bg-vivah-burgundy text-white shadow-lg' 
                : 'bg-white/60 text-vivah-burgundy/60 hover:bg-white hover:text-vivah-burgundy border border-transparent hover:border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredVenues.map((venue, idx) => (
          <div 
            key={venue.id} 
            onClick={() => onViewDetails(venue)}
            className="group cursor-pointer animate-slide-up"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {/* Image Container */}
            <div className="relative h-[32rem] rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl mb-8 border border-white/50">
              <img 
                src={venue.image} 
                alt={venue.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              
              {/* Eco Badge */}
              {venue.isEcoFriendly && (
                  <div className="absolute top-8 right-8 bg-emerald-100/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-700 shadow-sm flex items-center gap-1 z-10">
                    <Leaf size={12} fill="currentColor" /> Eco-Friendly
                  </div>
              )}

              {/* Minimal overlay at bottom */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-vivah-burgundy shadow-lg">
                ₹{venue.pricePerPlate} <span className="text-xs font-normal opacity-60 normal-case">/ plate</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="px-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-3xl font-medium text-vivah-burgundy group-hover:text-vivah-rose transition-colors">{venue.name}</h3>
                <div className="w-12 h-12 rounded-full border border-vivah-burgundy/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-8 group-hover:translate-x-0 bg-white">
                    <ArrowRight size={20} className="text-vivah-burgundy" />
                </div>
              </div>
              <div className="flex items-center text-vivah-burgundy/60 text-lg font-light">
                <MapPin size={18} className="mr-2 text-vivah-rose" strokeWidth={1.5} />
                {venue.location} &bull; {venue.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};