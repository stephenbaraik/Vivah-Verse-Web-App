import React from 'react';
import { GlassCard } from './GlassCard';
import { MOCK_SHAGUN_TRANSACTIONS } from '../constants';
import { ArrowLeft, QrCode, Gift, History, Wallet, Heart } from 'lucide-react';

interface ShagunWalletProps {
  onBack: () => void;
}

export const ShagunWallet: React.FC<ShagunWalletProps> = ({ onBack }) => {
  const totalReceived = MOCK_SHAGUN_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
       <button onClick={onBack} className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors mb-8">
            <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
       </button>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left: Wallet & QR */}
           <div className="lg:col-span-1 space-y-6">
               <GlassCard className="p-8 bg-gradient-to-br from-vivah-burgundy to-vivah-rose text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                   <div className="relative z-10">
                       <p className="text-white/60 text-sm font-bold uppercase mb-2">Total Shagun Received</p>
                       <h2 className="text-5xl font-bold mb-8">₹{totalReceived.toLocaleString('en-IN')}</h2>
                       
                       <div className="flex gap-4">
                           <button className="flex-1 py-3 bg-white/20 backdrop-blur-md rounded-xl font-bold hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                               <Wallet size={18} /> Withdraw
                           </button>
                           <button className="flex-1 py-3 bg-white text-vivah-rose rounded-xl font-bold shadow-lg hover:bg-vivah-petal transition-colors flex items-center justify-center gap-2">
                               <Gift size={18} /> Thank Guests
                           </button>
                       </div>
                   </div>
               </GlassCard>

               <GlassCard className="p-8 text-center">
                   <h3 className="text-xl font-bold text-vivah-burgundy mb-6">Your Shagun QR</h3>
                   <div className="w-48 h-48 mx-auto bg-white p-2 rounded-xl border-2 border-dashed border-vivah-burgundy/20 flex items-center justify-center mb-6">
                       <QrCode size={120} className="text-vivah-burgundy" />
                   </div>
                   <p className="text-sm text-vivah-burgundy/60 mb-6">
                       Print this for your reception standees. Guests can scan to pay and leave a video message.
                   </p>
                   <button className="text-vivah-rose font-bold text-sm hover:underline">Download Printable PDF</button>
               </GlassCard>
           </div>

           {/* Right: Digital Guestbook (Transaction Feed) */}
           <div className="lg:col-span-2">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="text-2xl font-light text-vivah-burgundy">Digital <span className="font-bold">Guestbook</span></h3>
                   <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white/40 rounded-full text-xs font-bold text-vivah-burgundy/60 border border-white">Recent</span>
                        <span className="px-3 py-1 bg-transparent rounded-full text-xs font-bold text-vivah-burgundy/40 hover:bg-white/40 cursor-pointer">Top Gifters</span>
                   </div>
               </div>

               <div className="space-y-4">
                   {MOCK_SHAGUN_TRANSACTIONS.map(t => (
                       <GlassCard key={t.id} className="p-6 flex gap-4 items-start">
                           <img src={t.avatar} alt={t.sender} className="w-12 h-12 rounded-full bg-gray-100" />
                           <div className="flex-1">
                               <div className="flex justify-between items-start">
                                   <h4 className="font-bold text-vivah-burgundy text-lg">{t.sender}</h4>
                                   <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-sm">+ ₹{t.amount.toLocaleString()}</span>
                               </div>
                               <div className="mt-2 bg-vivah-petal/30 p-3 rounded-xl rounded-tl-none border border-vivah-rose/10">
                                   <p className="text-vivah-burgundy/80 italic">"{t.message}"</p>
                               </div>
                               <div className="mt-2 flex gap-4 text-xs font-bold text-vivah-burgundy/40">
                                   <span>{t.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                   <button className="flex items-center gap-1 hover:text-vivah-rose transition-colors"><Heart size={12} /> Like</button>
                                   <button className="hover:text-vivah-rose transition-colors">Reply</button>
                               </div>
                           </div>
                       </GlassCard>
                   ))}
               </div>
           </div>
       </div>
    </div>
  );
};
