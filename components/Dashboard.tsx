import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Venue, VendorService, TeamMember } from '../types';
import { CheckSquare, Plus, MapPin, IndianRupee, AlertCircle, Calendar, Users, Share2, Crown, Eye, Flame, Heart, Wallet, ScrollText, AlertTriangle, Leaf, FileText } from 'lucide-react';

interface DashboardProps {
  weddingDate: string;
  guestCount: number;
  bookedVenue: Venue | null;
  bookedServices: VendorService[];
  onRemoveService: (id: string) => void;
  onBrowseMore: () => void;
  onOpenGuestManager: () => void;
  onOpenMicroServices: () => void;
  onOpenShagunWallet: () => void;
  onOpenSOS: () => void;
  onOpenLegal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  weddingDate,
  guestCount,
  bookedVenue,
  bookedServices,
  onRemoveService,
  onBrowseMore,
  onOpenGuestManager,
  onOpenMicroServices,
  onOpenShagunWallet,
  onOpenSOS,
  onOpenLegal
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0 });
  const [foodRescueEnabled, setFoodRescueEnabled] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Confirm Guest List', completed: true },
    { id: 2, text: 'Venue Down Payment', completed: true },
    { id: 3, text: 'Select Decor Theme', completed: false },
    { id: 4, text: 'Book Photographer', completed: false },
  ]);

  // Mock Team
  const team: TeamMember[] = [
    { id: '1', name: 'You', role: 'Admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { id: '2', name: 'Mom', role: 'Editor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(weddingDate) - +new Date();
      return { days: difference > 0 ? Math.floor(difference / (1000 * 60 * 60 * 24)) : 0 };
    };
    setTimeLeft(calculateTimeLeft());
  }, [weddingDate]);

  // Financial Calculations
  const totalVenueCost = bookedVenue ? bookedVenue.pricePerPlate * guestCount : 0;
  const gst = totalVenueCost * 0.18;
  const grandTotal = totalVenueCost + gst;
  const paidAmount = Math.round(grandTotal * 0.25); 
  const pendingAmount = grandTotal - paidAmount;
  
  const wDate = new Date(weddingDate);
  const dueDate = new Date(wDate.setDate(wDate.getDate() - 30)).toDateString();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header with Gamification */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-4xl font-light text-vivah-burgundy">
                    Welcome back, <span className="font-bold">Couple</span>.
                 </h1>
                 <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-orange-200" title="Daily Planning Streak">
                     <Flame size={12} fill="currentColor" /> 12 Day Streak
                 </div>
            </div>
            <p className="text-vivah-burgundy/60 text-lg font-light">
                <span className="font-medium text-vivah-rose">{timeLeft.days} days</span> to go. You're crushing it!
            </p>
        </div>
        
        {/* Team Widget */}
        <div className="flex items-center gap-4">
            <button 
                onClick={onOpenSOS}
                className="bg-red-50 text-red-600 px-4 py-3 rounded-xl font-bold text-sm border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-2 animate-pulse-slow"
            >
                <AlertTriangle size={16} /> SOS Mode
            </button>
            <GlassCard className="p-3 flex items-center gap-4 bg-white/40 !rounded-xl">
                <div className="flex -space-x-3">
                    {team.map(m => (
                        <img key={m.id} src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100" />
                    ))}
                    <button className="w-10 h-10 rounded-full bg-vivah-burgundy text-white flex items-center justify-center border-2 border-white text-xs font-bold hover:bg-vivah-rose transition-colors">
                        <Plus size={14} />
                    </button>
                </div>
            </GlassCard>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button onClick={onOpenGuestManager} className="p-4 bg-white/60 rounded-2xl border border-white hover:shadow-lg transition-all text-left group">
              <div className="w-10 h-10 bg-vivah-petal rounded-full flex items-center justify-center text-vivah-rose mb-3 group-hover:scale-110 transition-transform">
                  <Users size={20} />
              </div>
              <p className="font-bold text-vivah-burgundy text-sm">Guest List</p>
              <p className="text-xs text-vivah-burgundy/50">Manage RSVPs</p>
          </button>
          
          <button onClick={onOpenMicroServices} className="p-4 bg-white/60 rounded-2xl border border-white hover:shadow-lg transition-all text-left group">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                  <ScrollText size={20} />
              </div>
              <p className="font-bold text-vivah-burgundy text-sm">Services</p>
              <p className="text-xs text-vivah-burgundy/50">Pundit, Dance...</p>
          </button>

          <button onClick={onOpenShagunWallet} className="p-4 bg-white/60 rounded-2xl border border-white hover:shadow-lg transition-all text-left group">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                  <Wallet size={20} />
              </div>
              <p className="font-bold text-vivah-burgundy text-sm">Shagun Wallet</p>
              <p className="text-xs text-vivah-burgundy/50">Digital Gifts</p>
          </button>
          
          <button onClick={onOpenLegal} className="p-4 bg-white/60 rounded-2xl border border-white hover:shadow-lg transition-all text-left group">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  <FileText size={20} />
              </div>
              <p className="font-bold text-vivah-burgundy text-sm">Legal Aid</p>
              <p className="text-xs text-vivah-burgundy/50">Registration</p>
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Primary Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Financial Overview */}
          <GlassCard className="p-8">
             <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-light text-vivah-burgundy flex items-center gap-2">
                    <IndianRupee size={24} /> Financial Overview
                 </h3>
                 <button className="text-xs font-bold text-vivah-rose border border-vivah-rose/20 px-3 py-1 rounded-full hover:bg-vivah-petal">View Breakdown</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                    <p className="text-xs text-emerald-600 font-bold uppercase mb-1">Paid (25%)</p>
                    <p className="text-2xl font-bold text-emerald-800">₹{paidAmount.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-emerald-600/70 mt-1 flex items-center gap-1"><CheckSquare size={10} /> Escrow Secured</p>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                    <p className="text-xs text-orange-600 font-bold uppercase mb-1">Pending (75%)</p>
                    <p className="text-2xl font-bold text-orange-800">₹{pendingAmount.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-orange-600/70 mt-1 flex items-center gap-1"><AlertCircle size={10} /> Due {dueDate}</p>
                </div>
                 <div className="bg-vivah-petal/30 rounded-2xl p-4 border border-vivah-burgundy/5">
                    <p className="text-xs text-vivah-burgundy/60 font-bold uppercase mb-1">Estimated Total</p>
                    <p className="text-2xl font-bold text-vivah-burgundy">₹{grandTotal.toLocaleString('en-IN')}</p>
                </div>
             </div>
          </GlassCard>

          {/* Vendors Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-vivah-burgundy">My Vendors</h3>
                <button onClick={onBrowseMore} className="flex items-center gap-1 text-sm font-bold text-vivah-rose hover:underline">
                    <Plus size={16} /> Add Vendor
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookedServices.length > 0 ? bookedServices.map((s) => (
                    <div key={s.id} className="p-4 bg-white/30 border border-white/50 rounded-2xl flex items-center gap-4">
                        <img src={s.image} alt="S" className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-vivah-burgundy">{s.businessName}</p>
                                <span className="w-4 h-4 rounded-full bg-vivah-gold flex items-center justify-center text-[10px] text-white" title="Verified"><Crown size={8}/></span>
                                {s.isEcoFriendly && (
                                   <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white" title="Eco-Friendly"><Leaf size={8} fill="currentColor"/></span>
                                )}
                            </div>
                            <p className="text-xs text-vivah-burgundy/50 uppercase">{s.category}</p>
                        </div>
                        <button className="p-2 hover:bg-white rounded-full transition-colors text-vivah-burgundy/40 hover:text-vivah-burgundy">
                            <Eye size={16} />
                        </button>
                    </div>
                )) : (
                    <div className="col-span-2 p-8 border-2 border-dashed border-vivah-burgundy/10 rounded-2xl text-center text-vivah-burgundy/40">
                        No vendors selected yet.
                    </div>
                )}
            </div>
          </div>
          
          {/* Sustainability Widget */}
          <GlassCard className="p-6 bg-gradient-to-r from-emerald-50 to-white border-emerald-100 transition-all duration-500">
              <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full mt-1 transition-colors ${foodRescueEnabled ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                          <Leaf size={20} fill={foodRescueEnabled ? "currentColor" : "none"} />
                      </div>
                      <div>
                          <h3 className="font-bold text-vivah-burgundy">Food Rescue Mission</h3>
                          <p className="text-sm text-vivah-burgundy/60 max-w-sm mb-2">
                              Donate excess food to local shelters.
                          </p>
                          {foodRescueEnabled && (
                              <div className="text-xs bg-white/60 p-2 rounded-lg border border-emerald-100 inline-block animate-fade-in">
                                  <span className="font-bold text-emerald-700 block">Partner: Robin Hood Army</span>
                                  <span className="text-emerald-600/80">Logistics team assigned for pickup.</span>
                              </div>
                          )}
                      </div>
                  </div>
                  <div className="flex items-center">
                       <button 
                          onClick={() => setFoodRescueEnabled(!foodRescueEnabled)}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${foodRescueEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition shadow-sm ${foodRescueEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                  </div>
              </div>
          </GlassCard>

        </div>

        {/* Right Column: Checklist */}
        <div className="lg:col-span-1">
            <h3 className="text-xl font-light text-vivah-burgundy mb-6">Next Actions</h3>
            <div className="space-y-3">
                {checklist.map((item) => (
                    <div 
                        key={item.id} 
                        className={`
                            p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3
                            ${item.completed 
                                ? 'bg-vivah-stem/5 border-transparent opacity-60' 
                                : 'bg-white/60 border-white shadow-sm hover:shadow-md'
                            }
                        `}
                        onClick={() => setChecklist(prev => prev.map(t => t.id === item.id ? {...t, completed: !t.completed} : t))}
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.completed ? 'border-vivah-stem bg-vivah-stem text-white' : 'border-vivah-burgundy/30'}`}>
                            {item.completed && <CheckSquare size={12} />}
                        </div>
                        <span className={`text-sm font-medium ${item.completed ? 'line-through text-vivah-burgundy/50' : 'text-vivah-burgundy'}`}>{item.text}</span>
                    </div>
                ))}
            </div>

            {/* Venue Snippet Mini */}
            <div className="mt-8 bg-white/40 border border-white/60 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <img src={bookedVenue?.image || ''} alt="Venue" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                        <h4 className="font-bold text-vivah-burgundy text-sm">{bookedVenue?.name}</h4>
                        <p className="text-xs text-vivah-burgundy/50">{bookedVenue?.location}</p>
                    </div>
                </div>
                <button className="w-full py-2 bg-white text-vivah-burgundy border border-vivah-burgundy/10 rounded-xl text-xs font-bold hover:bg-vivah-petal">View Contract</button>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-vivah-rose/80 to-vivah-burgundy rounded-3xl text-white shadow-xl">
                <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                <p className="text-sm text-pink-100 mb-4">Our AI planner is ready to assist with your checklist.</p>
                <button className="w-full py-3 bg-white text-vivah-rose rounded-xl font-bold text-sm">Chat Now</button>
            </div>
        </div>

      </div>
    </div>
  );
};