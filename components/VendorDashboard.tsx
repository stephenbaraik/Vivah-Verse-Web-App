import React from 'react';
import { GlassCard } from './GlassCard';
import { BarChart3, TrendingUp, Users, Calendar, Eye, MousePointerClick, ArrowUpRight } from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
        <div className="mb-10">
            <h1 className="text-4xl font-light text-vivah-burgundy mb-2">Vendor <span className="font-bold">Dashboard</span></h1>
            <p className="text-vivah-burgundy/60">Welcome back, Royal Decorators. Here is how your listing is performing.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
                { label: 'Profile Views', value: '1,245', change: '+12%', icon: Eye },
                { label: 'Shortlisted', value: '86', change: '+5%', icon: Heart },
                { label: 'Inquiries', value: '24', change: '+18%', icon: MousePointerClick },
                { label: 'Bookings', value: '8', change: '+2%', icon: Calendar },
            ].map((stat, idx) => (
                <GlassCard key={idx} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-vivah-petal rounded-xl text-vivah-rose">
                            <stat.icon size={20} />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-1 rounded-lg">
                            {stat.change} <ArrowUpRight size={12} />
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-vivah-burgundy mb-1">{stat.value}</p>
                    <p className="text-xs text-vivah-burgundy/50 uppercase font-bold">{stat.label}</p>
                </GlassCard>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart (Mock) */}
            <div className="lg:col-span-2">
                <GlassCard className="p-8 h-full">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-vivah-burgundy">Traffic Overview</h3>
                        <select className="bg-white/50 border-none rounded-lg text-sm font-bold text-vivah-burgundy/60 px-3 py-1">
                            <option>Last 30 Days</option>
                            <option>Last 6 Months</option>
                        </select>
                    </div>
                    
                    {/* CSS Bar Chart Mock */}
                    <div className="flex items-end justify-between h-64 gap-4 px-4 pb-4 border-b border-vivah-burgundy/10">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-vivah-rose/10 rounded-t-xl relative group hover:bg-vivah-rose/20 transition-colors" style={{height: `${h}%`}}>
                                <div className="absolute bottom-0 w-full bg-vivah-rose rounded-t-xl transition-all duration-1000" style={{height: `${h * 0.6}%`}}></div>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-vivah-burgundy text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h * 10} Views
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs font-bold text-vivah-burgundy/40 mt-4 px-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </GlassCard>
            </div>

            {/* Insights */}
            <div className="lg:col-span-1 space-y-6">
                <GlassCard className="p-6 bg-gradient-to-br from-vivah-gold/20 to-transparent border-vivah-gold/30">
                    <h3 className="font-bold text-vivah-burgundy mb-4 flex items-center gap-2">
                        <TrendingUp size={18} /> Market Insights
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/60 rounded-xl">
                            <p className="text-sm font-bold text-vivah-burgundy mb-1">Price Competitiveness</p>
                            <p className="text-xs text-vivah-burgundy/70 leading-relaxed">
                                Your pricing is <span className="text-red-500 font-bold">15% higher</span> than similar vendors in Udaipur for Dec dates.
                            </p>
                        </div>
                        <div className="p-4 bg-white/60 rounded-xl">
                            <p className="text-sm font-bold text-vivah-burgundy mb-1">Hot Dates</p>
                            <p className="text-xs text-vivah-burgundy/70 leading-relaxed">
                                High demand for <span className="font-bold">Dec 14-16</span>. Consider adding a premium package.
                            </p>
                        </div>
                    </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                     <h3 className="font-bold text-vivah-burgundy mb-4">Recent Leads</h3>
                     <div className="space-y-3">
                         {['Anjali K.', 'Rohit M.', 'Sneha P.'].map((n, i) => (
                             <div key={i} className="flex items-center justify-between p-3 hover:bg-white/40 rounded-lg cursor-pointer transition-colors">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-vivah-burgundy/10 text-vivah-burgundy flex items-center justify-center text-xs font-bold">
                                         {n.charAt(0)}
                                     </div>
                                     <span className="text-sm font-medium">{n}</span>
                                 </div>
                                 <span className="text-xs text-vivah-burgundy/40">2h ago</span>
                             </div>
                         ))}
                     </div>
                </GlassCard>
            </div>
        </div>
    </div>
  );
};

// Missing Icon import fix
import { Heart } from 'lucide-react';
