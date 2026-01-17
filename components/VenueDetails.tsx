import React from 'react';
import { Venue } from '../types';
import { GlassCard } from './GlassCard';
import { MapPin, Users, Star, ArrowRight, Check, Wifi, Car, Coffee, Music, ArrowLeft, Leaf } from 'lucide-react';

interface VenueDetailsProps {
  venue: Venue;
  onBook: () => void;
  onBack: () => void;
}

export const VenueDetails: React.FC<VenueDetailsProps> = ({ venue, onBook, onBack }) => {
  const amenities = [
    { icon: Wifi, label: "Wi-Fi" },
    { icon: Car, label: "Valet" },
    { icon: Coffee, label: "Catering" },
    { icon: Music, label: "Audio" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Navigation */}
      <div className="max-w-[90rem] mx-auto px-6 pt-10 pb-6">
        <button 
            onClick={onBack}
            className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors text-base font-medium tracking-wide group"
        >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </button>
      </div>

      {/* Immersive Hero */}
      <div className="relative w-full h-[75vh] lg:h-[85vh] overflow-hidden animate-slide-up">
        <img 
            src={venue.image} 
            alt={venue.name} 
            className="w-full h-full object-cover transform scale-105 animate-float"
            style={{ animationDuration: '20s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-20 text-white">
            <div className="max-w-[90rem] mx-auto animate-slide-up delay-200">
                <div className="flex items-center gap-4 text-white/90 text-sm font-bold uppercase tracking-widest mb-6">
                    <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">{venue.type}</span>
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full"><Star size={16} fill="currentColor" className="text-yellow-400"/> {venue.rating}</span>
                    {venue.isEcoFriendly && (
                        <span className="flex items-center gap-1 bg-emerald-500/80 backdrop-blur-md px-4 py-1.5 rounded-full text-white border border-emerald-400/30">
                            <Leaf size={16} fill="currentColor" /> Eco-Certified
                        </span>
                    )}
                </div>
                <h1 className="text-6xl lg:text-9xl font-light tracking-tight mb-4 leading-none">{venue.name}</h1>
                <p className="text-2xl lg:text-3xl font-light text-white/80 flex items-center gap-3">
                    <MapPin size={28} strokeWidth={1.5} /> {venue.location}
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-20 animate-slide-up delay-300">
          <div className="prose prose-xl max-w-none">
            <h2 className="text-4xl font-light text-vivah-burgundy mb-8 tracking-tight">The Experience</h2>
            <p className="text-vivah-burgundy/70 leading-relaxed text-2xl font-light mb-8">{venue.description}</p>
            <p className="text-vivah-burgundy/70 leading-relaxed text-xl font-light">
              Designed for the modern couple, this space blends heritage charm with contemporary luxury. 
              Every corner is a photo opportunity, and every service is curated for perfection. 
              From the moment your guests arrive, they are treated to an experience, not just an event.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-light text-vivah-burgundy mb-10 tracking-tight">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {amenities.map((am, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-10 bg-white/40 rounded-[2.5rem] border border-white/60 hover:bg-white/70 transition-colors duration-300 group">
                  <am.icon size={36} strokeWidth={1} className="text-vivah-burgundy mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-base font-bold text-vivah-burgundy/80 uppercase tracking-widest">{am.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Card */}
        <div className="lg:col-span-4 animate-slide-up delay-500">
          <div className="sticky top-32">
            <GlassCard className="p-12 border border-white/80 shadow-2xl rounded-[3rem] backdrop-blur-3xl">
              <div className="mb-10">
                <span className="text-sm text-vivah-burgundy/50 font-bold uppercase tracking-widest block mb-3">Price per plate</span>
                <div className="text-6xl font-light text-vivah-burgundy">₹{venue.pricePerPlate}</div>
              </div>

              <div className="space-y-6 mb-12 text-base">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <span className="text-vivah-burgundy/60 text-lg">Capacity</span>
                  <span className="font-medium text-vivah-burgundy text-xl">{venue.capacity} Guests</span>
                </div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <span className="text-vivah-burgundy/60 text-lg">Status</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full"><Check size={18}/> Available</span>
                </div>
              </div>

              <button 
                onClick={onBook}
                className="w-full py-6 bg-vivah-burgundy text-white rounded-3xl font-bold text-lg uppercase tracking-widest hover:bg-black transition-all hover:-translate-y-1 shadow-xl flex justify-center items-center gap-4"
              >
                Reserve Dates <ArrowRight size={20} />
              </button>
              
              <p className="text-sm text-center text-vivah-burgundy/40 mt-8 leading-relaxed">
                A 25% deposit is required to secure your booking. <br/>Fully refundable up to 6 months prior.
              </p>
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  );
};