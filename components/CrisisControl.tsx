import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { ArrowLeft, AlertTriangle, Truck, Zap, ThermometerSnowflake, Scissors, Camera } from 'lucide-react';

interface CrisisControlProps {
  onBack: () => void;
}

export const CrisisControl: React.FC<CrisisControlProps> = ({ onBack }) => {
  const [activeSOS, setActiveSOS] = useState<string | null>(null);

  const sosOptions = [
    { id: 'ice', label: 'Emergency Ice', icon: ThermometerSnowflake, color: 'bg-cyan-500', desc: '20kg Cubes • 15 Mins' },
    { id: 'safety', label: 'Safety Kit', icon: Scissors, color: 'bg-rose-500', desc: 'Pins, Hairspray, Thread' },
    { id: 'backup', label: 'Backup Shooter', icon: Camera, color: 'bg-purple-500', desc: 'Photographer on standby' },
    { id: 'medical', label: 'First Aid', icon: Zap, color: 'bg-red-600', desc: 'Paramedic & Basic Kit' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in relative min-h-[80vh] flex flex-col justify-center">
       <div className="absolute top-6 left-6">
            <button onClick={onBack} className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Exit SOS Mode
            </button>
       </div>

       <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 animate-pulse">
                <AlertTriangle size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-vivah-burgundy mb-4">Crisis Control Center</h1>
            <p className="text-xl text-vivah-burgundy/60">Tap a button. We deploy resources immediately.</p>
       </div>

       {!activeSOS ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {sosOptions.map(opt => (
                   <button 
                        key={opt.id}
                        onClick={() => setActiveSOS(opt.id)}
                        className="group relative overflow-hidden bg-white/40 border border-white/60 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 text-left"
                   >
                        <div className={`absolute top-0 right-0 w-32 h-32 ${opt.color} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500`}></div>
                        <div className={`w-14 h-14 rounded-2xl ${opt.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <opt.icon size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{opt.label}</h3>
                        <p className="text-gray-500 font-medium">{opt.desc}</p>
                   </button>
               ))}
           </div>
       ) : (
           <GlassCard className="text-center p-12 border-red-100 bg-red-50/50">
               <h2 className="text-3xl font-bold text-gray-800 mb-4">Confirm Emergency Request?</h2>
               <p className="text-gray-600 mb-8">
                   This will trigger a priority dispatch to your venue location. <br/>
                   <span className="font-bold text-red-500">Estimated Arrival: 12 Minutes</span>
               </p>
               
               <div className="flex gap-4 justify-center">
                   <button onClick={() => setActiveSOS(null)} className="px-8 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50">
                       Cancel
                   </button>
                   <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 animate-pulse flex items-center gap-2">
                       <Truck size={20} /> DISPATCH NOW
                   </button>
               </div>
           </GlassCard>
       )}
    </div>
  );
};
