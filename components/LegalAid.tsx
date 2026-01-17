import React from 'react';
import { GlassCard } from './GlassCard';
import { ArrowLeft, FileText, Download, CheckCircle, ExternalLink } from 'lucide-react';

interface LegalAidProps {
  onBack: () => void;
}

export const LegalAid: React.FC<LegalAidProps> = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
       <button onClick={onBack} className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors mb-8">
            <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
       </button>

       <div className="mb-12">
            <h1 className="text-4xl font-light text-vivah-burgundy mb-2">Happily Ever After... <span className="font-bold">Paperwork</span></h1>
            <p className="text-vivah-burgundy/60 text-lg">We've pre-filled the government forms for you using your booking data.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Marriage Registration */}
           <GlassCard className="p-8">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                   <FileText size={24} />
               </div>
               <h3 className="text-2xl font-bold text-vivah-burgundy mb-2">Marriage Registration Form</h3>
               <p className="text-vivah-burgundy/60 mb-6 text-sm">
                   Required for legal recognition. Pre-filled with Venue Address and Date. 
               </p>
               
               <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-2 text-sm text-vivah-burgundy/70">
                       <CheckCircle size={14} className="text-emerald-500" /> Venue Details Auto-filled
                   </div>
                   <div className="flex items-center gap-2 text-sm text-vivah-burgundy/70">
                       <CheckCircle size={14} className="text-emerald-500" /> Witness Details Placeholder
                   </div>
                   <div className="flex items-center gap-2 text-sm text-vivah-burgundy/70">
                       <CheckCircle size={14} className="text-emerald-500" /> Form 5 (Hindu Marriage Act)
                   </div>
               </div>

               <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg">
                   <Download size={18} /> Download PDF
               </button>
           </GlassCard>

           {/* Name Change Kit */}
           <GlassCard className="p-8">
               <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-6">
                   <ExternalLink size={24} />
               </div>
               <h3 className="text-2xl font-bold text-vivah-burgundy mb-2">Name Change Kit</h3>
               <p className="text-vivah-burgundy/60 mb-6 text-sm">
                   A step-by-step checklist and affidavit generator for Passport, Aadhar, and Bank updates.
               </p>

               <div className="space-y-4 mb-8">
                    <div className="p-3 bg-white/50 rounded-lg border border-white/60 flex justify-between items-center">
                        <span className="text-sm font-bold text-vivah-burgundy">Affidavit Format</span>
                        <Download size={16} className="text-vivah-burgundy/40 hover:text-vivah-rose cursor-pointer" />
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg border border-white/60 flex justify-between items-center">
                        <span className="text-sm font-bold text-vivah-burgundy">Newspaper Ad Template</span>
                        <Download size={16} className="text-vivah-burgundy/40 hover:text-vivah-rose cursor-pointer" />
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg border border-white/60 flex justify-between items-center">
                        <span className="text-sm font-bold text-vivah-burgundy">Gazette Notification Guide</span>
                        <Download size={16} className="text-vivah-burgundy/40 hover:text-vivah-rose cursor-pointer" />
                    </div>
               </div>

               <button className="w-full py-3 bg-white border border-vivah-burgundy/10 text-vivah-burgundy rounded-xl font-bold hover:bg-vivah-petal transition-colors">
                   View Full Checklist
               </button>
           </GlassCard>
       </div>
    </div>
  );
};
