import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { MOCK_VENDOR_SERVICES } from '../constants';
import { ArrowLeft, ShoppingBag, ScrollText, Music, Shirt, CheckCircle } from 'lucide-react';

interface MicroServicesProps {
  onBack: () => void;
}

export const MicroServices: React.FC<MicroServicesProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'Pundit' | 'Choreography' | 'Styling'>('Pundit');
  const [showSamagri, setShowSamagri] = useState(false);
  const [punditFilter, setPunditFilter] = useState('All');

  const filteredVendors = MOCK_VENDOR_SERVICES.filter(v => {
      if (v.category !== activeTab) return false;
      if (activeTab === 'Pundit' && punditFilter !== 'All') {
          const search = punditFilter.toLowerCase();
          const desc = v.description.toLowerCase();
          const name = v.businessName.toLowerCase();
          
          if (punditFilter === 'North Indian') return desc.includes('north') || desc.includes('hindi');
          if (punditFilter === 'South Indian') return desc.includes('south') || desc.includes('tamil') || desc.includes('telugu') || name.includes('iyer');
          if (punditFilter === 'Bengali') return desc.includes('bengali') || name.includes('mukherjee');
          if (punditFilter === 'Arya Samaj') return desc.includes('arya samaj');
          
          return desc.includes(search);
      }
      return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
       <button onClick={onBack} className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors mb-8">
            <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
       </button>

       <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
              <h1 className="text-4xl font-light text-vivah-burgundy mb-2">The <span className="font-bold">Micro-Services</span> Marketplace</h1>
              <p className="text-vivah-burgundy/60">Essentials that make the big day perfect.</p>
          </div>
       </div>

       {/* Tabs */}
       <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
           {[
               { id: 'Pundit', icon: ScrollText, label: 'Pundit & Rituals' },
               { id: 'Choreography', icon: Music, label: 'Sangeet & Dance' },
               { id: 'Styling', icon: Shirt, label: 'Safa & Draping' }
           ].map(tab => (
               <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); setPunditFilter('All'); }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-vivah-burgundy text-white shadow-lg' : 'bg-white/40 text-vivah-burgundy/60 hover:bg-white'}`}
               >
                   <tab.icon size={18} /> {tab.label}
               </button>
           ))}
       </div>

       {/* Pundit Filter Bar */}
       {activeTab === 'Pundit' && (
           <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
               {['All', 'North Indian', 'South Indian', 'Bengali', 'Arya Samaj'].map(f => (
                   <button 
                        key={f}
                        onClick={() => setPunditFilter(f)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${punditFilter === f ? 'bg-vivah-burgundy text-white border-vivah-burgundy' : 'bg-white/40 text-vivah-burgundy/60 border-vivah-burgundy/10 hover:bg-white'}`}
                   >
                       {f}
                   </button>
               ))}
           </div>
       )}

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Vendor List */}
           <div className="md:col-span-2 space-y-6">
               {filteredVendors.length > 0 ? filteredVendors.map(vendor => (
                   <GlassCard key={vendor.id} className="flex flex-col md:flex-row gap-6 p-6 items-center">
                       <img src={vendor.image} alt={vendor.businessName} className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white" />
                       <div className="flex-1 text-center md:text-left">
                           <h3 className="text-xl font-bold text-vivah-burgundy">{vendor.businessName}</h3>
                           <p className="text-sm text-vivah-burgundy/60 mb-2">{vendor.description}</p>
                           <p className="font-bold text-vivah-rose">{vendor.priceRange}</p>
                       </div>
                       <button className="px-6 py-3 bg-vivah-burgundy text-white rounded-xl font-bold hover:bg-vivah-rose transition-colors shadow-lg whitespace-nowrap">
                           Book Now
                       </button>
                   </GlassCard>
               )) : (
                   <div className="p-12 text-center bg-white/40 rounded-3xl border border-dashed border-vivah-burgundy/10">
                       <p className="text-vivah-burgundy/50 font-medium">No experts found for this community in our network yet.</p>
                       <button className="mt-4 text-sm font-bold text-vivah-rose hover:underline">Request Specific Community</button>
                   </div>
               )}
           </div>

           {/* Side Widget (Dynamic based on Tab) */}
           <div className="md:col-span-1">
               {activeTab === 'Pundit' && (
                   <GlassCard className="p-6 bg-orange-50/50 border-orange-100">
                       <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                           <ScrollText size={20} /> Digital Samagri List
                       </h3>
                       <p className="text-sm text-orange-800/60 mb-6">
                           Don't run around for Ghee, Wood, and Camphor. Generate the complete Vedic list required for your rituals.
                       </p>
                       
                       {!showSamagri ? (
                           <button onClick={() => setShowSamagri(true)} className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-all">
                               Generate List
                           </button>
                       ) : (
                           <div className="animate-fade-in space-y-4">
                               <div className="bg-white/60 p-4 rounded-xl text-sm space-y-2 max-h-40 overflow-y-auto border border-orange-100/50">
                                   {['Desi Ghee (1kg)', 'Mango Wood (5kg)', 'Camphor (50g)', 'Red Cloth (2m)', 'Coconuts (11pcs)', 'Betel Leaves (21)', 'Havan Samagri Packet'].map((item, i) => (
                                       <div key={i} className="flex items-center gap-2 text-orange-900/80">
                                           <CheckCircle size={14} className="text-emerald-500 shrink-0" /> {item}
                                       </div>
                                   ))}
                               </div>
                               <button className="w-full py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                                   <ShoppingBag size={18} /> One-Click Order
                               </button>
                           </div>
                       )}
                   </GlassCard>
               )}

               {activeTab === 'Choreography' && (
                   <GlassCard className="p-6 bg-purple-50/50 border-purple-100">
                       <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                           <Music size={20} /> Remote Practice Hub
                       </h3>
                       <p className="text-sm text-purple-800/60 mb-6">
                           Family in different cities? Upload your song list and get custom tutorial videos for everyone to practice at home.
                       </p>
                       <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-all">
                           Upload Playlist
                       </button>
                   </GlassCard>
               )}
               
               {activeTab === 'Styling' && (
                   <GlassCard className="p-6 bg-pink-50/50 border-pink-100">
                       <h3 className="font-bold text-pink-800 mb-4 flex items-center gap-2">
                           <Shirt size={20} /> Draping SOS
                       </h3>
                       <p className="text-sm text-pink-800/60 mb-6">
                           Need a last minute saree draping expert or Safa tier for the Baraat? We have experts on standby.
                       </p>
                       <button className="w-full py-3 bg-pink-600 text-white rounded-xl font-bold shadow-lg hover:bg-pink-700 transition-all">
                           Request Stylist
                       </button>
                   </GlassCard>
               )}
           </div>
       </div>
    </div>
  );
};
