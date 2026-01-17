import React from 'react';
import { AppView } from '../../types';
import { LOGO_URL, APP_NAME } from '../../constants';
import { Instagram, Facebook, Twitter, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative mt-20 bg-white/20 backdrop-blur-xl border-t border-white/30 text-vivah-burgundy/80">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
              <img src={LOGO_URL} alt="Logo" className="w-10 h-auto object-contain" />
              <span className="text-2xl font-script font-bold text-vivah-burgundy">{APP_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Designing timeless weddings with futuristic simplicity. The new era of celebration management.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-vivah-burgundy mb-4">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate(AppView.HOME)} className="hover:text-vivah-rose transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate(AppView.INSPIRATION)} className="hover:text-vivah-rose transition-colors">Vision Board</button></li>
              <li><button onClick={() => onNavigate(AppView.ABOUT)} className="hover:text-vivah-rose transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate(AppView.VENDOR_PORTAL)} className="hover:text-vivah-rose transition-colors">For Vendors</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-vivah-burgundy mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate(AppView.CONTACT)} className="hover:text-vivah-rose transition-colors">Contact Support</button></li>
              <li><a href="#" className="hover:text-vivah-rose transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-vivah-rose transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-vivah-rose transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-vivah-burgundy mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Mail size={14} className="text-vivah-rose"/> hello@vivahverse.com</p>
              <p className="flex items-center gap-2"><MapPin size={14} className="text-vivah-rose"/> Gurugram, India</p>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="p-2 bg-white/40 rounded-full hover:bg-vivah-rose hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-white/40 rounded-full hover:bg-vivah-rose hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-white/40 rounded-full hover:bg-vivah-rose hover:text-white transition-all"><Twitter size={18} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-vivah-burgundy/10 mt-12 pt-8 text-center text-xs opacity-60">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved. Built with Love & AI.</p>
        </div>
      </div>
    </footer>
  );
};

