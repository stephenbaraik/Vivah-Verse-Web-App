import React, { useState } from 'react';
import { MOCK_VENDOR_SERVICES } from '../constants';
import { GlassCard } from './GlassCard';
import { Star, PlusCircle, Tag, Check, CheckSquare, Square, Leaf } from 'lucide-react';

interface VendorServiceListProps {
  bookedServiceIds: string[];
  onToggleService: (serviceId: string) => void;
}

export const VendorServiceList: React.FC<VendorServiceListProps> = ({ bookedServiceIds, onToggleService }) => {
  const [filter, setFilter] = useState<'All' | 'Decor' | 'Catering' | 'Photography' | 'Makeup' | 'Entertainment'>('All');

  const filteredServices = MOCK_VENDOR_SERVICES.filter(s => filter === 'All' || s.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Premium Wedding Services</h2>
          <p className="text-gray-600 mt-2">Select multiple services for your big day</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 justify-end">
          {['All', 'Decor', 'Catering', 'Photography', 'Makeup', 'Entertainment'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category 
                ? 'bg-pink-500 text-white shadow-lg' 
                : 'bg-white/50 text-gray-600 hover:bg-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => {
          const isBooked = bookedServiceIds.includes(service.id);
          return (
            <GlassCard 
              key={service.id} 
              className={`flex flex-col h-full !p-0 overflow-hidden group transition-all duration-300 ${isBooked ? 'ring-2 ring-pink-500 shadow-xl scale-[1.02]' : 'hover:scale-[1.01]'}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.businessName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm uppercase tracking-wide">
                  {service.category}
                </div>
                
                {service.isEcoFriendly && (
                  <div className="absolute top-4 left-24 ml-2 bg-emerald-100/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-700 flex items-center gap-1 shadow-sm">
                    <Leaf size={12} fill="currentColor" /> Eco
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-pink-600 flex items-center gap-1 shadow-sm">
                  <Star size={14} fill="currentColor" /> {service.rating}
                </div>
                
                {/* Overlay Checkbox for Selection */}
                <div 
                  onClick={() => onToggleService(service.id)}
                  className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                   {!isBooked && (
                     <div className="bg-white/90 backdrop-blur text-gray-800 px-4 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                       Click to Select
                     </div>
                   )}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col cursor-pointer" onClick={() => onToggleService(service.id)}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{service.businessName}</h3>
                  <button 
                    className="text-pink-500 transition-transform active:scale-95 focus:outline-none"
                    aria-label={isBooked ? "Unselect service" : "Select service"}
                  >
                    {isBooked ? (
                      <CheckSquare size={28} fill="currentColor" className="text-pink-100 stroke-pink-600" />
                    ) : (
                      <Square size={28} className="text-gray-300 hover:text-pink-400" />
                    )}
                  </button>
                </div>

                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{service.description}</p>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-700 bg-pink-50/50 p-3 rounded-xl border border-pink-100">
                  <div className="flex items-center gap-1 font-medium text-gray-500">
                    <Tag size={16} className="text-pink-400" />
                    <span>Est. Price</span>
                  </div>
                  <div className="font-semibold text-pink-600 text-right">
                    {service.priceRange}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleService(service.id);
                    }}
                    className={`
                      w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all
                      ${isBooked 
                        ? 'bg-pink-500 text-white shadow-lg' 
                        : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                      }
                    `}
                  >
                    {isBooked ? (
                      <><Check size={18} /> Selected</>
                    ) : (
                      <><PlusCircle size={18} /> Add to Plan</>
                    )}
                  </button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};