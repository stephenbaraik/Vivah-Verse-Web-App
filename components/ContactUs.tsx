import React from 'react';
import { GlassCard } from './GlassCard';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's Talk Weddings</h2>
            <p className="text-gray-600 text-lg">
              Whether you are a couple planning your big day or a vendor looking to join our network, we are here to help.
            </p>
          </div>

          <div className="space-y-6">
            <GlassCard className="flex items-center gap-4 p-6 hover:bg-white/40 transition-colors">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Us</p>
                <p className="text-lg font-bold text-gray-800">hello@vivahverse.com</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 p-6 hover:bg-white/40 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call Us</p>
                <p className="text-lg font-bold text-gray-800">+91 98765 43210</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 p-6 hover:bg-white/40 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Headquarters</p>
                <p className="text-lg font-bold text-gray-800">Cyber City, Gurugram, India</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Form */}
        <div>
          <GlassCard className="p-8 h-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full bg-white/50 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                <input type="text" placeholder="Last Name" className="w-full bg-white/50 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-white/50 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
              <select className="w-full bg-white/50 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-600">
                <option>I am a Couple</option>
                <option>I am a Vendor</option>
                <option>General Inquiry</option>
              </select>
              <textarea rows={4} placeholder="How can we assist you?" className="w-full bg-white/50 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"></textarea>
              
              <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                Send Message <Send size={18} />
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};